import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { color, size } from "./theme";
import { useLocation, useParams } from "react-router-dom";
import { getPodcastDetailById } from "../api/repository";
import { NavigationContext } from "./Root";
import { PodcastListItem, PodcastDetailInfo } from "../api/podcast.models";
import { Text } from "./_components/Text";

export const PodcastDetail: React.FC = () => {
  const navigationContext = useContext(NavigationContext);
  const { podcastId } = useParams();
  const currentPodcast: PodcastListItem = useLocation().state.selectedPodcast;
  const [, setPodcastDetail] = useState<PodcastDetailInfo>();

  useEffect(() => {
    const loadPodcastDetail = async () => {
      setPodcastDetail(await getPodcastDetailById(podcastId));
      navigationContext.setIsNavigating(false);
    };

    loadPodcastDetail();
  }, [navigationContext, podcastId]);

  return (
    <PodcastDetailWrapper>
      <PodcastSummary>
        <PodcastImage src={currentPodcast.image} />
        <hr />
        <div>
          <Text bold fontSize="s">{currentPodcast.name}</Text>
          <Text italic fontSize="xs">by {currentPodcast.author}</Text>
        </div>
        <hr />
        <div>
          <Text bold color="gray" fontSize="xs" marginBottom="xs">Description:</Text>
          <Text italic color="gray" fontSize="xs">{currentPodcast.description}</Text>
        </div>
      </PodcastSummary>
      {/* <PodcastEpisodes>
        <EpisodeCount />
        <EpisodeTable />
      </PodcastEpisodes> */}
    </PodcastDetailWrapper>
  );
};

const PodcastDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 172px 1fr;
  column-gap: ${size.l};

  position: relative;
`;

const PodcastSummary = styled.div`
  display: grid;
  row-gap: ${size.xs};
  padding: ${size.s} ${size.xs};

  box-shadow: 0px 3px 10px -2px ${color.gray};
`;

const PodcastImage = styled.img`
  display: block;
  width: 128px;
  justify-self: center;
  border-radius: ${size.base};
`;
