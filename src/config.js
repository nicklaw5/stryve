var marked = require('marked');

module.exports = {
  default_socket_port: 3333,
  default_socket_url: 'localhost',
  markdown_options: {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: false,
    smartypants: false,
    linksInNewTab: true
  }
};
