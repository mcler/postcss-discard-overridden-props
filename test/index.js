var fs = require('fs');
var path = require('path');

var expect = require('expect');
var postcss = require('postcss');
var postcssHost = require('../index.js');

describe('postcssHost', function() {
  it('passing all possible situations', function() {
    var src = fs.readFileSync(path.join(__dirname, 'src/index.css'));
    var dist = fs.readFileSync(path.join(__dirname, 'dist/index.css'));

    var output = postcss()
      .use(postcssHost({
        log: true,
        ignorePrefix: true
      }))
      .process(src)
      .css;

    expect(output).toEqual(dist.toString());
  });
});