
export default class Interpreter {
    visit(node) {
        return node.accept(this)
    }

    visitBinOp(node) {
        let left = node.left.accept(this)
        let right = node.right.accept(this)
        switch (node.op) {
            case "+":
                return left + right
            case "-":
                return left - right
            case "*":
                return left * right
            case "/":
                return left / right
        }
    }

    visitInteger(node) {
        return node.value
    }
}

function makeNode(name, ...attributes) {
    const constructor = function(...args) {
        attributes.forEach((att,i) =>{
            this[att] =args[i]
        })
    }
    this.accept = visitor => {
        visitor["visit" + name](this)
    }

    Object.defineProperty(constructor, "name",{value:name})
    {
        return constructor
    }
}