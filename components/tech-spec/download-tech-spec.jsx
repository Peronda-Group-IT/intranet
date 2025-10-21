"use client"

import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { use } from "react";

export default function DownloadTechSpec({urlPromise}){

    const {url} = use(urlPromise)

    return(
        <Button size={"icon"} variant={"outline"} onClick={() => window.open(url, "_blank")} className={"cursor-pointer"}>
            <Download size={20}/>
        </Button>
    )
}