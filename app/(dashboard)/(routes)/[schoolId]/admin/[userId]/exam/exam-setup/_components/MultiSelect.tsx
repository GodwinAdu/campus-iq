"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
    placeholder: string;
    distributions:IDistribution[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    placeholder,
    distributions,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    let selected: IDistribution[] = [];
    if (Array.isArray(value) && value.length > 0 && distributions) {
        selected = value
            .map((data) => distributions.find((collection) => collection?.markDistribution === data))
            .filter((collection) => collection) as IDistribution[];
    }
    console.log(selected, "selected value");
    const selectTables = distributions?.filter(
        (collection) => !selected.includes(collection)
    );

    console.log(selectTables, "selected tables");

    return (
        <div className="overflow-visible bg-white">
            <div className="flex gap-1 flex-wrap border rounded-md">
                {selected.map((collection) => (
                    <Badge key={collection._id}>
                        {collection.markDistribution}
                        <button type="button" aria-label="badge-button" className="ml-1 hover:text-red-1" onClick={() => onRemove(collection.markDistribution)}>
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                <input
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    className="w-full p-2 rounded-md"
                />
            </div>

            <div className="relative mt-2">
                {open && (
                    <div className="absolute w-full z-[9999] backdrop-blur top-0 overflow-auto border rounded-md shadow-md">
                        {selectTables?.map((collection) => (
                            <div
                                key={collection._id}
                                className="p-2 hover:bg-grey-2 cursor-pointer"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    onChange(collection.markDistribution);
                                    setInputValue("");
                                }}
                            >
                                {collection.markDistribution}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;