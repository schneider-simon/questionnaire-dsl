import { FieldType } from "../../FieldType";
import Field from "./FieldNode";
import FormState from "../../state/FormState";
import FieldVisitor from "../visitors/FieldVisitor";
import AbstractTreeNode from "../AbstractTreeNode";

export default class Question extends AbstractTreeNode implements Field {
  readonly label: string;
  readonly identifier: string;
  readonly type: FieldType;

  /**
   * Creates a question that lets the user input an answer.
   *
   * @param {string} identifier
   * @param {string} label
   * @param {FieldType} type
   */
  constructor(identifier: string, label: string, type: FieldType) {
    super();
    this.label = label;
    this.identifier = identifier;
    this.type = type;
  }

  accept(visitor: FieldVisitor): any {
    return visitor.visitQuestion(this);
  }

  isReadOnly(): boolean {
    return false;
  }

  computeAnswer(state: FormState) {
    return state.get(this.identifier);
  }
}