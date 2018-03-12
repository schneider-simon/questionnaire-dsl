import StyleNodeVisitor from "../visitors/StyleNodeVisitor";
import HasStyleParent from "./children/HasStyleParent";

export default interface StyleTreeNode extends HasStyleParent {
  accept(visitor: StyleNodeVisitor);
}