import { HomeButton } from "@/components/HomeButton";
import style from '@/style/Taskbar.css';
import { WindowManagerContext } from "@/DesktopEnviroment";
import { TaskbarEntry } from "@/components/TaskbarEntry";

type Props = {
};

export function Taskbar({ }: Props) {

  const [clock, setClock] = window.React.useState(Date.now());
  const [{ windows }] = window.React.useContext(WindowManagerContext);

  window.React.useEffect(() => {
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
      {[...windows] //sort sorts  in place so we need a new array
        .sort((a, b) => a.id - b.id)
        .map((props) => <TaskbarEntry
          key={props.id}
          {...props}
        ></TaskbarEntry>)
      }
    </div>

    <span className='taskbar-date plasma-box-inline'>
      <div>{new Date(clock).toLocaleTimeString().slice(0, -3)}</div>
      <div>{new Date(clock).toLocaleDateString()}</div>
    </span>
  </div>;
}