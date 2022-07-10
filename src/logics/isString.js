export default ( error, minLength, maxLength ) => {

  const type = 'string'
  const props = {
    minLength,
    maxLength
  }
  
  const resolve = value => {
    
    if ( typeof value !== 'string' )
      return false
    
    return ( isNaN( props.minLength ) ? true : value.length >= props.minLength ) 
    && ( isNaN( props.maxLength ) ? true : value.length <= props.maxLength )
  }

  return { type, error, props, resolve }
}