import { Draggable } from "@/lib/Draggable";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import style from '@/style/PlasmaWindow.css';
import { WindowManagerContext } from "@/DesktopEnviroment";
import { Resizable } from "@/lib/Resizable";
import type { PropsWithChildren } from "react";
import { h, createContext } from "preact";
import { useContext, useState } from "preact/hooks";

type Props = {
  title?: string;
  icon?: FontAwesomeIconProps['icon'];
  resizable?: boolean;
  minimized?: boolean;
  x?: number;
  y?: number;
  id: number;
};

let idCounter = 1;

export const PlasmaWindowContext = createContext<Props>(null);

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
    icon
  } = props;
  const [{ windows }, requestAction] = useContext(WindowManagerContext);
  const inFocus = windows.at(-1).id == props.id && !minimized;
  const [isDraggable, setDraggable] = useState(false);

  return <Draggable x={x} y={y} active={isDraggable}>
    <style>{style}</style>
    <div style={{
      display: minimized ? 'none' : undefined
    }}
      className={`plasma-window ${inFocus ? 'plasma-box-glow' : ''} plasma-box`}
      onMouseDown={() => requestAction({
        action: 'FOCUS',
        window: props
      })}
    >
      <div
        onMouseDown={(e) => {
          setDraggable(true);
          addEventListener('mouseup', () => {
            setDraggable(false);
          }, { once: true });
        }} className='plasma-window-titlebar plasma-box-bottom'>
        <span>{!icon || <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}{title}</span>
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
        <PlasmaWindowContext.Provider value={props}>
          <div className="plasma-window-content">
            {children}
          </div>
        </PlasmaWindowContext.Provider>
      </Resizable>
    </div>
  </Draggable>;
}