'use client'

import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { passwordStrength } from 'check-password-strength'


import {
  Upload as UploadIcon,
  Paperclip,
  X,
} from 'lucide-react'



/* ================= TYPES ================= */
type NamedDocument = {
  file: File
  name: string
}

type TooltipIconProps = {
  id: string
  content: string
}

type FormData = {
  firstName: string
  middleName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  username: string
  password: string
  confirmPassword: string
  supplierLegalName: string
  tradeName: string
  serviceTypes: string[]
  countryOfRegistration: string
  panTaxId: string
  websiteUrl: string
  tradeLicense: File | null
  registrationCert: File | null
  taxDocType: string
  taxRegistrationDoc: File | null
  otherDocs: NamedDocument[]

}
/* ================= CONSTANTS ================= */ 




  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const WEBSITE_REGEX =  /^([\w-]+\.)+[\w-]{2,}(\/.*)?$/i
  const STRONG_PASSWORD =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

  const blockClipboard = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault()
    }

    const blockContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
     e.preventDefault()
    }
    const TAX_FORMATS: Record<string,
    { label: string; placeholder: string; regex: RegExp; error: string }> = {
      GST: {
      label: 'GST Number',
      placeholder: 'Enter GST Number',
      regex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      error: 'Invalid GST number format',
    },
     PAN: {
      label: 'PAN Number',
      placeholder: 'Enter PAN Number',
      regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      error: 'Invalid PAN number format',
    },
      VAT: {
      label: 'VAT Number',
      placeholder: 'Enter VAT Number',
      regex: /^[A-Z0-9]{8,12}$/,
      error: 'Invalid VAT number format',
    },
  }

const labelClass = "text-[12px] font-medium text-[#1A1A1A]"; 
const errorTextClass = "text-[11px] font-semibold text-red-600";
const inputTextClass = "text-[12px] text-black";
const placeholderClass = "placeholder:text-[12px] placeholder:text-gray-400";
const footerButtonClass =  "flex-1 py-2 rounded text-white text-sm font-medium bg-[#00AFEF] text-white";
const MAX_FILE_SIZE_MB = 15
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
]

const inputClass = `h-[38px] w-full rounded border border-[#00AFEF] bg-white px-3 
   ${inputTextClass} ${placeholderClass} focus:outline-none`;

const COUNTRY_CODES = [
  { code: '+1', label: 'US' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'IN' },
  { code: '+61', label: 'AU' },
]

const REG_COUNTRIES = [
  'United States',
  'United Kingdom',
  'India',
  'Canada',
  'Australia',
  'Germany',
]
const dropdownInputClass =
  `${inputClass} flex items-center justify-between cursor-pointer`

const SERVICE_OPTIONS = [
  'Hotel',
  'Flight',
  'Transport',
  'Tour',
  'Visa',
  'Cruise',
]

/* ================= STEP INDICATOR ================= */
function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="w-full mb-4">
      {/* Circles */}
      <div className="flex items-center w-full">
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 1 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
        <div className="flex-1 h-[1px] bg-gray-300 mx-2" />
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 2 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
        <div className="flex-1 h-[1px] bg-gray-300 mx-2" />
        <div className={`h-2.5 w-2.5 rounded-full ${step === 3 ? 'bg-[#00afef]' : 'bg-gray-300'}`} />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[12px] text-gray-600 mt-1">
        <span className={step === 1 ? 'font-semibold text-[#00AFEF]' : ''}>
          General
        </span>
        <span className={step === 2 ? 'font-semibold text-[#00AFEF]' : ''}>
          Supplier Details
        </span>
        <span className={step === 3 ? 'font-semibold text-[#00AFEF]' : ''}>
          Documents
        </span>
      </div>
    </div>
  )
}

function PasswordStrengthMeter({
  strength,
}: {
  strength: { id: number; value: string } | null
}) {
  if (!strength) return null

  const config = [
    {
      width: 'w-1/4',
      bar: 'bg-red-400',
      text: 'text-red-600',
      message: 'Password too weak',
    },
    {
      width: 'w-1/2',
      bar: 'bg-orange-400',
      text: 'text-orange-600',
      message: 'Password stength weak',
    },
    {
      width: 'w-3/4',
      bar: 'bg-yellow-400',
      text: 'text-yellow-600',
      message: 'Password stength medium',
    },
    {
      width: 'w-full',
      bar: 'bg-green-400',
      text: 'text-green-600',
      message: 'Password stength strong',
    },
  ]

  const level = config[strength.id] ?? config[0]

  return (
    <div className="mt-2">
      {/* STRENGTH BAR */}
      <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
        <div
          className={`h-full ${level.width} ${level.bar} transition-all duration-500 ease-out`}
        />
      </div>

      {/* MESSAGE BELOW BAR */}
      <p className={`mt-1 text-[11px] font-bold ${level.text}`}>
        {level.message}
      </p>
    </div>
  )
}


