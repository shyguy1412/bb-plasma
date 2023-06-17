import { Draggable } from "@/lib/Draggable";
import { faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { h } from "preact";
import style from '@/style/PlasmaWindow.css';

type Props = {
  title?: string;
};

    <style>{style}</style>
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