import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const urlMap: {
    [key: string]: {
        pathname: string
        searchParams?: { [key: string]: string }
    }
} = {
    '/activity.php': {
        pathname: '/experiences',
        searchParams: { region: 'int' },
    },

    '/activity-local.php': {
        pathname: '/experiences',
        searchParams: { region: 'lk' },
    },
    '/pack.php': { pathname: '/experiences', searchParams: { region: 'int' } },
    '/pack-local.php': {
        pathname: '/experiences',
        searchParams: { region: 'lk' },
    },
    '/gallery.php': { pathname: '/' },
    '/about.php': { pathname: '/about' },
    '/contact.php': { pathname: '/contact' },
    '/pay-online.php': { pathname: '/' },
    '/book.php': { pathname: '/' },
}

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const newPathname = urlMap[url.pathname]

    if (newPathname) {
        url.pathname = newPathname.pathname
        if (newPathname.searchParams) {
            for (const [key, value] of Object.entries(
                newPathname.searchParams
            )) {
                url.searchParams.set(key, value)
            }
        }
        return NextResponse.redirect(url)
    }
}
