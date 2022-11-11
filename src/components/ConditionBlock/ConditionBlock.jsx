import React, {useState} from 'react';
import Table from '../Table/Table';
import Input from "../input/input";
import classes from './ConditionBlock.module.css'

const ConditionBlock = () => {
    const [NodeNumber, setNodeNumber] = useState(0);
    const [x, setX] = useState();

    const initState = {columnId: 0, cells: [
            {id: 0, title: 'i'},
            {id: 1, title: 'узлы x'},
            {id: 2, title: 'y = f(x)'}
        ]
    }

    const [table, setTable] = useState([
        initState
    ]);

    const [columns, setColumns] = useState([]);

    const [cells, setCells] = useState({});

    const CreateTable = (NodeNumber) => {
        setTable([initState]);
        for (let i = 1; i <= NodeNumber; i++) {
            setTable([...table,
                {columnId: i, cells: [
                        {id: 0, title: i-1},
                        {id: 1, title: {Input}},
                        {id: 2, title: {Input}}
                    ]
                }
            ])
        }
    }

    return (
        <div className={classes.condition__block}>
            <h3 className={classes.condition__title}>Условие</h3>
            <div className={classes.condition__text}>
                <p>Функция <b> y = f(x) </b> задана таблично своими значениями в
                <Input
                    type="number"
                    min='0' max='10'
                    className={classes.node__number}
                    // value={NodeNumber}
                    onChange={e => {
                        // setNodeNumber(e.target.value)
                        CreateTable(e.target.value)
                    }}
                /> узлах: </p>
                <Table table={table}/>
                <p> Построить для <b> y = f(x) </b> интерполяционный полином Лагранжа и, пользуясь им, приближенно найти значение <b> у </b> в точке <b> x = </b>
                <Input
                    type="number"
                    className={classes.x__number}
                    onChange={e => setX(e.target.value)}
                />, которой нет среди узлов. </p>
            </div>
            <button className={classes.build__btn}>Построить</button>
        </div>
    );
};

export default ConditionBlock;