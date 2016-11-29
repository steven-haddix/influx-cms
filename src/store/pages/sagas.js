import { take, put, call, fork } from 'redux-saga/effects'
import { postList, POST_LIST_REQUEST } from './actions'
import api from 'services/api'

const fn = () => true

export function* listPosts (limit, resolve = fn, reject = fn) {
    try {
        const params = { _limit: limit }
        const { data } = yield call(api.get, '/posts', { params })
        resolve(data)
        yield put(postList.success(data))
    } catch (e) {
        reject(e)
        yield put(postList.failure(e))
    }
}

export function* watchPostListRequest () {
    while (true) {
        const { limit, resolve, reject } = yield take(POST_LIST_REQUEST)
        yield call(listPosts, limit, resolve, reject)
    }
}

export default function* () {
    yield fork(watchPostListRequest)
}