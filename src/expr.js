
let ast = parser.parse(process.argv[2], {AST: AST})
let interpreter = new Interpreter()
let result = interpreter.visit(ast)
console.log("=", result)