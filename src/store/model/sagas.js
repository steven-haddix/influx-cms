import { take, put, call, fork } from 'redux-saga/effects'
import { pageList, PAGE_LIST_REQUEST } from './actions'
import api from 'services/api'

const fn = () => true

export function* listPages (limit, resolve = fn, reject = fn) {
    try {
        const params = { _limit: limit }
        const { data } = yield call(api.get, '/pages', { params })
        resolve(data)
        yield put(pageList.success(data))
    } catch (e) {
        reject(e)
        yield put(pageList.failure(e))
    }
}

export function* watchPostListRequest () {
    while (true) {
        const { limit, resolve, reject } = yield take(PAGE_LIST_REQUEST)
        yield call(listPages, limit, resolve, reject)
    }
}

export default function* () {
    yield fork(watchPostListRequest)
}