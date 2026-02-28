import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';

const SendFeedback = () => {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim()) {
            setSubmitted(true);
            setFeedback("");
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14 p-4 lg:p-12 text-[var(--text-primary)]">
                <div className="max-w-2xl mx-auto mt-10">
                    <div className="flex items-center gap-4 mb-8">
                        <MessageSquare className="w-8 h-8 text-[var(--accent-blue)]" />
                        <h1 className="text-3xl font-bold">Send feedback</h1>
                    </div>

                    {submitted ? (
                        <div className="bg-green-500/10 border border-green-500/50 p-8 rounded-2xl text-center">
                            <Send className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-green-500 mb-2">Thank you for your feedback!</h2>
                            <p className="text-[var(--text-secondary)]">Your input helps us make YouTube better for everyone.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-[var(--accent-blue)] font-bold hover:underline"
                            >
                                Send more feedback
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[var(--bg-secondary)] p-8 rounded-3xl border border-[var(--border-color)] shadow-xl">
                            <p className="mb-6 text-[var(--text-secondary)]">
                                Have a suggestion or found a bug? Let us know so we can improve the experience.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Describe your feedback..."
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-4 min-h-[200px] outline-none focus:border-[var(--accent-blue)] transition-colors text-[var(--text-primary)] resize-none mb-6"
                                    required
                                />

                                <div className="flex items-start gap-3 p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] mb-8">
                                    <AlertCircle className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        Your feedback, additional system information, and email will be used to help troubleshoot technical issues and improve Google services, subject to the Google Privacy Policy and Terms of Service.
                                    </p>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-6 py-2 rounded-full font-bold hover:bg-[var(--bg-hover)] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[var(--accent-blue)] text-white px-8 py-2 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SendFeedback;
