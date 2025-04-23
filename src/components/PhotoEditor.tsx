import { useRef, useState } from "react";
import Moveable from "react-moveable";

interface PhotoEditor {
  photoSrc: string;
  photoAlt: string;
}

export default function PhotoEditor(props: PhotoEditor) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef({
    translate: [0, 0],
    rotate: 0,
    width: 245,
    height: 320,
  });
  const [frame, setFrame] = useState(frameRef.current);
  return (
    <div className="relative w-full h-full bg-gray-100">
      <div
        ref={ref}
        className="absolute"
        style={{
          transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`,
          width: `${frame.width}px`,
          height: `${frame.height}px`,
        }}
      >
        <img
          src={props.photoSrc}
          alt={props.photoAlt}
          className="w-full h-full object-contain aspect-video pointer-events-none"
        />
      </div>

      <Moveable
        target={ref}
        draggable
        resizable
        rotatable
        throttleDrag={1}
        throttleResize={1}
        throttleRotate={1}
        onDrag={({ beforeTranslate }) => {
          frameRef.current.translate = beforeTranslate;
          ref.current!.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${frameRef.current.rotate}deg)`;
        }}
        onResize={({ width, height, drag }: any) => {
          frameRef.current.width = width;
          frameRef.current.height = height;
          frameRef.current.translate = drag.beforeTranslate;

          const el = ref.current!;
          el.style.width = `${width}px`;
          el.style.height = `${height}px`;
          el.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) rotate(${frameRef.current.rotate}deg)`;
        }}
        onRotate={({ beforeRotation }) => {
          console.log("rotate");
          frameRef.current.rotate = beforeRotation;
          const el = ref.current!;
          el.style.transform = `translate(${frameRef.current.translate[0]}px, ${
            frameRef.current.translate[1]
          }px) rotate(${beforeRotation + 1}deg)`;
        }}
        onDragEnd={() => setFrame({ ...frameRef.current })}
        onResizeEnd={() => setFrame({ ...frameRef.current })}
        onRotateEnd={() => setFrame({ ...frameRef.current })}
      />
    </div>
  );
}
