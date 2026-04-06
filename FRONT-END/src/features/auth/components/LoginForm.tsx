
import { useState } from 'react'
import { Alert } from '@/shared/components/feedback'
import { Button, Checkbox, FormField, Input } from '@/shared/components/ui'

export function LoginForm() {

  const [remember, setRemember] = useState(false)

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <Alert variant="error" title="Demo error">
          Invalid email or password.
        </Alert>

        <FormField label="Email" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </FormField>

        <FormField label="Password" htmlFor="password" required>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </FormField>

        <div className="flex items-center justify-between gap-3">
          <Checkbox
            id="remember"
            label="Remember me"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />

          <button
            type="button"
            className="text-sm font-medium text-gray-900 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
    </div>
  )
}