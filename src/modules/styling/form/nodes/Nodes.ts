import Stylesheet from "./StyleSheet";
import BaseAttribute from "./attributes/BaseAttribute";
import Page from "./containers/Page";
import Section from "./containers/Section";
import WidgetAttribute from "./attributes/WidgetAttribute";
import QuestionStyle from "./children/QuestionStyle";
import DefaultStyle from "./children/DefaultStyle";

/**
 * List all available node types for easy access in the grammar.
 * This list is not needed otherwise, but used to create according
 * instances inside the parser.
 */
export default {
  Stylesheet,
  BaseAttribute,
  WidgetAttribute,
  Page,
  Section,
  QuestionStyle,
  DefaultStyle
};