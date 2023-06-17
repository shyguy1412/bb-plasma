import { Draggable } from "@/lib/Draggable";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '@/style/PlasmaWindow.css';
import { WindowManagerContext } from "@/DesktopEnviroment";
import { Resizable } from "@/lib/Resizable";
import type { PropsWithChildren, ReactNode } from "react";

type Props = {
  title?: string;
  resizable?: boolean;
  minimized?: boolean;
  x?: number;
  y?: number;
  id: number;
};

let idCounter = 1;

export function createWindow(props: Omit<PropsWithChildren<Props>, 'id'>): Props {
  const id = idCounter++;
  return {
    ...props,
    id
  };
}

export function PlasmaWindow(props: PropsWithChildren<Props>) {
  const {
    title,
    children,
    resizable,
    minimized = false,
    x,
    y,
  } = props;
  const [{ windows }, requestAction] = window.React.useContext(WindowManagerContext);
  const inFocus = windows[0].id == props.id && !minimized;
  const [isDraggable, setDraggable] = window.React.useState(false);

  return !minimized ? <Draggable title={title} x={x} y={y} active={isDraggable}>
    <style>{style}</style>
    <div style={{
      display: minimized ? 'none' : undefined
    }} className={`plasma-window ${inFocus ? 'plasma-box-glow' : ''} plasma-box`}>
      <div
        onMouseDown={(e) => {
          setDraggable(true);
          console.log('DOWN');

          addEventListener('mouseup', () => {
            setDraggable(false);
          }, { once: true });
        }} className='plasma-window-titlebar plasma-box-bottom'>
        <span>{title}</span>
        <span>
          <div className="plasma-button plasma-fill plasma-square" onClick={() => requestAction({
            action: 'MINIMIZE',
            window: props
          })}>
            <FontAwesomeIcon style={{ 'fontSize': '0.9em' }} icon={faWindowMinimize}></FontAwesomeIcon>
          </div>
          <div className="plasma-button plasma-fill plasma-square" onClick={() => requestAction({
            action: 'CLOSE',
            window: props
          })}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </div>
        </span>
      </div>
      <Resizable resizable={resizable}>
        <div className="plasma-window-content">
          {children}
        </div>
      </Resizable>
    </div>
  </Draggable> : <></>;
}