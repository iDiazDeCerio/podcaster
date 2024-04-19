import { PodcastListDto, PodcastListItem } from "./podcast.types";

export const mapTop100Podcasts = (
  podcastList: PodcastListDto
): PodcastListItem[] => {
  return podcastList.feed.entry.map((item) => {
    return {
      id: item.id.attributes["im:id"],
      image: item["im:image"][1].label,
      name: item["im:name"].label,
      author: item["im:artist"].label,
    };
  });
};
