import React, { useContext, useTransition } from "react";
import styled from "styled-components";
import { color, size } from "../theme";
import { NavigationContext } from "../Root";
import { Loader } from "./Loader";

export const Header: React.FC = () => {
  const navigation = useContext(NavigationContext)
  const [isPending, startTransition] = useTransition()

  const onNavigateToList = () => {
    startTransition(() => {
      navigation.setIsNavigating(isPending)
    })
  }

  return (
    <HeaderWrapper>
      <PageTitle onClick={onNavigateToList}>Podcaster</PageTitle>
      {navigation.isNavigating && <Loader />}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between; 

  padding-top: ${size.s};
  padding-bottom: ${size.s};
  margin-bottom: ${size.s};
  border-bottom: 1px solid ${color.gray};
`;

const PageTitle = styled.h1`
  font-weight: bold;
  color: ${color.blue};

  &:hover {
    color: ${color.darkBlue};
    cursor: pointer;
  }
`;
