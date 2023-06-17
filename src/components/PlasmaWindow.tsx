import { Draggable } from "@/lib/Draggable";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { h } from "preact";
import { PropsWithChildren, useContext, useState } from "preact/compat";
import style from '@/style/PlasmaWindow.css';
import { WindowManagerContext } from "@/DesktopEnviroment";
import { Resizable } from "@/lib/Resizable";

type Props = {
  title?: string;
  resizable?: boolean;
};

export function PlasmaWindow(props: PropsWithChildren<Props>) {
  const { title, children, resizable } = props;
  const [_, requestAction] = useContext(WindowManagerContext);
  const [isDraggable, setDraggable] = useState(false);

  return <Draggable active={isDraggable}>
    <style>{style}</style>
    <div className='plasma-window plasma-box'>
      <div
        onMouseDown={(e) => {
          setDraggable(true);
          addEventListener('mouseup', () => {
            setDraggable(false);
          }, { once: true });
        }} className='plasma-window-titlebar plasma-box-bottom'>
        <span>{title}</span>
        <span>
          <div className="plasma-button" onClick={() => requestAction({
            action: 'MINIMIZE',
            window: props
          })}>
            <FontAwesomeIcon style={{'font-size': '0.9em'}} icon={faWindowMinimize}></FontAwesomeIcon>
          </div>
          <div className="plasma-button" onClick={() => requestAction({
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
  </Draggable>;
}