import React, { useContext } from "react";
import styled from "styled-components";
import { color, fontSize, size } from "../theme";
import { NavigationContext } from "../Root";
import { Loader } from "../_components/Loader";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const navigationContext = useContext(NavigationContext);

  const onNavigateToList = () => {
    navigationContext.setIsNavigating(true);
    navigate(routes.podcastList);
  };

  return (
    <HeaderWrapper>
      <PageTitle onClick={onNavigateToList}>Podcaster</PageTitle>
      {navigationContext.isNavigating && <Loader />}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  padding-top: ${size.s};
  padding-bottom: ${size.s};
  margin-bottom: ${size.s};
  border-bottom: 1px solid ${color.lightGray};
`;

const PageTitle = styled.h1`
  font-size: ${fontSize.l};
  font-weight: bold;
  color: ${color.blue};

  &:hover {
    color: ${color.darkBlue};
    cursor: pointer;
  }
`;
