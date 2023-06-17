import { PlasmaWindow } from "@/components/PlasmaWindow";
import { JSX } from "preact";

export interface WindowManager {
  windows: Set<Parameters<typeof PlasmaWindow>[0]>;
}

type WindowManagerAction = 'CREATE' | 'CLOSE' | 'MINIMIZE' | 'MAXIMISE';

export interface WindowManagerDispatch<T extends WindowManagerAction = WindowManagerAction> {
  action: T;
  window: Parameters<typeof PlasmaWindow>[0];
};

type WindowManagerActionHandlerMap = {
  [key in WindowManagerDispatch['action']]: WindowManagerActionHandler<key>
};

type WindowManagerActionHandler<T extends WindowManagerAction> = (state: WindowManager, { action, window }: WindowManagerDispatch<T>) => WindowManager;

const ActionHandler: WindowManagerActionHandlerMap = {
  CREATE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"CREATE">): WindowManager {
    state.windows.add(window);
    return {
      windows: state.windows
    };
  },
  CLOSE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"CLOSE">): WindowManager {
    state.windows.delete(window);
    return {
      windows: state.windows
    };
  },
  MINIMIZE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"MINIMIZE">): WindowManager {
    console.log(window);

    throw new Error("Function not implemented.");
  },
  MAXIMISE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"MAXIMISE">): WindowManager {
    throw new Error("Function not implemented.");
  }
};

export function WindowManagerReducer(state: WindowManager, dispatch: WindowManagerDispatch) {
  return (ActionHandler[dispatch.action] as WindowManagerActionHandler<typeof dispatch['action']>)(state, dispatch);
}