import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { useVideoStore } from '../store/useVideoStore';
import { LogIn, History as HistoryIcon } from 'lucide-react';

const History = () => {
    const { isLoggedIn, history, login } = useVideoStore();

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14 p-4 lg:p-8">
                <h1 className="text-[var(--text-primary)] text-3xl font-bold mb-6 mt-4">Watch history</h1>

                {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center mt-20 gap-4">
                        <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
                            <LogIn className="w-10 h-10 text-[var(--text-primary)]" />
                        </div>
                        <h2 className="text-[var(--text-primary)] text-xl font-medium">Keep track of what you watch</h2>
                        <p className="text-[var(--text-secondary)]">Watch history isn't viewable when you're signed out.</p>
                        <button
                            onClick={login}
                            className="mt-4 flex items-center gap-2 bg-transparent border border-[var(--border-color)] text-[var(--accent-blue)] px-6 py-2 rounded-full font-medium hover:bg-[var(--accent-blue)] hover:text-white transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                ) : history.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                        {history.map((video, index) => (
                            <VideoCard key={`${video.id}-${index}`} video={video} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 gap-4">
                        <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
                            <HistoryIcon className="w-10 h-10 text-[var(--text-secondary)]" />
                        </div>
                        <p className="text-[var(--text-secondary)] text-lg">Your watch history is empty.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default History;
