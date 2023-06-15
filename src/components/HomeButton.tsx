import { Svg } from "@/components/Svg";
import { h, Fragment } from "preact";
import logo from '@/assets/bitburner-logo.svg';
import { useState } from "preact/hooks";
import { HomeMenu } from "@/components/HomeMenu";

type Props = {

};

export function HomeButton({ }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return <>
    <div class='taskbar-homebutton plasma-button plasma-box-inline'
      onClick={() => {
        setShowMenu(!showMenu);
        if (!showMenu) setTimeout(() => document.querySelector<HTMLDivElement>('.desktop-enviroment')
          ?.addEventListener('click', () => {
            setShowMenu(false);
          }, { once: true }), 10);
      }}>
      <Svg style={{ aspectRatio: '1/1', maxHeight: '100%' }} svg={logo}></Svg>
    </div>
    {!showMenu || <HomeMenu></HomeMenu>}
  </>;
}