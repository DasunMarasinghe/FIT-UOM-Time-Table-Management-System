import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { demoSignIn } from '../services/demoAuth'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const errorDialog = useRef<HTMLDialogElement>(null)
  const helpDialog = useRef<HTMLDialogElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    const trimmedEmail = email.trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let emailError = ''

    if (!trimmedEmail) {
      emailError = 'Please enter your email address.'
    } else if (!emailPattern.test(trimmedEmail)) {
      emailError = 'Please enter a valid email address.'
    }

    const passwordError = password
      ? ''
      : 'Please enter your password.'

    setErrors({
      email: emailError,
      password: passwordError,
    })

    if (emailError || passwordError) return

    setLoading(true)

    try {
      const success = await demoSignIn(trimmedEmail, password)

      if (success) {
        navigate('/dashboard', { replace: true })
      } else {
        errorDialog.current?.showModal()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand" aria-label="Faculty information">
        <header className="login-brand-header">
          <img
            src="/images/uom-logo.png"
            alt="University of Moratuwa crest"
            className="login-logo"
            width="61"
            height="64"
          />

          <div>
            <p className="login-university">University of Moratuwa</p>
            <p className="login-faculty">
              Faculty of Information Technology
            </p>
          </div>
        </header>

        <div className="login-brand-message">
          <img
            src="/images/calendar-month.svg"
            alt=""
            className="login-calendar"
          />

          <h1>
            University Timetable &amp; Lecturer Allocation Management System
          </h1>

          <p>
            A centralized platform for managing academic timetables,
            lecturer allocations, lecture halls, and schedule updates.
          </p>
        </div>

        <footer>Developed by Team VERTEX | 2026</footer>
      </section>

      <section className="login-form-area" aria-label="Sign in">
        <div className="login-form-wrapper">
          <div className="login-card">
            <h2>Welcome back</h2>

            <p className="login-subtitle">
              Sign in to access your faculty timetable.
            </p>

            <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
              <div className="login-field">
                <label htmlFor="login-email">Email Address</label>

                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  placeholder="Enter your university email"
                  value={email}
                  disabled={loading}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'login-email-error' : undefined
                  }
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setErrors((previous) => ({
                      ...previous,
                      email: '',
                    }))
                  }}
                />

                {errors.email && (
                  <p
                    id="login-email-error"
                    className="login-field-error"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Enter Password</label>

                <div className="login-password-wrapper">
                  <input
                    ref={passwordInput}
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter Your Password"
                    value={password}
                    disabled={loading}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? 'login-password-error' : undefined
                    }
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setErrors((previous) => ({
                        ...previous,
                        password: '',
                      }))
                    }}
                  />

                  <button
                    type="button"
                    className="login-eye-button"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    aria-pressed={showPassword}
                    disabled={loading}
                    onClick={() => {
                      setShowPassword((previous) => !previous)
                    }}
                  >
                    <img src="/images/eye.svg" alt="" />
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="login-password-error"
                    className="login-field-error"
                    role="alert"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="login-forgot-row">
                <button
                  type="button"
                  className="login-text-button"
                  onClick={() => helpDialog.current?.showModal()}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>

              <p className="login-authorized">
                Authorized faculty users only
              </p>
            </form>
          </div>

          <p className="login-demo-note">
            Demo mode — use the test credentials provided in the guide.
          </p>
        </div>
      </section>

      <dialog
        ref={errorDialog}
        className="login-dialog"
        aria-labelledby="login-error-title"
        aria-describedby="login-error-description"
        onClose={() => passwordInput.current?.focus()}
      >
        <h2 id="login-error-title">Unable to sign in</h2>

        <p id="login-error-description">
          The email or password is incorrect. Check your details and try
          again.
        </p>

        <form method="dialog">
          <button type="submit" autoFocus>
            Try again
          </button>
        </form>
      </dialog>

      <dialog
        ref={helpDialog}
        className="login-dialog"
        aria-labelledby="login-help-title"
      >
        <h2 id="login-help-title">Password reset unavailable</h2>

        <p>
          Password recovery is not connected yet. For this demo, use
          demo@uom.example and password Demo123!
        </p>

        <form method="dialog">
          <button type="submit" autoFocus>
            Close
          </button>
        </form>
      </dialog>
    </main>
  )
}