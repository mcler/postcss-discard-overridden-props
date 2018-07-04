# postcss-discard-overridden-rules
PostCSS plugin, which discards overridden properties in every CSS rule.

## Example
### Input

```css
.rule1 {
  color: red;
  display: block;
  display: inline;
}

.rule2 {
  color: green;
  display: block !important;
  display: inline;
}

.rule3 {
  color: blue;
  display: block;
  display: inline !important;
}

@media (max-width: 120px) {
  .rule4 {
    color: blue;
    display: block;
    display: inline !important;
  }
}
```

### Output

```css
.rule1 {
  color: red;
  display: inline;
}

.rule2 {
  color: green;
  display: block !important;
}

.rule3 {
  color: blue;
  display: inline !important;
}

@media (max-width: 120px) {
  .rule4 {
    color: blue;
    display: inline !important;
  }
}
```

## Options
* `log` (default: `false`) a logging flag.
* `noDelete` (default: `false`) a flag whether found overridden properties will be deleted (works only with `log` set to `true`).
* `ignorePrefix` (default: `false`) a flag whether plugin ignores prefixed properties and values.
* `props` (default: `false`) an array of string with properies allowed to proccess by plugin.
