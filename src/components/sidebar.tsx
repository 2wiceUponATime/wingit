import React, { ReactNode } from "react"

function SidebarLink(props: {
    href?: string,
    children: ReactNode,
}) {
    return (
        <a href={props.href}>{props.children}</a>
    )
}

export default function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarLink href="/">
                Home
            </SidebarLink>
        </div>
    )
}