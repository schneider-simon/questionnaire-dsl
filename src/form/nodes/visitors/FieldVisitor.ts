import Question from "../fields/Question";
import ComputedField from "../fields/ComputedField";
import IfCondition from "../conditions/IfCondition";
import FormNode from "../FormNode";

interface FieldVisitor {
  visitQuestion(question: Question): any;

  visitComputedField(computedField: ComputedField): any;

  visitIfCondition(ifCondition: IfCondition): any;

  visitForm(form: FormNode): any;
}

export default FieldVisitor;