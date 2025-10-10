// src/app/actions/userActions.js
'use server';

import { createClient } from '@supabase/supabase-js';

// Pastikan Service Role Key hanya digunakan di sini, di sisi server
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
);

export async function createAdminUser(email:string, password:string) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, // Tidak memerlukan konfirmasi email
  });

  if (error) {
    console.error('Gagal membuat pengguna:', error.message);
    return { success: false, error: error.message };
  } else {
    console.log('Pengguna berhasil dibuat:', data);
    return { success: true, data };
  }
}
