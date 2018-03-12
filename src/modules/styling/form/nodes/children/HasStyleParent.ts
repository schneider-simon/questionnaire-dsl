import StyleTreeNode from "../StyleTreeNode";

export default interface HasStyleParent {
  setParent(parent: StyleTreeNode): void;
  getParent(): StyleTreeNode | null;
}