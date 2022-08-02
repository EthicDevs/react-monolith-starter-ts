// 3rd-party
import React, { FC } from "react";
import styled from "styled-components";

// app
import type { WithThemeSchemeProp } from "../types";
import { NamedColors } from "../utils/style";

interface LayoutProps {
  foo?: boolean;
}

function removeCommentsAndSpacing(str = "") {
  return str.replace(/\/\*.*\*\//g, " ").replace(/\s+/g, " ");
}

export const Layout: FC<LayoutProps & WithThemeSchemeProp> = ({
  children,
  themeScheme,
}) => {
  const sharedProps = {
    themeScheme,
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: removeCommentsAndSpacing(`
            html,
            body {
              margin: 0;
              padding: 0;
              font-family: sans-serif;
              font-size: 16px;
              background-color: ${NamedColors.BACKGROUND[themeScheme]};
              color: ${NamedColors.TEXT_DEFAULT[themeScheme]};
            }
            * { box-sizing: border-box; }
            a { color: ${NamedColors.TEXT_LINK[themeScheme]}; }
            a:hover { color: ${NamedColors.TEXT_LINK_HOVER[themeScheme]}; }
          `),
        }}
      />
      <StyledLayoutWrapper {...sharedProps}>
        <StyledChildrenWrapper {...sharedProps}>
          {children}
        </StyledChildrenWrapper>
      </StyledLayoutWrapper>
    </>
  );
};

const StyledLayoutWrapper = styled.div<WithThemeSchemeProp>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  min-height: 100vh;
  min-width: 100%;
  max-width: 100%;
`;

const StyledChildrenWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  flex: 1;
  width: 100%;
`;
