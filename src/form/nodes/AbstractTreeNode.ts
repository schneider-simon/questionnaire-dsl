import TreeNode from "./TreeNode";
import Locateable from "./location/Locateable";
import NodeVisitor from "./visitors/NodeVisitor";
import NodeLocation from "./location/NodeLocation";

export default abstract class AbstractTreeNode implements TreeNode, Locateable {
  protected location: NodeLocation;

  setLocation(location: NodeLocation): void {
    this.location = location;
  }

  getLocation(): NodeLocation {
    throw new Error("Method not implemented.");
  }

  abstract accept(visitor: NodeVisitor);
}