"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */
type FormData = {
  agencyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  website: string;
};

type Errors = {
  global?: string;
  email?: string;
  phone?: string;
  password?: string;
};

/* ---------------- COMPONENT ---------------- */
export default function AgentSignup() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    agencyName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
    website: "",
  });

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  /* ---------------- AUTO USERNAME ---------------- */
  useEffect(() => {
    if (form.agencyName) {
      const clean = form.agencyName.replace(/\s+/g, "").toLowerCase();
      const randomNum = Math.floor(100 + Math.random() * 900);
      setUsername(`${clean}@A${randomNum}`);
    } else {
      setUsername("");
    }
  }, [form.agencyName]);

  /* ---------------- VALIDATIONS ---------------- */
  const emailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const phoneValid = (phone: string) =>
    /^[0-9]{10}$/.test(phone);

  const passwordValid = (password: string) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: Errors = {};

    if (
      !form.agencyName ||
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      newErrors.global = "Please fill up all the mandatory fields.";
    }

    if (!emailValid(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!phoneValid(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!passwordValid(form.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number & special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);
    alert("Registered successfully!");
    router.push("/");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
     <div className="bg-white max-w-6xl w-full rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2">


        {/* LEFT IMAGE */}
        <div className="hidden md:flex bg-blue-100">
          <img
            src="/images/agent-signup.jpg"
            alt="Agent Signup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <h2 className="text-2xl font-bold text-blue-700">
            Agent / Agency Signup
          </h2>

          {errors.global && (
            <p className="bg-red-100 text-red-700 px-4 py-2 rounded">
              {errors.global}
            </p>
          )}

          {success && (
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded">
              Registration successful!
            </p>
          )}

          {/* AGENCY NAME */}
          <div>
            <label className="font-medium">
              Agency Name <span className="text-red-500">*</span>
            </label>
            <input
              name="agencyName"
              onChange={handleChange}
              className="w-full border border-blue-400 rounded px-3 py-2"
            />
          </div>

          {/* OWNER NAME */}
          {[
            { name: "firstName", label: "First Name", required: true },
            { name: "middleName", label: "Middle Name", required: false },
            { name: "lastName", label: "Last Name", required: true },
          ].map((f) => (
            <div key={f.name}>
              <label className="font-medium">
                {f.label}
                {f.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                name={f.name}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded px-3 py-2"
              />
            </div>
          ))}

          {/* EMAIL */}
          <div>
            <label className="font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              onChange={handleChange}
              className="w-full border border-blue-400 rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select
                name="countryCode"
                onChange={handleChange}
                className="border border-blue-400 rounded-l px-2 bg-white"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                name="phone"
                onChange={handleChange}
                className="w-full border border-blue-400 rounded-r px-3 py-2"
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* USERNAME */}
          <div>
            <label className="font-medium">Username</label>
            <input
              value={username}
              readOnly
              className="w-full bg-gray-100 border border-blue-400 rounded px-3 py-2"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full border border-blue-400 rounded px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          {/* WEBSITE */}
          <div>
            <label className="font-medium">Website (Optional)</label>
            <input
              name="website"
              onChange={handleChange}
              className="w-full border border-blue-400 rounded px-3 py-2"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
            >
              Cancel Form
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
