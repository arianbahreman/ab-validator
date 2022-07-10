export default ( error ) => {

  const type = 'bool'
  const props = {}

  const resolve = value => {
    return value === true || value === false
  }

  return { type, error, props, resolve }
}