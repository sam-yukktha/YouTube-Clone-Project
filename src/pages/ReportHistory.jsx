import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Flag, Shield } from 'lucide-react';

const ReportHistory = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14 p-4 lg:p-12 text-[var(--text-primary)]">
                <div className="max-w-4xl mx-auto text-center mt-20">
                    <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Flag className="w-10 h-10 text-[var(--text-secondary)]" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Report history</h1>
                    <p className="text-[var(--text-secondary)] text-lg mb-8">
                        Thanks for reporting. Any member of the YouTube community can flag content to us that they believe violates our Community Guidelines.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                            <Shield className="w-8 h-8 text-[var(--accent-blue)] mb-4" />
                            <h3 className="font-bold text-lg mb-2">Community Guidelines</h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                When content is flagged, it is not automatically taken down. Flagged content is reviewed by YouTube staff to check if it violates Community Guidelines.
                            </p>
                        </div>
                        <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                            <Flag className="w-8 h-8 text-red-500 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Your Reports</h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                You haven't submitted any reports yet. When you report content, it will show up here for you to track.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReportHistory;
