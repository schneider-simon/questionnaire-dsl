import {
  DivisionByZeroError, ValuesNotComparableError,
  TypeCheckError
} from "../form_errors";
import { FieldType, numericFieldTypes } from "../FieldType";

/**
 * Returns the type of a given value including the classname if it is
 * a class instance.
 *
 * @param value
 * @returns string
 */
export const getTypeString = (value: any) => {
  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "object" && value.constructor) {
    return value.constructor.name;
  }

  return typeof value;
};

/**
 * Assert that the types a given object is as expected or fail.
 *
 * @param value
 * @param {string} expectedType
 * @returns {any}
 */
export const assertType = (value: any, expectedType: string) => {
  if (typeof value !== expectedType) {
    throw TypeCheckError.make(expectedType, getTypeString(value));
  }

  return value;
};

export const assertFieldType = (actualType: FieldType, expectedType: FieldType): FieldType => {
  if (actualType !== expectedType) {
    throw TypeCheckError.make(expectedType, actualType);
  }

  return expectedType;
};

export const assertAnyFieldType = (actualType: FieldType, allowedTypes: FieldType[]): FieldType => {
  if (allowedTypes.indexOf(actualType) === -1) {
    throw TypeCheckError.make(allowedTypes.join(' or '), actualType);
  }

  return actualType;
};

/**
 * Assert that the types of the value is "boolean" or fail otherwise.
 *
 * @param value
 * @returns {any}
 */
export const assertBoolean = (value: any) => {
  return assertType(value, "boolean");
};

/**
 * Assert that the types of the value is "string" or fail otherwise.
 *
 * @param value
 * @returns {any}
 */
export const assertString = (value: any) => {
  return assertType(value, "string");
};

/**
 * Assert that the types of the value is "number" or fail otherwise.
 *
 * @param value
 * @returns {any}
 */
export const assertNumeric = (value: any) => {
  return assertType(value, "number");
};

export const assertNumericFieldType = (fieldType: FieldType): FieldType => {
  return assertAnyFieldType(fieldType, numericFieldTypes);
};

/**
 * Assert that the value given is comparable to other values of the same type.
 * TODO: Make list configurable.
 *
 * @param value
 * @returns {any}
 */
export const assertComparable = (value: any) => {
  if (["string", "number", "boolean"].indexOf(typeof  value) === -1) {
    throw TypeCheckError.make("compareable", getTypeString(value));
  }

  return value;
};

/**
 * Check if the dividend and the divisor build up a valid division (both numeric and
 * not divided by zero) or fail otherwise.
 *
 * @param dividend
 * @param divisor
 * @returns {{dividend: number; divisor: number}}
 */
export const assertValidDivision = (dividend: number, divisor: number) => {
  dividend = assertNumeric(dividend);
  divisor = assertNumeric(divisor);

  if (divisor === 0) {
    throw DivisionByZeroError.make();
  }

  return {dividend, divisor};
};

export const assertSameType = (left: any, right: any) => {
  if (typeof left !== typeof right) {
    throw ValuesNotComparableError.make(left, right);
  }

  return {left, right};
};