import { createContext, h } from "preact";
import { NS } from "@/types/NetscriptDefinitions";
import { Taskbar } from "@/components/Taskbar";
import { Desktop } from "@/components/Desktop";
import { mapObject } from "@/lib/MapObject";
import style from '@/style/DesktopEnviroment.css';
import { useReducer } from "preact/hooks";
import { WindowManager, WindowManagerDispatch, WindowManagerReducer } from "@/lib/WindowManager";

type Props = {
  ns: NS;
  terminate: () => void;
  reboot: () => void;
};

export const TerminateContext = createContext<Partial<{ terminate: Props['terminate']; }>>({});
export const RebootContext = createContext({ reboot: () => { } });
export const WindowManagerContext = createContext<ReturnType<typeof useReducer<WindowManager, WindowManagerDispatch>>>(null);


export function DesktopEnviroment({ ns, terminate, reboot }: Props) {

  const windowManager = useReducer<WindowManager, WindowManagerDispatch>(WindowManagerReducer, {
    windows: []
  });

  const theme = mapObject(ns.ui.getTheme(), (key, value) => ({
    ['--' + key]: value
  }));

  return <div className='desktop-enviroment' style={theme}>
    <style>{style}</style>
    <WindowManagerContext.Provider value={windowManager}>

      <Desktop>
      </Desktop>

      <RebootContext.Provider value={{ reboot }}>
        <TerminateContext.Provider value={{ terminate }}>
          <Taskbar></Taskbar>
        </TerminateContext.Provider>
      </RebootContext.Provider>

    </WindowManagerContext.Provider>
  </div >;
}