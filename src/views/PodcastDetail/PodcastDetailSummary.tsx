import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "../_components/Text";
import { color, size } from "../theme";
import { getTop100Podcasts } from "../../api/repository";
import { NavigationContext } from "../Root";
import { PodcastListItem } from "../../api/podcast.models";

interface Props {
  podcastId: string;
}

export const PodcastDetailSummary: React.FC<Props> = ({ podcastId }) => {
  const navigationContext = useContext(NavigationContext);
  const [podcast, setPodcast] = useState<PodcastListItem>();

  useEffect(() => {
    const loadPodcasts = async () => {
      const topPodcasts = await getTop100Podcasts();
      const currentPodcast = topPodcasts.find(
        (podcast) => podcast.id === podcastId
      );
      setPodcast(currentPodcast);
      navigationContext.setIsNavigating(false);
    };

    loadPodcasts();
  }, [navigationContext, podcastId]);

  if (!podcast) {
    return <>Loading...</>
  }

  return (
    <PodcastSummary>
      <PodcastImage src={podcast.image} />
      <hr />
      <div style={{ marginLeft: size.xs }}>
        <Text bold fontSize="s">
          {podcast.name}
        </Text>
        <Text italic fontSize="xs">
          by {podcast.author}
        </Text>
      </div>
      <hr />
      <div>
        <Text bold color="gray" fontSize="xs" marginbottom="xs">
          Description:
        </Text>
        <Text italic color="gray" fontSize="xs">
          {podcast.description}
        </Text>
      </div>
    </PodcastSummary>
  );
};

const PodcastSummary = styled.div`
  display: grid;
  row-gap: ${size.xs};
  padding: ${size.s} ${size.xs};

  position: sticky;
  top: ${size.s};

  box-shadow: 0px 3px 10px -2px ${color.gray};
`;

const PodcastImage = styled.img`
  display: block;
  width: 128px;
  justify-self: center;
  border-radius: ${size.base};
`;
