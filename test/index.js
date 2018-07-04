var fs = require('fs');
var path = require('path');

var expect = require('expect');
var postcss = require('postcss');
var postcssHost = require('../index.js');

describe('postcssHost', function() {
  it('should replace :host:pseudo-class to :host(:pseudo-class)', function() {
    var src = fs.readFileSync(path.join(__dirname, 'src/index.css'));
    var dist = fs.readFileSync(path.join(__dirname, 'dist/index.css'));

    var output = postcss()
      .use(postcssHost())
      .process(src)
      .css;
    console.log(output);
    expect(output).toEqual(dist.toString());
  });
});