import ValidatorField from "./ValidatorField"
import { ValidatorFields, ValidatorValues, ValidatorState, ValidatorFieldType, ValidatorLogic } from './types'

const Validator = ( fields: ValidatorFields ) => {

  for ( const fieldName in fields ) {
    fields[ fieldName ] = ValidatorField( fieldName, fields[ fieldName ] as ValidatorLogic[] )
  }

  /**
   * 
   * @param {Function} callback 
   */
  let subscribeCallback: CallableFunction

  const subscribe = ( callback: CallableFunction ) => {
    subscribeCallback = callback
  }

  /**
   * 
   * @param {*} values 
   * @returns 
   */
  const validate = ( values: ValidatorValues ) => {

    const state: ValidatorState = {
      status: 'valid',
      fields: []
    }

    const validationFields: Array<typeof ValidatorField> = []

    for ( const fieldName in values ) {
      validationFields.push( ( fields[ fieldName ] as ValidatorFieldType ).validate( values[ fieldName ] ) )
    }

    return new Promise( resolve => {

      Promise.allSettled( validationFields ).then( result => {
      
        result.map( item => {

          if ( item.status === 'fulfilled' ) {
            state.fields.push( item.value )
          } else {
            state.fields.push( item.reason )
            state.status = 'invalid'
          }
        })

        subscribeCallback && subscribeCallback( state )
        resolve( state )
      })
    })
  }

  return { validate, subscribe }
}

export default Validator