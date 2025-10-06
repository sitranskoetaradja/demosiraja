'use server'

import { signIn } from '@/auth'
import appConfig from '@/configs/app.config'
// import { AuthError } from 'next-auth'
import type { SignInCredential } from '@/@types/auth'
import { createClient } from '@/utils/supabase/server'
import { AuthError } from '@supabase/supabase-js'


export const onSignInWithCredentials = async (
    { email, password }: SignInCredential,
    callbackUrl?: string,
) => {
    const supabase = await createClient()
    try {
        // await signIn('credentials', {
        //     email,
        //     password,
        //     redirectTo: callbackUrl || appConfig.authenticatedEntryPath,
        // })
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
      throw error // lempar ke catch agar ditangani di sana
    }

        console.log('User signed in:', data)
    return { data, callbackUrl: callbackUrl || appConfig.authenticatedEntryPath, }

    } catch (error) {

        // if (error instanceof AuthError) {
        //     /** Customize error message based on AuthError */
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     console.error('Error signing in:', error.message) // Handle the error here
        //     return { error: error.message }
        //     // switch ((error.type as any).type) {
        //     //     case 'CredentialsSignin':
        //     //         return { error: 'Invalid credentials!' }
        //     //     default:
        //     //         return { error: 'Something went wrong!' }
        //     // }
        // }
        // throw error
        if (error instanceof AuthError) {
      console.error('AuthError:', error.message)
      return { error: error.message }
    }

    console.error('Unexpected error:', error)
    return { error: 'Unexpected error occurred during sign-in.' }
  
    }
}
