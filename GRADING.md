# Week 2

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | None        |      0 |
| 00-test_extras | None        |      0 |
| Coding         |             |     15 |
| **TOTAL**      |             |     15 |

Out of the box, I couldn't run your code because of numerous errors in
the grammar. At the end are the changes I had to make to get a simple
`if` to compile (it didn't run, though).

Please use me when you get stuck. I'd be very happy to show you how to
diagnose and fix these problems.



diff --git a/src/grammar.pegjs b/src/grammar.pegjs
index 8c7cb57..ab3b036 100644
--- a/src/grammar.pegjs
+++ b/src/grammar.pegjs
@@ -18,13 +18,13 @@
   function variableSet(variable_name, expr) {
     return new AST.variableSet(variable_name, expr)
   }
-
-  function ifState(expr, if) {
-    return new AST.ifState(expr, if)
+
+  function ifState(expr, tif) {
+    return new AST.ifState(expr, tif)
   }
-
-  function ifState(expr, if, else) {
-    return new AST.ifElseState(expr, if, else)
+
+  function ifState(expr, tif, telse) {
+    return new AST.ifElseState(expr, tif, telse)
   }
 }

@@ -34,14 +34,14 @@ start
 code = statement+

 statement
-  = "let" __ var:variable_declaration { return var }
+  = "let" __ v:variable_declaration { return v }
   / assignment
   / expr

 //////////////////////////////// if/then/else /////////////////////////////
 if_expression
-  = expr if:brace_block "else" else:brace_block { return ifState(expr, if, else) }
-  / expr if:brace_block { return ifState(expr, if)}
+  = expr:expr tif:brace_block "else" telse:brace_block { return ifState(expr, tif, telse) }
+  / expr:expr tif:brace_block { return ifState(expr, tif)}

 //////////////// variables & variable declaration /////////////////////////////

@@ -62,7 +62,7 @@ assignment

 function_call
   = variable_value "(" ")"
-    {return return new AST.functionCall(variable_value)}
+    {return new AST.functionCall(variable_value)}

 //////////////////////// function definition /////////////////////////////

@@ -74,14 +74,14 @@ param_list
    { return "()" }

 brace_block
-  = "{" code "}"
+  = "{" code:code "}"
     { return code }

 //////////////////////////////// expression /////////////////////////////

 expr
   = "fn" _ function_definition
-  # / "if" _ if_expression
+  / "if" _ if_expression
   / boolean_expression
   / arithmetic_expression




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
