import React, { useContext, useEffect, useState } from "react";
import { PodcastListItem } from "../../api/podcast.types";
import { getTop100Podcasts } from "../../api/repository";
import { ListPodcast } from "./ListPodcast";
import styled from "styled-components";
import { size } from "../theme";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";
import { NavigationContext } from "../Root";

export const PodcastListView: React.FC = () => {
  const navigate = useNavigate();
  const navigationContext = useContext(NavigationContext);
  const [podcastList, setPodcastList] = useState<PodcastListItem[]>([]);

  useEffect(() => {
    const loadPodcasts = async () => {
      setPodcastList(await getTop100Podcasts());
      navigationContext.setIsNavigating(false);
    };

    loadPodcasts();
  }, [navigationContext]);

  const onPodcastClick = (podcastId: string) => {
    navigationContext.setIsNavigating(true);
    navigate(routes.podcastDetail(podcastId));
  };

  return (
    <>
      <label>
        <input type="text" />
      </label>
      <PodcastListWrapper>
        {podcastList.map((podcast) => (
          <ListPodcast
            key={podcast.id}
            podcast={podcast}
            onClick={onPodcastClick}
          />
        ))}
      </PodcastListWrapper>
    </>
  );
};

const PodcastListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${size.s};
  row-gap: ${size.l};
  justify-content: center;

  padding-top: ${size.m};
  margin-left: auto;
  margin-right: auto;
`;
