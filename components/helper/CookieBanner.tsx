/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import React, { useState, useEffect } from "react";
import CookieSettingsModal from "./CookieSettingsModal";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ln_cookie_consent");
    if (!consent) setShowBanner(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem("ln_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const rejectAll = () => {
    localStorage.setItem("ln_cookie_consent", "rejected");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 border-2 border-orange-500/30 shadow-2xl rounded-2xl p-6 z-50 flex flex-col md:flex-row items-center justify-between gap-4 animate-slide-up backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl"></div>
          
          {/* Text Section */}
          <p className="relative text-gray-100 text-sm md:text-base font-medium leading-relaxed md:leading-snug z-10">
            By clicking <span className="font-bold text-orange-400">"Accept All Cookies"</span>, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.{" "}
            <a href="/cookie-policy" className="underline text-orange-400 hover:text-orange-300 transition font-semibold">Cookie Policy</a>
          </p>

          {/* Buttons */}
          <div className="relative flex flex-wrap gap-3 md:gap-2 justify-center md:justify-end mt-3 md:mt-0 z-10">
            <button
              onClick={rejectAll}
              className="px-5 py-2.5 bg-indigo-800/50 text-gray-200 rounded-lg font-semibold hover:bg-indigo-800 transition-all duration-300 shadow-md border border-indigo-700/50 hover:border-indigo-600"
            >
              Reject All
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-orange-500/50 text-orange-400 rounded-lg font-semibold hover:bg-white/20 hover:border-orange-400 transition-all duration-300 shadow-md"
            >
              Cookie Settings
            </button>
            <button
              onClick={acceptAll}
              className="px-5 py-2.5 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <CookieSettingsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default CookieBanner;