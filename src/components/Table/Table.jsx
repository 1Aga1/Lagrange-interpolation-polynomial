import React, {useState} from 'react';
import classes from './Table.module.css'
import Column from './Column'

const Table = ({table}) => {
    return (
        table
        ? <div className={classes.table}> {table.map((column, id) => <Column key={id} column={column}/>)}</div>
            : <div className={classes.table}></div>
    )
};

export default Table;