import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilterList from "./FilterList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",

    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function AddFilters({ tags, setTags }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterList
        chips={[
          { name: "Food", value: "food" },
          { name: "Drinks", value: "drinks" },
          { name: "Shops", value: "shops" },
          { name: "Art", value: "art" },
          { name: "Nature", value: "nature" },
        ]}
        selectedChips={tags}
        setSelectedChips={setTags}
      />
    </div>
  );
}
