
import { ValidatorLogic } from "./types"

export default <T>( logic: ValidatorLogic, value: T ) => {

  return new Promise( ( resolve, reject ) => {
    (async () => {

      const result = await logic.resolve( value )

      result ? resolve( true ) : reject( {
        type: logic.type,
        error: logic.error,
        props: logic.props
      })

    })()
  })
}