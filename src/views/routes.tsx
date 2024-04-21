import React from "react";
import { RouteObject } from "react-router-dom";
import { PodcastListView } from "./PodcastListView";
import { PodcastDetail } from "./PodcastDetail";
import { EpisodeDetail } from "./EpisodeDetail";
import { Root } from "./Root";

export const routes = {
  podcastList: "/",
  podcastDetail: (podcastId: string) => `/podcast/${podcastId}`,
  episodeDetail: (podcastId: string, episodeId: string) =>
    `/podcast/${podcastId}/episode/${episodeId}`,
};

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <PodcastListView />,
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastDetail />,
      },
      {
        path: "/podcast/:podcastId/episode/:episodeId",
        element: <EpisodeDetail />,
      },
    ],
  },
];
