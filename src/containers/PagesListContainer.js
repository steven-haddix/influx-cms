import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fromEntities, fromPages, fromStatus } from 'store/selectors'
import { pageList, PAGE_LIST } from 'store/actions'

import { PageList } from 'components'

class PagesListContainer extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        limit: PropTypes.number,
        loading: PropTypes.bool,
        request: PropTypes.func.isRequired
    }

    static defaultProps = {
        limit: 20
    }

    componentDidMount () {
        this.props.request()
    }

    render () {
        const { list, loading } = this.props
        console.log(list)
        return <PageList {...{ list, loading }} />
    }
}

const mapStateToProps = (state) => ({
    list: fromPages.getList(state, 'post', fromPages.getList(state)),
    loading: fromStatus.isLoading(state, PAGE_LIST)
})

const mapDispatchToProps = (dispatch, { limit }) => ({
    request: () => dispatch(pageList.request(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(PagesListContainer)