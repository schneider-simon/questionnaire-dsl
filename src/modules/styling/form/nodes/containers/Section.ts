import AbstractStyleNode from "../AbstractStyleNode";
import PageChild from "../children/PageChild";
import SectionChild from "../children/SectionChild";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";

export default class Section extends AbstractStyleNode implements PageChild {
  readonly body: SectionChild[];
  readonly name: string;

  constructor(name: string, body: SectionChild[]) {
    super();
    this.name = name;
    this.body = body;
  }

  accept(visitor: StyleNodeVisitor) {
    return visitor.visitSection(this);
  }
}