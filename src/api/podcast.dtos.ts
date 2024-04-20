interface PodcastDTO {
  "im:name": { label: string };
  "im:image": {
    label: string;
    attributes: { height: number };
  }[];
  summary: { label: string };
  "im:price": {
    label: string;
    attributes: { amount: number; currency: "USD" };
  };
  "im:contentType": {
    attributes: { term: "Podcast"; label: "Podcast" };
  };
  rights: { label: string };
  title: { label: string };
  link: {
    attributes: {
      rel: string;
      type: "text/html";
      href: string;
    };
  };
  id: {
    label: string;
    attributes: { "im:id": string };
  };
  "im:artist": {
    label: string;
    attributes: {
      href: string;
    };
  };
  category: {
    attributes: {
      "im:id": string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  "im:releaseDate": {
    label: string;
    attributes: { label: string };
  };
}

export interface PodcastListDto {
  feed: {
    author: {
      name: { label: string };
      uri: { label: string };
    };
    entry: PodcastDTO[];
  };
}

export interface PodcastSummaryDto {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: [string, string];
  genres: [string, string];
}

export interface PodcastEpisodeDto {
  country: string;
  episodeUrl: string;
  artistIds: [number];
  previewUrl: string;
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  artworkUrl60: string;
  artistViewUrl: string;
  contentAdvisoryRating: string;
  trackViewUrl: string;
  trackName: string;
  trackId: number;
  feedUrl: string;
  description: string;
  closedCaptioning: string;
  shortDescription: string;
  collectionId: number;
  collectionName: string;
  releaseDate: string;
  collectionViewUrl: string;
  trackTimeMillis: number;
  artworkUrl600: string;
  episodeGuid: string;
  genres: [{ name: string; id: string }];
  kind: string;
  wrapperType: string;
}

export interface PodcastDetailDto {
  resultCount: number; // Includes the first result representing the summary
  results: [PodcastSummaryDto, ...Array<PodcastEpisodeDto>];
}
