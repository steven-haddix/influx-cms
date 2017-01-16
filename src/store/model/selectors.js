export const initialState = {
    list: [{ name: 'Page1' }, { name: 'Page2' }]
}

export const getList = (state = initialState) => state.list || []
export const getCount = (state = initialState) => state.list.length || 0