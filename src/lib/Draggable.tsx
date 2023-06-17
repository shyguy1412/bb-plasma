import type { PropsWithChildren } from "react";

type Props = {
  x?: number;
  y?: number;
  active?: boolean;
  title: string
};

export function Draggable({title, active = true, x, y, children }: PropsWithChildren<Props>) {

  const [pos, setPos] = window.React.useState({ x: x ?? 0, y: y ?? 0 });
  const ref = window.React.useRef<HTMLDivElement>();

  function mouseMove(e: MouseEvent, offset) {
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  }

  return <div
    ref={ref}
    style={{
      position: 'absolute',
      left: pos.x,
      top: pos.y,
    }}
    onMouseDown={(e) => {
      if (!active) return;
      if (!ref.current) return;
      const offset = {
        x: e.clientX - ref.current.getBoundingClientRect().x,
        y: e.clientY - ref.current.getBoundingClientRect().y
      };
      const listener = (e: MouseEvent) => mouseMove(e, offset);
      addEventListener('mousemove', listener);
      addEventListener('mouseup', () => {
        removeEventListener('mousemove', listener);
      }, { once: true });
    }}
    className='preact-draggable'>
    {children}
  </div>;
}