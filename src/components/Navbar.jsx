import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Video, Bell, User, Mic, LogIn, LogOut, Moon, Sun, MoreVertical, Settings, Globe, Languages, ChevronRight } from 'lucide-react';
import { useVideoStore } from '../store/useVideoStore';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Navbar = () => {
    const { isLoggedIn, user, login, logout, setSearchQuery, theme, toggleTheme, language, setLanguage, location: userLocation, setLocation } = useVideoStore();
    const [localSearch, setLocalSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const navigate = useNavigate();
    const suggestionRef = useRef(null);
    const profileMenuRef = useRef(null);
    const settingsMenuRef = useRef(null);

    const handleLanguageChange = (e) => {
        e.stopPropagation();
        const langs = ["English (US)", "English (UK)", "Hindi", "French", "Spanish"];
        const currentIndex = langs.indexOf(language);
        const nextIndex = (currentIndex + 1) % langs.length;
        setLanguage(langs[nextIndex]);
    };

    const handleLocationChange = (e) => {
        e.stopPropagation();
        const locs = ["United States", "India", "United Kingdom", "France", "Spain"];
        const currentIndex = locs.indexOf(userLocation);
        const nextIndex = (currentIndex + 1) % locs.length;
        setLocation(locs[nextIndex]);
    };

    // Fetch Search Suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (localSearch.trim().length > 1) {
                try {
                    // Using the proxied endpoint to avoid CORS issues
                    const response = await axios.get(
                        `/api/suggestions?client=firefox&ds=yt&q=${encodeURIComponent(localSearch)}`
                    );

                    const data = response.data;
                    if (data && Array.isArray(data) && data[1]) {
                        setSuggestions(data[1]);
                        setShowSuggestions(true);
                    }
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [localSearch]);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
                setShowSettingsMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (query = localSearch) => {
        const finalQuery = typeof query === 'string' ? query : localSearch;
        if (finalQuery.trim()) {
            setSearchQuery(finalQuery.trim());
            setLocalSearch(finalQuery.trim());
            setShowSuggestions(false);
            if (window.location.pathname !== '/') {
                navigate('/');
            }
        }
    };

    const handleVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support Speech Recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setLocalSearch(transcript);
            handleSearch(transcript);
        };

        recognition.start();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );
                const userData = {
                    name: res.data.name,
                    avatar: res.data.picture,
                    email: res.data.email
                };
                login(userData, tokenResponse.access_token);
            } catch (err) {
                console.error("Failed to fetch user profile", err);
            }
        },
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
    });

    const ProfileMenu = () => (
        <div ref={profileMenuRef} className="absolute right-0 top-full mt-2 w-72 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl shadow-2xl py-2 z-[100]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)] mb-1">
                <img src={user.avatar} className="w-10 h-10 rounded-full" alt="Profile" />
                <div className="flex flex-col text-left">
                    <span className="text-[var(--text-primary)] font-medium truncate w-48">{user.name}</span>
                    <span className="text-[var(--text-secondary)] text-sm truncate w-48">{user.email}</span>
                </div>
            </div>

            <button className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm">
                <User className="w-5 h-5 text-[var(--text-secondary)]" /> Your channel
            </button>

            <div className="h-[1px] bg-[var(--border-color)] my-1" />

            <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <div className="flex items-center gap-4">
                    {theme === 'dark' ? <Sun className="w-5 h-5 text-[var(--text-secondary)]" /> : <Moon className="w-5 h-5 text-[var(--text-secondary)]" />}
                    <span>Appearance: {theme === 'dark' ? 'Dark' : 'Light'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            <button
                onClick={handleLanguageChange}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <div className="flex items-center gap-4">
                    <Languages className="w-5 h-5 text-[var(--text-secondary)]" />
                    <span>Language: {language}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            <button
                onClick={handleLocationChange}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <div className="flex items-center gap-4">
                    <Globe className="w-5 h-5 text-[var(--text-secondary)]" />
                    <span>Location: {userLocation}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            <button
                onClick={() => { navigate('/settings'); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <Settings className="w-5 h-5 text-[var(--text-secondary)]" /> Settings
            </button>

            <div className="h-[1px] bg-[var(--border-color)] my-1" />

            <button
                onClick={() => { logout(); setShowProfileMenu(false); }}
                className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <LogOut className="w-5 h-5 text-[var(--text-secondary)]" /> Sign Out
            </button>
        </div>
    );

    const SettingsMenu = () => (
        <div ref={settingsMenuRef} className="absolute right-0 top-full mt-2 w-72 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl shadow-2xl py-2 z-[100]">
            <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <div className="flex items-center gap-4">
                    {theme === 'dark' ? <Sun className="w-5 h-5 text-[var(--text-secondary)]" /> : <Moon className="w-5 h-5 text-[var(--text-secondary)]" />}
                    <span>Appearance: {theme === 'dark' ? 'Dark' : 'Light'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            <button
                onClick={handleLanguageChange}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <div className="flex items-center gap-4">
                    <Languages className="w-5 h-5 text-[var(--text-secondary)]" />
                    <span>Language: {language}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            <button
                onClick={handleLocationChange}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <div className="flex items-center gap-4">
                    <Globe className="w-5 h-5 text-[var(--text-secondary)]" />
                    <span>Location: {userLocation}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            <div className="h-[1px] bg-[var(--border-color)] my-1" />

            <button
                onClick={() => { navigate('/settings'); setShowSettingsMenu(false); }}
                className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] text-sm"
            >
                <Settings className="w-5 h-5 text-[var(--text-secondary)]" /> Settings
            </button>
        </div>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 h-14 bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-[var(--bg-hover)] rounded-full transition-colors hidden md:block group">
                    <Menu className="text-[var(--text-primary)] w-6 h-6" />
                </button>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="flex items-center">
                        <svg height="24" viewBox="0 0 28 20" width="28" className="mb-0.5">
                            <path d="M27.97 4.71c-.24-.91-.96-1.62-1.87-1.87C24.44 2.41 14 2.41 14 2.41s-10.44 0-12.1.43c-.91.25-1.62.96-1.87 1.87C0 6.64 0 10 0 10s0 3.36.43 5.29c.25.91.96 1.62 1.87 1.87 1.66.44 12.1.44 12.1.44s10.44 0 12.1-.44c.91-.25 1.62-.96 1.87-1.87.43-1.93.43-5.29.43-5.29s0-3.36-.43-5.29z" fill="#FF0000" />
                            <path d="M11 14l7-4-7-4z" fill="#ffffff" />
                        </svg>
                        <span className="text-[var(--text-primary)] font-bold text-xl tracking-tighter ml-1">YouTube</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-[720px] ml-10 flex items-center gap-4 relative">
                <div className="flex flex-1 items-center bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full focus-within:border-blue-500 pl-4 relative shadow-inner">
                    <Search className="text-[var(--text-secondary)] w-5 h-5 hidden md:block" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={localSearch}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] px-4 py-2 text-base placeholder:text-[var(--text-secondary)]"
                    />
                    <button
                        onClick={() => handleSearch()}
                        className="bg-[var(--bg-secondary)] px-6 py-2 border-l border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition-colors rounded-r-full"
                    >
                        <Search className="text-[var(--text-primary)] w-5 h-5" />
                    </button>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div
                            ref={suggestionRef}
                            className="absolute top-full left-0 right-0 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl mt-2 py-3 shadow-2xl z-[100] text-[var(--text-primary)] overflow-hidden"
                        >
                            {suggestions.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSearch(item)}
                                    className="px-4 py-2 hover:bg-[var(--bg-hover)] cursor-pointer flex items-center gap-3"
                                >
                                    <Search className="w-4 h-4 text-[var(--text-secondary)]" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleVoiceSearch}
                    className={`p-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] rounded-full transition-all md:block relative ${isListening ? 'ring-2 ring-red-500 animate-pulse' : ''}`}
                >
                    <Mic className={`text-[var(--text-primary)] w-5 h-5 ${isListening ? 'text-red-500' : ''}`} />
                    {isListening && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                            Listening...
                        </div>
                    )}
                </button>
            </div>

            <div className="flex items-center gap-2 md:gap-2 ml-4 relative">
                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-[var(--bg-hover)] rounded-full transition-colors text-[var(--text-primary)] hidden sm:block"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>

                {!isLoggedIn && (
                    <div className="relative">
                        <button
                            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                            className="p-2 hover:bg-[var(--bg-hover)] rounded-full transition-colors text-[var(--text-primary)]"
                        >
                            <MoreVertical className="w-6 h-6" />
                        </button>
                        {showSettingsMenu && <SettingsMenu />}
                    </div>
                )}

                {isLoggedIn ? (
                    <>
                        <button className="p-2 hover:bg-[var(--bg-hover)] rounded-full transition-colors hidden md:block">
                            <Video className="text-[var(--text-primary)] w-6 h-6" />
                        </button>
                        <button className="p-2 hover:bg-[var(--bg-hover)] rounded-full transition-colors hidden md:block">
                            <Bell className="text-[var(--text-primary)] w-6 h-6" />
                        </button>
                        <div className="relative ml-2">
                            <img
                                src={user.avatar}
                                alt="Profile"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-8 h-8 rounded-full cursor-pointer object-cover border border-[#303030]"
                            />
                            {showProfileMenu && <ProfileMenu />}
                        </div>
                    </>
                ) : (
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center gap-2 bg-transparent border border-[var(--border-color)] text-[var(--accent-blue)] px-4 py-1.5 rounded-full font-medium hover:bg-blue-500/10 transition-colors whitespace-nowrap"
                    >
                        <LogIn className="w-5 h-5" /> Sign In
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
