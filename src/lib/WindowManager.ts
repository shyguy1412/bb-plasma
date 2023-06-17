import { PlasmaWindow } from "@/components/PlasmaWindow";
import { JSX } from "preact";

export interface WindowManager {
  windows: Parameters<typeof PlasmaWindow>[0][];
}

type WindowManagerAction = 'CREATE' | 'CLOSE' | 'MINIMIZE' | 'MAXIMISE' | 'FOCUS';

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
    if (state.windows.includes(window))
      return;
    state.windows.push(window);
    return { ...state };
  },
  CLOSE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"CLOSE">): WindowManager {
    return {
      windows: state.windows.filter(w => w != window)
    };
  },
  MINIMIZE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"MINIMIZE">): WindowManager {
    window.minimized = true;
    return { ...state };
  },
  MAXIMISE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"MAXIMISE">): WindowManager {
    window.minimized = false;
    return { ...state };
  },
  FOCUS: function (state: WindowManager, { action, window }: WindowManagerDispatch<"FOCUS">): WindowManager {
    window.minimized = false;
    return {
      windows: [window, ...state.windows.filter(w => w != window)]
    };
  }
};

export function WindowManagerReducer(state: WindowManager, dispatch: WindowManagerDispatch) {
  return (ActionHandler[dispatch.action] as WindowManagerActionHandler<typeof dispatch['action']>)(state, dispatch);
}