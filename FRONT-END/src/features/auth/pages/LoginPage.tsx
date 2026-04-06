


import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">
        <LoginForm />
      </div>
    </main>
  )
}