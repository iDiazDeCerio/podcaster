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

const formatDuration = (duration: number) => {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  let format = "";
  if (hours > 0) {
    format = format.concat(`${hours}:`);
  }

  if (minutes > 0) {
    if (minutes % 60 < 10) {
      format = format.concat(`0${minutes % 60}:`);
    } else {
      format = format.concat(`${minutes % 60}:`);
    }
  } else {
    format = format.concat(`00:`);
  }

  if (seconds > 0) {
    if (seconds % 60 < 10) {
      format = format.concat(`0${seconds % 60}`);
    } else {
      format = format.concat(`${seconds % 60}`);
    }
  } else {
    format = format.concat(`00`);
  }

  return format;
};

const formatDate = (dateString: string) => {
  return new Date(dateString)
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("/");
};

export const mapPodcastDetail = (
  podcastDetail: PodcastDetailDto
): PodcastDetailInfo => {
  const summary = podcastDetail.results.shift() as PodcastSummaryDto;
  return {
    episodeCount: summary.trackCount,
    episodes: podcastDetail.results.map((episode: PodcastEpisodeDto) => ({
      id: episode.episodeGuid,
      title: episode.trackName,
      description: episode.description,
      releaseDate: formatDate(episode.releaseDate),
      duration: formatDuration(episode.trackTimeMillis),
      audioUrl: episode.episodeUrl,
    })),
  };
};
