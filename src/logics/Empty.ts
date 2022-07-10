export default ( error: string ) => {

  const type = 'empty'
  const props = {}

  const resolve = <T extends number>( value: T ) => {
    return Boolean( value || value === 0 )
  }

  return { type, error, props, resolve }
}