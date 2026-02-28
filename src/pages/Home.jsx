import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import AdCard from '../components/AdCard';
import { useVideoStore } from '../store/useVideoStore';
import { fetchPopularVideos, searchVideos } from '../api/youtube';

const MOCK_ADS = [
    {
        id: 'ad-1',
        title: 'Build faster with AI. Experience the new era of coding with Antigravity.',
        brandName: 'Antigravity AI',
        brandLogo: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6757?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
        ctaText: 'Start Your Free Trial',
        url: 'antigravity.ai',
    },
    {
        id: 'ad-2',
        title: 'Master Modern Web Development. Top-rated courses by industry experts.',
        brandName: 'Web Academy',
        brandLogo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
        ctaText: 'Explore Courses',
        url: 'webacademy.com',
    },
    {
        id: 'ad-3',
        title: 'Upgrade your workspace with premium desk accessories.',
        brandName: 'Minimalist Desk',
        brandLogo: 'https://images.unsplash.com/photo-1542744094-24638eff5860?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=800&h=450&fit=crop',
        ctaText: 'Shop Collection',
        url: 'minimalistdesk.com',
    }
];

// YouTube Video Category IDs mapping: 0 = All
const CATEGORY_MAP = {
    "All": "0", "Music": "10", "Gaming": "20", "Sports": "17",
    "Comedy": "23", "Entertainment": "24", "News": "25",
    "Science & Tech": "28", "Education": "27"
};
const categories = Object.keys(CATEGORY_MAP);

const Home = () => {
    const { videos, setVideos, category, setCategory, searchQuery } = useVideoStore();

    useEffect(() => {
        const loadVideos = async () => {
            try {
                if (searchQuery) {
                    const data = await searchVideos(searchQuery);
                    setVideos(data.items);
                } else {
                    const categoryId = CATEGORY_MAP[category];
                    const data = await fetchPopularVideos(categoryId);
                    setVideos(data.items);
                }
            } catch (err) {
                console.error("Failed to load videos:", err);
            }
        };
        loadVideos();
    }, [category, searchQuery, setVideos]);

    // The API fetches filtered videos already, so we just use the API result
    const filteredVideos = videos;

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14">
                {/* Categories Bar */}
                <div className="sticky top-14 bg-[var(--bg-primary)] z-40 py-3 px-4 flex gap-3 overflow-x-auto no-scrollbar">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${category === cat ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                    {filteredVideos.length > 0 ? (
                        filteredVideos.map((video, index) => {
                            const videoId = video.id?.videoId || video.id;
                            return (
                                <React.Fragment key={typeof videoId === 'string' ? videoId : index}>
                                    {index === 2 && <AdCard ad={MOCK_ADS[0]} />}
                                    {index === 8 && <AdCard ad={MOCK_ADS[1]} />}
                                    {index === 14 && <AdCard ad={MOCK_ADS[2]} />}
                                    <VideoCard video={video} />
                                </React.Fragment>
                            );
                        })
                    ) : (
                        [...Array(10)].map((_, i) => (
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
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;
