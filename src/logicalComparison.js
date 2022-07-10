export default ( logic, value ) => {

  return new Promise( async ( resolve, reject ) => {

    const result = await logic.resolve( value )

    result ? resolve( true ) : reject( {
      type: logic.type,
      error: logic.error,
      props: logic.props
    } )
  })
}