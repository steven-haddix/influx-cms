import React, { Component } from 'react'
import submit from 'redux-form-submit'
import { postList } from 'store'

import { DashboardPage } from 'components'
import { config } from './PostForm'

class DashboardContainer extends Component {
    static post ({ ctx, store }) {
        return Promise.all([
            this.get({ store }),
            store.dispatch(submit(config, ctx.body))
        ])
    }

    static get ({ store }) {
        return new Promise((resolve, reject) => {
            store.dispatch(postList.request(15, resolve, reject))
        })
    }

    render () {
        return <DashboardPage />
    }
}

export default DashboardContainer