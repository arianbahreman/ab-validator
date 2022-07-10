import logicalComparison from "./logicalComparison"

const Validation = ( name, logics ) => {

  /**
   * validate
   * 
   * @param {*} value 
   * @returns Promise
   */
  const validate = ( value ) => {

    const state = {
      name,
      status: 'valid',
      errors: []
    }

    return new Promise(( resolve, reject ) => {

      Promise.allSettled(
        logics.map( logic => logicalComparison( logic, value ) )
      ).then( result => {

        result.map(item => {
          
          if ( item.status == 'rejected' ) {
            state.errors.push( item.reason )
            state.status = 'invalid'
          }
        })

        state.status === 'valid' ? resolve( state ) : reject( state )
      })
    })
  }

  return { name, validate }
}

export default Validation