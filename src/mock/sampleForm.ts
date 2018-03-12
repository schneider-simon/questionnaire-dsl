import Form from "../form/Form";
import { FieldType } from "../form/FieldType";
import FormNode from "../form/nodes/FormNode";
import Question from "../form/nodes/fields/Question";
import IfCondition from "../form/nodes/conditions/IfCondition";
import VariableIdentifier from "../form/nodes/expressions/VariableIdentifier";
import ComputedField from "../form/nodes/fields/ComputedField";
import Subtraction from "../form/nodes/expressions/arithmetic/Subtraction";
import QuestionForm from "../form/QuestionForm";
import FormState from "../form/state/FormState";

/*
 Bases on example form given by professor:

 form Box1HouseOwning {
  hasSoldHouse: “Did you sell a house in 2010?” boolean
  hasBoughtHouse: “Did you by a house in 2010?” boolean
  hasMaintLoan: “Did you enter a loan for maintenance/reconstruction?”
  boolean
  if (hasSoldHouse) {
  sellingPrice: “Price the house was sold for:” money
  privateDebt: “Private debts for the sold house:” money
  valueResidue: “Value residue:” money(sellingPrice - privateDebt)
  }
  }
 */

const formNode: FormNode = new FormNode("Box1HouseOwning", [
  new Question("hasSoldHouse", "Did you sell a house in 2010?", FieldType.Boolean),
  new Question("hasBoughtHouse", "Did you by a house in 2010?", FieldType.Boolean),
  new Question("hasMaintLoan", "Did you enter a loan for maintenance/reconstruction?", FieldType.Boolean),
  new IfCondition(new VariableIdentifier("hasSoldHouse"), [
    new Question("sellingPrice", "Price the house was sold for:", FieldType.Money),
    new Question("privateDebt", "Private debts for the sold house:", FieldType.Money),
    new ComputedField(
        "valueResidue",
        "Value residue:", FieldType.Money,
        new Subtraction(new VariableIdentifier("sellingPrice"), new VariableIdentifier("privateDebt")
        )
    ),
  ]),
]);

export const sampleForm: Form = new QuestionForm(formNode, new FormState(new Map()));