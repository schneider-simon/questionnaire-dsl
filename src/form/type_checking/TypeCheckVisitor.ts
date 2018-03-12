import Addition from "../nodes/expressions/arithmetic/Addition";
import NumberLiteral from "../nodes/literals/NumberLiteral";
import Multiplication from "../nodes/expressions/arithmetic/Multiplication";
import Or from "../nodes/expressions/boolean_expressions/Or";
import And from "../nodes/expressions/boolean_expressions/And";
import Negation from "../nodes/expressions/boolean_expressions/Negation";
import VariableIdentifier from "../nodes/expressions/VariableIdentifier";
import Division from "../nodes/expressions/arithmetic/Division";
import BooleanLiteral from "../nodes/literals/BooleanLiteral";
import Subtraction from "../nodes/expressions/arithmetic/Subtraction";
import Equals from "../nodes/expressions/comparisons/Equals";
import NotEqual from "../nodes/expressions/comparisons/NotEqual";
import LargerThan from "../nodes/expressions/comparisons/LargerThan";
import LargerThanOrEqual from "../nodes/expressions/comparisons/LargerThanOrEqual";
import SmallerThan from "../nodes/expressions/comparisons/SmallerThan";
import SmallerThanOrEqual from "../nodes/expressions/comparisons/SmallerThanOrEqual";
import StringLiteral from "../nodes/literals/StringLiteral";
import { VariablesInformation, VariableInformation } from "../VariableIntformation";
import { UnkownFieldError, TypesNotComparableError } from "../form_errors";
import { FieldType, fieldTypesSortable, getCommonNumericFieldType, isNumericFieldType } from "../FieldType";
import { assertFieldType, assertNumericFieldType } from "./type_assertions";
import BinaryOperator from "../nodes/expressions/BinaryOperator";
import NodeVisitor from "../nodes/visitors/NodeVisitor";
import FormNode from "../nodes/FormNode";
import IfCondition from "../nodes/conditions/IfCondition";
import ComputedField from "../nodes/fields/ComputedField";
import Question from "../nodes/fields/Question";
import DateLiteral from "../nodes/literals/DateLiteral";

export class TypeCheckVisitor implements NodeVisitor {
  private _variables: VariablesInformation;

  constructor(variables?: VariablesInformation) {
    if (!variables) {
      variables = new Map();
    }

    this._variables = variables;
  }

  visitForm(form: FormNode) {
    form.statements.forEach(statement => statement.accept(this));
  }

  visitIfCondition(ifCondition: IfCondition) {
    const predicateType = ifCondition.predicate.accept(this);
    return assertFieldType(predicateType, FieldType.Boolean);
  }

  visitComputedField(computedField: ComputedField) {
    const formulaType = computedField.formula.accept(this);
    return assertFieldType(formulaType, computedField.type);
  }

  visitQuestion(question: Question) {
    return question.type;
  }

  visitAddition(addition: Addition): any {
    return this.visitNumericOperator(addition);
  }

  visitNumberLiteral(literal: NumberLiteral): any {
    // TODO: Replace this simple integer check with solution in parser, differentiate between 10 and 10.0
    // TODO: Allow money and date literal
    if (Math.round(literal.getValue()) === literal.getValue()) {
      return FieldType.Integer;
    }

    return FieldType.Float;
  }

  visitMultiplication(multiplication: Multiplication): any {
    return this.visitNumericOperator(multiplication);
  }

  visitOr(or: Or): any {
    return this.visitBooleanOperator(or);
  }

  visitAnd(and: And): any {
    return this.visitBooleanOperator(and);
  }

  visitNegation(negation: Negation): any {
    return assertFieldType(negation.expression.accept(this), FieldType.Boolean);
  }

  visitVariableIdentifier(variable: VariableIdentifier): any {
    const variableInformation: VariableInformation | undefined = this._variables.get(variable.identifier);

    if (!variableInformation) {
      throw UnkownFieldError.make(variable.identifier);
    }

    return variableInformation.type;
  }

  visitDivision(division: Division): any {
    const leftType = assertNumericFieldType(division.left.accept(this));
    const rightType = assertNumericFieldType(division.right.accept(this));

    if (leftType === FieldType.Money && rightType === FieldType.Money) {
      return FieldType.Float;
    }

    return getCommonNumericFieldType(leftType, rightType);
  }

  visitBooleanLiteral(literal: BooleanLiteral): any {
    return FieldType.Boolean;
  }

  visitSubtraction(subtraction: Subtraction): any {
    return this.visitNumericOperator(subtraction);
  }

  visitEquals(equals: Equals): any {
    return this.visitEqualOperator(equals);
  }

  visitNotEqual(notEquals: NotEqual): any {
    return this.visitEqualOperator(notEquals);
  }

  visitLargerThan(largerThan: LargerThan): any {
    return this.visitCompareOperator(largerThan);
  }

  visitLargerThanOrEqual(largerThanOrEqual: LargerThanOrEqual): any {
    return this.visitCompareOperator(largerThanOrEqual);
  }

  visitSmallerThan(smallerThan: SmallerThan): any {
    return this.visitCompareOperator(smallerThan);
  }

  visitSmallerThanOrEqual(smallerThanOrEqual: SmallerThanOrEqual): any {
    return this.visitCompareOperator(smallerThanOrEqual);
  }

  visitStringLiteral(stringLiteral: StringLiteral): any {
    return FieldType.Text;
  }

  visitDateLiteral(dateLiteral: DateLiteral): any {
    return FieldType.Date;
  }

  private visitBooleanOperator(operator: BinaryOperator): FieldType {
    assertFieldType(operator.left.accept(this), FieldType.Boolean);
    assertFieldType(operator.right.accept(this), FieldType.Boolean);
    return FieldType.Boolean;
  }

  private visitNumericOperator(operator: BinaryOperator): FieldType {
    const leftType = assertNumericFieldType(operator.left.accept(this));
    const rightType = assertNumericFieldType(operator.right.accept(this));

    return getCommonNumericFieldType(leftType, rightType);
  }

  private visitEqualOperator(operator: BinaryOperator) {
    const leftType = operator.left.accept(this);
    const rightType = operator.right.accept(this);

    if (isNumericFieldType(leftType) || isNumericFieldType(rightType)) {
      const commonType = getCommonNumericFieldType(leftType, rightType);

      if (!isNumericFieldType(commonType)) {
        throw TypesNotComparableError.make(leftType.toString(), rightType.toString());
      }

      return FieldType.Boolean;
    }

    assertFieldType(leftType, rightType);

    return FieldType.Boolean;
  }

  private visitCompareOperator(operator: BinaryOperator) {
    const leftType = operator.left.accept(this);
    const rightType = operator.right.accept(this);

    if (!fieldTypesSortable(leftType, rightType)) {
      throw TypesNotComparableError.make(leftType.toString(), rightType.toString());
    }

    return FieldType.Boolean;
  }
}
