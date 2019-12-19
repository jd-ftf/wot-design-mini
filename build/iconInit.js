var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var render = require('json-templater/string');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../packages/icon/index.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;
var classList = [];

var template = `
Page({
  data: {
    icons: {{list}}
  }
});
`

nodes.forEach((node) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.wd-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

template = render(template, {
  list: JSON.stringify(classList)
})

fs.writeFile(path.resolve(__dirname, '../example/pages/icon/index.js'), template, () => {});
