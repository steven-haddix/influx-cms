import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App, HomePage } from 'components'
import { Dashboard, NotFoundPage } from 'containers'

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="*" component={NotFoundPage} />
    </Route>
)

export default routes