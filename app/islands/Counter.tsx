import type { ReactIsland } from "@ethicdevs/react-monolith";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

// app
import { Button } from "../components";

interface CounterProps {
  defaultValue?: number;
}

const Counter: ReactIsland<CounterProps> = ({ defaultValue = 1 }) => {
  const [counter, setCounter] = useState(defaultValue);
  const incrementCounter = useCallback(
    () => setCounter((prev) => prev + 1),
    [setCounter]
  );
  const decrementCounter = useCallback(
    () => setCounter((prev) => prev - 1),
    [setCounter]
  );

  return (
    <StyledCounterContainer>
      <Button
        onClick={decrementCounter}
        type={"button"}
        title={"Click to Decrement"}
      >
        −
      </Button>
      <StyledCounterText>{counter}</StyledCounterText>
      <Button
        onClick={incrementCounter}
        type={"button"}
        title={"Click to Increment"}
      >
        +
      </Button>
    </StyledCounterContainer>
  );
};

const StyledCounterContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  font-family: monospace;
`;

const StyledCounterText = styled.div`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

Counter.displayName = "Counter";
export default Counter;
