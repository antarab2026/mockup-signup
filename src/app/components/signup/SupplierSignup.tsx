'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type FormData = {
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  username: string
  password: string
  confirmPassword: string
  supplierLegalName: string
  tradeName: string
  serviceTypes: string[]
  country: string
  taxId: string
  website: string
  complianceFile: File | null
}

type FormErrors = Partial<Record<keyof FormData, string>>

const SERVICE_TYPES = ['Hotel', 'Flight', 'Transport', 'Tour', 'Visa', 'Cruise']

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'India',
  'Canada',
  'Australia',
  'Germany',
]

const STRONG_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg']
const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

export default function SupplierSignup() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [serviceOpen, setServiceOpen] = useState(false)
  const serviceRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    supplierLegalName: '',
    tradeName: '',
    serviceTypes: [],
    country: '',
    taxId: '',
    website: '',
    complianceFile: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
   const [fileInputKey, setFileInputKey] = useState(0);
  /* CLOSE SERVICE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* CLEAR ERROR WHILE TYPING */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  /* FILE HANDLER */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (!file) {
      setForm((prev) => ({ ...prev, complianceFile: null }))
      return
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        complianceFile: 'Only PDF or JPG files are allowed',
      }))
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        complianceFile: 'File size must be less than 20MB',
      }))
      return
    }

    setForm((prev) => ({ ...prev, complianceFile: file }))
    setErrors((prev) => ({ ...prev, complianceFile: undefined }))
  }

  const validateStep1 = () => {
    const e: FormErrors = {}
    if (!form.firstName) e.firstName = 'Required'
    if (!form.lastName) e.lastName = 'Required'
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = 'Invalid email'
    if (!form.phone) e.phone = 'Required'
    if (!form.username) e.username = 'Required'
    if (!STRONG_PASSWORD.test(form.password))
      e.password = 'Weak password'
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: FormErrors = {}
    if (!form.supplierLegalName) e.supplierLegalName = 'Required'
    if (!form.tradeName) e.tradeName = 'Required'
    if (form.serviceTypes.length === 0)
      e.serviceTypes = 'Select at least one'
    if (!form.country) e.country = 'Required'
    if (!form.taxId) e.taxId = 'Required'
    if (!form.website) e.website = 'Required'
    if (!form.complianceFile) e.complianceFile = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg grid grid-cols-2 overflow-hidden">
        {/* LEFT IMAGE */} 
        <div className="bg-cover bg-center" style={{ backgroundImage: "url('/images/travel.jpg')" }} />

        
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            <h2 className="text-xl font-semibold">
              Supplier Registration – Step {step}
            </h2>

            {step === 1 && (
              <>
                <div className="grid grid-cols-1 gap-3">
                  <Input label="First Name *" name="firstName" value={form.firstName} error={errors.firstName} onChange={handleChange} />
                  <Input label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} />
                  <Input label="Last Name *" name="lastName" value={form.lastName} error={errors.lastName} onChange={handleChange} />
                  <Input label="Email *" name="email" value={form.email} error={errors.email} onChange={handleChange} />
                  <Input label="Phone *" name="phone" value={form.phone} error={errors.phone} onChange={handleChange} />
                  <Input label="Username *" name="username" value={form.username} error={errors.username} onChange={handleChange} />
                  <Input
                    type="password"
                    label="Password *"
                    name="password"
                    value={form.password}
                    error={errors.password}
                    onChange={handleChange}
                    tooltip="Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
                  />
                  <Input
                    type="password"
                    label="Retype Password *"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <button type="button" onClick={() => router.push('/')} className="px-8 py-2 bg-gray-300 rounded-full">Cancel</button>
                  <button type="button" onClick={() => validateStep1() && setStep(2)} className="px-8 py-2 bg-gray-300 rounded-full">Next</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-1 gap-3">
                  <Input label="Legal Business Name *" name="supplierLegalName" value={form.supplierLegalName} error={errors.supplierLegalName} onChange={handleChange} />
                  <Input label="Trade Name *" name="tradeName" value={form.tradeName} error={errors.tradeName} onChange={handleChange} />

                {/* SERVICE TYPES (MULTI-SELECT DROPDOWN LIKE COUNTRY) */}
{/* SERVICE TYPES — MULTI-SELECT LIKE COUNTRY (NO CHECKBOXES) */}
<div ref={serviceRef}>
  <label className="font-medium text-xs mb-1 flex items-center gap-1">
    Service Types <span className="text-red-500">*</span>

    <span
      title="You can select multiple service types"
      className="w-4 h-4 rounded-full border border-gray-400 text-gray-500
                 text-[10px] flex items-center justify-center cursor-help"
    >
      ?
    </span>
  </label>

  {/* SELECT-LIKE BUTTON */}
  <button
    type="button"
    onClick={() => setServiceOpen((v) => !v)}
    className={`w-full border rounded px-2 py-2 text-left bg-white flex justify-between items-center ${
      errors.serviceTypes ? 'border-red-500' : 'border-gray-300'
    }`}
  >
    <span className="truncate">
      {form.serviceTypes.length
        ? form.serviceTypes.join(', ')
        : 'Select service types'}
    </span>
    <span className="text-gray-500 text-xs">▼</span>
  </button>

  {/* DROPDOWN OPTIONS */}
  {serviceOpen && (
    <div className="mt-1 border rounded bg-white shadow max-h-48 overflow-y-auto">
      {SERVICE_TYPES.map((type) => {
        const selected = form.serviceTypes.includes(type)

        return (
          <div
            key={type}
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                serviceTypes: selected
                  ? prev.serviceTypes.filter((t) => t !== type)
                  : [...prev.serviceTypes, type],
              }))
            }
            className={`px-3 py-2 text-xs cursor-pointer
              hover:bg-gray-100
              ${selected ? 'bg-gray-200 font-medium' : ''}
            `}
          >
            {type}
          </div>
        )
      })}
    </div>
  )}

  {errors.serviceTypes && (
    <span className="text-xs text-red-500">
      {errors.serviceTypes}
    </span>
  )}
