"use client"

import { useSidebar } from "./ui/sidebar";
import { ChevronRightIcon } from "lucide-react";


export default function MovileNavbar(){

    const { toggleSidebar } = useSidebar()

    return(
        <section className="z-10 sticky top-0 
        px-2 h-10 flex items-center w-full bg-sidebar-accent md:hidden">
            <ChevronRightIcon strokeWidth={1.50} onClick={toggleSidebar}/>
        </section>
    );
}