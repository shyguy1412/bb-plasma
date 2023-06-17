import { createContext, h } from "preact";
import { NS } from "@/types/NetscriptDefinitions";
import { Taskbar } from "@/components/Taskbar";
import { Desktop } from "@/components/Desktop";
import { mapObject } from "@/lib/MapObject";
import style from '@/style/DesktopEnviroment.css';

type Props = {
  ns: NS;
  terminate: () => void;
};

export const TerminateContext = createContext<Partial<{ terminate: Props['terminate']; }>>({});
export const RebootContext = createContext({ reboot: () => { } });

export function DesktopEnviroment({ ns, terminate }: Props) {

  const theme = mapObject(ns.ui.getTheme(), (key, value) => ({
    ['--' + key]: value
  }));


  return <div className='desktop-enviroment' style={theme}>
    <style>{style}</style>
    <Desktop>
      <PlasmaWindow title="Test Window">
        asfjiosfgjasoifghjasoig
      </PlasmaWindow>
    </Desktop>
    <RebootContext.Provider value={{
      reboot: () => {
        ns.run(ns.getScriptName());
        terminate();
      }
    }}>
      <TerminateContext.Provider value={{ terminate }}>
        <Taskbar></Taskbar>
      </TerminateContext.Provider>
    </RebootContext.Provider>
  </div>;
}