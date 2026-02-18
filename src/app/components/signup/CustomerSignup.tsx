"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
//import { Eye, EyeOff, AlertCircle } from "lucide-material";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import Image from "next/image";
import type { JSX } from "react";
import { passwordStrength } from "check-password-strength";

/* TYPES */
type FormType = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type ErrorType = {
  [key: string]: string;
};

/* TOOLTIP COMPONENT */
const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative group inline-block ml-2">
    <span className="text-[#00AFEF] text-xs cursor-help">ⓘ</span>
    <div className="
      absolute bottom-full left-0 mb-2
      hidden group-hover:block z-50
      min-w-[220px] max-w-[300px]
      bg-gray-900 text-white text-xs
      px-3 py-2 rounded-lg shadow-lg
      whitespace-normal break-words
      leading-relaxed
    ">
      {text}
    </div>
  </div>
);

/* ERROR MESSAGE COMPONENT */
const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <p className="text-red-600 text-xs font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-left-1 duration-300">
      <AlertCircle size={12} className="shrink-0" />
      {message}
    </p>
  );
};

/* INPUT COMPONENT - Updated to 12px Labels & 4px Radius */
type InputProps = {
  name: string;
  label: string;
  required?: boolean;
  tooltip?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  required,
  tooltip,
  placeholder,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="font-medium text-[12px] flex items-center text-[#1A1A1A]">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && <Tooltip text={tooltip} />}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-[#00AFEF] rounded-[4px] px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF] mt-1"
    />
  </div>
);

