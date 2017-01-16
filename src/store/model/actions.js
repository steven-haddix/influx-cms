export const MODEL_LIST = 'MODEL_LIST'
export const MODEL_LIST_REQUEST = 'MODEL_LIST_REQUEST'
export const MODEL_LIST_SUCCESS = 'MODEL_LIST_SUCCESS'
export const MODEL_LIST_FAILURE = 'MODEL_LIST_FAILURE'

export const modelList = {
    request: (limit, resolve, reject) => ({ type: MODEL_LIST_REQUEST, limit, resolve, reject }),
    success: (list) => ({ type: MODEL_LIST_SUCCESS, list }),
    failure: (error) => ({ type: MODEL_LIST_FAILURE, error })
}