/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Upload, FileText, Briefcase, Send, CheckCircle, X, Code, Laptop, Sparkles, Rocket, Target, Zap, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
}

interface Files {
  resume: File | null;
  coverLetter: File | null;
}

interface InputField {
  name: keyof FormData;
  label: string;
  icon: React.ElementType;
  type: string;
  required: boolean;
  placeholder: string;
}

const CareerForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    portfolio: '',
    linkedin: '',
  });

  const [files, setFiles] = useState<Files>({
    resume: null,
    coverLetter: null,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof Files) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const removeFile = (type: keyof Files) => {
    setFiles(prev => ({
      ...prev,
      [type]: null
    }));
  };

  const uploadFileToSupabase = async (file: File, bucket: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error(`Error uploading to ${bucket}:`, error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.location || !files.resume) {
      setError('Please fill in all required fields and upload your resume');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Generate unique file names using timestamp and random string
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      
      // Upload resume (required)
      const resumeFileName = `${timestamp}_${randomStr}_${files.resume.name}`;
      const resumeUrl = await uploadFileToSupabase(files.resume, 'resumes', resumeFileName);

      // Upload cover letter (optional)
      let coverLetterUrl = null;
      if (files.coverLetter) {
        const coverLetterFileName = `${timestamp}_${randomStr}_${files.coverLetter.name}`;
        coverLetterUrl = await uploadFileToSupabase(files.coverLetter, 'cover-letters', coverLetterFileName);
      }

      // Insert application data into database
      const { data, error: dbError } = await supabase
        .from('applications')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            portfolio: formData.portfolio || null,
            linkedin: formData.linkedin || null,
            resume_url: resumeUrl,
            cover_letter_url: coverLetterUrl,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (dbError) throw dbError;

      // Success!
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          portfolio: '',
          linkedin: '',
        });
        setFiles({
          resume: null,
          coverLetter: null,
        });
      }, 3000);

    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields: InputField[] = [
    { name: 'fullName', label: 'Full Name', icon: User, type: 'text', required: true, placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', icon: Mail, type: 'email', required: true, placeholder: 'john.doe@example.com' },
    { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', required: true, placeholder: '+91 98765 43210' },
    { name: 'location', label: 'Location / City', icon: MapPin, type: 'text', required: true, placeholder: 'Mumbai, Maharashtra' },
    { name: 'portfolio', label: 'Portfolio Website', icon: Globe, type: 'url', required: false, placeholder: 'https://yourportfolio.com' },
    { name: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, type: 'url', required: false, placeholder: 'https://linkedin.com/in/yourprofile' },
  ];

  const floatingIcons = [
    { Icon: Code, delay: '0s', duration: '20s', top: '10%', left: '5%' },
    { Icon: Laptop, delay: '2s', duration: '25s', top: '20%', right: '10%' },
    { Icon: Sparkles, delay: '4s', duration: '22s', top: '60%', left: '8%' },
    { Icon: Rocket, delay: '1s', duration: '28s', top: '70%', right: '15%' },
    { Icon: Target, delay: '3s', duration: '24s', top: '40%', left: '12%' },
    { Icon: Zap, delay: '5s', duration: '26s', top: '80%', right: '8%' },
    { Icon: Briefcase, delay: '2.5s', duration: '23s', top: '30%', right: '5%' },
    { Icon: FileText, delay: '4.5s', duration: '27s', top: '50%', left: '15%' },
  ];

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => {
          const { Icon, delay, duration, ...position } = item;
          return (
            <div
              key={index}
              className="absolute opacity-10"
              style={{
                ...position,
                animation: `float ${duration} ease-in-out ${delay} infinite`,
              }}
            >
              <Icon className="w-12 h-12 text-blue-950" />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-40px) rotate(-5deg);
          }
          75% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-2xl">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gray-900">Join Our </span>
            <span className="text-orange-500">Team</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Start your journey with us. Fill in your details and let's shape the future together.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <h3 className="text-white font-bold text-xl">Application Submitted!</h3>
                <p className="text-white/90">We'll review your application and get back to you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <h3 className="text-white font-bold text-xl">Error</h3>
                <p className="text-white/90">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-300">
          {/* Personal Information Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => {
                const Icon = field.icon;
                const isFocused = focusedField === field.name;
                const hasValue = formData[field.name];

                return (
                  <div
                    key={field.name}
                    className="relative transition-all duration-300"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-orange-500 ml-1">*</span>}
                    </label>
                    <div className="relative group">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        isFocused || hasValue ? 'text-orange-500' : 'text-gray-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.placeholder}
                        disabled={isSubmitting}
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 
                          focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                          ${isFocused ? 'border-orange-500 shadow-lg shadow-orange-500/20 bg-white' : 'border-gray-300 hover:border-gray-400'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Resume (PDF)
                  <span className="text-orange-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'resume')}
                    disabled={isSubmitting}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className={`flex items-center justify-center gap-3 w-full p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-white transition-all duration-300 group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {files.resume ? (
                      <div className="flex items-center gap-3 w-full">
                        <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
                        <div className="flex-1 text-left overflow-hidden">
                          <p className="text-gray-900 font-medium truncate">{files.resume.name}</p>
                          <p className="text-gray-500 text-sm">{(files.resume.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile('resume');
                          }}
                          disabled={isSubmitting}
                          className="p-2 bg-red-100 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4 text-red-500 hover:text-white" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                          Click to upload
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Letter Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Cover Letter
                  <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="coverLetter"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'coverLetter')}
                    disabled={isSubmitting}
                    className="hidden"
                  />
                  <label
                    htmlFor="coverLetter"
                    className={`flex items-center justify-center gap-3 w-full p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-white transition-all duration-300 group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {files.coverLetter ? (
                      <div className="flex items-center gap-3 w-full">
                        <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
                        <div className="flex-1 text-left overflow-hidden">
                          <p className="text-gray-900 font-medium truncate">{files.coverLetter.name}</p>
                          <p className="text-gray-500 text-sm">{(files.coverLetter.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile('coverLetter');
                          }}
                          disabled={isSubmitting}
                          className="p-2 bg-red-100 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4 text-red-500 hover:text-white" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                          Click to upload
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-300 rounded-xl">
            <p className="text-gray-600 text-sm text-center">
              🔒 Your information is secure and will only be used for recruitment purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;