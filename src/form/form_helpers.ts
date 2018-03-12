import TreeNode from "./nodes/TreeNode";
import NodeTraveller from "./nodes/visitors/NodeTraveller";
import VariableIdentifier from "./nodes/expressions/VariableIdentifier";

export const filterNodes = (predicate: (node: TreeNode) => boolean, start: TreeNode): any[] => {
  let nodes: TreeNode[] = [];

  const traveller = new NodeTraveller((node: TreeNode) => {
    if (predicate(node)) {
      nodes = nodes.concat([node]);
    }
  });

  start.accept(traveller);
  return nodes;
};

export const findNode = (predicate: (node: TreeNode) => boolean, start: TreeNode): (TreeNode | null) => {
  const found = filterNodes(predicate, start);

  if (found.length === 0) {
    return null;
  }

  return found[0];
};

export const getUsedVariables = (start: TreeNode) => {
  const variables: string[] = [];
  const traveller = new NodeTraveller((node: TreeNode) => {
    if (node instanceof VariableIdentifier) {
      variables.push(node.identifier);
    }
  });

  start.accept(traveller);
  return variables;
};