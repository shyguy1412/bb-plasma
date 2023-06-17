import { HomeButton } from "@/components/HomeButton";
import { h } from "preact";
import style from '@/style/Taskbar.css';

type Props = {
};

export function Taskbar({}: Props) {

  return <div className='taskbar'>
    <style>{style}</style>
    <HomeButton></HomeButton>
    <div style={{width:'-webkit-fill-available'}}></div>
    <span className='taskbar-date plasma-box-inline'>
      <div>12:22</div>
      <div>15.06.2023</div>
    </span>
  </div>;
}