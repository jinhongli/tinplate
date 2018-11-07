import { escapeHTML, forEach, slice, startOf } from './util';

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

export const compile = tpl => {
  let code = `var html = "";with(data){`;
  const tokens = tpl
    .split(delimiter)
    .filter(Boolean)
    .map(t => {
      for (let i = 0; i < syntax.length; i++) {
        const rule = syntax[i];
        if (startOf(t, rule[0])) return rule[1](t);
      }
      return `html+='${t}';`;
    });
  code += tokens.join('') + `}return html.trim().replace(/>[\\n\\r\\s]*?</g, '><')`;
  console.log(code);
  const render = new Function('util', 'data', code);
  return render.bind(null, {
    escape: escapeHTML,
    forEach,
  });
};

export const render = (tpl, data) => compile(tpl)(data);
