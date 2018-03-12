import NodeVisitor from "./NodeVisitor";
import Question from "../fields/Question";
import ComputedField from "../fields/ComputedField";
import IfCondition from "../conditions/IfCondition";
import FormNode from "../FormNode";
import Addition from "../expressions/arithmetic/Addition";
import NumberLiteral from "../literals/NumberLiteral";
import Multiplication from "../expressions/arithmetic/Multiplication";
import Or from "../expressions/boolean_expressions/Or";
import And from "../expressions/boolean_expressions/And";
import Negation from "../expressions/boolean_expressions/Negation";
import VariableIdentifier from "../expressions/VariableIdentifier";
import Division from "../expressions/arithmetic/Division";
import BooleanLiteral from "../literals/BooleanLiteral";
import Subtraction from "../expressions/arithmetic/Subtraction";
import Equals from "../expressions/comparisons/Equals";
import NotEqual from "../expressions/comparisons/NotEqual";
import LargerThan from "../expressions/comparisons/LargerThan";
import LargerThanOrEqual from "../expressions/comparisons/LargerThanOrEqual";
import SmallerThan from "../expressions/comparisons/SmallerThan";
import SmallerThanOrEqual from "../expressions/comparisons/SmallerThanOrEqual";
import StringLiteral from "../literals/StringLiteral";
import BinaryOperator from "../expressions/BinaryOperator";
import VisitorCallback from "./VisitorCallback";
import TreeNode from "../TreeNode";
import Statement from "../Statement";
import DateLiteral from "../literals/DateLiteral";

export default class NodeTraveller implements NodeVisitor {
  private post: VisitorCallback;
  private pre: VisitorCallback;

  constructor(pre?: VisitorCallback, post?: VisitorCallback) {
    if (!pre) {
      pre = () => null;
    }

    if (!post) {
      post = () => null;
    }

    this.pre = pre;
    this.post = post;
  }

  visitBinaryOperator(operator: BinaryOperator): any {
    this.pre(operator);
    operator.left.accept(this);
    operator.right.accept(this);
    this.post(operator);
  }

  visitPreAndPost(node: TreeNode): any {
    this.pre(node);
    this.post(node);
  }

  visitQuestion(question: Question): any {
    this.visitPreAndPost(question);
  }

  visitComputedField(computedField: ComputedField): any {
    this.visitPreAndPost(computedField);
  }

  visitIfCondition(ifCondition: IfCondition): any {
    this.pre(ifCondition);
    ifCondition.predicate.accept(this);
    ifCondition.then.forEach((statement: Statement) => {
      statement.accept(this);
    });
    this.post(ifCondition);
  }

  visitForm(form: FormNode): any {
    this.pre(form);

    form.statements.forEach((statement: Statement) => {
      statement.accept(this);
    });

    this.post(form);
  }

  visitAddition(addition: Addition): any {
    return this.visitBinaryOperator(addition);
  }

  visitNumberLiteral(literal: NumberLiteral): any {
    return this.visitPreAndPost(literal);
  }

  visitMultiplication(multiplication: Multiplication): any {
    return this.visitBinaryOperator(multiplication);
  }

  visitOr(or: Or): any {
    return this.visitBinaryOperator(or);
  }

  visitAnd(and: And): any {
    return this.visitBinaryOperator(and);
  }

  visitNegation(negation: Negation): any {
    this.pre(negation);
    negation.expression.accept(this);
    this.post(negation);
  }

  visitVariableIdentifier(variable: VariableIdentifier): any {
    return this.visitPreAndPost(variable);
  }

  visitDivision(division: Division): any {
    return this.visitBinaryOperator(division);
  }

  visitBooleanLiteral(literal: BooleanLiteral): any {
    return this.visitPreAndPost(literal);
  }

  visitSubtraction(subtraction: Subtraction): any {
    return this.visitBinaryOperator(subtraction);
  }

  visitEquals(equals: Equals): any {
    return this.visitBinaryOperator(equals);
  }

  visitNotEqual(notEquals: NotEqual): any {
    return this.visitBinaryOperator(notEquals);
  }

  visitLargerThan(largerThan: LargerThan): any {
    return this.visitBinaryOperator(largerThan);
  }

  visitLargerThanOrEqual(largerThanOrEqual: LargerThanOrEqual): any {
    return this.visitBinaryOperator(largerThanOrEqual);
  }

  visitSmallerThan(smallerThan: SmallerThan): any {
    return this.visitBinaryOperator(smallerThan);
  }

  visitSmallerThanOrEqual(smallerThanOrEqual: SmallerThanOrEqual): any {
    return this.visitBinaryOperator(smallerThanOrEqual);
  }

  visitStringLiteral(stringLiteral: StringLiteral): any {
    return this.visitPreAndPost(stringLiteral);
  }

  visitDateLiteral(dateLiteral: DateLiteral): any {
    return this.visitPreAndPost(dateLiteral);
  }

}