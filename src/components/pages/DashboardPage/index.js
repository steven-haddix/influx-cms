import React from 'react'

import { PageTemplate, Header, Footer, Heading } from 'components'
import { PagesListContainer } from 'containers'

const DashboardPage = () => {
    return (
        <PageTemplate header={<Header />} footer={<Footer />}>
            <Heading>Pages</Heading>
            <PagesListContainer />
            <Heading>Modules</Heading>
            <Heading>Media</Heading>
        </PageTemplate>
    )
}

export default DashboardPage