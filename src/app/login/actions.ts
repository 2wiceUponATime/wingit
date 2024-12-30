'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { Provider } from '@supabase/supabase-js';

const basePath = process.env.NODE_ENV == 'production' ?
  process.env.PRODUCTION_URL :
  'http://localhost:3000';
if (!basePath) {
  throw new ReferenceError('env: PRODUCTION_URL not configured');
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/private', 'layout')
  redirect('/private')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

async function signInWithOauth(provider: Provider): Promise<never> {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${basePath}/auth/callback`,
    }
  })

  if (error) {
    redirect('/error');
  }

  redirect(data.url);
}

export async function signInWithGithub() {
  return await signInWithOauth('github');
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/login', 'layout');
  redirect('/login');
}