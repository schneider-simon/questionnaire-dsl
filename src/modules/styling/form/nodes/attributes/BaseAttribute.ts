import AbstractStyleNode from "../AbstractStyleNode";
import StyleAttribute from "../StyleAttribute";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";

export default class BaseAttribute extends AbstractStyleNode implements StyleAttribute {
  readonly name: string;
  readonly value: string;

  constructor(name: string, value: string) {
    super();
    this.name = name;
    this.value = value;
  }

  accept(visitor: StyleNodeVisitor): any {
    return visitor.visitBaseAttribute(this);
  }
}