export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  video: string;
  duration: string;
}

// Using Google's sample videos for reliability in demo
const VIDEO_POOL = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
];

export const TRACKS: Track[] = [
  // SIDE A
  { id: 1, title: "Midnight Velocity", artist: "Neon Drift", cover: "https://picsum.photos/id/10/400/400", video: VIDEO_POOL[0], duration: "3:42" },
  { id: 2, title: "Chrome Heart", artist: "Neon Drift", cover: "https://picsum.photos/id/11/400/400", video: VIDEO_POOL[1], duration: "4:01" },
  { id: 3, title: "Analog Dreams", artist: "Neon Drift", cover: "https://picsum.photos/id/12/400/400", video: VIDEO_POOL[2], duration: "3:15" },
  { id: 4, title: "Static Noise", artist: "Neon Drift", cover: "https://picsum.photos/id/13/400/400", video: VIDEO_POOL[3], duration: "2:58" },
  { id: 5, title: "Ghost in the Shell", artist: "Neon Drift", cover: "https://picsum.photos/id/14/400/400", video: VIDEO_POOL[4], duration: "4:20" },
  { id: 6, title: "Retrograde", artist: "Neon Drift", cover: "https://picsum.photos/id/15/400/400", video: VIDEO_POOL[5], duration: "3:33" },
  // SIDE B
  { id: 7, title: "Solar Flare", artist: "Neon Drift", cover: "https://picsum.photos/id/16/400/400", video: VIDEO_POOL[0], duration: "3:10" },
  { id: 8, title: "Lunar Tides", artist: "Neon Drift", cover: "https://picsum.photos/id/17/400/400", video: VIDEO_POOL[1], duration: "4:12" },
  { id: 9, title: "Deep Space", artist: "Neon Drift", cover: "https://picsum.photos/id/18/400/400", video: VIDEO_POOL[2], duration: "3:45" },
  { id: 10, title: "Event Horizon", artist: "Neon Drift", cover: "https://picsum.photos/id/19/400/400", video: VIDEO_POOL[3], duration: "5:01" },
  { id: 11, title: "Nebula", artist: "Neon Drift", cover: "https://picsum.photos/id/20/400/400", video: VIDEO_POOL[4], duration: "2:45" },
  { id: 12, title: "Stardust", artist: "Neon Drift", cover: "https://picsum.photos/id/21/400/400", video: VIDEO_POOL[5], duration: "3:55" },
];