import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import {
	authRoutes as _authRoutes,
	publicRoutes as _publicRoutes,
	protectedRoutes as _protectedRoutes,
} from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
const publicRoutes = Object.entries(_publicRoutes).map(([key]) => key)
const authRoutes = Object.entries(_authRoutes).map(([key]) => key)

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	})

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll()
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
					supabaseResponse = NextResponse.next({
						request,
					})
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					)
				},
			},
		}
	)

	// Do not run code between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: DO NOT REMOVE auth.getUser()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const path = request.nextUrl.pathname
	const isSignedIn = !!user
	const isPublicRoute = publicRoutes.includes(path)
	const isAuthRoute = authRoutes.includes(path)

	// 🔹 kalau auth route (login/register) dan sudah login → redirect ke dashboard
	console.log('isAuthRoute', isAuthRoute)
	console.log('isSignedIn', isSignedIn)
	if (isAuthRoute) {
		if (isSignedIn) {
			const url = request.nextUrl.clone()
			url.pathname = appConfig.authenticatedEntryPath
			return NextResponse.redirect(url)
		}
		return supabaseResponse
	}

	// 🔹 kalau bukan public route dan belum login → redirect ke login
	if (!isSignedIn && !isPublicRoute) {
		let callbackUrl = path
		// console.log('fsdf', request.nextUrl)
		// console.log('callbackUrl', callbackUrl)
		
		const url = request.nextUrl.clone()
		url.pathname = appConfig.unAuthenticatedEntryPath
		if (request.nextUrl.search != '' || callbackUrl != '/') {
			callbackUrl += request.nextUrl.search
			// url.searchParams.set(REDIRECT_URL_KEY, callbackUrl)
		}
		return NextResponse.redirect(url)
	}

	// 🔹 role based access (kalau user sudah login)
	// if (isSignedIn && path !== '/access-denied') {
	// 	const { data: profile } = await supabase
	// 		.from('profiles')
	// 		.select('role')
	// 		.eq('user_id', user.id)
	// 		.single()

	// 	const role = profile?.role
	// 	const routeMeta = _protectedRoutes[path]

	// 	if (routeMeta && !routeMeta.authority.includes(role)) {
	// 		const url = request.nextUrl.clone()
	// 		url.pathname = '/access-denied'
	// 		return NextResponse.redirect(url)
	// 	}
	// }
	// if (
	// 	!user &&
	// 	!request.nextUrl.pathname.startsWith('/login') &&
	// 	!request.nextUrl.pathname.startsWith('/auth') &&
	// 	!request.nextUrl.pathname.startsWith('/error')
	// ) {
	// 	// no user, potentially respond by redirecting the user to the login page
	// 	const url = request.nextUrl.clone()
	// 	url.pathname = '/login'
	// 	return NextResponse.redirect(url)
	// }

	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse
}