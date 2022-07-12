import logicalComparison from "./logicalComparison"
import { ValidatorLogic, ValidatorFieldState } from "./types"

const Validator = ( name: string, logics: Array<ValidatorLogic> ) => {

  /**
   * subscribe
   * 
   * @param {Function} callback 
   */
  let subscribeCallback: CallableFunction

  const subscribe = ( callback: CallableFunction ) => {
    subscribeCallback = callback
  }

  /**
   * validate
   * 
   * @param {*} value 
   * @returns Promise
   */
  const validate = <T>( value: T ) => {

    const state: ValidatorFieldState = {
      name,
      status: 'valid',
      errors: []
    }

    return new Promise(( resolve, reject ) => {

      Promise.allSettled(
        logics.map( logic => logicalComparison( logic, value ) )
      ).then( result => {

        result.map( ( item ) => {
          
          if ( item.status == 'rejected' ) {
            state.errors.push( item.reason )
            state.status = 'invalid'
          }
        })

        subscribeCallback && subscribeCallback( state )
        state.status === 'valid' ? resolve( state ) : reject( state )
      })
    })
  }

  return { name, validate, subscribe }
}

export default Validator