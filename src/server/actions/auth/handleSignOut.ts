'use server'

import { signOut } from '@/auth'
import appConfig from '@/configs/app.config'
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

const handleSignOut = async () => {
    // await signOut({ redirectTo: appConfig.unAuthenticatedEntryPath })
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign-out error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
redirect(appConfig.unAuthenticatedEntryPath)
//   return NextResponse.redirect(appConfig.unAuthenticatedEntryPath, {
//     status: 302,  })
//   return NextResponse.redirect("/login", {
//     status: 302,  });
}

export default handleSignOut
