/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { Bell, Plus, Edit2, Trash2, Calendar, Tag, AlertCircle, CheckCircle, Info, Sparkles } from "lucide-react";

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    date: "",
    category: "info",
    description: "",
  });

  // Load notices
  const loadNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data.notices || []);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const method = form.id ? "PUT" : "POST";

    await fetch("/api/notices", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ id: null, title: "", date: "", category: "info", description: "" });
    loadNotices();
  };

  const handleEdit = (notice: any) => {
    setForm(notice);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      await fetch("/api/notices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      loadNotices();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "important":
        return <AlertCircle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getCategoryColors = (category: string) => {
    switch (category) {
      case "important":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "success":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "important":
        return "from-red-500/20 to-orange-500/20 border-red-500/30";
      case "success":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30";
      default:
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Manage Notices
              </h1>
              <p className="text-gray-400 text-sm">Create and manage system-wide notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">{notices.length} Active Notices</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              {form.id ? "Edit Notice" : "Create New Notice"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                Notice Title
              </label>
              <input
                type="text"
                placeholder="Enter notice title..."
                className="w-full border border-gray-700 bg-gray-800/50 p-4 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Date and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-700 bg-gray-800/50 p-4 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  Category
                </label>
                <select
                  className="w-full border border-gray-700 bg-gray-800/50 p-4 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="info" className="bg-gray-800">Info</option>
                  <option value="important" className="bg-gray-800">Important</option>
                  <option value="success" className="bg-gray-800">Success</option>
                </select>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <textarea
                placeholder="Enter notice description..."
                className="w-full border border-gray-700 bg-gray-800/50 p-4 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all resize-none"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
            >
              {form.id ? (
                <>
                  <Edit2 className="w-5 h-5" />
                  Update Notice
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Notice
                </>
              )}
            </button>
          </form>
        </div>

        {/* Notice List */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            Existing Notices
          </h2>

          {notices.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No notices created yet</p>
              <p className="text-gray-500 text-sm mt-1">Create your first notice using the form above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice: any) => (
                <div
                  key={notice.id}
                  className={`bg-gradient-to-br ${getCategoryGradient(notice.category)} backdrop-blur-sm rounded-xl p-5 border transition-all duration-300 hover:scale-[1.01] group`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Notice Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg border ${getCategoryColors(notice.category)} mt-1`}>
                          {getCategoryIcon(notice.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-1">{notice.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {notice.date}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColors(notice.category)}`}>
                              {notice.category}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{notice.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg border border-yellow-600/30 transition-all"
                        onClick={() => handleEdit(notice)}
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-600/30 transition-all"
                        onClick={() => handleDelete(notice.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotices;