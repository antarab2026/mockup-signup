'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  emailId: string
  mobileNo: string
  organisationId: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MOBILE_REGEX = /^[0-9]{10,15}$/ // supports 10–15 digits

export default function CorporateSignup() {
  const router = useRouter()
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    emailId: '',
    mobileNo: '',
    organisationId: '',
  })

  /* INPUT HANDLER */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /* VALIDATION */
  const validateForm = () => {
    if (!form.emailId || !form.mobileNo || !form.organisationId) {
      return 'All mandatory fields must be filled'
    }

    if (!EMAIL_REGEX.test(form.emailId)) {
      return 'Invalid email format'
    }

    if (!MOBILE_REGEX.test(form.mobileNo)) {
      return 'Invalid mobile number'
    }

    return ''
  }

  /* SUBMIT */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateForm()
    if (err) {
      setError(err)
      return
    }

    setError('')
    router.push('/') // same behavior as existing form
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg grid grid-cols-2 overflow-hidden min-h-[500px]">

        {/* LEFT IMAGE */}
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: "url('/images/travel.jpg')" }}
        />

        <form onSubmit={handleSubmit} className="p-8 space-y-4 text-xs">
          <h2 className="text-xl font-semibold">Corporate Registration</h2>

          {error && (
            <div
              role="alert"
              className="bg-red-100 border border-red-400 px-4 py-2 rounded-md text-xs font-medium text-red-700"
            >
              {error}
            </div>
          )}

          <Input
            label="Email ID *"
            name="emailId"
            value={form.emailId}
            onChange={handleChange}
          />

          <Input
            label="Mobile No *"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
          />

          <Input
            label="Organisation ID *"
            name="organisationId"
            value={form.organisationId}
            onChange={handleChange}
          />

          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-8 py-2 bg-gray-300 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-gray-300 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

/* INPUT COMPONENT — SAME AS ATTACHED FORM */
function Input({
  label,
  ...props
}: {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const isRequired = label.includes('*')

  return (
    <div className="flex flex-col">
      <label className="font-medium text-xs mb-1">
        {label.replace('*', '')}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input {...props} className="border rounded px-2 py-1.5" />
    </div>
  )
}
