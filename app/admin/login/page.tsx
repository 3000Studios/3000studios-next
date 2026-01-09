'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    })

    if (!res.ok) {
      setError('Invalid admin key')
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-xl font-bold tracking-widest">
          ADMIN ACCESS
        </h1>

        <input
          type="password"
          placeholder="Admin key"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 focus:outline-none"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-white text-black font-bold tracking-widest disabled:opacity-50"
        >
          {loading ? 'VERIFYING…' : 'LOGIN'}
        </button>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
      </div>
    </div>
  )
}
