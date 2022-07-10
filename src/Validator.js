import ValidatorField from "./ValidatorField"

const Validation = ( fields ) => {

  for ( let fieldName in fields ) {
    fields[ fieldName ] = ValidatorField( fieldName, fields[ fieldName ] )
  }

  /**
   * 
   * @param {Function} callback 
   */
  let subscribeCallback

  const subscribe = ( callback ) => {
    subscribeCallback = callback
  }

  /**
   * 
   * @param {*} values 
   * @returns 
   */
  const validate = ( values ) => {

    const state = {
      status: 'valid',
      fields: []
    }

    const validationFields = []

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

export default Validation