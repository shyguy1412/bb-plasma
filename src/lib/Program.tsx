import { createWindow } from "@/components/PlasmaWindow";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { h, JSX } from "preact";
import { WindowManagerInstance } from '@/DesktopEnviroment';
import { faFile } from "@fortawesome/free-solid-svg-icons";

type ProgramOptions = {
  name: string;
  icon?: FontAwesomeIconProps['icon'];
  WindowContents: () => JSX.Element;
  options?: Parameters<typeof createWindow>[0];
};

export class Program {
  launch: () => void;
  options: Parameters<typeof createWindow>[0];

  constructor({ name, icon, WindowContents, options }: ProgramOptions) {
    
    this.options = {
      title: name,
      icon: icon ?? faFile,
      children: <WindowContents></WindowContents>,
      ...options ?? {}
    };
    
    const [_, requestAction] = WindowManagerInstance;
    console.log(requestAction);
    this.launch = () => requestAction({
      action: 'CREATE',
      window: createWindow(this.options)
    });

  }
}