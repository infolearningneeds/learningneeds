/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  FaBell,
  FaExclamationCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface NoticeItem {
  idx?: number;
  id?: number;
  title: string;
  date: string;
  category: "important" | "info" | "success";
  description: string;
}

interface Notice {
  id: number;
  type: "important" | "info" | "success";
  title: string;
  date: string;
  fullContent: string;
  icon: IconType;
  color: string;
}

interface ColorClasses {
  bg: string;
  text: string;
  badge: string;
  dot: string;
}

const Notice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categoryMap = {
    important: { icon: FaExclamationCircle, color: "red" },
    info: { icon: FaInfoCircle, color: "blue" },
    success: { icon: FaCheckCircle, color: "green" },
  };

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching notices from Supabase...");

      const { data, error: fetchError } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("Supabase Fetch Error:", fetchError);
        setError(fetchError.message);
        return;
      }

      console.log("Fetched data:", data);

      if (!data || data.length === 0) {
        console.log("No notices found");
        setNotices([]);
        setLoading(false);
        return;
      }

      const formatted: Notice[] = data.map((n: NoticeItem) => ({
        id: n.idx || n.id || 0,
        type: n.category,
        title: n.title,
        date: n.date,
        fullContent: n.description,
        icon: categoryMap[n.category].icon,
        color: categoryMap[n.category].color,
      }));

      console.log("Formatted notices:", formatted);
      setNotices(formatted);
    } catch (err) {
      console.error("Error fetching notices:", err);
      setError(err instanceof Error ? err.message : "Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const getColorClasses = (color: string): ColorClasses => {
    const colors: Record<string, ColorClasses> = {
      red: { bg: "bg-red-50", text: "text-red-600", badge: "bg-red-500", dot: "bg-red-500" },
      blue: { bg: "bg-blue-50", text: "text-blue-600", badge: "bg-blue-500", dot: "bg-blue-500" },
      green: { bg: "bg-green-50", text: "text-green-600", badge: "bg-green-500", dot: "bg-green-500" },
    };
    return colors[color] || { bg: "bg-gray-50", text: "text-gray-600", badge: "bg-gray-500", dot: "bg-gray-500" };
  };

  if (loading)
    return (
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading notices...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <FaExclamationCircle className="text-red-500 text-4xl mx-auto mb-3" />
          <p className="text-red-600 font-semibold mb-2">Error Loading Notices</p>
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button 
            onClick={fetchNotices}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <div className="flex items-center gap-4 mb-10">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-40" />
          <div className="relative bg-yellow-400 rounded-full p-3 shadow">
            <FaBell className="text-3xl text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Notice Board</h2>
          <p className="text-sm text-gray-600">Stay updated with latest announcements</p>
        </div>
      </div>

      {notices.length === 0 ? (
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-12 text-center">
          <FaBell className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium mb-2">No Notices Available</p>
          <p className="text-gray-400 text-sm">Check back later for new announcements</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden h-80 pointer-events-auto">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />

            <div className="animate-scroll-vertical py-3">
              {[...notices, ...notices].map((notice, index) => {
                const Icon = notice.icon;
                const color = getColorClasses(notice.color);

                return (
                  <div
                    key={`${notice.id}-${index}`}
                    onClick={() => setSelectedNotice(notice)}
                    className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-4 border-b border-gray-200"
                  >
                    <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center border flex-shrink-0`}>
                      <Icon className={`text-lg ${color.text}`} />
                    </div>

                    <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${color.badge} flex-shrink-0`}>
                      {notice.type}
                    </span>

                    <p className="flex-1 text-gray-700 font-medium text-sm truncate">{notice.title}</p>
                    <span className="text-xs text-gray-500 flex-shrink-0">{notice.date}</span>
                    <FaChevronRight className="text-gray-400 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 min-h-80">
            {selectedNotice ? (
              <>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${getColorClasses(selectedNotice.color).bg}`}>
                    <selectedNotice.icon className={`text-2xl ${getColorClasses(selectedNotice.color).text}`} />
                  </div>

                  <div className="flex-1">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${getColorClasses(selectedNotice.color).badge}`}>
                      {selectedNotice.type.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-2">{selectedNotice.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{selectedNotice.date}</p>
                  </div>
                </div>

                <p className="mt-6 text-gray-700 leading-relaxed">{selectedNotice.fullContent}</p>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                Select a notice to see details
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Notice;