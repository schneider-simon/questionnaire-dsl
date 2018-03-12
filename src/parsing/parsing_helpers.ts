const qlParser = require("./parsers/ql_parser");

export const getParserErrorMessage = (error: Error | any) => {
  let message = error.message;

  if (typeof error.location !== 'undefined') {
    message += ` Line: ${error.location.start.line}`;
  }

  return message;
};

export const getQlParser = () => {
  return qlParser;
};