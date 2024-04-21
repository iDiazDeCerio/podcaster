import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PodcastListItem } from '../../api/podcast.models';
import { Text } from '../_components/Text';
import { color, size } from '../theme';

export const PodcastDetailSummary: React.FC = () => {
  const podcast: PodcastListItem = useLocation().state.selectedPodcast;
  
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
