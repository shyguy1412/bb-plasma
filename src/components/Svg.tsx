import { h } from "preact";
import { useRef, useEffect } from "preact/hooks";

type Props = {
  svg: string;
} & any;

export function Svg({ svg, ...attributes }: Props) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = svg;
  }, [ref]);

  return <div {...attributes} ref={ref}></div>;
}