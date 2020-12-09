import React from "react";
import Chip from '@material-ui/core/Chip';

export default function FilterList({selectedChips, chips, setSelectedChips}){

    const handleClick = (value) => {
        if (selectedChips.includes(value)){
            setSelectedChips(selectedChips.filter((chipValue)=>
                chipValue!==value));
        } else {
            setSelectedChips([...selectedChips,value]);
        }
    };

    return(
        <>
            {chips?.map((chip) => (
                <Chip
                    key={chip.value}
                    label={chip.name}
                    value={chip.value}
                    color={selectedChips.includes(chip.value)?"primary":"secondary"}
                    onClick={()=>handleClick(chip.value)}/>
            ))}
        </>
    )
}