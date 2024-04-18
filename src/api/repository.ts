import { PodcastDTO, PodcastListItem } from "./podcast.types";
import { storageHelper } from "./cache";
import { mapTop100Podcasts } from "./podcast.mappers";

export const getTop100Podcasts = async () => {
  const top100StorageKey = "top100Podcasts";
  if (storageHelper.isExpired(top100StorageKey)) {
    const fetchedData: PodcastDTO[] = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => data.contents);
    
    const mappedData = mapTop100Podcasts(fetchedData)
    storageHelper.store(top100StorageKey, JSON.stringify(mappedData));
    return mappedData;
  } else {
    return JSON.parse(storageHelper.load(top100StorageKey)) as PodcastListItem[];
  }
};
