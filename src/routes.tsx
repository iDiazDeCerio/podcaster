import React from "react";
import { RouteObject } from "react-router-dom";
import { PodcastList } from "./PodcastList";
import { PodcastDetail } from "./PodcastDetail";
import { EpisodeDetail } from "./EpisodeDetail";
import { Root } from "./Root";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <PodcastList />,
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastDetail />,
        children: [
          {
            path: "/podcast/:podcastId/episode/:episodeId",
            element: <EpisodeDetail />,
          },
        ],
      },
    ],
  },
];
