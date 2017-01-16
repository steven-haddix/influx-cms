import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { font, color, reverseColor, ifProps } from 'theme'

const DraggableStyled = styled.div`
    align-items: center;
    background-color: white;
    border: 1px solid #999;
    -webkit-box-shadow: 2px 4px 2px 0px rgba(0,0,0,0.26);
    -moz-box-shadow: 2px 4px 2px 0px rgba(0,0,0,0.26);
    box-shadow: 2px 4px 2px 0px rgba(0,0,0,0.26);
    display: flex;
    font-family: ${font('primary')};
    margin: 0 0 10px 0;
    opacity: ${(props) => props.isDragging ? 0 : 1};
`

const DraggableContent = styled.div`
    padding: .8em 0em;
`

const DraggableHandle = styled.div`
    align-self: stretch;
    background-color: #b9e9d4;
    border: 1px solid #90c2ac;
    margin: -1px 30px -1px -1px;
    width: 16px;
`

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

@DropTarget('card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class Draggable extends Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        moveCard: PropTypes.func.isRequired
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        return connectDragSource(connectDropTarget(
            <div>
                <DraggableStyled {...this.props}>
                    <DraggableHandle />
                    <DraggableContent>
                        {this.props.children}
                    </DraggableContent>
                </DraggableStyled>
            </div>
        ))
    }
}
