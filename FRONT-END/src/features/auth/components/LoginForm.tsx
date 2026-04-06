import { useState } from 'react'
import { Alert } from '@/shared/components/feedback'
import { Button, Checkbox, FormField, Input, Label } from '@/shared/components/ui'

export function LoginForm() {
  const [remember, setRemember] = useState(false)

  return (
    <div className="rounded-xl border border-neutral-gray bg-white p-8 shadow-xl shadow-primary/5">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-main">Sign In</h2>
        <p className="mt-1 text-sm text-text-muted">
          Access your industrial assets dashboard
        </p>
      </div>

      <form className="flex flex-col gap-5">
        

        <FormField label="Email or Username" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            placeholder="m.smith@facility.com"
            autoComplete="email"
          />
        </FormField>

        <FormField label="Password" htmlFor="password" required>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
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
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth >
          Sign In
        </Button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-3 border-t border-neutral-gray/50 pt-6">
        <p className="text-xs text-text-muted">Engineering Team Portal © 2024</p>
      </div>
    </div>
  )
}