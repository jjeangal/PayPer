import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

interface SearchProps {
    onSearchInputChange: (term: string) => void;
}

export function Search({
    onSearchInputChange,
}: SearchProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <div 
            className="flex w-full max-w-ssm items-center space-x-2"
            style={{ paddingBottom: '30px' }}
        >   
            <Input
                type="search"
                placeholder="Search Articles"
                className="md:w-[200px] lg:w-[300px]"
                onChange={e => {
                    if (e.target.value.trim() === '') {
                        onSearchInputChange(searchTerm)
                    }
                    setSearchTerm(e.target.value)
                }}
            />
            <Button
                type="submit"
                onClick={() => onSearchInputChange(searchTerm)}
            >
                Search
            </Button>
        </div>
    )
} 