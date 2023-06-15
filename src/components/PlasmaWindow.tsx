import { Draggable } from "@/lib/Draggable";
import { faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { h } from "preact";
import { PropsWithChildren } from "preact/compat";

type Props = {
  title?: string;
};

export function PlasmaWindow({ title, children }: PropsWithChildren<Props>) {
  return <Draggable>
    <div className='plasma-window'>
      <div className='plasma-window-titlebar'>
        <span>{title}</span>
        <span>
          <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </span>
      </div>
      <div className="plasma-window-content">
        {children}
      </div>
    </div>
  </Draggable>;
}