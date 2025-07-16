'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton({buttonText = "Back"}) {
    const router = useRouter();

    return (
        <Button onClick={() => router.back()} className={"cursor-pointer"}>
            {buttonText}
        </Button>
    )
}