/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import { connect } from "react-redux";
import { ErrorBoundary } from "content-src/components/ErrorBoundary/ErrorBoundary";
import React from "react";
import { Search } from "content-src/components/Search/Search";

export function _Base({ App }) {
  if (!App.initialized) {
    return null;
  }

  return (
    <ErrorBoundary className="base-content-fallback">
      <div className="outer-wrapper only-search">
        <main className="newtab-main">
          <div className="non-collapsible-section">
            <Search showLogo={true} />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export const Base = connect(state => ({ App: state.App }))(_Base);
