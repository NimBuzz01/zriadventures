import Head from 'next/head'
import { Metadata } from 'next'
import PageContent from './PageContent'

export const metadata: Metadata = {
    title: 'Cart - ZRI Adventures',
    description:
        'ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

const Cart = () => {
    return (
        <main>
            <Head>
                <title>Cart - ZRI Adventures</title>
                <meta
                    name="Cart - ZRI Adventures"
                    content="ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!"
                />
            </Head>
            <PageContent />
        </main>
    )
}

export default Cart
