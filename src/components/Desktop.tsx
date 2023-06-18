import { createWindow, PlasmaWindow } from "@/components/PlasmaWindow";
import { WindowManagerContext } from "@/DesktopEnviroment";
import { h } from "preact";
import { PropsWithChildren } from "preact/compat";
import { useContext, useEffect } from "preact/hooks";

type Props = {

};

export function Desktop({ children }: PropsWithChildren<Props>) {

  const [{ windows }, dispatch] = useContext(WindowManagerContext);

  useEffect(() => {

    dispatch({
      action: 'CREATE',
      window: createWindow({
        title: "Test Window 1",
        children: "Bla Bla Bla",
        x: 100,
        y: 50,
      })
    });
    dispatch({
      action: 'CREATE',
      window: createWindow({
        title: "Test Window 2",
        children: "Bla Bla Bla",
        x: 500,
        y: 50,
      })
    });
  }, []);

  return <div className='plasma-desktop'>
    {windows.map((props) => <PlasmaWindow key={props.id} {...props}></PlasmaWindow>)}
  </div>;
}