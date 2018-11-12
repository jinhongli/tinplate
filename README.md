# Tinplate

A tiny js template engine, < 1KB, just enough.

![](./assets/version.svg) ![](./assets/coverage.svg)

## Syntax

### Output

```html
<div>{{= value }}</div>
<div>{{= obj.key }}</div>
<div>{{= obj["key"] }}</div>
<div>{{= bool ? "true" : "false" }}</div>
<div>{{= value || "default" }}</div>
<div>{{= numb + 1 }}</div>
```

:warning: Use `"` when you want a string literal.

### Raw output

```html
<div>{{@ value }}</div>
```

:warning: Raw output wouldn't escape the content, this may cause security problems.

### Condition

```html
{{ if truthy }}<div>will output</div>{{ /if }}

{{ if falsy }}
  <div>will not output</div>
{{ else }}
  <div>will output</div>
{{ /if }}

{{ if falsy }}
  <div>will not output</div>
{{ elseif truthy }}
  <div>will output</div>
{{ else }}
  <div>will not output</div>
{{ /if }}
```

### Loop

```html
<ul>
{{ each array }}
  <li>{{= $key}}: {{= $value}}</li>
{{ /each }}
</ul>

<ul>
{{ each object }}
  <li>{{= $key}}: {{= $value}}</li>
{{ /each }}
</ul>
```

Support both `array` and `object` type of data. 

* `$key` is *index* in `array` and *key* in `object`;
* `$value` is *item* in `array` and *value* in `object`;

## API

### `compile(tpl)`

Compile template and return a render function.

**Parameters:**

* `{string}` `tpl` template source

**Returns:**

* `{function}` `render` render function.

**Example**

```js
const helloTpl = '<h1>Hello {{= name}}</h1>';
const helloRender = compile(helloTpl);

document.querySelector('#user1').innerHTML = helloRender({name: 'John'});

document.querySelector('#user2').innerHTML = helloRender({name: 'Duke'});
```

### `render(tpl, data)`

Compile template and return render result.

**Parameters:**

* `{string}` `tpl` template source
* `{object}` `data` template model

**Returns:**

* `{string}` `html` render result.

**Example**

```js
const helloTpl = '<h1>Hello {{= name}}</h1>';

document.querySelector('#user1').innerHTML = render(helloTpl, {name: 'John'});

document.querySelector('#user2').innerHTML = render(helloTpl, {name: 'Duke'});
```

Actually if you need render a template multiple times, please use `compile()` to cache the render function.
