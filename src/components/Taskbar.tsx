import { HomeButton } from "@/components/HomeButton";
import { h } from "preact";

type Props = {
};

export function Taskbar({}: Props) {

  return <div className='taskbar'>
    <HomeButton></HomeButton>
    <div></div>
    <span className='taskbar-date plasma-box-inline'>
      <div>12:22</div>
      <div>15.06.2023</div>
    </span>
  </div>;
}