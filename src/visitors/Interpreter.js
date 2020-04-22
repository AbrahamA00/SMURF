const Operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),
}

const Booleans = {
  '==': (l, r) => l == r,
  '!=': (l, r) => l != r,
  '>=': (l, r) => l >= r,
  '>': (l, r) => l > r,
  '<=': (l, r) => l <= r,
  '<': (l, r) => l <r,
}

const Variables = {

}


export default class Interpreter {

  constructor(target, printFunction) {
    this.target = target
    this.printFunction = printFunction
  }

  visit() {
    return this.target.accept(this)
  }

  BinOp(node) {
    let l = node.left.accept(this)
    let r = node.right.accept(this)
    return Operations[node.op](l, r)
  }

  BoolOp(node) {
    let l = node.left.accept(this)
    let r = node.right.accept(this)
    return Booleans[node.op](l,r)
  }

  IntegerValue(node) {
    return node.value
  }

  functionCall(node) {
    return node.value
  }

  variableSet(node) {
    let name = node.name.accept(this)
    let val = node.val.accept(this)
    Variables.push(name, val)
  }

  ifState(node) {
    let bool = node.bool.accept(this)
    let iffy = node.iffy.accept(this)
    if(bool)
      return iffy
  }

  ifElseState(node) {
    let bool = node.bool.accept(this)
    let iffy = node.iffy.accept(this)
    let elsey = node.elsey.accept(this)
    if(bool)
      return iffy
    else 
      return elsey
  }
}