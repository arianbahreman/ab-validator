# Validation
A zero-dependencies Javascript asynchronous validation library with built-in and custom logics.

## Usage
```javascript
import { Validator, ValidatorField, Logics } from 'ab-validator'
```

## Logics
```javascript
import { Logics } from 'ab-validator'

Logics.Empty( errorMessage )
Logics.Custom( errorMessage, callback )
Logics.isBoolean( errorMessage )
Logics.isNumber( errorMessage, min, max )
Logics.isString( errorMessage, minLength, maxLength )
Logics.RegExp( errorMessage, RegExp )
```

## Single field validation
```javascript
import { ValidatorField, Logics } from 'ab-validator'

const name = ValidatorField('name', [
  Logics.Empty('Name is empty'),
  Logics.isString('Name should be at least 4 characters', 4)
])

name.validate('My Name').then(result => {
  console.log(result)
  // {name: "name", status: "valid", errors: []}
})
```

## Form validation
```javascript
import { Validator, Logics } from 'ab-validator'

const form = Validator({
  name: [
    Logics.Empty( 'Name is empty' ),
    Logics.isString('Name should be at least 4 characters', 4)
  ],
  email: [
    Logics.Empty( 'Email is empty' ),
    Logics.RegExp( 'Email is not valid', /^[a-z0-9\_\.]+\@[a-z0-9\.\-]+$/i )
  ]
})

form.subscribe( state => {
  console.log( state )
})

form.validate({
  name: 'Arian',
  email: 'arian.bahreman'
})
// {"status":"invalid","fields":[{"name":"name","status":"valid","errors":[]},{"name":"email","status":"invalid","errors":[{"type":"regexp","error":"email is not valid","props":{"pattern":{}}}]}]}
```

## Asynchronous validation
```javascript
import { ValidatorField, Logics } from 'ab-validator'

const delayedValidation = value => new Promise(resolve => {
  setTimeout(() => resolve( value > 0 ), 5000)
})

const field = ValidatorField('field', [
  Logics.Custom('Custom error', delayedValidation)
])

field.validate( 10 ).then(result => console.log( result ))
// {name: "field", status: "valid", errors: []}

```