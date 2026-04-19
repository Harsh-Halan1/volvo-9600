"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus("success");
      setFormData({ fullName: '', email: '', company: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
      
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || 'Failed to submit form. Please try again later.');
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#060709] to-[#12141a] py-24 px-6 z-10">
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none"></div>
      
      <div className="relative w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 translate-y-0 text-white">
        
        {/* Left Column - Copy */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Configure Your <span className="text-blue-500">Fleet.</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Ready to upgrade to the Volvo 9600 XL? Connect with our enterprise sales team to discuss custom requirements, fleet logistics, and pricing details.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500 uppercase tracking-widest mt-auto mb-4 md:mb-0">
            <span>Premium</span>
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            <span>Reliable</span>
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            <span>Unstoppable</span>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-[#1a1c23] p-8 md:p-10 rounded-2xl shadow-2xl border border-white/5">
          <form onSubmit={onSubmit} className="space-y-6">
            
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Work Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                placeholder="john@company.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                placeholder="Acme Voyages"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Requirements</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none"
                placeholder="Tell us about your fleet needs..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-white hover:bg-gray-100 text-[#0b0c10] font-semibold py-4 rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "idle" && (
                <>
                  <span>Request Consultation</span>
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
              {status === "loading" && (
                <div className="loading-spinner w-5 h-5 border-2 border-t-black"></div>
              )}
              {status === "success" && (
                <>
                  <span>Sent Successfully</span>
                  <CheckCircle className="w-5 h-5 ml-2 text-green-500" />
                </>
              )}
              {status === "error" && (
                <>
                  <span>Try Again</span>
                </>
              )}
            </button>
            
            {status === "error" && (
              <div className="flex items-center space-x-2 text-red-400 text-sm mt-3">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}
            
            {status === "success" && (
              <div className="flex items-center space-x-2 text-green-400 text-sm mt-3">
                <CheckCircle className="w-4 h-4" />
                <span>We've received your request and will be in touch shortly.</span>
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
