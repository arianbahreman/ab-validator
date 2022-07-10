export default ( error ) => {

  const type = 'empty'
  const props = {}

  const resolve = value => {
    return Boolean( value || value === 0 )
  }

  return { type, error, props, resolve }
}