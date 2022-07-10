export default ( error, callback ) => {

  const type = 'custom-function'
  const props = {}

  const resolve = value => {
    return callback( value )
  }

  return { type, error, props, resolve }
}