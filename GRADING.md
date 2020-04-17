# Week 1

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | Five passed |     12 |
| 00-test_extras | None        |      0 |
| Coding         |             |     15 |
| **TOTAL**      |             |     27 |


Unfortunately, I couldn't run any tests: the code in compiler.js was
wrong. I fixed it to

~~~ js
export default function compileAndRun(grammar, script, printFunction) {
  let print = grammar.parse(script)
  return print
}
~~~

At this point, I got five tests passing, which I gave you credit for.

The grammar doesn't deal with expressions, because the rules are
incorrect.

~~~ js
    = head:mult_term rest:(addop arithmetic_expression)*
~~~

should be

~~~ js
    = head:mult_term rest:(addop mult_term)*
~~~

(otherwise you build a tree, and not a list of operations).

Even fixing this, the constant AST is not defined in the grammar, so the
tree cannot be built.
