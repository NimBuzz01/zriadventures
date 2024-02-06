import Head from 'next/head'
import { Metadata } from 'next'
import PageContent from './page-content'

export const metadata: Metadata = {
    title: 'Checkout - ZRI Adventures',
    description:
        'ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

const Checkout = () => {
    return (
        <main className="bg-blue-50 pt-10">
            <Head>
                <title>Checkout - ZRI Adventures</title>
                <meta
                    name="Checkout - ZRI Adventures"
                    content="ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!"
                />
            </Head>
            <PageContent />
        </main>
    )
}

export default Checkout
