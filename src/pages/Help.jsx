import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { HelpCircle, Search, PlayCircle, User, Shield, CreditCard } from 'lucide-react';

const Help = () => {
    const helpTopics = [
        { icon: PlayCircle, title: "Watching videos", desc: "Problems playing videos, captions, etc." },
        { icon: User, title: "Manage your account", desc: "Sign in, password, and settings" },
        { icon: CreditCard, title: "Memberships & more", desc: "YouTube Premium, channel members" },
        { icon: Shield, title: "Privacy & safety", desc: "Report issues, manage privacy" }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14 p-4 lg:p-12 text-[var(--text-primary)]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 mt-10">
                        <h1 className="text-4xl font-bold mb-6">Hello! How can we help you?</h1>
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search help"
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full py-4 pl-12 pr-6 outline-none focus:border-[var(--accent-blue)] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {helpTopics.map((topic, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                                <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                                    <topic.icon className="w-6 h-6 text-[var(--accent-blue)]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{topic.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">{topic.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-[var(--border-color)] text-center">
                        <HelpCircle className="w-10 h-10 text-[var(--text-secondary)] mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Need more help?</h2>
                        <p className="text-[var(--text-secondary)] mb-6">Visit our community forum to get answers from experts.</p>
                        <button className="bg-[var(--accent-blue)] text-white px-8 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-colors">
                            Ask the Community
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Help;
