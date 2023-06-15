import { h, render } from "preact";
import { DesktopEnviroment } from "./DesktopEnviroment";
import { NS } from "./types/NetscriptDefinitions";
import style from "@/style/global.css";
import { sleep } from "@/lib/Sleep";
import { unmountComponentAtNode } from "preact/compat";

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

  const styleEl = document.createElement('style');
  styleEl.innerHTML = style;
  overlay.append(styleEl);

  let terminate;
  const keepAlivePromise = new Promise<void>(resolve => terminate = () => {
    resolve();
  });

  let devTerm = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      terminate();
      removeEventListener('keydown', devTerm);
    };
  };
  addEventListener('keydown', devTerm);

  document.body.prepend(overlay);

  render(h(DesktopEnviroment, { ns, terminate }), overlay);
  ns.atExit(() => {
    unmountComponentAtNode(overlay);    
    overlay.remove();
  });

  return keepAlivePromise;
}