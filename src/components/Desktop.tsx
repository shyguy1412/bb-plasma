import { createContext, h } from "preact";
import { Children, PropsWithChildren } from "preact/compat";

type Props = {

};

// export const LayerContext = createContext((el: any) => void);

export function Desktop({ children }: PropsWithChildren<Props>) {
  return <div>{children}</div>;
}