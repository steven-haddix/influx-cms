import React, { Component } from 'react'
import { NotFoundPage } from 'components'

class NotFoundPageContainer extends Component {
    static get ({ ctx }) {
        ctx.status(404)
    }

    render () {
        return <NotFoundPage {...this.props} />
    }
}

export default NotFoundPageContainer