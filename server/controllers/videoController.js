import { Video } from '../models/Video.js';

// @desc    Fetch all videos (with query filtering)
// @route   GET /api/videos
export const getVideos = async (req, res) => {
  try {
    const { category, search, isLive } = req.query;
    let query = {};

    if (category && category.toLowerCase() !== 'all sports') {
      query.sport = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (isLive === 'true') {
      query.isLive = true;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { sport: searchRegex },
        { league: searchRegex },
        { 'teams.home': searchRegex },
        { 'teams.away': searchRegex },
      ];
    }

    const videos = await Video.find(query).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Fetch single video by ID
// @route   GET /api/videos/:id
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video match not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new video stream
// @route   POST /api/videos
export const createVideo = async (req, res) => {
  try {
    const { title, sport, league, homeTeam, awayTeam, status, duration, thumbnail, isLive } = req.body;

    if (!title || !sport || !league || !homeTeam || !awayTeam || !thumbnail) {
      return res.status(400).json({ message: 'Please provide all required match fields' });
    }

    const video = new Video({
      title,
      sport,
      league,
      teams: { home: homeTeam, away: awayTeam },
      status: status || 'HIGHLIGHTS',
      duration: duration || '10:00',
      views: isLive ? '1.2K watching' : '0 views',
      uploadedAt: 'Just now',
      thumbnail,
      isLive: Boolean(isLive),
    });

    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};