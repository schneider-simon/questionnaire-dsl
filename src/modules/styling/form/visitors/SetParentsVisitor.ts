import StyleNodeVisitor from "./StyleNodeVisitor";
import DefaultStyle from "../nodes/children/DefaultStyle";
import QuestionStyle from "../nodes/children/QuestionStyle";
import Section from "../nodes/containers/Section";
import Page from "../nodes/containers/Page";
import WidgetAttribute from "../nodes/attributes/WidgetAttribute";
import BaseAttribute from "../nodes/attributes/BaseAttribute";
import Stylesheet from "../nodes/StyleSheet";
import StyleTreeNode from "../nodes/StyleTreeNode";

/**
 * Breadth first visitor that sets the parent for each node in the style definition.
 * This structure will be used to merge default styles with concrete styles.
 */
export default class SetParentsVisitor implements StyleNodeVisitor {
  private queue: StyleTreeNode[];

  visitDefaultStyle(defaultStyle: DefaultStyle): any {
    this.setParent(defaultStyle, []);
  }

  visitQuestionStyle(question: QuestionStyle): any {
    this.setParent(question, []);
  }

  visitSection(section: Section): any {
    this.setParent(section, section.body);
  }

  visitPageAttribute(page: Page): any {
    this.setParent(page, page.body);
  }

  visitWidgetAttribute(widgetAttribute: WidgetAttribute): any {
    this.setParent(widgetAttribute, []);
  }

  visitBaseAttribute(baseAttribute: BaseAttribute): any {
    this.setParent(baseAttribute, []);
  }

  visitStyleSheet(stylesheet: Stylesheet): any {
    this.setParent(stylesheet, stylesheet.children);
  }

  private setParent(node: StyleTreeNode, children: StyleTreeNode[]) {
    children.forEach(child => {
      this.queue.push(child);
      child.setParent(node);
    });

    this.workQueue();
  }

  private workQueue() {
    if (this.queue.length === 0) {
      return;
    }

    this.queue[0].accept(this);
    this.queue.shift();
  }

}