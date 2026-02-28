import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { useVideoStore } from '../store/useVideoStore';
import { fetchLikedVideos } from '../api/youtube';
import { LogIn } from 'lucide-react';

const Likes = () => {
    const { isLoggedIn, accessToken, login, likedVideos: localLikedVideos } = useVideoStore();
    const [fetchedLikedVideos, setFetchedLikedVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoggedIn || !accessToken) return;

        const loadLikedVideos = async () => {
            setLoading(true);
            try {
                const data = await fetchLikedVideos(accessToken);
                setFetchedLikedVideos(data.items || []);
            } catch (err) {
                console.error("Failed to load liked videos:", err);
            } finally {
                setLoading(false);
            }
        };

        loadLikedVideos();
    }, [isLoggedIn, accessToken]);

    // Combine local likes (newly liked) with fetched likes, avoiding duplicates
    const allLikedVideos = [...localLikedVideos];
    fetchedLikedVideos.forEach(fetched => {
        if (!allLikedVideos.some(local => local.id === fetched.id)) {
            allLikedVideos.push(fetched);
        }
    });

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14 p-4 lg:p-8">
                <h1 className="text-[var(--text-primary)] text-3xl font-bold mb-6 mt-4">Liked videos</h1>

                {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center mt-20 gap-4">
                        <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
                            <LogIn className="w-10 h-10 text-[var(--text-primary)]" />
                        </div>
                        <h2 className="text-[var(--text-primary)] text-xl font-medium">Enjoy your favorite videos</h2>
                        <p className="text-[var(--text-secondary)]">Sign in to access videos that you've liked</p>
                        <button
                            onClick={login}
                            className="mt-4 flex items-center gap-2 bg-transparent border border-[var(--border-color)] text-[var(--accent-blue)] px-6 py-2 rounded-full font-medium hover:bg-[var(--accent-blue)] hover:text-white transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-3 animate-pulse">
                                <div className="aspect-video bg-[var(--bg-secondary)] rounded-xl" />
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[var(--bg-secondary)]" />
                                    <div className="flex-1 flex flex-col gap-2">
                                        <div className="h-4 bg-[var(--bg-secondary)] rounded w-full" />
                                        <div className="h-3 bg-[var(--bg-secondary)] rounded w-2/3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : allLikedVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                        {allLikedVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 gap-4">
                        <p className="text-[var(--text-secondary)] text-lg">You haven't liked any videos yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Likes;
