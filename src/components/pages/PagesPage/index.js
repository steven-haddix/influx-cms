import React from 'react'

import { PostForm, PostList } from 'containers'
import { PageTemplate, Header, Footer, Heading } from 'components'

const DashboardPage = () => {
    return (
        <PageTemplate header={<Header />} footer={<Footer />}>
            <PostList limit={15}/>
        </PageTemplate>
    )
}

export default DashboardPage