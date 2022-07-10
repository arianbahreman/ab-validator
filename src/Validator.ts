import ValidatorField, { ValidatorResponse } from "./ValidatorField"

interface ValidatorFields {
}

interface ValidatorValues {
  [key: string]: any
}

interface ValidatorState {
  status: string,
  fields: Array<typeof ValidatorField>
}

const Validator = ( fields: ValidatorFields ) => {

  for ( let fieldName in fields ) {
    fields[ fieldName ] = ValidatorField( fieldName, fields[ fieldName ] )
  }

  /**
   * 
   * @param {Function} callback 
   */
  let subscribeCallback: Function

  const subscribe = ( callback: Function ) => {
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

    for ( let fieldName in values ) {
      validationFields.push( fields[ fieldName ].validate( values[ fieldName ] ) )
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