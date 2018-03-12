import FormNode from "../form/nodes/FormNode";
import { VariableScopeVisitor } from "../form/type_checking/VariableScopeVisitor";
import { VariableInformation } from "../form/VariableIntformation";
import { TypeCheckVisitor } from "../form/type_checking/TypeCheckVisitor";
import { getQlParser } from "./parsing_helpers";

export interface QlParserResult {
  node: FormNode;
  variables: Map<string, VariableInformation>;
}

export class QlParserPipeline {
  private readonly _qlInput: string;

  constructor(qlInput: string) {
    this._qlInput = qlInput;

    this.processFormNode = this.processFormNode.bind(this);
  }

  run(): QlParserResult[] {
    const formNodes: FormNode[] = getQlParser().parse(this._qlInput);

    this.processFormNode(formNodes[0]);

    return formNodes.map(this.processFormNode);
  }

  private processFormNode(node: FormNode): QlParserResult {
    const scopeVisitor: VariableScopeVisitor = new VariableScopeVisitor();
    const scopeResult = scopeVisitor.run(node);

    const typeCheckVisitor = new TypeCheckVisitor(scopeResult.variables);
    node.accept(typeCheckVisitor);

    return {
      node: node,
      variables: scopeResult.variables
    };
  }
}