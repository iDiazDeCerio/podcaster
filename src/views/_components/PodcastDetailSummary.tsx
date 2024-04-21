import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { Text } from "./Text";
import { color, size } from "../theme";
import { getTop100Podcasts } from "../../api/repository";
import { NavigationContext } from "../Root";
import { PodcastListItem } from "../../api/podcast.models";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";

interface Props {
  podcastId: string;
  withLink?: boolean;
}

export const PodcastDetailSummary: React.FC<Props> = ({
  podcastId,
  withLink,
}) => {
  const navigationContext = useContext(NavigationContext);
  const navigate = useNavigate();
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

  const goToPodcastDetail = () => {
    if (withLink) {
      navigationContext.setIsNavigating(true);
      navigate(routes.podcastDetail(podcastId));
    }
  };

  if (!podcast) {
    return <>Loading...</>;
  }

  return (
    <PodcastSummary>
      <PodcastImage
        src={podcast.image}
        withLink={withLink}
        onClick={goToPodcastDetail}
      />
      <hr />
      <PodcastNameWrapper withLink={withLink} onClick={goToPodcastDetail}>
        <Text bold fontSize="s">
          {podcast.name}
        </Text>
        <Text italic fontSize="xs">
          by {podcast.author}
        </Text>
      </PodcastNameWrapper>
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

const PodcastImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "withLink",
})<{ withLink?: boolean }>`
  display: block;
  width: 128px;
  justify-self: center;
  border-radius: ${size.base};

  ${(p) =>
    p.withLink &&
    css`
      &:hover {
        box-shadow: 0px 0px 5px 0px ${color.gray};
        cursor: pointer;
      }
    `}
`;

const PodcastNameWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => ["children", "variant"].includes(prop),
})<{ withLink?: boolean }>`
  margin-left: ${size.xs};

  ${(p) =>
    p.withLink &&
    css`
      &:hover {
        color: ${color.darkBlue};
        cursor: pointer;
      }
    `}
`;
