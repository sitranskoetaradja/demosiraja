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

export async function deleteUser(userId:string) {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Gagal menghapus pengguna:', error.message);
    return { success: false, error: error.message };
  } else {
    console.log('Pengguna berhasil dihapus:', data);
    return { success: true, data };
  }
}
