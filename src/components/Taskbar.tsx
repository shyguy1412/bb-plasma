import { HomeButton } from "@/components/HomeButton";
import { h } from "preact";
import style from '@/style/Taskbar.css';
import { useContext, useEffect, useState } from "preact/hooks";
import { WindowManagerContext } from "@/DesktopEnviroment";
import { TaskbarEntry } from "@/components/TaskbarEntry";

type Props = {
};

export function Taskbar({ }: Props) {

  const [clock, setClock] = useState(Date.now());
  const [{ windows }] = useContext(WindowManagerContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className='taskbar'>
    <style>{style}</style>
    <HomeButton></HomeButton>

    <div className='taskbar-windows'>
      {[...windows].map(props => TaskbarEntry(props))}
    </div>

    <span className='taskbar-date plasma-box-inline'>
      <div>{new Date(clock).toLocaleTimeString().slice(0, -3)}</div>
      <div>{new Date(clock).toLocaleDateString()}</div>
    </span>
  </div>;
}