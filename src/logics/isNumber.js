export default ( error, min, max ) => {

  const type = 'number'
  const props = {
    min,
    max
  }

  const resolve = value => {
2
    if ( isNaN( value ) ) {
      return false
    } else {
      return ( isNaN( props.min ) ? true : value >= props.min ) 
          && ( isNaN( props.max ) ? true : value <= props.max )
    }
  }

  return { type, error, props, resolve }
}
