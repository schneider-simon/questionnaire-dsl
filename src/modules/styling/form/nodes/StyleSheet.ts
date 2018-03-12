import AbstractStyleNode from "./AbstractStyleNode";
import StyleSheetChild from "./children/StyleSheetChild";
import StyleNodeVisitor from "../visitors/StyleNodeVisitor";

export default class Stylesheet extends AbstractStyleNode {
  readonly name: string;
  readonly children: StyleSheetChild[];

  constructor(name: string, children: StyleSheetChild[]) {
    super();
    this.name = name;
    this.children = children;
  }

  accept(visitor: StyleNodeVisitor): any {
    return visitor.visitStyleSheet(this);
  }
}
