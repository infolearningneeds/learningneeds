/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { Mail, Send, Users, Check, X, Loader2, Calendar, Search } from 'lucide-react';

interface NewsletterEmail {
    id: string;
    email: string;
    created_at: string;
}

interface NewsletterContentProps {
    newsletterEmails: NewsletterEmail[];
}

const NewsletterContent: React.FC<NewsletterContentProps> = ({ newsletterEmails }) => {
    const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
    const [showComposer, setShowComposer] = useState(false);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const filteredEmails = newsletterEmails?.filter(item =>
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const toggleSelectAll = () => {
        if (selectedEmails.size === filteredEmails.length) {
            setSelectedEmails(new Set());
        } else {
            setSelectedEmails(new Set(filteredEmails.map(item => item.id)));
        }
    };

    const toggleSelectEmail = (id: string) => {
        const newSelected = new Set(selectedEmails);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedEmails(newSelected);
    };

    const handleSendNewsletter = async () => {
        if (!subject || !content || selectedEmails.size === 0) return;

        setIsSending(true);

        const emailsToSend = newsletterEmails
            ?.filter(item => selectedEmails.has(item.id))
            .map(item => item.email) || [];

        try {
            const response = await fetch('/api/send-newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emails: emailsToSend,
                    subject,
                    content
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(`Successfully sent to ${selectedEmails.size} subscriber(s)!`);
                setShowComposer(false);
                setSubject('');
                setContent('');
                setSelectedEmails(new Set());
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                alert('Failed to send emails: ' + data.error);
            }
        } catch (error) {
            console.error('Error sending emails:', error);
            alert('Failed to send emails');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-indigo-500/20 p-4 md:p-8 mt-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-white rounded-xl shadow-lg">
                            <Mail className="w-8 h-8 text-gray-800" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-white bg-clip-text text-transparent">
                                Newsletter Manager
                            </h1>
                            <p className="text-gray-300 text-sm md:text-base">Manage and send newsletters to your subscribers</p>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-pulse">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">{successMessage}</span>
                    </div>
                )}

                {/* Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Subscribers</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">{newsletterEmails?.length || 0}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <Users className="w-8 h-8 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Selected</p>
                                <p className="text-3xl font-bold text-purple-600 mt-1">{selectedEmails.size}</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-xl">
                                <Check className="w-8 h-8 text-purple-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-500/20 rounded-2xl p-6 shadow-lg">
                        <button
                            onClick={() => setShowComposer(!showComposer)}
                            disabled={selectedEmails.size === 0}
                            className="w-full h-full flex items-center justify-center gap-2 text-white font-semibold disabled:opacity-50"
                        >
                            <Send className="w-6 h-6" />
                            <span>Compose Newsletter</span>
                        </button>
                    </div>
                </div>

                {/* Composer */}
                {showComposer && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Compose Newsletter</h2>
                            <button
                                onClick={() => setShowComposer(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Enter email subject..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your newsletter content here..."
                                    rows={12}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-y"
                                />
                            </div>

                            <button
                                onClick={handleSendNewsletter}
                                disabled={!subject || !content || isSending}
                                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send to {selectedEmails.size} Subscriber(s)
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Subscribers List */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* List Header */}
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-gray-800">Subscribers</h2>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1 sm:flex-initial">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search emails..."
                                        className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                    />
                                </div>

                                <button
                                    onClick={toggleSelectAll}
                                    disabled={!newsletterEmails || newsletterEmails.length === 0}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700 whitespace-nowrap disabled:opacity-50"
                                >
                                    {selectedEmails.size === filteredEmails.length && filteredEmails.length > 0 ? 'Deselect All' : 'Select All'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* List Body */}
                    <div className="divide-y divide-gray-100">
                        {newsletterEmails && newsletterEmails.length > 0 && filteredEmails.length > 0 ? (
                            filteredEmails.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-4 md:p-6 hover:bg-gray-50 transition cursor-pointer ${selectedEmails.has(item.id) ? 'bg-purple-50' : ''
                                        }`}
                                    onClick={() => toggleSelectEmail(item.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${selectedEmails.has(item.id)
                                            ? 'bg-purple-500 border-purple-500'
                                            : 'border-gray-300'
                                            }`}>
                                            {selectedEmails.has(item.id) && (
                                                <Check className="w-4 h-4 text-white" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-white font-semibold text-sm">
                                                            {item.email.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium text-gray-800 truncate">{item.email}</span>
                                                </div>

                                                <div className="flex items-center gap-2 text-gray-500 text-sm ml-13 sm:ml-0">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="whitespace-nowrap">
                                                        {new Date(item.created_at).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                                    <Users className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 font-medium">
                                    {newsletterEmails && newsletterEmails.length > 0 ? 'No subscribers found' : 'No subscribers yet'}
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {newsletterEmails && newsletterEmails.length > 0 ? 'Try adjusting your search' : 'Subscribers will appear here once they sign up'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterContent;