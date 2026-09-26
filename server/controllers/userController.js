import { User } from '../models/User.js';

// @desc    Get user profile & populated watchlist
// @route   GET /api/user/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('watchlist');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Toggle video item in user's MongoDB watchlist
// @route   POST /api/user/watchlist/:videoId
// @access  Private
export const toggleWatchlistItem = async (req, res) => {
  try {
    const { videoId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.watchlist.indexOf(videoId);

    if (index > -1) {
      // Remove video if already in watchlist
      user.watchlist.splice(index, 1);
    } else {
      // Add video to watchlist
      user.watchlist.push(videoId);
    }

    await user.save();
    
    // Return populated watchlist
    const updatedUser = await User.findById(req.user._id).populate('watchlist');
    res.json(updatedUser.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};