export function TooltipIcon({ id, content }: TooltipIconProps) {
  return (
    <>
      <span
        data-tooltip-id={id}
        data-tooltip-content={content}
        className="text-[#00AFEF] text-[11px] font-semibold cursor-pointer"
      >
        ⓘ
      </span>
      <Tooltip
          id={id}
          place="top"
          style={{
          fontSize: '11px',
          padding: '6px 10px',
          borderRadius: '6px',
          backgroundColor: '#0f172a',
        }}
      />
    </>
  )
}
/* ================= MAIN ================= */
export default function SupplierSignup() {
      const router = useRouter()
      const dropdownRef = useRef<HTMLDivElement>(null)
      const serviceTriggerRef = useRef<HTMLDivElement>(null)
      const serviceDropdownRef = useRef<HTMLDivElement>(null)
      const [step, setStep] = useState<1 | 2 | 3>(1)
      const [error, setError] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const [passwordStrengthInfo, setPasswordStrengthInfo] = useState<{
              id: number
              value: string
            } | null>(null)

      const [serviceOpen, setServiceOpen] = useState(false)
      const [emailError, setEmailError] = useState('')
      const [confirmPasswordError, setConfirmPasswordError] = useState('')
      const [phoneError, setPhoneError] = useState('')
      const [taxIdError, setTaxIdError] = useState('')
      const [websiteError, setWebsiteError] = useState('')

  
      const [form, setForm] = useState<FormData>({
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          countryCode: '+1',
          phone: '',
          username: '',
          password: '',
          confirmPassword: '',
          supplierLegalName: '',
          tradeName: '',
          serviceTypes: [],
          countryOfRegistration: '',
          panTaxId: '',
          websiteUrl: '',
          tradeLicense: null,
          registrationCert: null,
          taxDocType: '',
          taxRegistrationDoc: null,
          otherDocs: [],
          })

  /* CLOSE SERVICE DROPDOWN */
  
    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node

    if (
      serviceTriggerRef.current &&
      !serviceTriggerRef.current.contains(target) &&
      serviceDropdownRef.current &&
      !serviceDropdownRef.current.contains(target)
    ) {
      setServiceOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)}, [])

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
  const { name, value } = e.target
  setForm(prev => ({ ...prev, [name]: value }))

  if (name === 'email') {
                  
      setEmailError('')
  }

  if (name === 'phone') {
    setPhoneError('')
  }
 //  Clear confirm password error as soon as user types
  if (name === 'confirmPassword') {
    setConfirmPasswordError('')
  }
  if (name === 'password') {
    // Reset state
    setConfirmPasswordError('')
  setPasswordStrengthInfo(null)
  setPasswordError('')

  if (!value) return
      // 1Pattern validation FIRST
      if (!STRONG_PASSWORD.test(value)) {
        setPasswordError(
          'Password must be at least 8 characters with uppercase, lowercase, number & symbol'
        )
        return
      }

      //  Strength validation SECOND
      const result = passwordStrength(value)
      setPasswordStrengthInfo(result)
    }

  }



    const getStrengthColor = (id: number) => {
      switch (id) {
        case 0:
          return 'text-red-500'
        case 1:
          return 'text-orange-500'
        case 2:
          return 'text-yellow-500'
        case 3:
          return 'text-green-600'
        default:
          return 'text-gray-400'
      }
    }


    const handlePasswordBlur = () => {
          if (!form.password) return

          // Pattern validation FIRST
          if (!STRONG_PASSWORD.test(form.password)) {
            setPasswordError(
              'Password must be at least 8 characters with uppercase, lowercase, number & symbol'
            )
            setPasswordStrengthInfo(null)
            return
          }

          //  Strength validation SECOND
          const result = passwordStrength(form.password)
          setPasswordStrengthInfo(result)

          if (result.id < 2) {
            setPasswordError('Password is too weak')
          } else {
            setPasswordError('')
          }
        }

    

  const handlePhoneBlur = () => {
  if (!form.phone) {
    setPhoneError('')
    return
  }

  const fullNumber = `${form.countryCode}${form.phone}`
  const phoneNumber = parsePhoneNumberFromString(fullNumber)

  if (!phoneNumber || !phoneNumber.isValid()) {
    setPhoneError('Please enter a valid phone number')
  } else {
    setPhoneError('')
  }
}

  const handleConfirmPasswordBlur = () => {
  if (!form.confirmPassword) {
    setConfirmPasswordError('')
    return
  }

  if (form.password !== form.confirmPassword) {
    setConfirmPasswordError('Passwords do not match')
  } else {
    setConfirmPasswordError('')
  }
}


