import { PlasmaWindow } from "@/components/PlasmaWindow";

export interface WindowManager {
  windows: Parameters<typeof PlasmaWindow>[0][];
}

export type WindowManagerAction = 'CREATE' | 'CLOSE' | 'MINIMIZE' | 'MAXIMISE' | 'FOCUS';

export interface WindowManagerDispatch<T extends WindowManagerAction = WindowManagerAction> {
  action: T;
  window: WindowManager['windows'][number];
};

type WindowManagerActionHandlerMap = {
  [key in WindowManagerDispatch['action']]: WindowManagerActionHandler<key>
};

type WindowManagerActionHandler<T extends WindowManagerAction> = (state: WindowManager, { action, window }: WindowManagerDispatch<T>) => WindowManager;

function getWindow(state: WindowManager, window: WindowManagerDispatch['window']) {
  return state.windows.find(w => w.id == window.id);
}

const ActionHandler: WindowManagerActionHandlerMap = {
  CREATE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"CREATE">): WindowManager {
    if (getWindow(state, window))
      return;
    state.windows.push(window);
    return { ...state };
  },
  CLOSE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"CLOSE">): WindowManager {
    return {
      windows: state.windows.filter(w => w.id != window.id)
    };
  },
  MINIMIZE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"MINIMIZE">): WindowManager {
    getWindow(state, window).minimized = true;
    state.windows.push(state.windows.shift());
    return { ...state };
  },
  MAXIMISE: function (state: WindowManager, { action, window }: WindowManagerDispatch<"MAXIMISE">): WindowManager {
    getWindow(state, window).minimized = true;
    return { ...state };
  },
  FOCUS: function (state: WindowManager, { action, window }: WindowManagerDispatch<"FOCUS">): WindowManager {
    window.minimized = false;
    return {
      windows: [window, ...state.windows.filter(w => w.id != window.id)]
    };
  }
};

export function WindowManagerReducer(state: WindowManager, dispatch: WindowManagerDispatch) {
  return (ActionHandler[dispatch.action] as WindowManagerActionHandler<typeof dispatch['action']>)(state, dispatch);
}