import React from 'react'
import styled from 'styled-components'

import { PrimaryNavigation, Block, Button } from 'components'

const Wrapper = styled(Block)`
  display: flex;
  align-items: center;
  padding: 1rem;
  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

const StyledPrimaryNavigation = styled(PrimaryNavigation)`
  flex: 1
`

const Header = (props) => {
    return (
        <Wrapper {...props}>
            <StyledPrimaryNavigation />
            <Button reverse transparent>Login</Button>
        </Wrapper>
    )
}

export default Header