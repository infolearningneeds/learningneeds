/* eslint-disable react-hooks/set-state-in-effect */
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
import { supabase } from "@/lib/supabase";

interface NoticeItem {
  id: number;
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
  color: "red" | "blue" | "green";
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

  // Map categories to icon + color
  const categoryMap = {
    important: { icon: FaExclamationCircle, color: "red" },
    info: { icon: FaInfoCircle, color: "blue" },
    success: { icon: FaCheckCircle, color: "green" },
  };

  // Fetch from Supabase
  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Supabase Fetch Error:", error);
      return;
    }

    const formatted: Notice[] = data.map((n: NoticeItem) => ({
      id: n.id,
      type: n.category,
      title: n.title,
      date: n.date,
      fullContent: n.description,
      icon: categoryMap[n.category].icon,
      color: categoryMap[n.category].color,
    }));

    setNotices(formatted);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const getColorClasses = (color: "red" | "blue" | "green"): ColorClasses => {
    const colors = {
      red: {
        bg: "bg-red-50",
        text: "text-red-600",
        badge: "bg-red-500",
        dot: "bg-red-500",
      },
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        badge: "bg-blue-500",
        dot: "bg-blue-500",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        badge: "bg-green-500",
        dot: "bg-green-500",
      },
    };
    return colors[color];
  };

  if (loading)
    return (
      <div className="py-20 text-center text-gray-600 text-lg">
        Loading notices...
      </div>
    );

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-40" />
          <div className="relative bg-yellow-400 rounded-full p-3 shadow">
            <FaBell className="text-3xl text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">Notice Board</h2>
          <p className="text-sm text-gray-600">
            Stay updated with latest announcements
          </p>
        </div>
      </div>

      {/* 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column – Scrolling Notices */}
        <div className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden h-80 pointer-events-auto">
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />

          <div className="animate-scroll-vertical py-3">
            {[...notices, ...notices].map((notice, index) => {
              const Icon = notice.icon;
              const color = getColorClasses(notice.color);

              return (
                <div
                  key={index}
                  onClick={() => setSelectedNotice(notice)}
                  className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-4 border-b border-gray-200"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center border`}
                  >
                    <Icon className={`text-lg ${color.text}`} />
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${color.badge}`}
                  >
                    {notice.type}
                  </span>

                  <p className="flex-1 text-gray-700 font-medium text-sm truncate">
                    {notice.title}
                  </p>

                  <span className="text-xs text-gray-500">{notice.date}</span>

                  <FaChevronRight className="text-gray-400" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column – Notice Details */}
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 min-h-80">
          {selectedNotice ? (
            <>
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 bg-${selectedNotice.color}-50 rounded-xl flex items-center justify-center border`}
                >
                  <selectedNotice.icon
                    className={`text-2xl ${
                      getColorClasses(selectedNotice.color).text
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${
                      getColorClasses(selectedNotice.color).badge
                    }`}
                  >
                    {selectedNotice.type.toUpperCase()}
                  </span>

                  <h3 className="text-xl font-bold text-gray-800 mt-2">
                    {selectedNotice.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {selectedNotice.date}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">
                {selectedNotice.fullContent}
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
              Select a notice to see details
            </div>
          )}
        </div>
      </div>

      {/* Animation */}
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