export default function CustomerSignup(): JSX.Element {
  const router = useRouter();

  const [form, setForm] = useState<FormType>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mandatoryError, setMandatoryError] = useState<string>("");
  const [strengthLabel, setStrengthLabel] = useState<string>("");
  const [strengthColor, setStrengthColor] = useState<string>("");

  const isTrivialPassword = (p: string) => {
    const lowerP = p.toLowerCase();
    const commonSequences = ["12345678", "abcdefgh", "qwerty"];
    const nameParts = [form.firstName, form.middleName, form.lastName].filter(Boolean).map(n => n.toLowerCase());
    const containsName = nameParts.some(name => lowerP.includes(name));
    const isSequential = commonSequences.some(seq => lowerP.includes(seq));
    const startsTrivial = lowerP.startsWith("aa@");
    return containsName || isSequential || startsTrivial;
  };

  useEffect(() => {
    if (!form.password) {
      setStrengthLabel("");
      setStrengthColor("");
      return;
    }
    const assessment = passwordStrength(form.password);
    if (assessment.id <= 1 || isTrivialPassword(form.password)) {
      setStrengthLabel("weak password");
      setStrengthColor("text-red-600");
    } else if (assessment.id === 2) {
      setStrengthLabel("medium password");
      setStrengthColor("text-yellow-600");
    } else {
      setStrengthLabel("strong password");
      setStrengthColor("text-green-600");
    }
  }, [form.password, form.firstName, form.middleName, form.lastName]);

  const usernameValid = (u: string) => /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test(u);
  const passwordValidCriteria = (p: string) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(p);
  const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const phoneValid = (p: string) => /^[0-9]{10}$/.test(p);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setMandatoryError("");

    let fieldError = "";
    if (name === "email" && value && !emailValid(value)) fieldError = "Please enter a valid email address.";
    if (name === "phone" && value && !phoneValid(value)) fieldError = "Phone number must be exactly 10 digits.";
    if (name === "username" && value && !usernameValid(value)) fieldError = "Username must be 6-16 characters and start with a letter.";
    if (name === "password" && value && (!passwordValidCriteria(value) || isTrivialPassword(value))) fieldError = "Password is too weak or trivial.";
    if (name === "confirmPassword" && value !== form.password) fieldError = "The passwords you entered do not match.";

    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const preventCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.username || !form.password || !form.confirmPassword) {
      setMandatoryError("Kindly fill-up all the mandatory fields ( marked with * ) for a successful registration");
      return;
    }
    alert("Registration successful!");
    router.push("/");
  };

  return (
    <div className="h-screen w-full flex flex-col bg-blue-50 overflow-hidden">
      {/* NAVBAR */}
      <div className="bg-white shadow-sm px-6 py-3 flex items-center shrink-0 z-20">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Image src="/images/logoPrimary.png" alt="logo" width={32} height={32} />
          <h1 className="text-lg font-bold text-[#00AFEF]">Bonhomiee</h1>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center px-4 py-4 overflow-hidden">
        {/* Main UI Container: rounded-[4px] */}
        <div className="bg-white w-full max-w-4xl h-full max-h-[88vh] rounded-[4px] border border-[#f1f1f1] grid grid-cols-2 overflow-hidden">
          
          {/* LEFT IMAGE SECTION */}
          <div className="hidden md:block relative">
            <Image src="/images/traveling-concept-with-landmarks.jpg" alt="Signup" fill className="object-cover" />
            <div className="absolute inset-0 bg-blue-900/10"></div>
          </div>

          {/* RIGHT FORM SECTION */}
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden bg-white">
            <div className="px-8 py-5 shrink-0 bg-white">
              <h2 className="text-2xl font-extrabold text-[#00AFEF] tracking-tight">
                Customer / Traveler Signup
              </h2>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            <div className="flex-grow overflow-y-auto px-8 py-6 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
              
              {mandatoryError && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6 border border-red-100 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {mandatoryError}
                </div>
              )}

              <Input name="firstName" label="First Name" required value={form.firstName} onChange={handleChange} placeholder="Enter first name" />
              <Input name="middleName" label="Middle Name" value={form.middleName} onChange={handleChange} placeholder="Enter middle name" />
              <Input name="lastName" label="Last Name" required value={form.lastName} onChange={handleChange} placeholder="Enter last name" />

              <div className="mb-4">
                <Input name="email" label="Email" required tooltip="Enter a valid email address like name@example.com" value={form.email} onChange={handleChange} placeholder="Enter email" />
                <ErrorMessage message={errors.email} />
              </div>

              {/* Phone Input: rounded-[4px] */}
              <div className="mb-4">
                <label className="font-medium text-[12px] flex items-center text-[#1A1A1A] mb-1">
                  Phone Number<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Enter exactly 10 digits." />
                </label>
                <div className="flex">
                  <select 
                    className="border border-[#00AFEF] rounded-l-[4px] px-2 text-[12px] text-[#1A1A1A] bg-gray-50 outline-none"
                    onChange={() => {}} // Placeholder for country code
                  >
                    <option>🇮🇳 +91</option>
                    <option>🇺🇸 +1</option>
                    <option>🇬🇧 +44</option>
                  </select>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full border border-[#00AFEF] border-l-0 rounded-r-[4px] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#00AFEF] transition-all"
                  />
                </div>
                <ErrorMessage message={errors.phone} />
              </div>

              <div className="mb-4">
                <Input name="username" label="Username" required tooltip="Must start with a letter, followed by underscores or numbers. 6–16 characters allowed." value={form.username} onChange={handleChange} placeholder="Enter username" />
                <ErrorMessage message={errors.username} />
              </div>

              {/* Password: rounded-[4px] */}
              <div className="mb-4">
                <label className="font-medium text-[12px] flex items-center text-[#1A1A1A]">
                  Password<span className="text-red-500 ml-1">*</span>
                  <Tooltip text="Minimum 8 characters including at least one uppercase, lowercase, number and special character" />
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onCopy={preventCopyPaste}
                    onPaste={preventCopyPaste}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full border border-[#00AFEF] rounded-[4px] px-3 py-2 pr-10 text-sm outline-none transition-all focus:ring-1 focus:ring-[#00AFEF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00AFEF]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {strengthLabel && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-1.5 flex-grow bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${
                        strengthLabel === 'weak password' ? 'w-1/3 bg-red-500' :
                        strengthLabel === 'medium password' ? 'w-2/3 bg-yellow-500' : 'w-full bg-green-500'
                      }`} />
                    </div>
                    <span className={`text-[11px] font-extrabold uppercase tracking-widest ${strengthColor}`}>
                      {strengthLabel}
                    </span>
                  </div>
                )}
                <ErrorMessage message={errors.password} />
              </div>

              <div className="mb-2">
                <label className="font-medium text-[12px] flex items-center text-[#1A1A1A]">
                  Re-Type Password<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  onPaste={preventCopyPaste}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full border border-[#00AFEF] rounded-[4px] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#00AFEF] mt-1"
                />
                <ErrorMessage message={errors.confirmPassword} />
              </div>
            </div>

            <div className="mx-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

            {/* BUTTONS: #00AFEF, #E62800, rounded-[4px] */}
            <div className="px-8 py-6 shrink-0 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => router.push("/")}
                  className="w-full bg-[#E62800] text-white font-bold py-2.5 rounded-[4px] transition-all active:scale-95">
                  Cancel
                </button>
                <button type="submit"
                  className="w-full bg-[#00AFEF] text-white font-bold py-2.5 rounded-[4px] transition-all active:scale-95">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}