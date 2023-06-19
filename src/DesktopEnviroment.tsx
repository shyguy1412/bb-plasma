import { NS } from "@/types/NetscriptDefinitions";
import { Taskbar } from "@/components/Taskbar";
import { mapObject } from "@/lib/MapObject";
import { WindowManagerReducer, WindowManager } from "@/lib/WindowManager";
import { Desktop } from '@/components/Desktop';
import { createContext, h } from "preact";
import { useEffect, useReducer } from "preact/hooks";
import { Program } from "@/lib/Program";
import style from '@/style/DesktopEnviroment.css';
import globalStyle from '@/style/global.css';

type Props = {
  ns: NS;
  terminate: () => void;
  reboot: () => void;
};

export const TerminateContext = createContext<Partial<{ terminate: Props['terminate']; }>>({});
export const RebootContext = createContext({ reboot: () => { } });
export const WindowManagerContext = createContext<WindowManager>(null);

export let WindowManagerInstance: WindowManager = [
  { windows: [] },
  () => { throw new Error('WindowManager is not available. Is BBPlasma running?'); }
];

export function DesktopEnviroment({ ns, terminate, reboot }: Props) {

  const windowManager = useReducer(WindowManagerReducer, {
    windows: []
  });

  WindowManagerInstance = windowManager;

  const theme = mapObject(ns.ui.getTheme(), (key, value) => ({
    ['--' + key]: value
  }));

  useEffect(() => {
    return () => {
      //Reset WindowManaferInstance
      WindowManagerInstance = [
        { windows: [] },
        () => { throw new Error('WindowManager is not available. Is BBPlasma running?'); }
      ];
    };
  }, []);

  return <div className='desktop-enviroment' style={theme}>
    <style>{style}{globalStyle}</style>
    <WindowManagerContext.Provider value={windowManager}>

      <Desktop></Desktop>

      <RebootContext.Provider value={{ reboot }}>
        <TerminateContext.Provider value={{ terminate }}>
          <Taskbar></Taskbar>
        </TerminateContext.Provider>
      </RebootContext.Provider>

    </WindowManagerContext.Provider>
  </div>;
}