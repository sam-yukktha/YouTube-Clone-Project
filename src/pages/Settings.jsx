import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Settings as SettingsIcon, User, Shield, Bell, PlaySquare, Globe, Moon, Languages, HelpCircle } from 'lucide-react';
import { useVideoStore } from '../store/useVideoStore';

const Settings = () => {
    const { user, isLoggedIn, theme, toggleTheme, language, setLanguage, location: userLocation, setLocation } = useVideoStore();
    const [autoplay, setAutoplay] = React.useState(true);
    const [inlinePlayback, setInlinePlayback] = React.useState(true);

    const handleItemClick = (label) => {
        if (label === "Appearance") {
            toggleTheme();
        } else if (label === "Autoplay") {
            setAutoplay(!autoplay);
        } else if (label === "Inline playback") {
            setInlinePlayback(!inlinePlayback);
        } else if (label === "Language") {
            const langs = ["English (US)", "English (UK)", "Hindi", "French", "Spanish"];
            const currentIndex = langs.indexOf(language);
            const nextIndex = (currentIndex + 1) % langs.length;
            setLanguage(langs[nextIndex]);
        } else if (label === "Location") {
            const locs = ["United States", "India", "United Kingdom", "France", "Spain"];
            const currentIndex = locs.indexOf(userLocation);
            const nextIndex = (currentIndex + 1) % locs.length;
            setLocation(locs[nextIndex]);
        } else {
            alert(`${label} setting clicked! This feature is coming soon.`);
        }
    };

    const sections = [
        {
            title: "Account",
            items: [
                { icon: User, label: "Your Channel", desc: "Manage your videos and profile" },
                { icon: Shield, label: "Security", desc: "Protect your account" },
                { icon: Bell, label: "Notifications", desc: "Choose how you're notified" }
            ]
        },
        {
            title: "Preferences",
            items: [
                {
                    icon: Moon,
                    label: "Appearance",
                    desc: theme === 'dark' ? "Dark theme is on" : "Light theme is on",
                    value: theme === 'dark' ? "Dark" : "Light"
                },
                { icon: Languages, label: "Language", desc: language, value: language },
                { icon: Globe, label: "Location", desc: userLocation, value: userLocation }
            ]
        },
        {
            title: "Playback and performance",
            items: [
                { icon: PlaySquare, label: "Autoplay", desc: autoplay ? "On" : "Off", toggle: true, active: autoplay },
                { icon: PlaySquare, label: "Inline playback", desc: inlinePlayback ? "On" : "Off", toggle: true, active: inlinePlayback },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navbar />
            <Sidebar />
            <main className="lg:pl-60 pt-14 p-4 lg:p-12 text-[var(--text-primary)]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <SettingsIcon className="w-8 h-8" />
                        <h1 className="text-3xl font-bold">Settings</h1>
                    </div>

                    {isLoggedIn && (
                        <div className="flex items-center gap-6 p-6 bg-[var(--bg-secondary)] rounded-2xl mb-12 border border-[var(--border-color)]">
                            <img src={user.avatar} className="w-20 h-20 rounded-full border-2 border-[var(--border-color)]" alt="" />
                            <div>
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className="text-[var(--text-secondary)] text-sm">{user.email}</p>
                                <button className="mt-3 text-[var(--accent-blue)] font-medium text-sm hover:underline">Manage your Google Account</button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-12">
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="text-lg font-bold mb-4 px-2">{section.title}</h3>
                                <div className="flex flex-col gap-1">
                                    {section.items.map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleItemClick(item.label)}
                                            className="flex items-center justify-between p-4 hover:bg-[var(--bg-hover)] rounded-xl cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center text-[var(--text-secondary)]">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-base">{item.label}</div>
                                                    <div className="text-xs text-[var(--text-secondary)]">{item.desc}</div>
                                                </div>
                                            </div>
                                            {item.value && <span className="text-sm text-[var(--text-secondary)]">{item.value}</span>}
                                            {item.toggle && (
                                                <div className={`w-10 h-5 rounded-full relative transition-colors ${item.active ? 'bg-blue-600' : 'bg-gray-600'}`}>
                                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-0.5' : 'left-0.5'}`}></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex items-center justify-between text-[var(--text-secondary)] text-sm italic">
                        <span>YouTube Clone Version 1.0.0</span>
                        <div className="flex gap-6">
                            <span className="cursor-pointer hover:underline">Privacy Policy</span>
                            <span className="cursor-pointer hover:underline">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
