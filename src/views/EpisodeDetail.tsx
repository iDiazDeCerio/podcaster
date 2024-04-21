import React, { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import { PodcastEpisode } from "../api/podcast.models";
import { useParams } from "react-router-dom";
import { getEpisodeDetailById } from "../api/repository";
import { NavigationContext } from "./Root";
import { PodcastDetailSummary } from "./_components/PodcastDetailSummary";
import styled from "styled-components";
import { color, size } from "./theme";
import { Text } from "./_components/Text";
import { Loader } from "./_components/Loader";

export const EpisodeDetail: React.FC = () => {
  const navigationContext = useContext(NavigationContext);
  const { podcastId, episodeId } = useParams();
  const [episode, setEpisode] = useState<PodcastEpisode>();

  useEffect(() => {
    const loadPodcastDetail = async () => {
      setEpisode(await getEpisodeDetailById(podcastId, episodeId));
      navigationContext.setIsNavigating(false);
    };

    loadPodcastDetail();
  }, [navigationContext, podcastId, episodeId]);

  if (!episode) {
    return <Loader fullPage />;
  }

  return (
    <EpisodeDetailWrapper>
      <PodcastDetailSummary podcastId={podcastId} withLink />
      <EpisodeDetailBox>
        <div>
          <Text fontSize="l" bold marginbottom="xs">
            {episode.title}
          </Text>
          <Text fontSize="s" italic>
            {parse(episode.description)}
          </Text>
        </div>
        <hr />
        <EpisodeAudio controls>
          <source src={episode.audioUrl} type="audio/mp3" />
        </EpisodeAudio>
      </EpisodeDetailBox>
    </EpisodeDetailWrapper>
  );
};

const EpisodeDetailWrapper = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 172px 1fr;
  column-gap: ${size.l};

  position: relative;
`;

const EpisodeDetailBox = styled.div`
  display: grid;
  row-gap: ${size.xs};

  padding: ${size.m} ${size.s};
  box-shadow: 0px 3px 10px -2px ${color.gray};
`;

const EpisodeAudio = styled.audio`
  width: 100%;
`;
