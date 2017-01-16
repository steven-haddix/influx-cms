import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Draggable } from 'components'
import { font, color, reverseColor, ifProps } from 'theme'

const FieldNameStyled = styled.span`
    font-weight: bold;
    margin: 0 15px 0 0;
`

const Field = ({ name, type, ...props }) => {
    return (
        <div {...props}>
            <FieldNameStyled>{name}</FieldNameStyled>
            <span>{type}</span>
        </div>
    )
}

Field.propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.number.isRequired,
}

export default Field