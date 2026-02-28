import React from 'react';
import { ExternalLink, MoreVertical } from 'lucide-react';

const AdCard = ({ ad }) => {
    return (
        <div className="flex flex-col gap-3 group cursor-pointer">
            {/* Thumbnail Area */}
            <div className="aspect-video relative rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                <img
                    src={ad.thumbnail}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-0.5 rounded">
                    Ad
                </div>
            </div>

            {/* Info Area */}
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-color)] overflow-hidden">
                        <img src={ad.brandLogo} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex-1 pr-4">
                    <h3 className="text-[var(--text-primary)] font-semibold line-clamp-2 leading-snug mb-1">
                        {ad.title}
                    </h3>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] transition-colors">
                            <span>{ad.brandName}</span>
                            <ExternalLink className="w-3 h-3" />
                        </div>
                        <p className="text-[var(--text-secondary)] text-xs mt-1 bg-[var(--bg-secondary)] px-2 py-0.5 rounded w-fit capitalize">
                            Sponsored
                        </p>
                    </div>
                </div>
                <button className="text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Action Bar */}
            <div className="mt-1 flex items-center justify-between bg-[var(--bg-secondary)] p-2.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition-all">
                <div className="flex flex-col overflow-hidden">
                    <span className="text-[var(--text-primary)] text-xs font-semibold truncate">{ad.ctaText}</span>
                    <span className="text-[var(--text-secondary)] text-[10px] truncate">{ad.url}</span>
                </div>
                <button className="bg-[var(--accent-blue)] text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-blue-600 shadow-sm whitespace-nowrap">
                    VISIT SITE
                </button>
            </div>
        </div>
    );
};

export default AdCard;