const handleWebsiteBlur = () => {
  if (!form.websiteUrl) {
    setWebsiteError('')
    return
  }

  if (!WEBSITE_REGEX.test(form.websiteUrl)) {
    setWebsiteError('Please enter a valid website URL')
  } else {
    setWebsiteError('')
  }
}


  const handleEmailBlur = () => {
  if (!form.email) {
    setEmailError('')
    return
  }

  

  if (!EMAIL_REGEX.test(form.email)) {
    setEmailError('Please enter a valid email address')
  } else {
    setEmailError('')
  }
}

const handleTaxIdBlur = () => {
  if (!form.taxDocType || !form.panTaxId) {
    setTaxIdError('')
    return
  }

  const rule = TAX_FORMATS[form.taxDocType]
  if (!rule) return

  if (!rule.regex.test(form.panTaxId.toUpperCase())) {
    setTaxIdError(rule.error)
  } else {
    setTaxIdError('')
  }
}
const validatePhoneNumber = () => {
  const fullNumber = `${form.countryCode}${form.phone}`

  const phoneNumber = parsePhoneNumberFromString(fullNumber)

  if (!phoneNumber || !phoneNumber.isValid()) {
    return 'Please enter a valid phone number'
  }

  return ''
}
 const toggleService = (option: string) => {
  setForm(prev => ({
    ...prev,
    serviceTypes: prev.serviceTypes.includes(option)
      ? prev.serviceTypes.filter(o => o !== option)
      : [...prev.serviceTypes, option],
  }))
}



  const validateStep1 = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      return 'All mandatory fields must be filled'
    }
    if (!EMAIL_REGEX.test(form.email)) {
    setEmailError('Please enter a valid email address')
    return 'Invalid email address'
  }

  const phoneErr = validatePhoneNumber()
  if (phoneErr) {
    setPhoneError(phoneErr)
    return phoneErr
  }

  if (form.password !== form.confirmPassword) {
  setConfirmPasswordError('Passwords do not match')
  return 'Passwords do not match'
  }
    return ''
  }

  const hasFieldErrorsStep1 = () => {
  return Boolean(
    emailError ||
    phoneError ||
    passwordError ||
    confirmPasswordError
  )

  if (hasFieldErrorsStep1()) {
  return // silently block, no top error
}
}

  const validateStep2 = () => {
    if (
      !form.supplierLegalName ||
      !form.tradeName ||
      form.serviceTypes.length === 0 ||
      !form.countryOfRegistration ||
      // !form.panTaxId ||
      !form.websiteUrl
    ) {
      return 'All mandatory fields must be filled'
    }
      if (!WEBSITE_REGEX.test(form.websiteUrl)) {
    setWebsiteError('Please enter a valid website URL')
    return 'Please enter a valid website URL'
  }
    return ''
  }

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-4 pt-20">

       <div className="fixed top-0 left-0 w-full h-[70px] bg-white z-50 px-6 pt-4 border-b border-[#e5e7eb]">
      <img
        src="/images/final logo Bonhomiee.png"
        alt="Bonhomiee"
        className="h-[32px] w-auto"
      />
    </div>
        

        <div className="bg-white rounded-[4px] border border-[#f1f1f1] grid grid-cols-2 max-w-4xl w-full h-[85vh]">
          <div
            className="bg-cover bg-center h-full"
            style={{ backgroundImage: "url('/images/traveling-concept-with-landmarks.jpg.jpeg')" }}
          />
            <div className="h-full">
            <form className="p-6 text-sm flex flex-col h-[85vh]" >
                  {/* HEADER – FIXED */}
                      <div className="shrink-0">
                        <h2 className="text-base font-semibold text-center mb-1 text-[#00AFEF]">
                          Supplier Registration
                        </h2>

                      <StepIndicator step={step} />

                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3">
                          {error}
                        </div>
                      )}
                    </div>


            {/* body*/}
        <div className="flex-1 overflow-y-auto form-scroll overscroll-contain  pr-1 pb-2 space-y-3 " >

            {step === 1 && (
              <>
                <Input label="First Name" required placeholder="Enter first name" name="firstName" value={form.firstName} onChange={handleChange} />
                <Input label="Middle Name" placeholder="Enter middle name" name="middleName"   value={form.middleName} onChange={handleChange} />
                <Input label="Last Name" required placeholder="Enter last name" name="lastName"  value={form.lastName} onChange={handleChange} />

                <Input
                    label="Email"
                    required
                    placeholder="name@company.com"
                    name="email"
                    //autoComplete="off"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    tooltip="Enter a valid email address"
                  />
                  {emailError && (
                      <p className={errorTextClass}>ⓘ  {emailError}</p>
                  )}

                {/* PHONE */}
                <div className="flex flex-col gap-1">
                <label className={labelClass}>
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex h-[38px] rounded border border-[#00AFEF] bg-white">

                    <select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleChange}
                       className="h-full px-3 text-[12px] bg-transparent border-r border-[#9ec5e5] outline-none"
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.label} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      name="phone"                      
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handlePhoneBlur}
                      placeholder="Enter phone number"
                      className="flex-1 h-full px-3 text-[12px] text-black caret-black outline-none"
                      inputMode="numeric"
                    />
                  </div>
                </div>
                  {phoneError && (
                <p className={errorTextClass}>ⓘ  {phoneError}</p>
                  )}    
                <Input label="Username" required placeholder="Choose a username" name="username"  value={form.username} onChange={handleChange} />

                <Input
                   label="Password"
                    required
                    placeholder="Enter strong password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handlePasswordBlur}
                    onCopy={blockClipboard}
                    onCut={blockClipboard}
                    onPaste={blockClipboard}
                    onContextMenu={blockContextMenu}
                    showEye
                    tooltip="Password must be at least 8 characters with uppercase, lowercase, number & symbol"
                  />


                {passwordError && (
                  <p className={errorTextClass}>ⓘ {passwordError}</p>
                )}
                
                {form.password && !passwordError && (
                 <PasswordStrengthMeter strength={passwordStrengthInfo} />
                )}

                    

                  <Input
                      label="Re-Type Password"
                      required
                      placeholder="Re-enter password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleConfirmPasswordBlur}
                      onCopy={blockClipboard}
                      onCut={blockClipboard}
                      onPaste={blockClipboard}
                      onContextMenu={blockContextMenu}
                    />

                  {confirmPasswordError && (
                    <p className={errorTextClass}>ⓘ {confirmPasswordError}</p>
                  )}


                
                  </>
                )}

              {step === 2 && (
              <>
                <Input label="Supplier Legal Name" required placeholder="Registered legal name" name="supplierLegalName" value={form.supplierLegalName} onChange={handleChange} />
                <Input label="Trade Name" required placeholder="Business / brand name" name="tradeName" value={form.tradeName} onChange={handleChange} />

                {/* SERVICE TYPE */}
                <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
                <label className={labelClass}>
                Service Type <span className="text-red-500">*</span>
                </label>

              {/* INPUT AREA WITH CHIPS */}
             <div
                ref={serviceTriggerRef}
                className={`${inputClass} flex flex-wrap items-center gap-1 cursor-pointer`}
                onClick={() => setServiceOpen(prev => !prev)}
              >

                {form.serviceTypes.length === 0 && (
                  <span className="text-gray-400 text-[12px]">
                    Select service types
                  </span>
                )}

              {form.serviceTypes.map(type => (
                <span
                  key={type}
                  className="flex items-center gap-1 bg-white-100 text-gray-700 px-2 py-[2px] rounded-full text-[12px]"
                  onClick={e => e.stopPropagation()}
                >
                  {type}
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      toggleService(type)
                    }}
                   className="text-red-500 hover:text-red-700 hover:scale-110 transition font-bold"
                    aria-label="Remove service type"
                  >
                    ×
                  </button>
                </span>
              ))}

            <span className="ml-auto text-xs text-gray-500">▾</span>
          </div>

            {/* DROPDOWN LIST */}
          {serviceOpen && (
           <div
             ref={serviceDropdownRef}          
            className="mt-1 rounded border border-[#00AFEF] bg-white max-h-40 overflow-y-auto">
                {SERVICE_OPTIONS.map(option => {
                  const active = form.serviceTypes.includes(option)
                  return (
                    <div
                      key={option}
                      onClick={() => toggleService(option)}
                      className={`px-3 py-2 text-xs cursor-pointer transition-colors
                        ${
                          active
                            ? 'bg-blue-200 font-medium text-gray-900'
                            : 'bg-white'
                        }
                        hover:bg-blue-100`}
                        >
                        {option}
                    </div>
                      )
                    })}
              </div>
                  )}
                 </div>

                {/* COUNTRY */}
                <div className="flex flex-col gap-1">
                    <label className={labelClass}>
                      Country of Registration <span className="text-red-500">*</span>
                    </label>
                   <div className="relative">
                     <select
                        name="countryOfRegistration"
                        value={form.countryOfRegistration}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none bg-white cursor-pointer pr-8 focus:outline-none`}
                    >
                        <option value="" disabled hidden>Select country</option>
                        {REG_COUNTRIES.map(c => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                        ▾
                      </span>
                    </div>

                </div>

               

                <Input
                  label="Website URL"
                  required
                  placeholder="Company website"
                  name="websiteUrl"
                  value={form.websiteUrl}
                  onChange={e => {
                    handleChange(e)
                    setWebsiteError('')
                  }}
                  onBlur={handleWebsiteBlur}
                  tooltip="Example: www.company.com"
                />

                {websiteError && (
                <p className={errorTextClass}>ⓘ  {websiteError}</p>
                
                )}
             
              </>
            )}
           {step === 3 && (
            <>
              <FileInput
                label="Company Trade License"
                required
                file={form.tradeLicense}
                onChange={file =>
                  setForm(prev => ({ ...prev, tradeLicense: file }))
                }
              />

              <FileInput
                label="Company Registration Certificate"
                required
                file={form.registrationCert}
                onChange={file =>
                  setForm(prev => ({ ...prev, registrationCert: file }))
                }
              />

            {/* PANEL TITLE */}
            <label className={labelClass}>
              Tax Document Details <span className="text-red-500">*</span>
            </label>

            <div className="border-2 border-dashed border-[#00AFEF] rounded bg-white p-4 flex flex-col gap-4">

            {/* TAX DOCUMENT TYPE */}
            <div className="flex flex-col gap-1">
              <label className={labelClass}>
                  Tax Document Type
                </label>

              <div className="relative">
            <select
                name="taxDocType"
                value={form.taxDocType}
                onChange={e => {
                  const value = e.target.value

                  setForm(prev => ({
                    ...prev,
                    taxDocType: value,
                    panTaxId: '',                 
                    taxRegistrationDoc: null,     
                  }))

                  setTaxIdError('')               
                }}
                className={`${inputClass} appearance-none bg-white cursor-pointer pr-8 focus:outline-none`}>
                <option value="" disabled hidden>
                  Select document type
                </option>
                <option value="GST">GST</option>
                <option value="PAN">PAN</option>
                <option value="VAT">VAT</option>
                </select>

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                  ▾
                </span>
              </div>


            </div>

          {/* TAX NUMBER + UPLOAD (ONLY WHEN TYPE SELECTED) */}
          {form.taxDocType && (
            <>
              {/* TAX NUMBER */}
              <Input
                label={`${form.taxDocType} Number`}
                required
                placeholder={`Enter ${form.taxDocType} Number`}
                name="panTaxId"
                value={form.panTaxId}
                onChange={e => {
                  setForm(prev => ({
                    ...prev,
                    panTaxId: e.target.value.toUpperCase(),
                  }))
                  setTaxIdError('')
                }}
                onBlur={handleTaxIdBlur}
              />

              {taxIdError && (
                <p className={errorTextClass}>ⓘ {taxIdError}</p>
             
              )}

              {/* FILE UPLOAD */}
              <FileInput
                label={`Upload ${form.taxDocType} Document`}
                required
                file={form.taxRegistrationDoc}
                onChange={file =>
                  setForm(prev => ({ ...prev, taxRegistrationDoc: file }))
                }
              />
            </>
          )}

      </div>


        <MultiFileInput
          label="Other Documents"
          files={form.otherDocs}
          onChange={files =>
            setForm(prev => ({ ...prev, otherDocs: files }))
          }
        />   
      </>
      )}

          </div>
        

          {/* FOOTER – FIXED */}
      <div className="shrink-0 pt-4  border-gray-200">
            {step === 1 && (
            <div className="flex justify-between gap-4 pt-4">

                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className={`${footerButtonClass} bg-[#E62800]`}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                    // 1. Mandatory fields only
                    const err = validateStep1()
                    if (err) {
                      setError(err)
                      return
                    }

                    // 2. Block if any field-level error exists
                    if (hasFieldErrorsStep1()) {
                      return // silently block, no top error
                    }

                    setError('')
                    setStep(2)
                  }}
                  className={`${footerButtonClass} bg-[#00afef]` }
                  >
                    Next
                </button>
                                
                </div>
                 )}

              {step === 2 && (
              <div className="flex justify-between gap-4 pt-4">

                    <button
                    type="button"
                    onClick={() => {
                     
                      setPasswordError('')
                      setError('')
                      setStep(1)
                    }}
                     className={`${footerButtonClass} bg-[#FBAE30]`}>
                    Back
                  </button>


                  <button
                    type="button"
                    onClick={() => {
                      const err = validateStep2()
                      if (err) return setError(err)
                      setError('')
                      setStep(3)

                    }}
                     className={`${footerButtonClass} bg-[#00afef]`}
                  >
                    Next
                  </button>
                </div>
              )}

          {step === 3 && (
           <div className="flex justify-between gap-4 pt-4">

          <button
            type="button"
            onClick={() => setStep(2)}
             className={`${footerButtonClass} bg-[#FBAE30]`}
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => {
              if (
                   !form.tradeLicense ||
                    !form.registrationCert ||
                    !form.taxDocType ||
                    !form.panTaxId ||
                    taxIdError ||
                    !form.taxRegistrationDoc
                  ) {
               return setError('Please complete all tax details correctly')
              }

              setError('')
              router.push('/')
            }}
             className={`${footerButtonClass} bg-[#00afef]`}
          >
            Register
          </button>
        </div>
       )}
      </div>
     
      </form>
      </div>
      </div>

      <style jsx>{`
          .form-scroll {
            scrollbar-width: thin;
            scrollbar-color: #cfddeb transparent;
          }

          .form-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .form-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .form-scroll::-webkit-scrollbar-thumb {
            background-color: #00AFEF ;
            border-radius: 10px;
          }

          .form-scroll::-webkit-scrollbar-thumb:hover {
            background-color: #00AFEF ;
          }
`}</style> 
    </main>
  )
}

