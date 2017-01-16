import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Model } from 'components'

const model = {
    name: 'Model',
    fields: [
        { name: 'field1', type: 'String' },
        { name: 'field2', type: 'Number' }
    ]
}

storiesOf('Model', module)
    .add('default', () => (
        <Model {...model} />
    ))
    .add('reverse', () => (
        <Model {...model} reverse />
    ))