
import style from '@/style/Taskbar.css';
import { WindowManagerContext } from "@/DesktopEnviroment";
import { PlasmaWindow } from "@/components/PlasmaWindow";
import type { PropsWithChildren } from 'react';

type Props = Parameters<typeof PlasmaWindow>[0];

export function TaskbarEntry(props: PropsWithChildren<Props>) {
  const { title, minimized } = props;
  const [{ windows }, requestAction] = window.React.useContext(WindowManagerContext);
  const inFocus = windows[0].id == props.id && !minimized;
  
  return <div className={`taskbar-entry plasma-button plasma-box-right ${!inFocus || 'taskbar-entry-focus'}`}
    onClick={() => {
      if (minimized || !inFocus)
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