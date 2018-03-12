import ExpressionVisitor from "../visitors/ExpressionVisitor";
import Expression from "../expressions/Expression";
import AbstractTreeNode from "../AbstractTreeNode";

export default class BooleanLiteral extends AbstractTreeNode implements Expression {
  private value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitBooleanLiteral(this);
  }

  getValue() {
    return this.value;
  }
}