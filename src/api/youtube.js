import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeClient = axios.create({
    baseURL: BASE_URL,
});

export const fetchPopularVideos = async (categoryId = '0') => {
    try {
        const params = {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            regionCode: 'US',
            maxResults: 50,
            key: YOUTUBE_API_KEY,
        };
        if (categoryId !== '0' && categoryId !== 'All') {
            params.videoCategoryId = categoryId;
        }

        const response = await youtubeClient.get('/videos', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular videos:', error);
        throw error;
    }
};

export const searchVideos = async (query) => {
    try {
        const response = await youtubeClient.get('/search', {
            params: {
                part: 'snippet',
                q: query,
                maxResults: 50,
                type: 'video',
                key: YOUTUBE_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching videos:', error);
        throw error;
    }
};

export const fetchVideoCategories = async () => {
    try {
        const response = await youtubeClient.get('/videoCategories', {
            params: {
                part: 'snippet',
                regionCode: 'US',
                key: YOUTUBE_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchLikedVideos = async (accessToken) => {
    try {
        const response = await youtubeClient.get('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                myRating: 'like',
                maxResults: 50,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching liked videos:', error);
        throw error;
    }
};

export const fetchVideoDetails = async (videoId) => {
    try {
        const response = await youtubeClient.get('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoId,
                key: YOUTUBE_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw error;
    }
};

export const fetchComments = async (videoId) => {
    try {
        const response = await youtubeClient.get('/commentThreads', {
            params: {
                part: 'snippet',
                videoId: videoId,
                maxResults: 20,
                key: YOUTUBE_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const fetchChannelDetails = async (channelId) => {
    try {
        const response = await youtubeClient.get('/channels', {
            params: {
                part: 'snippet,statistics',
                id: channelId,
                key: YOUTUBE_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching channel details:', error);
        throw error;
    }
};

export const fetchMyVideos = async (accessToken) => {
    try {
        const response = await youtubeClient.get('/search', {
            params: {
                part: 'snippet',
                forMine: true,
                type: 'video',
                maxResults: 50,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching my videos:', error);
        throw error;
    }
};

export const fetchRelatedVideos = async (videoId, title) => {
    try {
        // Since relatedToVideoId is deprecated, we search for videos with similar titles
        const response = await youtubeClient.get('/search', {
            params: {
                part: 'snippet',
                q: title,
                maxResults: 15,
                type: 'video',
                key: YOUTUBE_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching related videos:', error);
        throw error;
    }
};
