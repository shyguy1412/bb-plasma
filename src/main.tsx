import { DesktopEnviroment } from "./DesktopEnviroment";
import { NS } from "./types/NetscriptDefinitions";
import { sleep } from "@/lib/Sleep";
import { unmountComponentAtNode } from "preact/compat";
import { h, render } from "preact";

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
    unmountComponentAtNode(overlay);
    overlay.remove();
  });

  document.body.prepend(overlay);
  render(<DesktopEnviroment ns={ns} terminate={terminate} reboot={reboot}></DesktopEnviroment>, overlay);
  return keepAlivePromise;
}