export interface PodcastDTO {
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

export interface Podcast {
  name: string;
  image: string;
  
}