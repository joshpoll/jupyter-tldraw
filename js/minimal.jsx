import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";
export const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");

  const [sections, setSections] = React.useState(5);

  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
      }}
    >
      <div className="scroller">
        {Array.from({ length: sections }).map((_, i) => (
          <section key={i} style={{ height: height / 2 }}>
            {/* <h2>Section {i}</h2> */}
            <Tldraw />
          </section>
        ))}
      </div>
    </div>
  );
});
