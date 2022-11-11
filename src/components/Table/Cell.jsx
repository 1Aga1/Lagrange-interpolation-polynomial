import React from 'react';
import classes from './Table.module.css'

const Cell = ({cells}) => {

    return (
        cells['title']['Input']
        ?   <input className={classes.cell} type='number'/>
        :   <div className={classes.cell}>
                {cells['title']}
            </div>
    );
};

export default Cell;