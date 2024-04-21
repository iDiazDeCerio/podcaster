import {
  PodcastDetailInfo,
  PodcastEpisode,
  PodcastListItem,
} from "./podcast.models";
import { storageHelper } from "./storageHelper";
import { mapPodcastDetail, mapTop100Podcasts } from "./podcast.mappers";
import { PodcastDetailDto, PodcastListDto } from "./podcast.dtos";

export const getTop100Podcasts = async () => {
  const top100StorageKey = "top100Podcasts";
  if (storageHelper.isExpired(top100StorageKey)) {
    const fetchedData: string = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => data.contents);

    const mappedData = mapTop100Podcasts(
      JSON.parse(fetchedData) as PodcastListDto
    );

    storageHelper.store(top100StorageKey, JSON.stringify(mappedData));
    return mappedData;
  } else {
    return JSON.parse(
      storageHelper.load(top100StorageKey)
    ) as PodcastListItem[];
  }
};

export const getPodcastDetailById = async (podcastId: string) => {
  const podcastDetailStorageKey = `${podcastId}-podcastDetail`;
  if (storageHelper.isExpired(podcastDetailStorageKey)) {
    const fetchedData: string = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast &entity=podcastEpisode&limit=20`
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => data.contents);

    const mappedData = mapPodcastDetail(
      JSON.parse(fetchedData) as PodcastDetailDto
    );

    storageHelper.store(podcastDetailStorageKey, JSON.stringify(mappedData));
    return mappedData;
  } else {
    return JSON.parse(
      storageHelper.load(podcastDetailStorageKey)
    ) as PodcastDetailInfo;
  }
};

export const getEpisodeDetailById = async (
  podcastId: string,
  episodeId: string
) => {
  const episodeDetailStorageKey = `${podcastId}-${episodeId}-episodeDetail`;
  if (storageHelper.isExpired(episodeDetailStorageKey)) {
    const fetchedData: string = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast &entity=podcastEpisode&limit=20`
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => data.contents);

    const mappedData = mapPodcastDetail(
      JSON.parse(fetchedData) as PodcastDetailDto
    );

    const episode = mappedData.episodes.find(
      (episode) => episode.id === episodeId
    );

    storageHelper.store(episodeDetailStorageKey, JSON.stringify(episode));
    return episode;
  } else {
    return JSON.parse(
      storageHelper.load(episodeDetailStorageKey)
    ) as PodcastEpisode;
  }
};
