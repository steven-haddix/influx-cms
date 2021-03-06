import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { color } from 'theme'

import { Link } from 'components'

const Nav = styled.nav`
  display: flex;
  list-style: none;
  > :not(:first-child) {
    margin-left: 1rem;
  }
  a {
    font-weight: 300;
    color: ${color('grayscale', 2)};
    font-size: 1.25rem;
    &.active {
      color: ${color('grayscale', 0)};
    }
  }
`

const PrimaryNavigation = (props) => {
    return (
        <Nav {...props}>
            <li><Link to="/" onlyActiveOnIndex activeClassName="active">Home</Link></li>
            <li><Link to="/pages" activeClassName="active">Pages</Link></li>
        </Nav>
    )
}

PrimaryNavigation.propTypes = {
    reverse: PropTypes.bool
}

export default PrimaryNavigation