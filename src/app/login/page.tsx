import { redirect } from 'next/navigation';
import { login, signInWithGithub, logout, signup } from './actions'
import { createClient } from '@/utils/supabase/server'

export default async function LoginPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    redirect('/error');
  }
    
  if (data?.session) {
    return (
      <form>
        <button formAction={logout}>Log out</button>
      </form>
    )
  }

  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label> &nbsp;
        <input id="email" name="email" type="email" required /> <br/>
        <label htmlFor="password">Password:</label> &nbsp;
        <input id="password" name="password" type="password" required /> <br/>
        <button formAction={login}>Log in with email</button> &nbsp;
        <button formAction={signup}>Sign up with email</button>
      </form>
      <form>
        <button formAction={signInWithGithub}>Log in with GitHub</button>
      </form>
    </div>
  )
}