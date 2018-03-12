import ExpressionVisitor from "../visitors/ExpressionVisitor";
import Expression from "../expressions/Expression";
import AbstractTreeNode from "../AbstractTreeNode";
import * as moment from "moment";
import { Moment } from "moment";
import { ValueIsInvalidDateError } from "../../form_errors";
import constants from "../../../config/constants";

export default class DateLiteral extends AbstractTreeNode implements Expression {
  private value: Moment;

  static fromString(value: string) {
    const date = moment(value, constants.DEFAULT_DATE_FORMAT);

    if (!date.isValid()) {
      throw ValueIsInvalidDateError.make(value);
    }

    return new DateLiteral(date);
  }

  constructor(value: Moment) {
    super();
    this.value = value;
  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitDateLiteral(this);
  }

  getValue(): Moment {
    return this.value;
  }
}