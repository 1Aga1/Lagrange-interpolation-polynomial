import React from 'react';
import classes from './Table.module.css'
import Cell from "./Cell";

const Column = ({column}) => {
    // console.log(column)
    return (
        <div className={classes.column}>
            {column['cells'].map((cells, id) =>
                <Cell key={id} cells={cells}/>
            )}
        </div>
    );
};

export default Column;