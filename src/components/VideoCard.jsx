import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';

import { formatDuration, formatViews, formatTimeAgo } from '../utils/format';

const VideoCard = ({ video }) => {
    // If it's still using old mock data temporarily
    const id = video.id?.videoId || video.id;
    const snippet = video.snippet || video;
    const stats = video.statistics || {};
    const contentDetails = video.contentDetails || {};

    const title = snippet.title;
    const thumbnail = snippet.thumbnails?.medium?.url || snippet.thumbnail;
    const duration = formatDuration(contentDetails.duration) || snippet.duration;
    const channelName = snippet.channelTitle || snippet.channelName;
    const channelImage = snippet.channelImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'; // Default avatar if missing

    const views = stats.viewCount ? formatViews(stats.viewCount) : snippet.views;
    const timestamp = snippet.publishedAt ? formatTimeAgo(snippet.publishedAt) : snippet.timestamp;

    return (
        <Link to={`/watch/${id}`} className="flex flex-col gap-3 group">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                    {duration}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                    <img
                        src={channelImage}
                        alt={channelName}
                        className="w-9 h-9 rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <h3 className="text-[var(--text-primary)] font-medium text-sm leading-tight line-clamp-2" dangerouslySetInnerHTML={{ __html: title }}>
                    </h3>
                    <div className="flex flex-col mt-1">
                        <span className="text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors">
                            {channelName}
                        </span>
                        <div className="flex items-center text-[var(--text-secondary)] text-sm">
                            <span>{views} views</span>
                            <span className="mx-1">•</span>
                            <span>{timestamp}</span>
                        </div>
                    </div>
                </div>
                <button className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
            </div>
        </Link>
    );
};

export default VideoCard;
