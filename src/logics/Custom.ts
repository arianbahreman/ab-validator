export default ( error: string, callback: CallableFunction ) => {

  const type = 'custom-function'
  const props = {}

  const resolve = <T>( value: T ) => {
    return callback( value )
  }

  return { type, error, props, resolve }
}