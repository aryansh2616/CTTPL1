import React, { useState } from "react";
import { BiMessageSquare } from "react-icons/bi";

// ✅ Initial form state
const initialForm = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  serviceType: "",
  country: "India",
  date: "",
  travellers: "",
  requirements: "",
  agree: false,
};

// ✅ Automatically pick backend URL based on environment
const BACKEND_URL =
  import.meta.env.PROD
    ? "https://cttpl.onrender.com/sendemail" // your deployed backend
    : "http://localhost:8080/sendemail"; // local dev backend

const OnSpotRentalsForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [serverStatus, setServerStatus] = useState(null);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Validate Indian phone numbers
  const isValidIndianPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    return /^([6-9]\d{9})$/.test(cleaned);
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setServerStatus(null);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setResponseMessage("Name and email are required.");
      return;
    }

    if (formData.countryCode === "+91" && !isValidIndianPhone(formData.phone)) {
      setResponseMessage("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!formData.agree) {
      setResponseMessage("Please agree to the terms and conditions.");
      return;
    }

    const payload = {
      ...formData,
      travellers: formData.travellers
        ? Number(formData.travellers)
        : undefined,
    };

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      console.log("[POST] ->", BACKEND_URL, payload);

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      setServerStatus({ status: res.status, text: res.statusText });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setResponseMessage(data.message || "✅ Enquiry sent successfully!");
        setFormData(initialForm);
      } else {
        console.error("[Server Error]", res.status, data);
        setResponseMessage(
          data.message || `Failed to send enquiry. (Status ${res.status})`
        );
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") {
        setResponseMessage("⏳ Request timed out. Try again later.");
      } else {
        console.error("Network/error:", err);
        setResponseMessage("⚠️ Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen m-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-8">
          On Spot <span className="text-red-600">Rentals</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 w-full" noValidate>
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border-[2px] border-gray-300 p-3 rounded-lg w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border-[2px] border-gray-300 p-3 rounded-lg w-full"
              required
            />
          </div>

          {/* Phone */}
          <div className="grid grid-cols-3 gap-2">
            <select
              name="countryCode"
              className="border-[2px] border-gray-300 p-3 rounded-lg"
              value={formData.countryCode}
              onChange={handleChange}
            >
              <option value="+91">+91</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Your Phone No."
              value={formData.phone}
              onChange={handleChange}
              className="border-[2px] border-gray-300 p-3 rounded-lg col-span-2"
              required
            />
          </div>

          {/* Service + Country + Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="border-[2px] border-gray-300 p-3 rounded-lg"
              required
            >
              <option value="">Select Service Type</option>
              <option value="Car Rental">Car Rental</option>
              <option value="Bus Rental">Bus Rental</option>
              <option value="Tour Package">Tour Package</option>
            </select>

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border-[2px] border-gray-300 p-3 rounded-lg"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border-[2px] border-gray-300 p-3 rounded-lg"
              required
            />
          </div>

          {/* Travellers */}
          <input
            type="number"
            name="travellers"
            placeholder="No. of Travellers"
            value={formData.travellers}
            onChange={handleChange}
            className="border-[2px] border-gray-300 p-3 rounded-lg w-full"
            min="1"
            required
          />

          {/* Requirements */}
          <textarea
            name="requirements"
            placeholder="Any specific requirement or question"
            value={formData.requirements}
            onChange={handleChange}
            className="border-[2px] border-gray-300 p-3 rounded-lg w-full"
            rows="3"
          />

          {/* Agreement */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <span>
              I agree with the{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-blue-500 underline"
              >
                privacy policy
              </a>{" "}
              and{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-blue-500 underline"
              >
                terms and conditions
              </a>
              .
            </span>
          </label>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "opacity-70 cursor-wait" : ""
              } flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg shadow`}
            >
              {loading ? "Sending..." : "Send Enquiry"}
              <div className="bg-white p-1 rounded-sm">
                <BiMessageSquare className="h-4 w-4 text-red-600" aria-hidden />
              </div>
            </button>
          </div>

          {/* Response Message */}
          {responseMessage && (
            <div
              role="status"
              className={`mt-4 p-3 rounded border text-sm ${
                responseMessage.toLowerCase().includes("success")
                  ? "bg-green-100 border-green-400 text-green-800"
                  : "bg-red-100 border-red-400 text-red-800"
              }`}
            >
              {responseMessage}
            </div>
          )}

          {serverStatus && (
            <div className="text-xs text-gray-600">
              Server response: {serverStatus.status} {serverStatus.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OnSpotRentalsForm;
