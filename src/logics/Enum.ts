export default <T>( error: string, list: Array<T> ) => {

  const type = 'enum'
  const props = {
    list
  }

  const resolve = ( value: T ) => {
    return props.list.includes( value )
  }

  return { type, error, props, resolve }
}