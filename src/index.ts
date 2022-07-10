import Validator from "./Validator"
import ValidatorField from "./ValidatorField"

import Custom from "./logics/Custom"
import Empty from "./logics/Empty"
import Enum from "./logics/Enum"
import isBoolean from "./logics/isBoolean"
import isNumber from "./logics/isNumber"
import isString from "./logics/isString"
import RegExp from "./logics/RegExp"

const Logics = {
  Custom,
  Empty,
  Enum,
  isBoolean,
  isNumber,
  isString,
  RegExp
}

export {
  Validator,
  ValidatorField,
  Logics
}