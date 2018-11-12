import { compile, render } from '../src/index';

describe('compile', () => {
  test('should return a function', () => {
    const tpl = '<h1>Hello {{= name}}</h1>';
    const renderFn = compile(tpl);
    expect(typeof renderFn).toEqual('function');
  });
});

describe('render', () => {
  test('=: should render variable correctly', () => {
    const tpl = '<h1 id="hello">Hello {{= name}}</h1>';
    document.body.innerHTML = render(tpl, {
      name: 'Tinplate',
    });
    expect(document.querySelector('#hello').innerHTML).toEqual(
      'Hello Tinplate'
    );
  });

  test('=: should escape with "="', () => {
    const tpl = '<h1 id="hello">Hello {{= name}}</h1>';
    document.body.innerHTML = render(tpl, {
      name: '<script>alert(1)</script>',
    });
    expect(document.querySelector('#hello').innerHTML).toEqual(
      'Hello &lt;script&gt;alert(1)&lt;/script&gt;'
    );
  });

  test('@: should not escape with "@"', () => {
    const tpl = '<h1 id="hello">Hello {{@ name}}</h1>';
    document.body.innerHTML = render(tpl, {
      name: '<script>alert(1)</script>',
    });
    expect(document.querySelector('#hello').innerHTML).toEqual(
      'Hello <script>alert(1)</script>'
    );
  });

  test('each: should render 3 list item with different type', () => {
    const tpl = `
<ul id="ul">
{{each foo}}
  <li>{{= $value}}</li>
{{/each}}
</ul>
    `;
    document.body.innerHTML = render(tpl, {
      foo: [1, '2', 3.3],
    });
    const $ul = document.querySelector('#ul');
    expect($ul.children.length).toBe(3);
    expect($ul.children[0].innerHTML).toEqual('1');
    expect($ul.children[1].innerHTML).toEqual('2');
    expect($ul.children[2].innerHTML).toEqual('3.3');
  });

  test('if: should render content when satisfied', () => {
    const tpl = `
<h1 id="hello">
{{if foo}}
  Hello {{= foo}}
{{/if}}
</h1>
    `;
    document.body.innerHTML = render(tpl, {
      foo: 'Tinplate',
    });
    const $hello = document.querySelector('#hello');
    expect($hello).toBeTruthy;
    expect($hello.innerHTML.trim()).toEqual('Hello Tinplate');
  });

  test('else: should render else content when not satisfied', () => {
    const tpl = `
<h1 id="hello">
{{if foo}}
  Hello {{= foo}}
{{else}}
  Hello Stranger
{{/if}}
</h1>
    `;
    document.body.innerHTML = render(tpl, {
      foo: '',
    });
    const $hello = document.querySelector('#hello');
    expect($hello).toBeTruthy;
    expect($hello.innerHTML.trim()).toEqual('Hello Stranger');
  });

  test('else: should render elseif content when satisfied', () => {
    const tpl = `
<h1 id="hello">
{{if foo}}
  Hello {{= foo}}
{{elseif typeof foo === "string"}}
  Hello String
{{else}}
  Hello Stranger
{{/if}}
</h1>
    `;
    document.body.innerHTML = render(tpl, {
      foo: '',
    });
    const $hello = document.querySelector('#hello');
    expect($hello).toBeTruthy;
    expect($hello.innerHTML.trim()).toEqual('Hello String');
  });
});
