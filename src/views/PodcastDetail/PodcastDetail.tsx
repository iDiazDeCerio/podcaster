import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { PodcastDetailInfo } from "../../api/podcast.models";
import { getPodcastDetailById } from "../../api/repository";
import { Text } from "../_components/Text";
import { NavigationContext } from "../Root";
import { color, size } from "../theme";
import { EpisodeTable } from "./EpisodeTable";
import { PodcastDetailSummary } from "./PodcastDetailSummary";
import { routes } from "../routes";

export const PodcastDetail: React.FC = () => {
  const navigationContext = useContext(NavigationContext);
  const navigate = useNavigate();
  const { podcastId } = useParams();
  const [podcastDetail, setPodcastDetail] = useState<PodcastDetailInfo>();

  useEffect(() => {
    const loadPodcastDetail = async () => {
      setPodcastDetail(await getPodcastDetailById(podcastId));
      navigationContext.setIsNavigating(false);
    };

    loadPodcastDetail();
  }, [navigationContext, podcastId]);

  const showEpisode = (episodeId: string) => {
    navigationContext.setIsNavigating(true);
    navigate(routes.episodeDetail(podcastId, episodeId));
  };

  if (!podcastDetail) {
    return <p>Loading...</p>;
  }

  return (
    <PodcastDetailWrapper>
      <PodcastDetailSummary podcastId={podcastId} />
      <div>
        <EpisodeCount>
          <Text fontSize="l" bold>
            Episodes: {podcastDetail.episodeCount}
          </Text>
        </EpisodeCount>
        <EpisodeTable
          episodes={podcastDetail.episodes}
          onEpisodeClick={showEpisode}
        />
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
