export class BinOp {
  constructor(l, op, r) {
    this.left  = l
    this.op    = op
    this.right = r
  }
  accept(visitor) {
    return visitor.BinOp(this)
  }
}

export class BoolOp {
  constructor(l, op, r) {
    this.left  = l
    this.op    = op
    this.right = r
  }
  accept(visitor) {
    return visitor.BoolOp(this)
  }
}

export class IntegerValue {
  constructor(value) {
    this.value = value
  }

  accept(visitor) {
    return visitor.IntegerValue(this)
  }
}

export class functionCall {
  constructor(value) {
    this.value = value
  }
  accept(visitor) {
    return visitor.functionCall(this)
  }
}

export class variableSet {
  constructor(varname, varval) {
    this.name = varname
    this.val = varval
  }
  accept(visitor) {
    return visitor.variableSet(this)
  }
}

export class ifState {
  constructor(bool, iffy) {
      this.bool = bool
      this.iffy = iffy
  }
  accept(visitor) {
    return visitor.ifState(this)
  }
}

export class ifElseState {
  constructor(bool, iffy, elsey) {
      this.bool = bool
      this.iffy = iffy
      this.elsey = elsey
  }
  accept(visitor) {
    return visitor.ifElseState(this)
  }
}