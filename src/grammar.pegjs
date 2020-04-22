{
  const AST = options.AST

  function rollupBinOp(head, rest) {
    return rest.reduce(
      (result, [op, right]) => new AST.BinOp(result, op, right),
      head
    )
  }

  function rollupBoolOp(head, rest) {
    return rest.reduce(
      (result, [op, right]) => new AST.BoolOp(result, op, right),
      head
    )
  }

  function variableSet(variable_name, expr) {
    return new AST.variableSet(variable_name, expr)
  }
  
  function ifState(expr, if) {
    return new AST.ifState(expr, if)
  }
  
  function ifState(expr, if, else) {
    return new AST.ifElseState(expr, if, else)
  }
}

start
  = code

code = statement+

statement
  = "let" __ var:variable_declaration { return var }
  / assignment
  / expr

//////////////////////////////// if/then/else /////////////////////////////
if_expression
  = expr if:brace_block "else" else:brace_block { return ifState(expr, if, else) }
  / expr if:brace_block { return ifState(expr, if)}

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = variable_name "=" expr { return variableSet(variable_name, expr) }
  / variable_name { return variable_name }

variable_value             // as rvalue
  =  identifier

variable_name              // as lvalue
  =  identifier

assignment
  = variable_name "=" expr { return variableSet(variable_name, expr) }

//////////////////////////////// function call /////////////////////////////

function_call
  = variable_value "(" ")"
    {return return new AST.functionCall(variable_value)}

//////////////////////// function definition /////////////////////////////

function_definition
  = param_list brace_block

param_list
   = "(" ")"
   { return "()" }

brace_block
  = "{" code "}"
    { return code }

//////////////////////////////// expression /////////////////////////////

expr
  = "fn" _ function_definition
  # / "if" _ if_expression 
  / boolean_expression
  / arithmetic_expression

/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = head:arithmetic_expression rest:(relop arithmetic_expression)*
    { return rollupBoolOp(head, rest) }


//////////////////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = head:mult_term rest:(addop mult_term)*
    { return rollupBinOp(head, rest) }

mult_term
  = head:primary rest:(mulop primary)*
    { return rollupBinOp(head, rest) }

primary
  = integer
  / _ "(" _ expr:arithmetic_expression _ ")" _
    { return expr }


integer
  = _ number: digits _
    { return new AST.IntegerValue(number) }

addop
  = _ op:[-+] _
    { return op }

mulop
  = _ op:[*/] _
    { return op }


relop
  = _ op:['==''!=''>=''>''<=''<'] _
    { return op }


/////////////////////// utility NTs //////////////////////////////

eol "end-of-line" = [\n\r\u2028\u2029]
ws "whitespace"   = [ \t] / eol
comment           = "#" (!eol .)*
_                 = ( ws / comment )*
__                = ( ws / comment )+

identifier        = id:([a-z][a-zA-Z_0-9]*)
                    { return text() }

digits            = [-+]? [0-9]+
                    { return parseInt(text(), 10) }