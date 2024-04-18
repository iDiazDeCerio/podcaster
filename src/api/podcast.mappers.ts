import { PodcastDTO, PodcastListItem } from "./podcast.types";

export const mapTop100Podcasts = (
  podcastList: PodcastDTO[]
): PodcastListItem[] =>
  podcastList.map((item) => ({
    id: item.id.attributes["im:id"],
    image: item["im:image"][1].label,
    title: item.title.label,
    author: item["im:artist"].label
  }));
