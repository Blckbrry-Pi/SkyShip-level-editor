export class Param {
  constructor(name, paramEditFunc) {
    this.name = name;
    this.paramEditFunc = paramEditFunc;
  }

  editParam(obj2Edit) {
    this.paramEditFunc(obj2Edit);
  }
}