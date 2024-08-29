import { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export const Spinner = ({ loading, size = 10 }) => (
  <FadeLoader
    color={"black"}
    loading={loading}
    cssOverride={override}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
);
