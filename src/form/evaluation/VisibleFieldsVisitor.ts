import IfCondition from "../nodes/conditions/IfCondition";
import FormNode from "../nodes/FormNode";
import ComputedField from "../nodes/fields/ComputedField";
import Question from "../nodes/fields/Question";
import FormState from "../state/FormState";
import FieldVisitor from "../nodes/visitors/FieldVisitor";
import Form from "../Form";

export default class VisibleFieldsVisitor implements FieldVisitor {
  private _visibleFields: Set<string> = new Set();
  private readonly _state: FormState;

  static run(form: Form): Set<String> {
    const visitor = new VisibleFieldsVisitor(form.getState());
    return form.accept(visitor);
  }

  constructor(state: FormState) {
    this._state = state;
  }

  visitIfCondition(ifCondition: IfCondition): any {
    if (ifCondition.fails(this._state)) {
      return;
    }

    ifCondition.then.forEach((statement) => statement.accept(this));
    return this._visibleFields;
  }

  visitQuestion(question: Question): any {
    this._visibleFields.add(question.identifier);
    return this._visibleFields;
  }

  visitComputedField(computedField: ComputedField): any {
    this._visibleFields.add(computedField.identifier);
    return this._visibleFields;
  }

  visitForm(form: FormNode): any {
    form.statements.forEach(statement => statement.accept(this));
    return this._visibleFields;
  }
}