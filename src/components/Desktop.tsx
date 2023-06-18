import { PlasmaWindow } from "@/components/PlasmaWindow";
import { WindowManagerContext } from "@/DesktopEnviroment";
import { createContext, h } from "preact";
import { PropsWithChildren } from "preact/compat";
import { useContext, useRef } from "preact/hooks";

type Props = {

};

export const DesktopDimensionContext = createContext({ w: 0, h: 0 });

export function Desktop({ children }: PropsWithChildren<Props>) {

  const [{ windows }, dispatch] = useContext(WindowManagerContext);
  const desktopElement = useRef<HTMLDivElement>();

  return <DesktopDimensionContext.Provider value={{
    w: desktopElement.current?.clientHeight ?? 0,
    h: desktopElement.current?.clientWidth ?? 0
  }}>
    <div ref={desktopElement} className='plasma-desktop'>
      {windows.map((props) => <PlasmaWindow key={props.id} {...props}></PlasmaWindow>)}
    </div>
  </DesktopDimensionContext.Provider>;
}