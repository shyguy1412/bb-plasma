import { PlasmaWindow } from "@/components/PlasmaWindow";
import { WindowManagerContext } from "@/DesktopEnviroment";
import { h } from "preact";
import { PropsWithChildren, useContext, useEffect } from "preact/compat";

type Props = {

};

export function Desktop({ children }: PropsWithChildren<Props>) {

  const [{ windows }, dispatch] = useContext(WindowManagerContext);

  useEffect(() => {
    dispatch({
      action: 'CREATE',
      window: {
        title: "Test Window",
        children: "Bla Bla Bla"
      }
    });
  }, []);

  return <div>
    {[...windows].map(props => PlasmaWindow(props))}
  </div>;
}