import type { ReactView } from "@ethicdevs/react-monolith";
// 3rd-party
import React from "react";
import styled from "styled-components";
// app
import type { CommonProps } from "../types";
import { ButtonAnchor, Layout } from "../components";
import { Counter } from "../islands";
import { ReactMonolithLogo } from "../components/icons";

export interface HomeViewProps extends CommonProps {
  foo?: boolean;
}

const HomeView: ReactView<HomeViewProps> = ({ commonProps }) => (
  <Layout {...commonProps}>
    <StyledHomeWrapper>
      <ReactMonolithLogo size={150} />
      <h1>Hello, Monolith!</h1>
      <div>
        <p>Welcome to your brand new generated React Monolith app!</p>
        <p>
          Go ahead and start by exploring the `server.ts` and `routes.ts` files
        </p>
        <ButtonAnchor href={"https://react-monolith-docs.herokuapp.com/docs"}>
          React Monolith Documentation
        </ButtonAnchor>
      </div>
      <h2>An Island is being rendered</h2>
      <div data-islandid={`${Counter.name}$$0`}>
        <Counter />
      </div>
      <div data-islandid={`${Counter.name}$$1`}>
        <Counter defaultValue={42} />
      </div>
    </StyledHomeWrapper>
  </Layout>
);

const StyledHomeWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  gap: 24px;
  padding: 24px 0 64px 0;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

HomeView.displayName = "HomeView";
export default HomeView;
