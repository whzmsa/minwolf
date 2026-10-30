/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Base } from "content-src/components/Base/Base";

jest.mock(
  "content-src/components/ExternalComponentWrapper/ExternalComponentWrapper",
  () => ({
    ExternalComponentWrapper: ({ type }) => <div data-testid={type} />,
  })
);

function renderBase(initialized, prefs = {}) {
  const store = createStore(() => ({
    App: { initialized },
    Prefs: { values: prefs },
  }));
  return render(
    <Provider store={store}>
      <Base />
    </Provider>
  );
}

describe("<Base>", () => {
  it("waits for initialization", () => {
    const { container } = renderBase(false);
    expect(container).toBeEmptyDOMElement();
  });

  it.each([false, true])(
    "only renders the logo and search with Nova enabled: %s",
    novaEnabled => {
      const { container, getByRole, getByTestId } = renderBase(true, {
        "nova.enabled": novaEnabled,
        showSearch: false,
        hideLogo: true,
        "feeds.topsites": true,
        "feeds.section.topstories": true,
        showSponsored: true,
        showWeather: true,
        "asrouter.devtoolsEnabled": true,
      });
      expect(getByRole("img")).toHaveAttribute(
        "data-l10n-id",
        "newtab-logo-and-wordmark"
      );
      expect(getByTestId("SEARCH")).toBeInTheDocument();
      expect(getByRole("main").children).toHaveLength(1);
      expect(container.querySelector(".search-wrapper").children).toHaveLength(
        2
      );
      expect(container.querySelector(".outer-wrapper").children).toHaveLength(
        1
      );
      expect(container.querySelectorAll("a, button, aside, menu")).toHaveLength(
        0
      );
    }
  );
});
