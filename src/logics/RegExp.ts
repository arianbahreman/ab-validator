export default ( error: string, pattern: RegExp ) => {

  const type = 'regexp'
  const props = {
    pattern
  }

  const resolve = ( value: string ) => {

    return pattern.test( value )
  }

  return { type, error, props, resolve }
}
