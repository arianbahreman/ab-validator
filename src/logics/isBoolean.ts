export default ( error: string ) => {

  const type = 'bool'
  const props = {}

  const resolve = <T extends boolean>( value: T ) => {
    return value === true || value === false
  }

  return { type, error, props, resolve }
}