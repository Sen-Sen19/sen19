import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";

export default function ContactMe({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // success | error | loading

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("loading");

    emailjs
      .send(
        "service_tr4x248", // ⚠️ Replace with your actual EmailJS service ID
        "template_fl7nwhf", // ⚠️ Replace with your actual EmailJS template ID
        formData,
        "V_gsiWkcacksqKW1x" // Public Key
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error(error);
          setStatus("error");
        }
      );
  };

  return (
    <div
      ref={panelRef}
      className={`absolute bottom-12 right-4 w-[400px] max-h-[80vh] bg-white/80 backdrop-blur-3xl backdrop-saturate-150 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/30 p-5 transition-all duration-300 ease-in-out overflow-y-auto ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 pointer-events-none"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">📨 Contact Me</h2>

      <form onSubmit={sendEmail} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-all"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-sm text-center mt-2">
            ✅ Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm text-center mt-2">
            ❌ Failed to send message. Try again.
          </p>
        )}
      </form>
    </div>
  );
}
