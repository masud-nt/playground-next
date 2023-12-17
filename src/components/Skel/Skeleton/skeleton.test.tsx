import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton Components", () => {
  it("renders Skeleton without crashing", () => {
    render(<Skeleton />);
  });
});
