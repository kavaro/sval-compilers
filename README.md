# SVal-compilers

A number of wrappers around the sval interpreter

# createJSCompiler

Used to execute javascript code and/or a javascript expression

```js
const compile = createJSCompiler(svalOptions)
/*
compileOptions:
  scope: compileScope,      // object: compile time scope for javascript code and expression
  onError: onCompileError,  // function(err): function to execute when compile error occurs  
  code,                     // string: javascript code                
  expression                // string: javascript expression to return
*/
const run = compile(compileOptions)
/*
  scope: runScope,        // object: runtime scope for javascript code and expression
  onError: onRunError,    // function(err): function to execute when runtime error occurs
  expressionExportKey = '_EXPRESSION_EXPORT_KEY_' // string: name of the identifier used to export expression
*/
const result = run(runOptions)
```

# createInterpolationCompiler

Used to compile an (tagged) template string

```js
const compile = createInterpolationCompiler(createJSCompiler())
const run = compile({ string: 'Title: ${upperCase(title)}', scope: { upperCase: s => s.toUpperCase() } })
expect(run({ scope: { title: 'Hello World' } })).toBe('Title: HELLO WORLD')
```

# createIteratorCompiler

Used compile a (item, index, list) => function that can be used in map, filter, etc

```js
const compile = createIteratorCompiler(createJSCompiler())
/*
  item = 'item',   // scope key for item
  index = 'index', // scope key for index
  list = 'list',   // scope key for list
  odd = 'odd',     // scope key for odd
  even = 'even',   // scope key for even
  onRunError,      // what to do when a runtime error occurs
  expressionExportKey, // exports key for expression
  ...compileOptions // options passed to compile function
*/
const fn = compile({ 
  expression: 'id === 1 || list[index].id === 3 || (index > 4 && index < 7 && odd) || (index > 7 && even)' 
})
const docs = []
for (let i = 0; i < 10; i++) {
  docs.push({ id: i })
}
expect(docs.filter(fn)).toEqual([
  { id: 1 },
  { id: 3 },
  { id: 5 },
  { id: 8 }
])
```

## createSortCompiler

Used to compile a sort function

```js
/*
compare: function(a, b) return 1 when a > b, -1 when a < b and 0 when a is equal to b
*/
const compile = createSortCompiler(createJSCompiler(), compare)
/*
field = 'id' field to sort on
dir = 1,     >= 0 is sort from low to high, < 0 is sort from high to low
expression   optional, when string or function used to transform every value before comparing
...compileOptions options passed to compile function
*/
const fn = compile({field: 'id', dir: 1, expression: 'parseInt(id.slice(1))' })
const items = []
for (let i = 0; i < 11; i++) items.push({ id: `p${i}` })
expect(items.sort(fn)).toEqual([
  { id: 'p0' },
  { id: 'p1' },
  { id: 'p2' },
  { id: 'p3' },
  { id: 'p4' },
  { id: 'p5' },
  { id: 'p6' },
  { id: 'p7' },
  { id: 'p8' },
  { id: 'p9' },
  { id: 'p10' }
])
```

## createQueryCompiler

Used to compile a query, combines all previous compilers

```js
const compileJS = createJSCompiler()
const compile = createQueryCompiler(createIteratorCompiler(compileJS), createSortCompiler(compileJS, compare))
const query = compile({
  filter: {
    expression: 'even'
  },
  sort: {
    field: 'id',
    dir: -1,
    expression: item => parseInt(item.id.slice(1))
  }
})
const list = []
for (let i = 0; i < 500; i++) {
  list.push({ id: `p${i}` })
}
let l = list.length - 1
if (l % 2 === 1) l--
expect(query(list, { skip: 2, limit: 4 })).toEqual([
  list[l - 4],
  list[l - 6],
  list[l - 8],
  list[l - 10]
])
```