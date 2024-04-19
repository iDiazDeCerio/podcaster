import React from "react";
import { PodcastListItem } from "../../api/podcast.types";
import styled from "styled-components";
import { color, fontSize, size } from "../theme";

interface Props {
  podcast: PodcastListItem;
}

export const ListPodcast: React.FC<Props> = ({ podcast }) => {
  return (
    <ListPodcastWrapper onClick={() => podcast.id}>
      <ListPodcastBlock>
        <ListPodcastImage src={podcast.image} />
        <ListPodcastTitle>{podcast.name}</ListPodcastTitle>
        <ListPodcastAuthor>Author: {podcast.author}</ListPodcastAuthor>
      </ListPodcastBlock>
    </ListPodcastWrapper>
  );
};

const ListPodcastWrapper = styled.div`
  width: 150px;
  padding-top: ${size.m};
`;

const ListPodcastBlock = styled.div`
  display: grid;
  justify-items: center;
  row-gap: ${size.xs};

  padding: 0 ${size.s} ${size.s};

  text-align: center;

  box-shadow: 0px 3px 10px -2px ${color.gray};
`;

const ListPodcastImage = styled.div<{ src: string }>`
  width: ${size.xl};
  height: ${size.xl};

  margin-top: -${size.m};

  border-radius: 9999px; /* full circle */
  background-image: url("${(p) => p.src}");
  background-position: center;
  background-size: cover;
`;

const ListPodcastTitle = styled.p`
  font-size: ${fontSize.s};
  font-weight: bold;
  text-transform: uppercase;
`;

const ListPodcastAuthor = styled.p`
  font-size: ${fontSize.xs};
  color: ${color.gray};
`;
