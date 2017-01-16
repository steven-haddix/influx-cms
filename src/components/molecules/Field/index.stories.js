import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Field, Draggable } from 'components'
import { DraggableContainer } from 'containers'

const field = {
    name: 'name',
    type: 'String'
}

storiesOf('Field', module)
    .add('default', () => (
        <DraggableContainer>
            <Draggable id={1}><Field {...field} /></Draggable>
            <Draggable id={2}><Field {...field} /></Draggable>
        </DraggableContainer>
    ))
    .add('reverse', () => (
        <Field {...field} reverse />
    ))