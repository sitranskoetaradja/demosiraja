'use client'

import SignIn from '@/components/auth/SignIn'
import { onSignInWithCredentials } from '@/server/actions/auth/handleSignIn'
import handleOauthSignIn from '@/server/actions/auth/handleOauthSignIn'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useSearchParams } from 'next/navigation'
import type {
    OnSignInPayload,
    OnOauthSignInPayload,
} from '@/components/auth/SignIn'
import { useRouter } from 'next/navigation'
import appConfig from '@/configs/app.config'

const SignInClient = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get(REDIRECT_URL_KEY)
    console.log('callbackUrl', callbackUrl)
    const router = useRouter()
    const handleSignIn = ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignInPayload) => {
        setSubmitting(true)

        onSignInWithCredentials(values, callbackUrl || '').then((data) => {
            if (data?.error) {
                setMessage(data.error as string)
                setSubmitting(false)
            } else {
                // 🚀 Redirect client-side supaya langsung ke dashboard
                router.push(appConfig.authenticatedEntryPath)
            }
        })
    }

    const handleOAuthSignIn = async ({ type }: OnOauthSignInPayload) => {
        if (type === 'google') {
            await handleOauthSignIn('google')
        }
        if (type === 'github') {
            await handleOauthSignIn('github')
        }
    }

    return <SignIn onSignIn={handleSignIn} onOauthSignIn={handleOAuthSignIn} />
}

export default SignInClient
