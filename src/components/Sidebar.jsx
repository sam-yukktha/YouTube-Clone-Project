import { Home, Compass, PlaySquare, Clock, ThumbsUp, ChevronRight, PlayCircle, History, Video, Flame, Music2, Gamepad2, Trophy, Settings, Flag, HelpCircle, MessageSquare } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useVideoStore } from '../store/useVideoStore';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[var(--bg-hover)] transition-colors ${active ? 'bg-[var(--bg-hover)] font-medium' : ''}`}
    >
        <Icon className={`w-5 h-5 text-[var(--text-primary)] ${active ? 'fill-[var(--text-primary)]' : ''}`} />
        <span className="text-[var(--text-primary)] text-sm tracking-tight">{label}</span>
    </div>
);

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setCategory, category: activeCategory } = useVideoStore();

    const handleCategoryClick = (cat) => {
        setCategory(cat);
        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    return (
        <aside className="fixed left-0 top-14 bottom-0 w-60 bg-[var(--bg-primary)] overflow-y-auto px-3 hidden lg:block custom-scrollbar border-r border-[var(--border-color)]">
            <div className="py-3 border-b border-[var(--border-color)]">
                <SidebarItem
                    icon={Home} label="Home"
                    active={location.pathname === '/' && activeCategory === 'All'}
                    onClick={() => handleCategoryClick('All')}
                />
                <Link to="/shorts">
                    <SidebarItem icon={PlayCircle} label="Shorts" active={location.pathname === '/shorts'} />
                </Link>
                <SidebarItem icon={Compass} label="Subscriptions" />
            </div>

            <div className="py-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2 px-3 mb-2">
                    <span className="text-[var(--text-primary)] font-medium">You</span>
                    <ChevronRight className="w-4 h-4 text-[var(--text-primary)]" />
                </div>
                <Link to="/history">
                    <SidebarItem icon={History} label="History" active={location.pathname === '/history'} />
                </Link>
                <Link to="/your-videos">
                    <SidebarItem icon={PlaySquare} label="Your videos" active={location.pathname === '/your-videos'} />
                </Link>
                <Link to="/watch-later">
                    <SidebarItem icon={Clock} label="Watch later" active={location.pathname === '/watch-later'} />
                </Link>
                <Link to="/likes">
                    <SidebarItem icon={ThumbsUp} label="Liked videos" active={location.pathname === '/likes'} />
                </Link>
            </div>

            <div className="py-3">
                <span className="text-[var(--text-primary)] font-medium px-3 mb-2 block">Explore</span>
                <SidebarItem
                    icon={Flame} label="Trending"
                    active={location.pathname === '/' && activeCategory === 'Trending'}
                    onClick={() => handleCategoryClick('All')} // Trending is usually default popular
                />
                <SidebarItem
                    icon={Music2} label="Music"
                    active={location.pathname === '/' && activeCategory === 'Music'}
                    onClick={() => handleCategoryClick('Music')}
                />
                <SidebarItem
                    icon={Gamepad2} label="Gaming"
                    active={location.pathname === '/' && activeCategory === 'Gaming'}
                    onClick={() => handleCategoryClick('Gaming')}
                />
                <SidebarItem
                    icon={Trophy} label="Sports"
                    active={location.pathname === '/' && activeCategory === 'Sports'}
                    onClick={() => handleCategoryClick('Sports')}
                />
            </div>

            <div className="py-3 mt-auto border-t border-[var(--border-color)]">
                <Link to="/settings">
                    <SidebarItem icon={Settings} label="Settings" active={location.pathname === '/settings'} />
                </Link>
                <Link to="/report-history">
                    <SidebarItem icon={Flag} label="Report history" active={location.pathname === '/report-history'} />
                </Link>
                <Link to="/help">
                    <SidebarItem icon={HelpCircle} label="Help" active={location.pathname === '/help'} />
                </Link>
                <Link to="/send-feedback">
                    <SidebarItem icon={MessageSquare} label="Send feedback" active={location.pathname === '/send-feedback'} />
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
