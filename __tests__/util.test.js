import { escapeHTML, forEach, slice, startOf } from '../src/util';

describe('util.escapeHTML', () => {
  test(`should escape [&<>'"]`, () => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    Object.keys(map).forEach(c => {
      expect(escapeHTML(c)).toBe(map[c]);
    });
    expect(escapeHTML(`<script>alert("'")</script>`)).toBe(
      `${map['<']}script${map['>']}alert(${map['"']}${map[`'`]}${map['"']})${
        map['<']
      }/script${map['>']}`
    );
  });

  test(`should not escape other character`, () => {
    const fakeWords = 'dolor maiores dolores';
    expect(escapeHTML(fakeWords)).toBe(fakeWords);
  });

  test(`should not escape other type of data`, () => {
    expect(escapeHTML(1)).toEqual(1);
  });
});

describe('util.forEach', () => {
  test('should iterate array correctly', () => {
    const mockIterator = jest.fn();
    const mockArray = [1, 2, 3, 4, 5];
    forEach(mockArray, mockIterator);
    expect(mockIterator.mock.calls.length).toBe(mockArray.length);
    expect(mockIterator.mock.calls[0][0]).toBe(mockArray[0]);
    expect(mockIterator.mock.calls[0][1]).toBe(0);
  });

  test('should iterate object correctly', () => {
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

  test('should not iterate any other type', () => {
    const mockIterator = jest.fn();
    expect(() => forEach(123, mockIterator)).toThrow();
    expect(() => forEach('123', mockIterator)).toThrow();
    expect(() => forEach(/123/, mockIterator)).toThrow();
    expect(() => forEach(true, mockIterator)).toThrow();
    expect(() => forEach(null, mockIterator)).toThrow();
    expect(() => forEach(undefined, mockIterator)).toThrow();
    expect(() => forEach(() => {}, mockIterator)).toThrow();
  });
});

describe('util.slice', () => {
  const str = ' if foo '
  test('should slice before trim', () => {
    expect(slice(str, 1)).toBe('if foo');
  });
  test('should slice correctly', () => {
    expect(slice(str, 2)).toBe('f foo');
    expect(slice(str, -2)).toBe('o');
  });
});

describe('util.startOf', () => {
  test('should run startOf correctly', () => {
    expect(startOf('foo', 'f')).toBeTruthy();
    expect(startOf('foo', 'o')).toBeFalsy();
    expect(startOf('bar', 'b')).toBeTruthy();
    expect(startOf('bar', 'r')).toBeFalsy();
  });
});