</div>



                  <div>
                    <label className="font-medium text-xs mb-1 block">Country *</label>
                    <select name="country" value={form.country} onChange={handleChange} className="border w-full rounded px-2 py-2">
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    {errors.country && <span className="text-xs text-red-500">{errors.country}</span>}
                  </div>

                  <Input label="Tax ID *" name="taxId" value={form.taxId} error={errors.taxId} onChange={handleChange} />

                 

                  <Input label="Website *" name="website" value={form.website} error={errors.website} onChange={handleChange} />
                 {/* COMPLIANCE FILE */}
                  <div className="md:col-span-2">
                <label className="label">
                  Compliance Certificate 
                </label>
               <input
  key={fileInputKey}
  type="file"
  multiple
  onChange={handleFileChange}
  className="w-full text-sm
             border border-gray-300 rounded-md
             file:mr-3
             file:py-2
             file:px-4
             file:border-0
             file:rounded-md
             file:bg-sky-500
             file:text-white
             hover:file:bg-sky-600
             cursor-pointer"
/>

              </div>
                
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <button type="button" onClick={() => setStep(1)} className="px-8 py-2 bg-gray-300 rounded-full">Back</button>
                  <button type="submit" className="px-8 py-2 bg-gray-300 rounded-full">Submit</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    
  )
}

/* INPUT COMPONENT */
function Input({
  label,
  error,
  tooltip,
  ...props
}: {
  label: string
  error?: string
  tooltip?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const isRequired = label.includes('*')

  return (
    <div className="flex flex-col">
      <label className="font-medium text-xs mb-1 flex gap-1">
        {label.replace('*', '')}
        {isRequired && <span className="text-red-500">*</span>}
        {tooltip && (
          <span title={tooltip} className="w-4 h-4 border rounded-full text-[10px] flex items-center justify-center cursor-help">?</span>
        )}
      </label>
      <input {...props} className={`border rounded px-2 py-1.5 ${error ? 'border-red-500' : 'border-gray-300'}`} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
