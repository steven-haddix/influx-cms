import upperFirst from 'lodash/upperFirst'
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { fork } from 'redux-saga/effects'
import { reducer as form } from 'redux-form'
import _ from 'lodash'

import pages from './model/reducer';

const reducers = {
    routing,
    pages
};

const sagas = [];

const requireSafe = (path) => {
    let module = {};
    try {
        // using ${} suppresses webpack warning
        module = require(`${path}`)
    } catch (e) {
        if (e.message.search('Cannot find module') !== 0) {
            throw e
        }
    }
    return module
}

Object.keys(reducers).forEach((reducerName) => {
    const getState = (state = {}) => state[reducerName] || {};
    const fromKey = `from${upperFirst(reducerName)}`;
    const selectors = requireSafe(`./${reducerName}/selectors`);
    const actions = requireSafe(`./${reducerName}/actions`);
    const saga = requireSafe(`./${reducerName}/sagas`).default;

    module.exports[fromKey] = {};

    // add all selectors to module.exports.fromSomething
    _.forEach(selectors, (selector, name) => {
        module.exports[fromKey][name] = (state, ...rest) => selector(getState(state), ...rest)
    })

    // add all actions to modules.exports.doSomething()
    _.forEach(actions, (action, name) => {
        module.exports[name] = action
    })

    if (saga) {
        sagas.push(saga)
    }
})

export function* saga () {
    yield sagas.map(fork)
}

export const reducer = combineReducers(reducers);
