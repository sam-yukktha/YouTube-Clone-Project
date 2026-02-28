import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Likes from "./pages/Likes";
import WatchLater from "./pages/WatchLater";
import History from "./pages/History";
import Shorts from "./pages/Shorts";
import YourVideos from "./pages/YourVideos";
import Settings from "./pages/Settings";
import ReportHistory from "./pages/ReportHistory";
import Help from "./pages/Help";
import SendFeedback from "./pages/SendFeedback";
import { useVideoStore } from "./store/useVideoStore";

function App() {
  const { theme } = useVideoStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/your-videos" element={<YourVideos />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/report-history" element={<ReportHistory />} />
        <Route path="/help" element={<Help />} />
        <Route path="/send-feedback" element={<SendFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
