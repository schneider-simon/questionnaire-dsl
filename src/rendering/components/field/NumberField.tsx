import * as React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import Field from "../../../form/nodes/fields/FieldNode";

export interface TextFieldProps {
  value: number;
  field: Field;
  onChange: (value: any) => void;
}

export const NumberField: React.SFC<TextFieldProps> = (props) => {
  return (
      <FormGroup>
        <Label for={props.field.identifier}>{props.field.label}</Label>
        <Input
            readOnly={props.field.isReadOnly()}
            name={props.field.identifier}
            type="number"
            onChange={e => props.onChange(e.target.value)}
            value={props.value || ""}
        />
      </FormGroup>
  );
};