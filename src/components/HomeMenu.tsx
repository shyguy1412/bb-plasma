import { RebootContext, TerminateContext } from "@/DesktopEnviroment";
import { faArrowsRotate, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {

};

export function HomeMenu({ }: Props) {
  const { terminate } = window.React.useContext(TerminateContext);
  const { reboot } = window.React.useContext(RebootContext);

  return <div className='homemenu plasma-box-inline'>
    <span className='plasma-button plasma-box-top' onClick={() => reboot()}>
      <FontAwesomeIcon style={{ fontSize: '1.5em' }} icon={faArrowsRotate}></FontAwesomeIcon>
      <span className='plasma-center'>Reboot</span>
    </span>
    <span className='plasma-button plasma-box-top' onClick={() => terminate()}>
      <FontAwesomeIcon style={{ fontSize: '1.5em' }} icon={faPowerOff}></FontAwesomeIcon>
      <span className='plasma-center'>Shutdown</span>
    </span>
  </div>;
}