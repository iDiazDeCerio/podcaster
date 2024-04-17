import React from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { Header } from "./Header";
import { PodcastList } from "./PodcastList";
import { PodcastDetail } from "./PodcastDetail";
import { EpisodeDetail } from "./EpisodeDetail";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <PodcastList />
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastDetail />,
        children: [
          {
            path: "/podcast/:podcastId/episode/:episodeId",
            element: <EpisodeDetail />
          },

        ]
      },
    ]
  },
];
