import { h, JSX } from "preact";
import { useEffect, useRef } from 'preact/compat';

type Props = {
  svg: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function Svg({ svg, ...attributes }: Props) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = svg;
  }, [ref]);

  return <div {...attributes} ref={ref}></div>;
}