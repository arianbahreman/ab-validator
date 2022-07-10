export default ( error: string, min: number, max: number ) => {

  const type = 'number'
  const props = {
    min,
    max
  }

  const resolve = <T extends number>( value: T ) => {
    
    if ( isNaN( value ) ) {
      return false
    } else {
      return ( isNaN( props.min ) ? true : value >= props.min ) 
          && ( isNaN( props.max ) ? true : value <= props.max )
    }
  }

  return { type, error, props, resolve }
}
