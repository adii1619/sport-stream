import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sport: {
      type: String,
      required: true,
      trim: true,
    },
    league: {
      type: String,
      required: true,
      trim: true,
    },
    teams: {
      home: { type: String, required: true },
      away: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['LIVE', 'HIGHLIGHTS', 'FULL MATCH', 'REPLAY'],
      default: 'HIGHLIGHTS',
    },
    duration: {
      type: String,
      required: true,
    },
    views: {
      type: String,
      default: '0 views',
    },
    uploadedAt: {
      type: String,
      default: 'Just now',
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model('Video', videoSchema);