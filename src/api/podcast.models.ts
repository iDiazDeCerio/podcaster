export interface PodcastListItem {
  id: string;
  name: string;
  image: string;
  author: string;
  description: string
}

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  audioUrl: string;
}

export interface PodcastDetailInfo {
  episodeCount: number;
  episodes: PodcastEpisode[]
}
