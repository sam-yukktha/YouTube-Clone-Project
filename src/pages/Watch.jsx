import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useVideoStore } from '../store/useVideoStore';
import { fetchVideoDetails, fetchRelatedVideos } from '../api/youtube';
import { formatViews, formatTimeAgo, formatDuration } from '../utils/format';

const Watch = () => {
    const { id } = useParams();
    const {
        subscriptions, toggleSubscription,
        likedVideos, toggleLike,
        watchLater, toggleWatchLater,
        addToHistory,
        isLoggedIn, login
    } = useVideoStore();
    const [video, setVideo] = useState(null);
    const [related, setRelated] = useState([]);
    const [liveViews, setLiveViews] = useState(0);

    useEffect(() => {
        const loadVideo = async () => {
            try {
                const data = await fetchVideoDetails(id);
                if (data.items && data.items.length > 0) {
                    const videoDetails = data.items[0];
                    setVideo(videoDetails);
                    setLiveViews(parseInt(videoDetails.statistics.viewCount) || 0);
                    addToHistory(videoDetails);

                    // Fetch related videos based on current video title
                    const relatedData = await fetchRelatedVideos(id, videoDetails.snippet.title);
                    setRelated(relatedData.items || []);
                }

            } catch (err) {
                console.error("Failed to load video details:", err);
            }
        };

        loadVideo();
        window.scrollTo(0, 0);
    }, [id]);

    if (!video) return <div className="bg-[var(--bg-primary)] min-h-screen" />;

    const snippet = video.snippet;
    const stats = video.statistics;
    const isSubscribed = subscriptions.includes(snippet.channelId);
    const videoId = video.id.videoId || video.id;
    const isLiked = likedVideos.some(v => (v.id.videoId || v.id) === videoId);
    const isInWatchLater = watchLater.some(v => (v.id.videoId || v.id) === videoId);

    const handleSubscribe = () => {
        if (!isLoggedIn) {
            alert("Please login to subscribe");
            return;
        }
        toggleSubscription(snippet.channelId);
    };

    const handleLike = () => {
        if (!isLoggedIn) {
            alert("Please login to like videos");
            return;
        }
        toggleLike(video);
    };

    const handleWatchLater = () => {
        if (!isLoggedIn) {
            alert("Please login to save videos");
            return;
        }
        toggleWatchLater(video);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <main className="pt-14 px-4 lg:px-6 xl:px-24 flex flex-col lg:flex-row gap-6 max-w-[1700px] mx-auto">
                {/* Main Content */}
                <div className="flex-1 lg:max-w-[calc(100%-400px)] pt-6">
                    {/* Real Video Player */}
                    <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 shadow-2xl relative group">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                            title={snippet.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    <h1 className="text-[var(--text-primary)] text-xl font-bold mb-3" dangerouslySetInnerHTML={{ __html: snippet.title }}></h1>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                {snippet.channelTitle.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[var(--text-primary)] font-bold">{snippet.channelTitle}</span>
                                <span className="text-[var(--text-secondary)] text-xs">Subscribers hidden</span>
                            </div>
                            <button
                                onClick={handleSubscribe}
                                className={`ml-4 px-4 py-2 rounded-full font-medium transition-colors ${isSubscribed
                                    ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                                    : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--text-secondary)]'
                                    }`}
                            >
                                {isSubscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 px-4 py-2 hover:bg-[var(--bg-hover)] border-r border-[var(--border-color)] ${isLiked ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)]'}`}
                                >
                                    <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-[var(--accent-blue)]' : ''}`} />
                                    {isLiked ? 'Liked' : formatViews(stats.likeCount)}
                                </button>
                                <button className="px-4 py-2 hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
                                    <ThumbsDown className="w-5 h-5" />
                                </button>
                            </div>
                            <button
                                onClick={handleWatchLater}
                                className={`flex items-center gap-2 bg-[var(--bg-secondary)] px-4 py-2 rounded-full hover:bg-[var(--bg-hover)] ${isInWatchLater ? 'text-green-500' : 'text-[var(--text-primary)]'}`}
                            >
                                {isInWatchLater ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                {isInWatchLater ? 'Saved' : 'Watch Later'}
                            </button>
                            <button className="flex items-center gap-2 bg-[var(--bg-secondary)] px-4 py-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)] max-sm:hidden">
                                <Share2 className="w-5 h-5" /> Share
                            </button>
                            <button className="p-2 bg-[var(--bg-secondary)] rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-[var(--bg-secondary)] rounded-xl p-3 text-sm text-[var(--text-primary)] mb-6">
                        <div className="font-bold mb-1">
                            {formatViews(stats.viewCount)} views • {formatTimeAgo(snippet.publishedAt)}
                        </div>
                        <p className="whitespace-pre-wrap">{snippet.description.substring(0, 250)}...</p>
                        <button className="mt-2 font-bold hover:underline">Show more</button>
                    </div>

                    <div className="text-[var(--text-primary)]">
                        <div className="flex items-center gap-6 mb-6">
                            <span className="text-xl font-bold">{formatViews(stats.commentCount)} Comments</span>
                            <div className="flex items-center gap-2 font-medium text-[var(--text-secondary)]">
                                <MessageSquare className="w-5 h-5" /> Sort by
                            </div>
                        </div>
                        {isLoggedIn && (
                            <div className="flex gap-4 mb-8">
                                <img src={useVideoStore.getState().user?.avatar} className="w-10 h-10 rounded-full" alt="User" />
                                <div className="flex-1 border-b border-[var(--border-color)] pb-1">
                                    <input type="text" placeholder="Add a comment..." className="bg-transparent w-full outline-none placeholder:text-[var(--text-secondary)]" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar / Recommendations */}
                <div className="w-full lg:w-[400px] flex flex-col gap-4 pt-6">
                    {related.map((v) => {
                        const rId = v.id.videoId || v.id;
                        return (
                            <Link
                                key={rId}
                                to={`/watch/${rId}`}
                                className="flex gap-3 group cursor-pointer"
                            >
                                <div className="w-40 aspect-video bg-[var(--bg-secondary)] rounded-lg flex-shrink-0 overflow-hidden relative">
                                    <img src={v.snippet.thumbnails?.medium?.url} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 rounded">
                                        {formatDuration(v.contentDetails?.duration)}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-[var(--text-primary)] font-medium line-clamp-2" dangerouslySetInnerHTML={{ __html: v.snippet.title }}></span>
                                    <span className="text-xs text-[var(--text-secondary)]">{v.snippet.channelTitle}</span>
                                    {v.statistics && <span className="text-xs text-[var(--text-secondary)]">{formatViews(v.statistics.viewCount)} views • {formatTimeAgo(v.snippet.publishedAt)}</span>}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};

export default Watch;
