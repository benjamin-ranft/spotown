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

    const unselectedStyle = {
        backgroundColor: "#EAEBEA",
        color: "#001514",
    }

    const selectedStyle =  {
        backgroundColor: "#00B17C",
        color: "#fff",
    }

    return(
        <>
            {chips?.map((chip) => (
                <Chip
                    key={chip.value}
                    label={chip.name}
                    value={chip.value}
                    style={selectedChips.includes(chip.value)? selectedStyle : unselectedStyle}
                    onClick={()=>handleClick(chip.value)}/>
            ))}
        </>
    )
}