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

export const escapeHTML = str =>
  str.replace(/[&<>'"]/g, tag => esacapeMap[tag] || tag);

export const forEach = (obj, iterator) => {
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

export const slice = (s, n) => s.trim().slice(n);

export const startOf = (s, k) => s.indexOf(k) === 0;
