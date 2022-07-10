import logicalComparison, { ValidatorLogic } from "./logicalComparison"

export interface ValidatorResponse {
  status: string,
  value?: any
  reason?: any
}

interface ValidatorFieldState {
  name: string,
  status: string,
  errors: Array<ValidatorResponse>
}

const Validator = ( name: string, logics: Array<ValidatorLogic> ) => {

  /**
   * subscribe
   * 
   * @param {Function} callback 
   */
  let subscribeCallback: Function

  const subscribe = ( callback: Function ) => {
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

        result.map( ( item: ValidatorResponse ) => {
          
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

  return { name, validate }
}

export default Validator