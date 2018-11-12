const { escapeHTML, forEach, slice, startOf } = require('./util');

const delimiter = /{{\s*([^}]+)\s*}}/;

const syntax = [
  ['each', t => `util.forEach(${slice(t, 4)},function($value,$key){`],
  ['/each', () => `});`],
  ['if', t => `if(${slice(t, 2)}){`],
  ['elseif', t => `}else if(${slice(t, 6)}){`],
  ['else', () => `}else{`],
  ['/if', () => `}`],
  ['=', t => `html+=util.escape(${slice(t, 1)});`],
  ['@', t => `html+=${slice(t, 1)};`],
];

const compile = tpl => {
  let code = `var html = "";with(data){`;
  const tokens = tpl
    .trim()
    .replace(/[\n\r]/g, '')
    .split(delimiter)
    .filter(Boolean)
    .map(t => {
      for (let i = 0; i < syntax.length; i++) {
        const rule = syntax[i];
        if (startOf(t, rule[0])) return rule[1](t);
      }
      return `html+='${t}';`;
    });
  code +=
    tokens.join('') + `}return html.trim().replace(/>[\\n\\r\\s]*?</g, '><')`;
  const render = new Function('util', 'data', code);
  return render.bind(null, {
    escape: escapeHTML,
    forEach,
  });
};

const render = (tpl, data) => compile(tpl)(data);

module.exports = {
  compile,
  render,
};
