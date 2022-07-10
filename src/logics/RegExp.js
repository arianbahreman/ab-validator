export default ( error, pattern ) => {

  const type = 'regexp'
  const props = {
    pattern
  }

  const resolve = value => {

    return pattern.test( value )
  }

  return { type, error, props, resolve }
}
