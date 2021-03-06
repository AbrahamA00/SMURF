calculator = arithmetic_expression

arithmetic_expression
    = head:mult_term rest:(addop arithmetic_expression)*
        {
            return rest.reduce(
                (result, [op, _, right]) => {
                    if(op == "+") {
                        return result + right
                    }
                    else {
                        return result - right
                    }
                },
                head
            )
        }

mult_term
    = head: primary "*" rest:mult_term
    {
        return rest.reduce(
            (result, [op, _, right]) => {
                    if(op == "*") {
                        return result * right
                    }
                    else {
                        return result / right
                    }
                },
            head
        )
    }

primary
    = "(" _ axp:arithmetic_expression _ ")" 
        { return axp; }
    / integer

integer
    = digits

digits
    = _ [0-9]+ 
        { return parseInt(text(), 10); }

addop
    = "+" / "-"

mulop
    = "*" / "/"

_ "whitespace"
  = [ \t\n\r]*




  ?????

  Attempt 2

 

arithmetic_expression
    = head:mult_term rest:(addop arithmetic_expression)*
        {
            return rest.reduce(
                (result, [op, right]) => 
                  new AST.BinOp(result, op, right),
                head
            )
        }
mult_term
    = head:primary rest:(mulop mult_term)*
    {
        return rest.reduce(
            (result, [op, right]) => 
            new AST.BinOp(result, op, right),
            head
            )
    }


primary
  = "(" _ axp:arithmetic_expression _ ")" 
  		{ return axp; } 
   / integer

integer 
	= digits
    / "-" digits { return parseInt(text(), 10); }
    
digits
    = [0-9]+ 
        { return parseInt(text(), 10); }

addop
    = "+" / "-"

mulop
    = "*" / "/"
    
_ "whitespace"
  = [ \t\n\r]*
