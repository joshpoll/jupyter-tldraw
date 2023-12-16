import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { useState } from "react";

import {
  Tldraw,
  useEditor,
  createShapeId,
  getSvgAsImage,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
// import "./widget.css";

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function SaveButton({ onSave, setShowImage }) {
  const editor = useEditor();

  return (
    <button
      style={{
        position: "absolute",
        zIndex: 1000,
        right: 10,
        top: 10,
        backgroundColor: "lightyellow",
      }}
      onClick={async () => {
        // const shapes = editor.selectedShapeIds
        const shapes = editor.store
          .allRecords()
          .filter((r) => r.typeName === "shape");

        const svg = await editor.getSvg(shapes);
        const stringified = svg.outerHTML;
        console.log(stringified);

        onSave(stringified);
        setShowImage(true); // Show the image after saving
      }}
    >
      Convert to SVG
    </button>
  );
}

export const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [snapshotData, setSnapshotData] = useState("");
  const [showImage, setShowImage] = useState(false);

  const handleMount = (editor) => {
    const id = createShapeId("hello");

    editor.createShapes([
      {
        id,
        type: "geo",
        x: 128,
        y: 128,
        props: {
          geo: "rectangle",
          w: 100,
          h: 100,
          dash: "draw",
          color: "yellow",
          size: "m",
        },
      },
    ]);
  };
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: width,
        height: height,
      }}
    >
      {!showImage && (
        <Tldraw onMount={handleMount}>
          <SaveButton onSave={setSnapshotData} setShowImage={setShowImage} />
        </Tldraw>
      )}

      {showImage && (
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
          <div dangerouslySetInnerHTML={{ __html: snapshotData }} />
        </div>
      )}
    </div>
  );
});
