import create from '@verndale/core';
import hljs from 'highlight.js';


import modules from './modules';

document.addEventListener('DOMContentLoaded', () => {
  hljs.initHighlighting();

  create(modules);
});
