import { Video } from '../models/Video.js';

// @desc    Fetch all videos (with query filtering)
// @route   GET /api/videos
export const getVideos = async (req, res) => {
  try {
    const { category, search, isLive } = req.query;
    let query = {};

    // Filter by Sport / Category
    if (category && category.toLowerCase() !== 'all sports') {
      query.sport = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Filter by Live Stream Status
    if (isLive === 'true') {
      query.isLive = true;
    }

    // Search Filter (Matches Title, Sport, League, or Team Names)
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