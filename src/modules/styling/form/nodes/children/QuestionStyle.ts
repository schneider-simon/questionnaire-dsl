import AbstractStyleNode from "../AbstractStyleNode";
import SectionChild from "./SectionChild";
import PageChild from "./PageChild";
import StyleAttribute from "../StyleAttribute";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";

export default class QuestionStyle extends AbstractStyleNode implements SectionChild, PageChild {
  readonly identifier: string;
  readonly children: StyleAttribute[];

  constructor(identifier: string, children: StyleAttribute[]) {
    super();
    this.identifier = identifier;
    this.children = children;
  }

  accept(visitor: StyleNodeVisitor) {
    return visitor.visitQuestionStyle(this);
  }
}