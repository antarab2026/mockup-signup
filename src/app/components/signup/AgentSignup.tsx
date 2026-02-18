"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";

/* ---------------- TYPES ---------------- */

interface FormState {
  agencyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  website: string;
}

interface ErrorState {
  [key: string]: string;
}

/* ---------------- MODERN TOOLTIP ---------------- */

const Tooltip = ({ text }: { text: string }) => (
  <div className="relative group inline-block ml-2">
    <span className="text-blue-600 text-xs cursor-help">ⓘ</span>

    <div className="
      absolute bottom-full left-0 mb-2
      hidden group-hover:block z-50
      min-w-[240px] max-w-[300px]
      bg-gray-900 text-white text-xs
      px-3 py-2 rounded-lg shadow-lg
      whitespace-normal break-words
      leading-relaxed
    ">
      {text}
    </div>
  </div>
);

export default function AgentSignup(): JSX.Element {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<FormState>({
    agencyName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    website: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [mandatoryError, setMandatoryError] = useState("");

  useEffect(() => {
    if (form.agencyName && !form.username) {
      const clean = form.agencyName.replace(/\s+/g, "").toLowerCase();
      const randomNum = Math.floor(100 + Math.random() * 900);
      setForm(prev => ({
        ...prev,
        username: `${clean}@A${randomNum}`,
      }));
    }
  }, [form.agencyName]);

  const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const phoneValid = (p: string) => /^[0-9]{10}$/.test(p);
  const usernameValid = (u: string) => /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test(u);
  const passwordValid = (p: string) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(p);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setMandatoryError("");

    let fieldError = "";

    if (name === "email" && value && !emailValid(value))
      fieldError = "Enter a valid email.";

    if (name === "phone" && value && !phoneValid(value))
      fieldError = "Phone must be exactly 10 digits.";

    if (name === "username" && value && !usernameValid(value))
      fieldError = "Invalid username format.";

    if (name === "password" && value && !passwordValid(value))
      fieldError = "Weak password.";

    if (name === "confirmPassword" && value !== form.password)
      fieldError = "Passwords do not match.";

    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.agencyName ||
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      setMandatoryError(
        "Kindly fill-up all the mandatory fields ( marked with * ) for a successful registration"
      );
      return;
    }

    let newErrors: ErrorState = {};

    if (!emailValid(form.email)) newErrors.email = "Enter a valid email.";
    if (!phoneValid(form.phone)) newErrors.phone = "Phone must be 10 digits.";
    if (!usernameValid(form.username))
      newErrors.username = "Invalid username.";
    if (!passwordValid(form.password))
      newErrors.password = "Weak password.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Registration successful!");
    router.push("/");
  };

  return (
    <div className="h-screen flex flex-col bg-blue-50 overflow-hidden">
      <div className="bg-white shadow-sm px-6 py-3 flex items-center">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Image src="/images/logoPrimary.png" alt="logo" width={32} height={32}/>
          <h1 className="text-lg font-bold text-blue-700">Bonhomiee</h1>
        </div>
      </div>

      <div className="flex flex-grow justify-center items-center px-4">
        <div className="bg-white w-full max-w-4xl h-[82vh] rounded-xl shadow-xl grid grid-cols-2 overflow-hidden">

          <div className="hidden md:block relative">
            <Image src="/images/agent-signup.jpg" alt="Agent Signup" fill className="object-cover"/>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-2 overflow-y-auto">

            <h2 className="text-lg font-bold text-blue-700 mb-2">Agent / Agency Signup</h2>

            {mandatoryError && (
              <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded">
                {mandatoryError}
              </div>
            )}

            <InputField label="Agency Name" name="agencyName" placeholder="Enter agency name" required form={form} handleChange={handleChange}/>
            <InputField label="First Name" name="firstName" placeholder="Enter first name" required form={form} handleChange={handleChange}/>
            <InputField label="Middle Name" name="middleName" placeholder="Enter middle name" form={form} handleChange={handleChange}/>
            <InputField label="Last Name" name="lastName" placeholder="Enter last name" required form={form} handleChange={handleChange}/>

            <InputWithError label="Email" name="email" placeholder="Enter email address" required tooltip="Enter a valid email address like name@example.com" form={form} errors={errors} handleChange={handleChange}/>

            <div>
              <label className="font-medium text-sm flex items-center">
                Phone Number<span className="text-red-500">*</span>
                <Tooltip text="Enter exactly 10 digits"/>
              </label>

              <div className="flex">
                <select name="countryCode" onChange={handleChange}
                  className="border border-blue-400 rounded-l px-2 text-sm">
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>

                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number"
                  className="w-full border border-blue-400 rounded-r px-3 py-1.5 text-sm"/>
              </div>
              {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
            </div>

            <InputWithError label="Username" name="username" placeholder="Enter username" required tooltip="Must start with a letter followed by any number of underscores or numbers ,6–16 characters allowed." form={form} errors={errors} handleChange={handleChange}/>

            <div>
              <label className="font-medium text-sm flex items-center">
                Password<span className="text-red-500">*</span>
                <Tooltip text="Minimum 8 characters with atleast one uppercase, lowercase, number & special character"/>
              </label>

              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password"
                  value={form.password} onChange={handleChange} placeholder="Enter password"
                  className="w-full border border-blue-400 rounded px-3 py-1.5 pr-10 text-sm"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
            </div>

            <InputWithError label="Re-Type Password" name="confirmPassword" placeholder="Re-enter password" required tooltip="Must match the password exactly" form={form} errors={errors} handleChange={handleChange}/>

            <InputField label="Website (Optional)" name="website" placeholder="Enter agency website URL" form={form} handleChange={handleChange}/>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button type="button" onClick={()=>router.push("/")} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">Cancel</button>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Register</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUTS */

interface InputFieldProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  form: FormState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({label,name,required,placeholder,form,handleChange}:InputFieldProps) => (
<div>
<label className="font-medium text-sm">{label}{required && <span className="text-red-500">*</span>}</label>
<input name={name} value={form[name as keyof FormState]} onChange={handleChange} placeholder={placeholder}
className="w-full border border-blue-400 rounded px-3 py-1.5 text-sm"/>
</div>
);

interface InputWithErrorProps extends InputFieldProps {
  tooltip?: string;
  errors: ErrorState;
}

const InputWithError = ({label,name,required,placeholder,tooltip,form,errors,handleChange}:InputWithErrorProps) => (
<div>
<label className="font-medium text-sm flex items-center">
{label}{required && <span className="text-red-500">*</span>}
{tooltip && <Tooltip text={tooltip}/>}
</label>
<input name={name} value={form[name as keyof FormState]} onChange={handleChange} placeholder={placeholder}
className="w-full border border-blue-400 rounded px-3 py-1.5 text-sm"/>
{errors[name] && <p className="text-red-600 text-xs">{errors[name]}</p>}
</div>
);
