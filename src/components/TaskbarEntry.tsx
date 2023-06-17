
import { h } from "preact";
import { PropsWithChildren, useContext, useState } from "preact/compat";
import style from '@/style/Taskbar.css';
import { WindowManagerContext } from "@/DesktopEnviroment";
import { PlasmaWindow } from "@/components/PlasmaWindow";

type Props = Parameters<typeof PlasmaWindow>[0];

export function TaskbarEntry(props: PropsWithChildren<Props>) {
  const { title, children, resizable, minimized } = props;
  const [{ windows }, requestAction] = useContext(WindowManagerContext);
  const inFocus = windows[0] == props && !minimized;
  const [isDraggable, setDraggable] = useState(false);

  return <div className={`taskbar-entry plasma-button plasma-box-right ${!inFocus || 'taskbar-entry-focus'}`}
    onClick={() => {
      if (minimized)
        requestAction({
          action: 'FOCUS',
          window: props
        });
      else
        requestAction({
          action: 'MINIMIZE',
          window: props
        });
    }}>
    <style>{style}</style>
      {title}
  </div>;
}