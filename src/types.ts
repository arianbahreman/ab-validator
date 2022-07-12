import ValidatorField from './ValidatorField'

export type LogicError = string | number

export interface ValidatorFieldType {
  name: string,
  validate: CallableFunction
}

export interface ValidatorLogic {
  type: string,
  error: string,
  props: typeof Object,
  resolve: CallableFunction
}

export interface ValidatorLogicState {
  type: string
  error: LogicError
  props: typeof Object
}

export interface ValidatorResponse {
  status: string,
  value?: ValidatorLogicState
  reason?: ValidatorLogicState
}

export interface ValidatorFieldState {
  name: string,
  status: string,
  errors: Array<ValidatorResponse>
}

export interface ValidatorFields {
  [ key: string ]: ValidatorFieldType | Array<ValidatorLogic>
}

export interface ValidatorValues {
  [ key: string ]: string | number | boolean | []
}

export interface ValidatorState {
  status: string,
  fields: Array<typeof ValidatorField>
}