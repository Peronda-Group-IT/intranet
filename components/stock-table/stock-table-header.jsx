"use client"

import { useState } from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StockTableHeader({ headers }){

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [ selected, setSelected ] = useState(null)
    const [ direction, setDirection ] = useState('NONE')
    const icons = {
        ASC: <ArrowUp className="ml-1" size={14} />,
        DESC: <ArrowDown className="ml-1" size={14}/>,
        NONE: <></>
    }
    
    const handleSort = (key) => {
        if (selected === key) {
            if (direction === 'ASC') {
                setDirection('DESC')
                setSearchParams(key, 'DESC')
            } else if (direction === 'DESC') {
                setDirection('NONE')
                setSelected(null)
                setSearchParams(null)
            }
        } else {
            setSelected(key)
            setDirection('ASC')
            setSearchParams(key, 'ASC')
        }
    }

    const setSearchParams = (item, direction) => {
        const params = new URLSearchParams(searchParams)  
        if (item) {
            params.set('orderBy', item);
            params.set('orderDirection', direction);
        } else {
            params.delete('orderBy');
            params.delete('orderDirection');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <TableHeader>
            <TableRow className={"bg-muted text-muted-foreground font-semibold hover:bg-muted"}>
              {headers.map((header) => (
                <TableHead key={header.key} onClick={() => handleSort(header.key)} className={"cursor-pointer"}>
                    <div className="flex flex-row items-center">
                        {header.label}
                        {selected === header.key && icons[direction]}
                    </div>
                </TableHead>
              ))}
            </TableRow>
        </TableHeader>
    )
}