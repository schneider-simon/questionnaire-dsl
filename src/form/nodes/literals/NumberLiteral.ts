import ExpressionVisitor from "../visitors/ExpressionVisitor";
import Expression from "../expressions/Expression";
import { FieldType } from "../../FieldType";
import { ValueIsNaNError } from "../../form_errors";
import AbstractTreeNode from "../AbstractTreeNode";

export default class NumberLiteral extends AbstractTreeNode implements Expression {
  private type: FieldType;
  private value: number;

  static fromString(text: string) {
    if (Number.isNaN(Number(text))) {
      throw ValueIsNaNError.make(text);
    }

    let type: FieldType = FieldType.Float;
    let value: number = parseFloat(text);

    if (text.indexOf('.') === -1) {
      type = FieldType.Integer;
      value = parseInt(text, 10);
    }

    return new NumberLiteral(value, type);
  }

  constructor(value: number, type?: FieldType) {
    super();

    if (!type) {
      type = FieldType.Float;
    }

    this.value = value;
    this.type = type;
  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitNumberLiteral(this);
  }

  getValue() {
    return this.value;
  }

}