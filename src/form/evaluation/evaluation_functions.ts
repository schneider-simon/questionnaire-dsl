import Expression from "../nodes/expressions/Expression";
import FormState from "../state/FormState";
import EvaluationVisitor from "./EvaluationVisitor";

/**
 * Alias to evaluate a form using the EvaluationVisitor
 *
 * @param {Expression} expression
 * @param state
 * @returns {any}
 */
export const evaluate = (expression: Expression, state?: FormState): any => {
  const evaluationVisitor = new EvaluationVisitor(state);
  return expression.accept(evaluationVisitor);
};

/**
 * Check if an expression can be evaluated. Only returns true if all
 * necessary values that are connected to variable identifiers are
 * in the form state.
 *
 * TODO: Replace try catch with check for used variables.
 *
 * @param {Expression} expression
 * @param {FormState} state
 * @returns {boolean}
 */
export const canBeEvaluated = (expression: Expression, state: FormState) => {
  try {
    evaluate(expression, state);
  } catch (error) {
    return false;
  }

  return true;
};