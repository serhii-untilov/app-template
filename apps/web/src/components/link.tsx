import { PropsWithChildren } from "react";
import { Button } from "./ui/button";

type Props = PropsWithChildren & {
    href: string;
    className: string;
}

export function Link(props: Props) {
    return <Button variant='link' className={props.className}>{props.children}</Button>
}
