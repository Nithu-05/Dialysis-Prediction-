import React from "react";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h2 className="text-3xl text-blue-700 font-semibold mb-4">Contact Us</h2>
      <p className="text-gray-700 mb-6">
        Have questions or need help? Reach out below.
      </p>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="border rounded p-2" required />
        <input type="email" placeholder="Your Email" className="border rounded p-2" required />
        <textarea placeholder="Your Message" rows="4" className="border rounded p-2" required></textarea>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}
