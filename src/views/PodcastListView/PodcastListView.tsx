import React, { useEffect, useState } from "react";
import { PodcastListItem } from "../../api/podcast.types";
import { getTop100Podcasts } from "../../api/repository";
import { ListPodcast } from "./ListPodcast";
import styled from "styled-components";
import { size } from "../theme";

export const PodcastListView: React.FC = () => {
  const [podcastList, setPodcastList] = useState<PodcastListItem[]>([]);

  useEffect(() => {
    const loadPodcasts = async () => {
      setPodcastList(await getTop100Podcasts());
    };

    loadPodcasts();
  }, []);

  return (
    <>
      <label>
        <input type="text" />
      </label>
      <PodcastListWrapper>
        {podcastList.map((podcast) => (
          <ListPodcast key={podcast.id} podcast={podcast} />
        ))}
      </PodcastListWrapper>
    </>
  );
};

const PodcastListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${size.s};
  row-gap: ${size.l};
  justify-content: center;

  padding-top: ${size.m};
  margin-left: auto;
  margin-right: auto;
`;
