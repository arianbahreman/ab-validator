export default ( error: string, minLength: number, maxLength: number ) => {

  const type = 'string'
  const props = {
    minLength,
    maxLength
  }
  
  const resolve = <T extends string>( value: T ) => {
    
    if ( typeof value !== 'string' )
      return false
    
    return ( isNaN( props.minLength ) ? true : value.length >= props.minLength ) 
    && ( isNaN( props.maxLength ) ? true : value.length <= props.maxLength )
  }

  return { type, error, props, resolve }
}