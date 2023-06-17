import { DesktopEnviroment } from "./DesktopEnviroment";
import { NS } from "./types/NetscriptDefinitions";
import style from "@/style/global.css";
import { sleep } from "@/lib/Sleep";

export async function main(ns: NS) {

  if (ns.getHostname() != 'home') {
    throw new Error('bb-plasma can not run on servers');
  }

  await sleep(100);

  const overlay = document.createElement('div');
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.zIndex = '9999';
  overlay.style.position = 'absolute';
  overlay.style.overflow = 'hidden';
  overlay.style.background = 'black';

  let terminate;
  const keepAlivePromise = new Promise<void>(resolve => terminate = () => {
    resolve();
  });

  const reboot = () => {
    ns.run(ns.getScriptName());
    terminate();
  };

  const devTerm = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      reboot();
    };
  };
  addEventListener('keydown', devTerm);

  ns.atExit(() => {
    removeEventListener('keydown', devTerm);
    window.ReactDOM.unmountComponentAtNode(overlay);
    overlay.remove();
  });

  document.body.prepend(overlay);
  window.ReactDOM.render(<DesktopEnviroment ns={ns} terminate={terminate} reboot={reboot}></DesktopEnviroment>, overlay);
  return keepAlivePromise;
}