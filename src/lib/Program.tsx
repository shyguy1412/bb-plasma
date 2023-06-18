import { createWindow, PlasmaWindow } from "@/components/PlasmaWindow";
import { WindowManagerState, WindowManagerDispatch, WindowManager } from "@/lib/WindowManager";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { h, JSX } from "preact";

type NewType = {
  name: string;
  icon: FontAwesomeIconProps['icon'];
  WindowContents: () => JSX.Element;
};

type ProgramOptions = NewType;

export class Program {
  name: string;
  icon: FontAwesomeIconProps['icon'];
  launch: ([_, requestAction]: WindowManager) => void;

  constructor({ name, icon, WindowContents }: ProgramOptions) {
    this.name = name;
    this.icon = icon;
    this.launch = ([_, requestAction]: WindowManager) => requestAction({
      action: 'CREATE',
      window: createWindow({
        title: name,
        icon: icon,
        children: <WindowContents></WindowContents>
      })
    });

  }
}