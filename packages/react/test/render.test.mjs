import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Alert,
  BaseUIProvider,
  Button,
  Dialog,
  Field,
  Icon,
  Input,
  Rating,
  Sidebar,
  StatusBadge,
} from "../dist/index.js";

test("renders core controls with stable semantic classes", () => {
  const markup = renderToStaticMarkup(
    React.createElement(
      BaseUIProvider,
      { theme: "dark" },
      React.createElement(
        Field,
        { label: "Model name", htmlFor: "model-name", required: true },
        React.createElement(Input, { id: "model-name", defaultValue: "qwen-small" }),
      ),
      React.createElement(Button, { variant: "primary" }, "Save model"),
      React.createElement(StatusBadge, { status: "online" }, "Healthy"),
    ),
  );

  assert.match(markup, /data-bui-theme="dark"/);
  assert.match(markup, /class="bui-button button bui-button-primary/);
  assert.match(markup, /for="model-name"/);
  assert.match(markup, /qwen-small/);
  assert.match(markup, /Healthy/);
});

test("renders overlay and navigation semantics", () => {
  const markup = renderToStaticMarkup(
    React.createElement(
      BaseUIProvider,
      null,
      React.createElement(Sidebar, {
        activeItem: "models",
        items: [
          { id: "overview", label: "Overview" },
          { id: "models", label: "Models" },
        ],
      }),
      React.createElement(
        Dialog,
        { open: true, title: "Install model", onClose: () => undefined },
        "Review requirements",
      ),
    ),
  );

  assert.match(markup, /aria-current="page"/);
  assert.match(markup, /role="dialog"/);
  assert.match(markup, /aria-modal="true"/);
  assert.match(markup, /Install model/);
});

test("renders accessible icon and rating labels", () => {
  const markup = renderToStaticMarkup(
    React.createElement(
      BaseUIProvider,
      null,
      React.createElement(Icon, { name: "search", label: "Search" }),
      React.createElement(Rating, { value: 3, readOnly: false }),
      React.createElement(Alert, { tone: "danger", title: "Failed" }, "Try again"),
    ),
  );

  assert.match(markup, /<title>Search<\/title>/);
  assert.match(markup, /viewBox="0 0 256 256"/);
  assert.match(markup, /aria-label="1 of 5"/);
  assert.match(markup, /role="alert"/);
});
