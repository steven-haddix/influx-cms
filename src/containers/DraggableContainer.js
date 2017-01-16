import React, { Component } from 'react';
import update from 'react/lib/update';
import { Draggable } from 'components';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


@DragDropContext(HTML5Backend)
export default class DraggableContainer extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.state = {
            cards: props.children
        };
    }

    moveCard(dragIndex, hoverIndex) {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }

    render() {
        const { cards } = this.state;
        return (
            <div>
                {cards.map((card, i) => {
                    return (
                        <div key={card.props.id}>
                            <Draggable
                                id={card.props.id}
                                index={i}
                                moveCard={this.moveCard}
                                {...card}>
                                <div>{card.props.children}</div>
                            </Draggable>
                        </div>
                    );
                })}
            </div>
        );
    }
}