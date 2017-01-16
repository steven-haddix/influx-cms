import React, { Component } from 'react'
import submit from 'redux-form-submit'
import { pagesList } from 'store'

import { PagesPage } from 'components'
import { config } from './PostForm'

class PageContainer extends Component {
    static post ({ ctx, store }) {
        return Promise.all([
            this.get({ store }),
            store.dispatch(submit(config, ctx.body))
        ])
    }

    static get ({ store }) {
        return new Promise((resolve, reject) => {
            store.dispatch(pagesList.request(15, resolve, reject))
        })
    }

    render () {
        return <PagesPage />
    }
}

export default PagesPage