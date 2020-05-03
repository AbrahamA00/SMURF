export default class Binding {
  constructor(parent = null) {
    this.binding = new Map()
    this.parent = parent
  }

  push() {
    return new Binding(this)
  }

  pop() {
    return this.parentbinding.binding
  }

  getVariableValue(name) {
    this.checkVariableExists(name)
    if(this.binding.has(name))
      return this.binding.get(name)
    else
      return this.parent.binding.get(name)
  }


  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`Duplicate declaration for variable ${name}`)
    this.binding.set(name, value)
  }

  updateVariable(name, value) {
    this.checkVariableExists(name)
    if(this.binding.has(name))
      this.binding.set(name, value)
    else
      this.parent.binding.set(name,value)
  }

  checkVariableExists(name) {
    if (!this.binding.has(name) && !this.parent.binding.has(name))
      throw new Error(`Reference to unknown variable ${name}`)
  }
}