require('dotenv').config();
const path = require('path');
const url = require('url');
const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');
const { createApi } = require('unsplash-js');

global.fetch = fetch;

const app = express();
const port = process.env.PORT || 8080;

// Setup hendlebars
const viewsPath = path.join(__dirname, '../templates/views');
//const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
//hbs.registerPartials(partialsPath);

// Define static directory
const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));

// Setup unsplash
const unsplash = createApi({ accessKey: process.env.UNPLASH_API_KEY });

app.get('/', (req, res) => {
  const url = `https://${req.get('host')}`;
  res.render('index', { url });
});

// app.get('/resize', (req, res) => {
//   res.render('breakpoints');
// });

app.get('/random/:query', async (req, res) => {
  const { w, h } = req.query;
  let seed = req.query.seed;
  let page = 1;
  let orientation = 'landscape';

  if (w && isNaN(w)) {
    return res.status(400).send('Invalid width value');
  }

  if (h && isNaN(h)) {
    return res.status(400).send('Invalid height value');
  }

  if (seed) {
    if (isNaN(seed)) {
      return res.status(400).send('Invalid seed value');
    }

    page = Math.floor(seed/30) + 1;
  }

  if (w && h && w/h < 0.75) {
    orientation = 'portrait';
  }

  try {
    const result = await unsplash.search.getPhotos({
      query: req.params.query,
      orientation,
      page,
      per_page: 30
    });

    if (result.errors) {
      res.status(400).send(result.errors)
    } else {
      // handle success here
      const { response: { results } } = result;
      let index;

      if (!results.length) {
        if (seed) {
          return res.status(404).send('No results found. Try changing the query or decreasing the seed.');
        }

        return res.status(404).send('No results found.');
      }

      if (seed) {
        seed = 30 - ((page * 30) - seed);
        index = seed > results.length-1 ? results.length-1 : seed;
      } else {
        index = Math.floor(Math.random() * (results.length - 1) ) + 1;
      }

      res.redirect(url.format({
        pathname:`/id/${results[index].id}`,
        query: req.query
      }));
    }
  } catch(error) {
    res.status(500)
  }
});

app.get('/id/:id', async (req, res) => {
  const { w, h, format = 'png' } = req.query;
  let queryParams = '';

  if (w && isNaN(w)) {
    return res.status(400).send('Invalid width value');
  }

  if (h && isNaN(h)) {
    return res.status(400).send('Invalid height value');
  }

  if (w && h) {
    queryParams += `&w=${w}&h=${h}&fit=crop&crop=faces,center`;
  } else if (h) {
    queryParams += `&w=${h}&&h=${h}&fit=crop&crop=faces,center`;
  } else if (w) {
    queryParams += `&w=${w}&h=${w}&fit=crop&crop=faces,center`;
  }

  if (format) {
    if (!['png', 'jpg', 'jpeg', 'webp'].includes(format)) {
      return res.status(400).send('Invalid format');
    } else {
      queryParams += `&fm=${format}`;
    }
  }

  try {
    const result = await unsplash.photos.get({ photoId: req.params.id });

    if (result.errors) {
      res.status(400).send(result.errors)
    } else {
      // handle success here
      const { response } = result;

      const image = await fetch(response.urls.raw+queryParams);
      let buffer = await image.buffer();
      res.set('Content-Type', `image/${format}`);

      res.send(buffer)
    }
  } catch(error) {
    res.status(500)
  }
});

app.get('/info/:id', async (req, res) => {
  try {
    const result = await unsplash.photos.get({ photoId: req.params.id });

    if (result.errors) {
      res.status(400).send(result.errors)
    } else {
      // handle success here
      const { response } = result;

      res.json({
        id: response.id,
        width: response.width,
        height: response.height,
        description: response.description,
        links: response.links.html,
        author: response.user.name
      });
    }
  } catch(error) {
    res.status(500)
  }
});

// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
  res.status(404).send('404: File Not Found');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
