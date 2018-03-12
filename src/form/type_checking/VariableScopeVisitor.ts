///<reference path="../VariableIntformation.ts"/>
import FieldVisitor from "../nodes/visitors/FieldVisitor";
import ComputedField from "../nodes/fields/ComputedField";
import Question from "../nodes/fields/Question";
import IfCondition from "../nodes/conditions/IfCondition";
import FormNode from "../nodes/FormNode";
import { VariableScopeStack } from "./VariableScopeStack";
import FieldNode from "../nodes/fields/FieldNode";
import { FieldAlreadyDeclaredError, VariableNotInScopeError } from "../form_errors";
import { getUsedVariables } from "../form_helpers";
import Expression from "../nodes/expressions/Expression";
import { getVariableInformation, VariableInformation } from "../VariableIntformation";

export interface VariableScopeResult {
  variables: Map<string, VariableInformation>;
}

export class VariableScopeVisitor implements FieldVisitor {
  private _stack: VariableScopeStack;

  constructor() {
    this._stack = new VariableScopeStack();
  }

  visitQuestion(question: Question): any {
    this.addToStack(question);
  }

  visitComputedField(computedField: ComputedField): any {
    this.containsAllVariablesOrFail(computedField.formula);

    this.addToStack(computedField);
  }

  visitIfCondition(ifCondition: IfCondition): any {
    this.containsAllVariablesOrFail(ifCondition.predicate);

    this._stack.moveDown();
    ifCondition.then.forEach(statement => statement.accept(this));
    this._stack.moveUp();
  }

  visitForm(form: FormNode): any {
    this._stack.moveDown();
    form.statements.forEach(statement => statement.accept(this));
    this._stack.moveUp();
  }

  run(form: FormNode): VariableScopeResult {
    this.visitForm(form);

    return {
      variables: this._stack.getDeclaredVariables()
    };
  }

  private containsAllVariablesOrFail(expression: Expression) {
    const variables = getUsedVariables(expression);

    variables.forEach(identifier => {
      if (!this._stack.contains(identifier)) {
        throw VariableNotInScopeError.make(expression, identifier);
      }
    });
  }

  /**
   * Add variable to current level and history of declared variables in
   * variable stack.
   *
   * @param {FieldNode} field
   */
  private addToStack(field: FieldNode) {
    if (this._stack.wasAlreadyDeclared(field.identifier)) {
      throw (FieldAlreadyDeclaredError.make(field));
    }

    this._stack.add(getVariableInformation(field));
  }
}
