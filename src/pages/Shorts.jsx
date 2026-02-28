import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { searchVideos } from '../api/youtube';
import { useVideoStore } from '../store/useVideoStore';

const Shorts = () => {
    const [shorts, setShorts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadShorts = async () => {
            setLoading(true);
            try {
                const data = await searchVideos('shorts');
                setShorts(data.items || []);
            } catch (err) {
                console.error("Failed to load shorts:", err);
            } finally {
                setLoading(false);
            }
        };
        loadShorts();
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14 p-4 lg:p-8">
                <h1 className="text-[var(--text-primary)] text-3xl font-bold mb-6 mt-4">Shorts</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {loading ? (
                        [...Array(10)].map((_, i) => (
                            <div key={i} className="aspect-[9/16] bg-[var(--bg-secondary)] rounded-xl animate-pulse" />
                        ))
                    ) : (
                        shorts.map((video) => (
                            <Link
                                to={`/watch/${video.id.videoId}`}
                                key={video.id.videoId}
                                className="flex flex-col gap-2 group cursor-pointer"
                            >
                                <div className="aspect-[9/16] bg-[var(--bg-secondary)] rounded-xl overflow-hidden relative">
                                    <img
                                        src={video.snippet.thumbnails?.high?.url}
                                        alt={video.snippet.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-end p-3">
                                        <p className="text-white text-sm font-medium line-clamp-2 self-end" dangerouslySetInnerHTML={{ __html: video.snippet.title }}></p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Shorts;
