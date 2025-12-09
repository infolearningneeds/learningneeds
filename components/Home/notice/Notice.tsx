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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
    setMounted(true);
    fetchNotices();
  }, []);

  const getColorClasses = (color: string): ColorClasses => {
    const colors: Record<string, ColorClasses> = {
      red: {
        bg: "bg-red-50",
        text: "text-red-600",
        badge: "bg-red-500",
        dot: "bg-red-500"
      },
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        badge: "bg-blue-500",
        dot: "bg-blue-500"
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        badge: "bg-green-500",
        dot: "bg-green-500"
      },
    };
    return colors[color] || {
      bg: "bg-gray-50",
      text: "text-gray-600",
      badge: "bg-gray-500",
      dot: "bg-gray-500"
    };
  };

  if (!mounted) return null;

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading notices...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">
            <FaExclamationCircle className="inline" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Notices
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchNotices}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <FaBell className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Notice Board</h1>
          <p className="text-gray-600">Stay updated with latest announcements</p>
        </div>

        {notices.length === 0 ? (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">
              <FaInfoCircle className="inline" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Notices Available
            </h3>
            <p className="text-gray-500">Check back later for new announcements</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 overflow-hidden">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-full">
              <div className="bg-indigo-600 text-white px-5 py-4">
                <h2 className="text-xl font-semibold">All Notices</h2>
              </div>
              <div 
                className="h-[600px] overflow-hidden relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes marquee {
                    0% {
                      transform: translateY(0);
                    }
                    100% {
                      transform: translateY(-50%);
                    }
                  }
                  .marquee-content {
                    animation: marquee 40s linear infinite;
                  }
                  .marquee-content.paused {
                    animation-play-state: paused;
                  }
                `}} />
                <div className={`marquee-content ${isPaused ? 'paused' : ''}`}>
                  {[...notices, ...notices].map((notice, index) => {
                    const Icon = notice.icon;
                    const color = getColorClasses(notice.color);
                    return (
                      <div
                        key={`${notice.id}-${index}`}
                        onClick={() => setSelectedNotice(notice)}
                        className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-4 border-b border-gray-200"
                      >
                        <div className={`p-3 ${color.bg} rounded-lg flex-shrink-0`}>
                          <Icon className={`${color.text} text-xl`} />
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-semibold ${color.text} uppercase`}
                            >
                              {notice.type}
                            </span>
                            <span className={`w-2 h-2 ${color.dot} rounded-full`}></span>
                          </div>
                          <h3 className="font-semibold text-gray-800 truncate">
                            {notice.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">{notice.date}</p>
                        </div>
                        <FaChevronRight className="text-gray-400 flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-full">
              {selectedNotice ? (
                <>
                  <div
                    className={`${
                      getColorClasses(selectedNotice.color).bg
                    } px-5 py-4 border-b`}
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        getColorClasses(selectedNotice.color).badge
                      } text-white mb-3`}
                    >
                      {selectedNotice.type.toUpperCase()}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 break-words">
                      {selectedNotice.title}
                    </h2>
                    <p className="text-sm text-gray-600 break-words">{selectedNotice.date}</p>
                  </div>
                  <div className="p-6 overflow-y-auto overflow-x-hidden max-h-[500px]">
                    <p className="text-gray-700 leading-relaxed break-words">
                      {selectedNotice.fullContent}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <FaInfoCircle className="text-gray-300 text-6xl mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Select a notice to see details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;