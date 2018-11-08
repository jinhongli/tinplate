# Tinyplate

A tiny template engine, less than 1KB, just enough.

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

⚠ Use `"` when you want a string literal.

### Raw output

```html
<div>{{@ value }}</div>
```

⚠ Raw output wouldn't escape the content, this may cause security problems.

### Condition

```html
{{ if truthy }}<div>will output</div>{{/if}}

{{ if falsy }}
  <div>will not output</div>
{{else}}
  <div>will output</div>
{{/if}}

{{ if falsy }}
  <div>will not output</div>
{{elseif truthy}}
  <div>will output</div>
{{else}}
  <div>will not output</div>
{{/if}}
```

### Loop

```html
<ul>
{{ each array }}
  <li>{{= $key}}: {{= $value}}</li>
{{/each}}
</ul>

<ul>
{{ each object }}
  <li>{{= $key}}: {{= $value}}</li>
{{/each}}
</ul>
```

Support both `array` and `object` type of data. 

* `$key` is *index* in `array` and *key* in `object`;
* `$value` is *item* in `array` and *value* in `object`;