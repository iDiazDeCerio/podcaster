import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { PodcastDetailInfo } from "../../api/podcast.models";
import { getPodcastDetailById } from "../../api/repository";
import { NavigationContext } from "../Root";
import { color, size } from "../theme";
import { PodcastDetailSummary } from "./PodcastDetailSummary";
import { Text } from "../_components/Text";

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
        <EpisodeTableWrapper>
          <table>
            <thead>
              <HeaderRow>
                <Text as="th" align="left" bold fontSize="xs">
                  Title
                </Text>
                <Text as="th" align="left" bold fontSize="xs">
                  Date
                </Text>
                <Text as="th" align="left" bold fontSize="xs">
                  Duration
                </Text>
              </HeaderRow>
            </thead>
            <tbody>
              {podcastDetail.episodes.map((episode) => {
                return (
                  <TableRow key={episode.id}>
                    <td>
                      <Text fontSize="xs">{episode.title}</Text>
                    </td>
                    <td>
                      <Text fontSize="xs">{episode.releaseDate}</Text>
                    </td>
                    <td>
                      <Text fontSize="xs" align="right">
                        {episode.duration}
                      </Text>
                    </td>
                  </TableRow>
                );
              })}
            </tbody>
          </table>
        </EpisodeTableWrapper>
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

const EpisodeTableWrapper = styled.div`
  padding: ${size.m} ${size.s};
  box-shadow: 0px 3px 10px -2px ${color.gray};

  & > table {
    width: 100%;
    column-gap: ${size.m};
  }
`;

const HeaderRow = styled.tr`
  border-bottom: 2px solid ${color.lightGray};

  & > * {
    padding: ${size.xs} ${size.s};
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${color.lightGray};

  &:nth-of-type(odd) {
    background-color: ${color.lighterGray};
  }

  & > * {
    padding: ${size.xs} ${size.s};
  }
`;
