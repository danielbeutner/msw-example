import React from "react";
import { render as renderFn } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
  GraphqlProvider,
  graphqlClient as defaultGraphqlClient,
} from "../graphql";

function Providers({ children, graphqlClient = defaultGraphqlClient }) {
  return (
    <React.StrictMode>
      <GraphqlProvider value={graphqlClient}>{children}</GraphqlProvider>
    </React.StrictMode>
  );
}

function render(ui, options = {}) {
  const { graphqlClient } = options;
  return renderFn(ui, {
    wrapper: graphqlClient
      ? ({ children }) => Providers({ children, graphqlClient })
      : Providers,
    options,
  });
}

export * from "@testing-library/react";
export { render, renderHook };
