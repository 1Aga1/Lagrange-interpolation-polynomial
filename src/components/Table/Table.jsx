import React from 'react';
import classes from './Table.module.css'
import Column from './Column'

const Table = ({columns}) => {
    // console.log(columns)
    return (
        columns
        ? <div className={classes.table}> {columns.map((column, id) => <Column key={id} column={column}/>)}</div>
            : <div className={classes.table}></div>
    )
};

export default Table;