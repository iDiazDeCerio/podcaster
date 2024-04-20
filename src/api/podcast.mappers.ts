import {
  PodcastDetailDto,
  PodcastEpisodeDto,
  PodcastListDto,
  PodcastSummaryDto,
} from "./podcast.dtos";
import { PodcastDetailInfo, PodcastListItem } from "./podcast.models";

export const mapTop100Podcasts = (
  podcastList: PodcastListDto
): PodcastListItem[] => {
  return podcastList.feed.entry.map((item) => {
    return {
      id: item.id.attributes["im:id"],
      image: item["im:image"][2].label,
      name: item["im:name"].label,
      author: item["im:artist"].label,
      description: item.summary.label,
    };
  });
};

export const mapPodcastDetail = (
  podcastDetail: PodcastDetailDto
): PodcastDetailInfo => {
  const summary = podcastDetail.results.shift() as PodcastSummaryDto;
  return {
    episodeCount: summary.trackCount,
    episodes: podcastDetail.results.map((episode: PodcastEpisodeDto) => ({
      id: `${episode.collectionId}`,
      title: episode.trackName,
      description: episode.description,
      releaseDate: episode.releaseDate,
      duration: episode.trackTimeMillis,
      audioUrl: episode.episodeUrl,
    })),
  };
};
