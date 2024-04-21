import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { PodcastDetailInfo } from "../../api/podcast.models";
import { getPodcastDetailById } from "../../api/repository";
import { NavigationContext } from "../Root";
import { color, size } from "../theme";
import { PodcastDetailSummary } from "./PodcastDetailSummary";
import { Text } from "../_components/Text";
import { EpisodeTable } from "./EpisodeTable";

export const PodcastDetail: React.FC = () => {
  const navigationContext = useContext(NavigationContext);
  const { podcastId } = useParams();
  const [podcastDetail, setPodcastDetail] = useState<PodcastDetailInfo>();

  useEffect(() => {
    const loadPodcastDetail = async () => {
      setPodcastDetail(await getPodcastDetailById(podcastId));
      navigationContext.setIsNavigating(false);
    };

    loadPodcastDetail();
  }, [navigationContext, podcastId]);

  if (!podcastDetail) {
    return <p>Loading...</p>;
  }

  return (
    <PodcastDetailWrapper>
      <PodcastDetailSummary />
      <div>
        <EpisodeCount>
          <Text fontSize="l" bold>
            Episodes: {podcastDetail.episodeCount}
          </Text>
        </EpisodeCount>
        <EpisodeTable episodes={podcastDetail.episodes} />
      </div>
    </PodcastDetailWrapper>
  );
};

const PodcastDetailWrapper = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 172px 1fr;
  column-gap: ${size.l};

  position: relative;
`;

const EpisodeCount = styled.div`
  margin-bottom: ${size.s};
  padding: ${size.xs};
  box-shadow: 0px 3px 10px -2px ${color.gray};
`;
