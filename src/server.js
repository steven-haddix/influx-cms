import React from 'react'
import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import Router from 'koa-router'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import serialize from 'serialize-javascript'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import csrf from 'koa-csrf';

import configureStore from 'store/configure'
import routes from 'routes'
import { Html } from 'components'

const server = new Koa();
const router = new Router();

const env = process.env.NODE_ENV;

server.use(async (ctx, next) => {
    if (env === 'development') {
        global.webpackIsomorphicTools.refresh()
    }

    const memoryHistory = createMemoryHistory(ctx.request.url)
    const store = configureStore({}, memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store)
    // store.dispatch(setCsrfToken(ctx.csrf))

    match({ history, routes, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            console.log(redirectLocation);
            ctx.redirect(redirectLocation.pathname + redirectLocation.search)
        }

        if (error || !renderProps) {
            return next(error)
        }

        const fetchData = async () => {
            const method = ctx.request.method.toLowerCase()
            const { params, location, components } = renderProps
            let promises = []

            components.forEach((component) => {
                if (component) {
                    while (component && !component[method]) {
                        component = component.WrappedComponent
                    }
                    component &&
                    component[method] &&
                    promises.push(component[method]({ req, res, params, location, store }))
                }
            });

            await Promise.all(promises);
        }

        const render = (store) => {
            const content = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            )

            const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
            const initialState = store.getState()
            const assets = global.webpackIsomorphicTools.assets()
            const state = `window.__INITIAL_STATE__ = ${serialize(initialState)}`
            const markup = <Html {...{ styles, assets, state, content }} />
            const doctype = '<!doctype html>\n'
            const html = renderToStaticMarkup(markup)

            ctx.body = doctype + html;
        }

        try {
            fetchData();
            render(configureStore(store.getState(), memoryHistory));
        } catch(err) {
            console.log(err)
            next()
        }
        next();
    })
});

server
    .use(bodyparser())
    .use(new csrf())
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(3000);

export default server