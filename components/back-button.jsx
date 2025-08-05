'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton({buttonText = "Volver a Stock"}) {
    const router = useRouter();

    return (
        <Button onClick={() => router.back()} variant="ghost" className="text-gray-600 hover:text-gray-900 cursor-pointer">
            <ChevronLeft className="w-4 h-4 mr-2" />
            {buttonText}
        </Button>
    )
}
