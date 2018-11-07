import { escapeHTML, forEach, slice, startOf } from '../src/util';

test('escapeHTML: should escape character correctly', () => {
  expect(escapeHTML('&')).toBe('&amp;');
  expect(escapeHTML('<')).toBe('&lt;');
  expect(escapeHTML('>')).toBe('&gt;');
  expect(escapeHTML(`'`)).toBe('&#39;');
  expect(escapeHTML('"')).toBe('&quot;');
  expect(escapeHTML('a')).toBe('a');
});

test('forEach: should iterate array correctly', () => {
  const mockIterator = jest.fn();
  const mockArray = [1, 2, 3, 4, 5];
  forEach(mockArray, mockIterator);
  expect(mockIterator.mock.calls.length).toBe(mockArray.length);
  expect(mockIterator.mock.calls[0][0]).toBe(mockArray[0]);
  expect(mockIterator.mock.calls[0][1]).toBe(0);
});

test('forEach: should iterate object correctly', () => {
  const mockIterator = jest.fn(() => true);
  const mockObject = {
    foo: 1,
    bar: 2,
    baz: 3,
  };
  const mockObjectKeys = Object.keys(mockObject);
  forEach(mockObject, mockIterator);
  expect(mockIterator.mock.calls.length).toBe(mockObjectKeys.length);
  expect(mockIterator.mock.calls[0][0]).toBe(mockObject[mockObjectKeys[0]]);
  expect(mockIterator.mock.calls[0][1]).toBe(mockObjectKeys[0]);
});

test('forEach: should not iterate other type data', () => {
  const mockIterator = jest.fn();
  expect(() => forEach(123, mockIterator)).toThrow();
  expect(() => forEach('123', mockIterator)).toThrow();
  expect(() => forEach(/123/, mockIterator)).toThrow();
  expect(() => forEach(true, mockIterator)).toThrow();
  expect(() => forEach(null, mockIterator)).toThrow();
  expect(() => forEach(undefined, mockIterator)).toThrow();
  expect(() => forEach(() => {}, mockIterator)).toThrow();
});

test('slice: should slice string with trim', () => {
  expect(slice('  foo  ', 0)).toBe('foo');
  expect(slice('  foo  ', 1)).toBe('oo');
  expect(slice('  foo  ', 3)).toBe('');
  expect(slice('  foo  ', -1)).toBe('o');
  expect(slice('  foo  ', -3)).toBe('foo');
});

test('startOf: should calc startOf string correctly', () => {
  expect(startOf('foo', 'f')).toBeTruthy();
  expect(startOf('foo', 'o')).toBeFalsy();
  expect(startOf('bar', 'b')).toBeTruthy();
  expect(startOf('bar', 'r')).toBeFalsy();
});
