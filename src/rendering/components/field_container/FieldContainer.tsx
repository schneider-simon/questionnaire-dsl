import * as React from 'react';
import Field from "../../../form/nodes/fields/FieldNode";
import { fieldComponentsMapping } from "../../../config/field_components_mapping";
import { CannotRenderFieldType } from "../../rendering_errors";

export interface FieldContainerProps {
  field: Field;
  onChange: (value: any) => void;
  value: any;
}

export const FieldContainer: React.SFC<FieldContainerProps> = (props) => {
  // TODO: Move to renderer?
  const findComponent: any = () => {
    const pair = fieldComponentsMapping.find(mapping => {
      return props.field.type === mapping.type;
    });

    if (!pair) {
      return null;
    }

    return pair.component;
  };

  const FieldComponent = findComponent();

  if (!FieldComponent) {
    throw CannotRenderFieldType.make(props.field.type);
  }

  return (
      <div className="field-container">
        <FieldComponent onChange={props.onChange} value={props.value} field={props.field}/>
      </div>
  );
};