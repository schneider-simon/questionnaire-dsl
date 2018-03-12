import TreeNode from "./TreeNode";
import FieldVisitor from "./visitors/FieldVisitor";

/**
 * Statement interface that makes up a collection of Fields or Condition inside a Form or a
 * Condition Block.
 */
interface Statement extends TreeNode {
  accept(visitor: FieldVisitor): any;
}

export default Statement;