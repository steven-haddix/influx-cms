import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Page } from 'components'

const Wrapper = styled.div`
  & > * {
    margin: 1rem;
  }
`

const PageList = ({ list, loading, ...props }) => {
    return (
        <Wrapper {...props}>
            {loading && <div>Loading</div>}
            {list.map((page, i) => <Page key={i} loading={loading} {...page} />)}
        </Wrapper>
    )
}

PageList.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool
}

export default PageList