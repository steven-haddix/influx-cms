import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Draggable } from 'components'
import { DraggableContainer } from 'containers'

storiesOf('Draggable', module)
    .add('default', () => (
        <DraggableContainer>
            <Draggable id={1}>Draggable 1</Draggable>
            <Draggable id={2}>Draggable 2</Draggable>
            <Draggable id={3}>Draggable 3</Draggable>
            <Draggable id={4}>Draggable 4</Draggable>
        </DraggableContainer>
    ))
    .add('tall box', () => (
        <DraggableContainer>
            <Draggable id={1}>
                <div>test</div>
                <div>test2</div>
                <div>test3</div>
            </Draggable>
            <Draggable id={2}>Draggable 2</Draggable>
        </DraggableContainer>
    ))
