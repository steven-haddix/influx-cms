import React, { Component } from 'react'
import submit from 'redux-form-submit'
import { pageList } from 'store'

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
            store.dispatch(pageList.request(15, resolve, reject))
        })
    }

    render () {
        return <DashboardPage />
    }
}

export default DashboardContainer