/* ================= INPUT ================= */
    function Input({
      label,
      required = false,
      tooltip,
      showEye = false,
      type = 'text',
      name,
      ...props
    }: {
      label: string
      required?: boolean
      tooltip?: string
      showEye?: boolean
    } & React.InputHTMLAttributes<HTMLInputElement>) {
      const [show, setShow] = useState(false)
      const tooltipId = `tooltip-${name}`
      return (
        <div className="flex flex-col gap-1">
          <label className={`${labelClass} flex items-center gap-1`}>
            {label} {required && <span className="text-red-500">*</span>}

            {tooltip && (
              <TooltipIcon
              id={`tooltip-${name}`}
              content={tooltip}
            />
            )}

          </label>

          <div className="relative">
            <input
              {...props}
              name={name}  
              
              type={showEye && show ? 'text' : type}
              className={`${inputClass} pr-9`} 
            />
            {showEye && (
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                👁
              </button>
            )}
          </div>
        </div>
      )
    }

    function FileInput({
      label,
      required,
      file,
      onChange,
    }: {
      label: string
      required?: boolean
      file?: File | null
      onChange: (file: File | null) => void
    }) {
      const [error, setError] = useState('')

      const handleFileChange = (file: File | null) => {
        if (!file) {
          setError('')
          onChange(null)
          return
        }

        //  File type validation
        if (!ALLOWED_TYPES.includes(file.type)) {
          setError('Only PDF or JPG files are allowed')
          return
        }

        //  File size validation
        const fileSizeMB = file.size / (1024 * 1024)
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          setError('File size must be less than 15 MB')
          return
        }

        //  Valid file
        setError('')
        onChange(file)
      }

      return (
        <div className="flex flex-col gap-1">
        <label className={labelClass}>

            {label} {required && <span className="text-red-500">*</span>}
          </label>

          <div className="border-2 border-dashed border-[#00AFEF] rounded bg-white p-2 hover:border-blue-400 transition">
            {!file ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <UploadIcon
                className="h-5 w-5 text-blue-500"
                strokeWidth={1.5}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    Click to upload
                  </span>
                  <span className="text-xs text-gray-500">
                    PDF / JPG up to 15MB
                  </span>
                </div>

                <input
                  type="file"
                  hidden
                  accept=".pdf,.jpg,.jpeg"
                  onChange={e =>
                    handleFileChange(e.target.files?.[0] || null)
                  }
                />
              </label>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Paperclip className="h-4 w-4 text-gray-500 shrink-0" />
                <span className="truncate max-w-[200px]">{file.name}</span>
            </div>
                <button
              type="button"
              onClick={() => handleFileChange(null)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Remove file"
              >
              <X className="h-4 w-4" />
              </button>
              </div>
              )}
            </div>
            

          {/*  Error message */}
          {error && (
            <p className="text-red-500 text-[11px] mt-1">{error}</p>
          )}
        </div>
      )
    }




    function MultiFileInput({
      label,
      files,
      maxFiles = 5,
      onChange,
    }: {
      label: string
    files: NamedDocument[]
      maxFiles?: number
      onChange: (files: NamedDocument[]) => void
    }) {
      const [error, setError] = useState('')
      const [open, setOpen] = useState(false)
      const [tempFiles, setTempFiles] = useState<File[]>([])
      const fileInputRef = useRef<HTMLInputElement>(null)
      const tooltipId = 'other-docs-tooltip' 
      const [popupError, setPopupError] = useState('')
      const [documentName, setDocumentName] = useState('')
      const documentNameRef = useRef<HTMLInputElement>(null)

      const handlePopupFileChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const fileList = e.target.files
      if (!fileList || fileList.length === 0) return

      const filesArray = Array.from(fileList)

      //  File type validation
      const invalidType = filesArray.find(
        file => !ALLOWED_TYPES.includes(file.type)
      )
      if (invalidType) {
        setPopupError('Only PDF or JPG files are allowed')
        e.target.value = ''
        return
      }

      //  File size validation
      const oversized = filesArray.find(
        file => file.size / (1024 * 1024) > MAX_FILE_SIZE_MB
      )
      if (oversized) {
        setPopupError('Each file must be less than 15 MB')
        e.target.value = ''
        return
      }

      //  Valid files
      setPopupError('')
      setTempFiles(filesArray)
    }




    useEffect(() => {
    if (open) {
      setTempFiles([])
      setDocumentName('')
      setPopupError('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [open])




  const addFiles = () => {
  // 1️ Document name required
  if (!documentName.trim()) {
    setPopupError('Please enter document name')
    documentNameRef.current?.focus()
    return
  }

  // 2️⃣Files mandatory
  if (tempFiles.length === 0) {
    setPopupError('Please upload at least one document')
    return
  }


  // 2️ Duplicate file check vs existing list
  const existingFileNames = files.map(
    doc => doc.file.name.toLowerCase()
  )
  const existingDocNames = files.map(
  doc => doc.name.toLowerCase()
)

if (existingDocNames.includes(documentName.trim().toLowerCase())) {
  setPopupError('Document with same name has already been uploaded')
  return
}
  const duplicate = tempFiles.find(file =>
    existingFileNames.includes(file.name.toLowerCase())
  )

  if (duplicate) {
    setPopupError(`File "${duplicate.name}" is already uploaded`)
    return
  }

  // 3️ File type validation
  const invalidType = tempFiles.find(
    file => !ALLOWED_TYPES.includes(file.type)
  )

  if (invalidType) {
    setPopupError('Only PDF or JPG files are allowed')
    return
  }

  // 4️ File size validation
  const oversized = tempFiles.find(
    file => file.size / (1024 * 1024) > MAX_FILE_SIZE_MB
  )

  if (oversized) {
    setPopupError('Each file must be less than 15 MB')
    return
  }

  // 5️ Max file count
  if (files.length + tempFiles.length > maxFiles) {
    setPopupError(`Maximum ${maxFiles} documents allowed`)
    return
  }

  //  SUCCESS
  const newDocs: NamedDocument[] = tempFiles.map(file => ({
    file,
    name: documentName.trim(),
  }))

  onChange([...files, ...newDocs])

  setTempFiles([])
  setDocumentName('')
  setPopupError('')
  setOpen(false)
}



  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <>
      {/* LABEL + BUTTON */}
      <div className="flex items-center justify-between">
    <label className={`${labelClass} flex items-center gap-1`}>
  {label}

  <span
    data-tooltip-id={tooltipId}
    data-tooltip-content="You can upload maximum five documents"
    className="text-blue-500 text-[11px] font-semibold cursor-pointer"
  >
    ⓘ
  </span>
</label>


<Tooltip
  id={tooltipId}
  place="top"
  style={{
    fontSize: '11px',
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: '#0f172a',
  }}
/>

        <button
          type="button"
          onClick={() => 
          {
            setPopupError('')
            setOpen(true)}
          }
          disabled={files.length >= maxFiles}
          className="px-3 py-1.5 rounded border border--[#00AFEF] text-[#00AFEF] text-sm hover:bg-blue-50 disabled:opacity-50"
        >
          Upload
        </button>
      </div>

      {/* FILE LIST */}
      <div className="border border-[#00AFEF] rounded bg-white p-3">
        {files.length === 0 ? (
          <p className="text-xs text-gray-400">
            No documents uploaded ({files.length}/{maxFiles})
          </p>
        ) : (
          <div className="space-y-2">
         {files.map((doc, index) => (
  <div
    key={index}
    className="flex items-start justify-between bg-gray-50 rounded px-3 py-2 text-sm"
  >
    <div className="flex gap-2 truncate">
      <Paperclip className="h-4 w-4 text-gray-500 mt-1 shrink-0" />

      <div className="flex flex-col truncate">
        <span className="font-medium text-gray-800 truncate max-w-[220px]">
          {doc.name}
        </span>
        <span className="text-[11px] text-gray-500 truncate max-w-[220px]">
          {doc.file.name}
        </span>
      </div>
    </div>

    <button
      type="button"
      onClick={() => removeFile(index)}
      className="text-gray-400 hover:text-gray-600"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
))}

          </div>
        )}
      </div>

      

      {/* POPUP PANEL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
         
            <div className="bg-white rounded-[4px] w-[360px] p-4 border border-[#f1f1f1]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-[#00AFEF]">
              Upload Documents
            </h3>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
  </div>
           {/* Document Name Input */}
  <div className="flex flex-col gap-1 mb-4">
  <label className={labelClass}>

    Document Name <span className="text-red-500">*</span>
  </label>
  <input
  ref={documentNameRef}
  type="text"
  value={documentName}
  onChange={e => {
    setDocumentName(e.target.value)
    if (popupError) setPopupError('')
  }}
  className="h-[38px] w-full rounded border border-[#9ec5e5] bg-white px-3 text-[12px]  focus:outline-none
  focus:border-[#00AFEF] focus:ring-0"/>


</div>

{/* BODY – Upload box */}
<div
  className="border-2 border-dashed border-[#00AFEF] rounded bg-white p-4 hover:border-blue-400 transition cursor-pointer"
  onClick={() => {
  if (!documentName.trim()) {
    setPopupError('Please enter document name first')
    documentNameRef.current?.focus()
    return
  }

  setPopupError('')
  fileInputRef.current?.click()
}}

>
  <div className="flex items-center gap-3">
    <UploadIcon
      className="h-6 w-6 text-blue-500"
      strokeWidth={1.5}
    />

    <div className="flex flex-col text-left">
      <span className="text-sm font-medium text-gray-800">
        Click to upload documents
      </span>
      <span className="text-xs text-gray-500">
        PDF / JPG up to 15MB (Max {maxFiles})
      </span>
    </div>
  </div>

  {/* Hidden file input */}

<input
  ref={fileInputRef}
  type="file"
  hidden
  multiple
  accept=".pdf,.jpg,.jpeg"
  onChange={handlePopupFileChange}
/>

</div>


{/* FILE LIST PREVIEW (inside popup) */}
{tempFiles.length > 0 && (
  <div className="mt-3 space-y-2">
    {tempFiles.map((file, index) => (
      <div
        key={index}
        className="flex items-start justify-between bg-gray-50 rounded px-3 py-2 text-sm"
      >
        <div className="flex gap-2 truncate">
          <Paperclip className="h-4 w-4 text-gray-500 mt-1 shrink-0" />

          <div className="flex flex-col truncate">
            <span className="font-medium text-gray-800 truncate max-w-[220px]">
              {documentName}
            </span>
            <span className="text-[11px] text-gray-500 truncate max-w-[220px]">
              {file.name}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


{popupError && (
  <p className="text-red-500 text-[11px] mt-2">
    {popupError}
  </p>
)}


  {/* FOOTER */}
  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="px-3 py-1.5 text-sm text-white border rounded bg-[#E62800]"
    >
      Cancel
    </button>

  <button
  type="button"
  onClick={addFiles}
  disabled={tempFiles.length === 0 || !documentName.trim()}
  className="px-3 py-1.5 text-sm rounded bg-[#00afef] text-white disabled:opacity-50"
>
  Save
</button>


  </div>
  </div>
  <Tooltip
  id="doc-name-tooltip"
  place="top"
  style={{
    fontSize: '11px',
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: '#0f172a',
  }}
/>

        </div>
      )}
    </>
  )
}

