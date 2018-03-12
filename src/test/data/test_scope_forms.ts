import FormNode from "../../form/nodes/FormNode";
import IfCondition from "../../form/nodes/conditions/IfCondition";
import BooleanLiteral from "../../form/nodes/literals/BooleanLiteral";
import Question from "../../form/nodes/fields/Question";
import { FieldType } from "../../form/FieldType";
import VariableIdentifier from "../../form/nodes/expressions/VariableIdentifier";
import ComputedField from "../../form/nodes/fields/ComputedField";

export const nestedForm = new FormNode("nestedForm", [
  new IfCondition(new BooleanLiteral(true), [
    new Question("a", "A", FieldType.Boolean),
    new Question("b", "B", FieldType.Boolean),
    new IfCondition(new VariableIdentifier("a"), [
      new Question("c", "C", FieldType.Boolean),
      new Question("d", "D", FieldType.Boolean),
      new IfCondition(new VariableIdentifier("c"), [
        new Question("x", "X", FieldType.Boolean),
        new Question("y", "Y", FieldType.Boolean)
      ]),
      new Question("e", "E", FieldType.Boolean),
    ])
  ]),
  new Question("f", "F", FieldType.Boolean),
  new Question("g", "G", FieldType.Boolean),
]);

export const nestedFormScopeFlawed1 = new FormNode("nestedFormScopeFlawed1", [
  new Question("a", "A", FieldType.Boolean),
  new IfCondition(new VariableIdentifier("b"), [
    new Question("x", "X", FieldType.Boolean)
  ]),
  new Question("b", "B", FieldType.Boolean),
]);

export const nestedFormScopeFlawed2 = new FormNode("nestedFormScopeFlawed2", [
  new Question("a", "A", FieldType.Boolean),
  new IfCondition(new VariableIdentifier("x"), [
    new Question("x", "X", FieldType.Boolean)
  ]),
  new Question("b", "B", FieldType.Boolean),
]);

export const nestedFormScopeFlawed3 = new FormNode("nestedFormScopeFlawed3", [
  new IfCondition(new BooleanLiteral(true), [
    new Question("a", "A", FieldType.Boolean)
  ]),
  new ComputedField("x", "X", FieldType.Boolean, new VariableIdentifier("a")),
  new Question("b", "B", FieldType.Boolean),
]);

export const nestedFormFieldDeclaredTwice = new FormNode("nestedFormFieldDeclaredTwice", [
  new IfCondition(new BooleanLiteral(true), [
    new Question("a", "A", FieldType.Boolean)
  ]),
  new Question("a", "A", FieldType.Boolean),
  new Question("b", "B", FieldType.Boolean)
]);