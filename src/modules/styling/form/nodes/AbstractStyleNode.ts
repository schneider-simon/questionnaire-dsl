import StyleTreeNode from "./StyleTreeNode";
import StyleNodeVisitor from "../visitors/StyleNodeVisitor";

export default abstract class AbstractStyleNode implements StyleTreeNode {
  private parent: StyleTreeNode;

  getParent(): StyleTreeNode | null {
    return this.parent;
  }

  setParent(parent: StyleTreeNode): void {
    this.parent = parent;
  }

  abstract accept(visitor: StyleNodeVisitor);

}