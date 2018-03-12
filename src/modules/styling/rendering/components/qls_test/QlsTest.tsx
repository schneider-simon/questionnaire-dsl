import * as React from 'react';
import { sampleForm } from "../../../../../mock/sampleForm";

export interface QlsTestProps {

}

export interface QlsTestState {

}

const qlsParser = require("../../../parsing/parsers/qls_parser");

export class QlsTest extends React.Component<QlsTestProps, QlsTestState> {
  private exampleOutput = qlsParser.parse(require("!raw-loader!../../../mock/sample.qls.txt"));
  constructor(props: QlsTestProps) {
    super(props);

    this.state = {};
    // Log parser output
    console.log(this.exampleOutput);
  }

  render() {
    return (
        <div>
          QLS TEST
        </div>
    );
  }
}