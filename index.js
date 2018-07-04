var postcss = require('postcss');

var removedNumber = 0;

function dedupe (options, rule, i) {
  if (rule && rule.selector) {
    let decls = [];
    let result = [];

    for (let i in rule.nodes) {
      let node = rule.nodes[i];
      if (node.type !== 'decl') {
        dedupe(node);
      } else {
        if (node.prop) {
          decls.push({
            index: i,
            indexDecls: decls.length,
            remove: false,

            prop: node.prop,
            value: node.value,
            important: node.important
          });
        }
      }
    }

    for (let i in decls) {
      let decl = decls[i];
      if (result[decl.prop] === undefined) {
        result[decl.prop] = decl;
      } else {
        let resultDecl = result[decl.prop];

        let removeIndex;
        if (resultDecl.important !== true || decl.important === true) { // was not important or overridden by important
          removeIndex = resultDecl.index;
          decls[resultDecl.indexDecls].remove = true;
          resultDecl = decl;
        } else { // not overridden
          removeIndex = decl.index;
          decl.remove = true;
        }


        if (options.log) {
          console.log(
            rule.selector,
            ': ',
            rule.nodes[removeIndex].prop,
            rule.nodes[removeIndex].value,
            rule.nodes[removeIndex].important ? ' !important': ''
          );
        }
        rule.nodes[removeIndex].remove();
        removedNumber++;


      }
    }
  }
}

module.exports = postcss.plugin('postcss-discard-overridden-props', (options) => {
  // let pluginOptions = 
  options = options || {};

  return css => {
    return css.walkRules(rule => dedupe(options, rule));
  }
});
