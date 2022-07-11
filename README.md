# Validation
A zero-dependencies Javascript asynchronous validator library with built-in and custom logics.

## Usage
```javascript
import { Validator, ValidatorField, Logics } from 'ab-validator'
```

## Logics

```javascript
import { Logics } from 'ab-validator'

Logics.Empty( errorMessage )
Logics.Enum( errorMessage, list )
Logics.Custom( errorMessage, callback )
Logics.isBoolean( errorMessage )
Logics.isNumber( errorMessage, min, max )
Logics.isString( errorMessage, minLength, maxLength )
Logics.RegExp( errorMessage, RegExp )
```

|Method|Description|Parameters|
|----|----|----|
|Empty|Return false if value is empty|error: string \| number|
|Enum|Return false if value is not in list|error: string \| number, list: any|
|isString|Return false if value is not string or length is not between the range|error: string \| number<br/>minLength: number (optional)<br/>maxLength: number (optional)
|isBoolean|Return false if value is equal to false|error: string \| number|
|isNumber|Return false if value is not number or not in the range|error: string \| number<br/>min: number<br/>max: number|
|RegExp|Return false if pattern not match with the value|error: string \| number<br/>pattern: RegExp|
Custom|Will pass value to a custom function. function should return true/false or a Promise for async validating|error: string \| number<br/>callback: Function => boolean \| Promise

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