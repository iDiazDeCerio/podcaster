import React, { useContext, useEffect, useState, useTransition } from "react";
import { PodcastListItem } from "../../api/podcast.models";
import { getTop100Podcasts } from "../../api/repository";
import { ListPodcast } from "./ListPodcast";
import styled from "styled-components";
import { color, size } from "../theme";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";
import { NavigationContext } from "../Root";
import { Loader } from "../_components/Loader";

export const PodcastListView: React.FC = () => {
  const navigate = useNavigate();
  const navigationContext = useContext(NavigationContext);
  const [isPending, startTransition] = useTransition();
  const [initialPodcastList, setInitialPodcastList] = useState<
    PodcastListItem[]
  >([]);
  const [podcastList, setPodcastList] = useState<PodcastListItem[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const loadPodcasts = async () => {
      const topPodcasts = await getTop100Podcasts();
      setPodcastList(topPodcasts);
      setInitialPodcastList(topPodcasts);
      navigationContext.setIsNavigating(false);
    };

    loadPodcasts();
  }, [navigationContext]);

  useEffect(() => {
    startTransition(() => {
      const filteredList = initialPodcastList.filter((podcast) => {
        return (
          podcast.name.toLowerCase().includes(filter.toLowerCase()) ||
          podcast.author.toLowerCase().includes(filter.toLowerCase())
        );
      });

      setPodcastList(filteredList);
    });
  }, [initialPodcastList, filter]);

  const onPodcastClick = (podcastId: string) => {
    navigationContext.setIsNavigating(true);
    navigate(routes.podcastDetail(podcastId));
  };

  return (
    <>
      <PodcastListFilter>
        {isPending ? (
          <Loader />
        ) : (
          <PodcastCountLabel>{podcastList.length}</PodcastCountLabel>
        )}
        <input
          type="text"
          onInput={(event) => {
            setFilter((event.target as HTMLInputElement).value);
          }}
        />
      </PodcastListFilter>
      <PodcastListWrapper>
        {podcastList.map((podcast) => (
          <ListPodcast
            key={podcast.id}
            podcast={podcast}
            onClick={onPodcastClick}
          />
        ))}
      </PodcastListWrapper>
    </>
  );
};

const PodcastListFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  & > input {
    margin-left: ${size.xs};
    padding: ${size.base} ${size.xs};
    border: 1px solid ${color.lightGray};
    border-radius: ${size.base};

    &:focus-visible {
      border-color: ${color.blue};
      outline: none;
    }
  }
`;

const PodcastCountLabel = styled.span`
  padding-left: ${size.tiny};
  padding-right: ${size.tiny};

  line-height: ${size.s};
  font-weight: bold;
  color: ${color.white};
  background-color: ${color.blue};
  border-radius: ${size.base};
`;

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
