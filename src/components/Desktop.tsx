import { PlasmaWindow } from "@/components/PlasmaWindow";
import { WindowManagerContext } from "@/DesktopEnviroment";
import { h } from "preact";
import { useContext } from "preact/hooks";

type Props = {

};

export function Desktop({ }: Props) {

  const [{ windows }] = useContext(WindowManagerContext);

  return <div className='plasma-desktop'>
    {windows.map((props) => <PlasmaWindow key={props.id} {...props}></PlasmaWindow>)}
  </div>;
}