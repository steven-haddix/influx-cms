import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Heading, Paragraph, Field } from 'components'

const ModelStyled = styled.div``

const Model = ({ name, fields, ...props }) => {
    console.log(props)
    return (
        <ModelStyled {...props}>
            <Heading level={2}>{name}</Heading>
            {fields.map((field) => <Field {...field} />)}
        </ModelStyled>
    )
}

Model.propTypes = {
    name: PropTypes.string.isRequired,
    fields: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.number.isRequired,
    })).isRequired,
}

export default Model