
type Props = {
  svg: string;
} & any;

export function Svg({ svg, ...attributes }: Props) {
  const ref = window.React.useRef<HTMLDivElement>();

  window.React.useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = svg;
  }, [ref]);

  return <div {...attributes} ref={ref}></div>;
}