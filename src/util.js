const getType = obj =>
  Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();

const esacapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
};

const escapeHTML = str =>
  getType(str) === 'string'
    ? str.replace(/[&<>'"]/g, tag => esacapeMap[tag])
    : str;

const forEach = (obj, iterator) => {
  if (getType(obj) === 'array') {
    obj.forEach(iterator);
  } else if (getType(obj) === 'object') {
    Object.keys(obj).forEach(k => {
      iterator.call(null, obj[k], k);
    });
  } else {
    throw new Error(`${obj} is not a iterable object`);
  }
};

const slice = (s, n) => s.slice(n).trim();

const startOf = (s, k) => s.indexOf(k) === 0;

module.exports = {
  escapeHTML,
  forEach,
  slice,
  startOf,
};
