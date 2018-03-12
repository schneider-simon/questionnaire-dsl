import DefaultStyle from "../nodes/children/DefaultStyle";
import Section from "../nodes/containers/Section";
import Page from "../nodes/containers/Page";
import WidgetAttribute from "../nodes/attributes/WidgetAttribute";
import BaseAttribute from "../nodes/attributes/BaseAttribute";
import Stylesheet from "../nodes/StyleSheet";
import QuestionStyle from "../nodes/children/QuestionStyle";

export default interface StyleNodeVisitor {
  visitDefaultStyle(defaultStyle: DefaultStyle): any;

  visitQuestionStyle(question: QuestionStyle): any;

  visitSection(section: Section): any;

  visitPageAttribute(page: Page): any;

  visitWidgetAttribute(widgetAttribute: WidgetAttribute): any;

  visitBaseAttribute(baseAttribute: BaseAttribute): any;

  visitStyleSheet(stylesheet: Stylesheet): any;
}