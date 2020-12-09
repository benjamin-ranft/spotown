import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SelectableChipList from "./SelectableChipList";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',

        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function AddDiscoveryTags({tags, setTags}) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SelectableChipList chips={[
                {name:"Food",value:"food"},
                {name:"Drinks", value:"drinks"},
                {name:"Shops", value:"shops"},
                {name:"Art", value:"art"},
                {name:"Nature", value:"nature"}]}
                                selectedChips={tags}
                                setSelectedChips={setTags}/>
        </div>
    );
}