import { createWindow, PlasmaWindow } from "@/components/PlasmaWindow";
import { WindowManagerContext } from "@/DesktopEnviroment";
import { createContext, h } from "preact";
import { PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useRef } from "preact/hooks";

type Props = {

};

export function Desktop({ }: Props) {

  const [{ windows }] = useContext(WindowManagerContext);

  return <div className='plasma-desktop'>
    {windows.map((props) => <PlasmaWindow key={props.id} {...props}></PlasmaWindow>)}
  </div>;
}