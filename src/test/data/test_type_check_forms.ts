import FormNode from "../../form/nodes/FormNode";
import IfCondition from "../../form/nodes/conditions/IfCondition";
import BooleanLiteral from "../../form/nodes/literals/BooleanLiteral";
import Question from "../../form/nodes/fields/Question";
import { FieldType } from "../../form/FieldType";
import NumberLiteral from "../../form/nodes/literals/NumberLiteral";

export const validForm = new FormNode("validForm", [
  new IfCondition(new BooleanLiteral(true), [
    new Question("a", "A", FieldType.Boolean)
  ])
]);

export const numberInIfPredicateForm = new FormNode("numberInIfForm", [
  new IfCondition(new NumberLiteral(4), [
    new Question("a", "A", FieldType.Boolean)
  ])
]);