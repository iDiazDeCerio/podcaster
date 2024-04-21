import React from "react";
import styled from "styled-components";

import { Text } from "../_components/Text";
import { color, size } from "../theme";
import { PodcastDetailInfo } from "../../api/podcast.models";

interface Props {
  episodes: PodcastDetailInfo["episodes"];
  onEpisodeClick: (episodeId: string) => void;
}

export const EpisodeTable: React.FC<Props> = ({ episodes, onEpisodeClick }) => {
  return (
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
          {episodes.map((episode) => {
            return (
              <TableRow key={episode.id}>
                <td>
                  <Text fontSize="xs">
                    <EpisodeLink onClick={() => onEpisodeClick(episode.id)}>
                      {episode.title}
                    </EpisodeLink>
                  </Text>
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
  );
};

const EpisodeTableWrapper = styled.div`
  padding: ${size.m} ${size.s};
  box-shadow: 0px 3px 10px -2px ${color.gray};

  border-bottom: 1px solid ${color.lightGray};

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

  &:last-of-type {
    border-bottom: 2px solid ${color.lightGray};
  }

  & > * {
    padding: ${size.xs} ${size.s};
  }
`;

const EpisodeLink = styled.span`
  color: ${color.blue};

  &:hover {
    color: ${color.darkBlue};
    cursor: pointer;
  }
`;
