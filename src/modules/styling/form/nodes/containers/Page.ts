import AbstractStyleNode from "../AbstractStyleNode";
import FormChild from "../children/StyleSheetChild";
import PageChild from "../children/PageChild";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";

export default class Page extends AbstractStyleNode implements FormChild {
  readonly body: PageChild[];
  readonly name: string;

  constructor(name: string, body: PageChild[]) {
    super();
    this.name = name;
    this.body = body;
  }

  accept(visitor: StyleNodeVisitor) {
    return visitor.visitPageAttribute(this);
  }
}