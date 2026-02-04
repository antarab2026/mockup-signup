"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
   firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phone: string,
    username: string,
    password: string
  
}


export default function CustomerSignup() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  /* ------------------ VALIDATION RULES ------------------ */

  const usernameValid = (username) =>
    /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test(username);

  const passwordValid = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  /* ------------------ HANDLERS ------------------ */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!usernameValid(form.username)) {
      newErrors.username =
        "Please enter a genuine username as per the guidelines.";
    }

    if (!passwordValid(form.password)) {
      newErrors.password =
        "Password is weak. Please enter a strong password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Registration successful!");
    router.push("/");
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <div className="bg-white max-w-6xl w-full rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex bg-blue-100">
          <img
            src="/images/traveling-concept-with-landmarks.jpg"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <h2 className="text-2xl font-bold text-blue-700">
            Customer / Traveler Signup
          </h2>

          {/* ----------- INPUT FIELD COMPONENT ----------- */}
          {[
            { name: "firstName", label: "First Name", required: true },
            { name: "middleName", label: "Middle Name", required: false },
            { name: "lastName", label: "Last Name", required: true },
         //   { name: "email", label: "Email", type: "email", required: true },
         //   { name: "phone", label: "Phone Number", required: true },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-medium">
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                required={field.required}
                onChange={handleChange}
                className="w-full mt-1 border border-blue-400 rounded-md px-3 py-2"
              />
            </div>
          ))}


          {/* EMAIL */}
          <div>
            <label className="block font-medium">
              Email <span className="text-red-500">*</span>
              <span
                title="Enter a valid email (example: name@example.com)"
                className="ml-2 text-blue-600 text-xs cursor-help"
              >
                ⓘ
              </span>
            </label>
            <input
              name="email"
              onChange={handleChange}
              className="w-full mt-1 border border-blue-400 rounded-md px-3 py-2"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>


          {/* PHONE NUMBER */}
          <div>
            <label className="block font-medium">
              Phone Number <span className="text-red-500">*</span>
              <span
                title="Enter exactly 10 digits"
                className="ml-2 text-blue-600 text-xs cursor-help"
              >
                ⓘ
              </span>
            </label>

            <div className="flex mt-1">
              <select
                name="countryCode"
                onChange={handleChange}
                className="border border-blue-400 rounded-l-md px-3 bg-white"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>

              <input
                name="phone"
                onChange={handleChange}
                className="w-full border border-blue-400 rounded-r-md px-3 py-2"
              />
            </div>
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
          </div>



          {/* ----------- USERNAME ----------- */}
          <div>
            <label className="block font-medium">
              Username <span className="text-red-500">*</span>
              <span className="ml-2 text-blue-600 text-xs cursor-help"
                title="Username must start with a letter, be 6–16 characters long, and can include letters, numbers, and underscores.">
                ⓘ
              </span>
            </label>
            <input
              name="username"
              onChange={handleChange}
              className="w-full mt-1 border border-blue-400 rounded-md px-3 py-2"
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username}</p>
            )}
          </div>

          {/* ----------- PASSWORD ----------- */}
          <div>
            <label className="block font-medium">
              Password <span className="text-red-500">*</span>
              <span className="ml-2 text-blue-600 text-xs cursor-help"
                title="Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.">
                ⓘ
              </span>
            </label>
            <input
             type="password"
              name="password"
              onChange={handleChange}
              className="w-full mt-1 border border-blue-400 rounded-md px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          {/* ----------- DOCUMENT UPLOADS ----------- */}
          <h3 className="font-semibold text-blue-700 pt-4">Document Uploads</h3>

          {[
            {
              label: "Passport",
              accept: ".pdf,.doc,.docx",
              tooltip: "PDF/DOC only. Max size: 2MB.",
            },
            {
              label: "PAN Card",
              accept: ".pdf,.doc",
              tooltip: "PDF/DOC only. Max size: 1MB.",
            },
             {
              label: "Photo",
              accept: ".jpg,.jpeg,.png",
              tooltip: "JPG/PNG only. Max size: 500KB.",
            },
          ].map((doc) => (
            <div key={doc.label}>
              <label className="block font-medium">
                {doc.label}
                <span className="ml-2 text-blue-600 text-xs cursor-help"
                  title={doc.tooltip}>
                  ⓘ
                </span>
              </label>
              <input
                type="file"
                accept={doc.accept}
                className="mt-1 w-full file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md file:border-none border border-blue-400 rounded-md"
              />
            </div>
          ))}

          {/* ----------- BUTTONS ----------- */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
            >
              Cancel Form
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

