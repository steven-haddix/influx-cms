import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App } from 'components'
import { DashboardContainer, PagesContainer, NotFoundContainer } from 'containers'

const routes = (
    <Route path="/" component={ App }>
        <IndexRoute component={ DashboardContainer } />
        <Route path="/pages" component={ PagesContainer } />
        <Route path="*" component={ NotFoundContainer } />
    </Route>
)

export default routes