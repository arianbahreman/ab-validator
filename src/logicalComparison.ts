export interface ValidatorLogic {
  type: string,
  error: string,
  props: {},
  resolve: Function
}

export default <T>( logic: ValidatorLogic, value: T ) => {

  return new Promise( async ( resolve, reject ) => {

    const result = await logic.resolve( value )

    result ? resolve( true ) : reject( {
      type: logic.type,
      error: logic.error,
      props: logic.props
    })
  })
}