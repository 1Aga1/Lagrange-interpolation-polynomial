import React, {useState} from 'react';
import Table from '../Table/Table';
import Input from "../input/input";
import classes from './ConditionBlock.module.css'

const ConditionBlock = () => {
    const [NodeNumber, setNodeNumber] = useState(0);
    const [x, setX] = useState();

    const [cells, setCells] = useState(
        [
            [
                {id: 0, title: 'i'},
                {id: 1, title: 'узлы x'},
                {id: 2, title: 'y = f(x)'}
            ]
        ]
    );

    const [columns, setColumns] = useState(
        []
    );

    const CreateTable = (NodeNumber) => {
        setColumns([{id: 0, cells: cells[0]}])
        for (let i = 0; i < NodeNumber; i++) {
            setCells([
                ...cells,
                [
                    {id: 0, title: i},
                    {id: 1, title: {Input}},
                    {id: 2, title: {Input}}
                ]
            ]);

            setColumns(
                [
                    ...columns,
                    {id: i, cells: cells[i]}
                ]
            );
        };
    };

    return (
        <div className={classes.condition__block}>
            <h3 className={classes.condition__title}>Условие</h3>
            <div className={classes.condition__text}>
                <p>Функция <b> y = f(x) </b> задана таблично своими значениями в
                <Input
                    type="number"
                    min='0' max='10'
                    className={classes.node__number}
                    value={NodeNumber}
                    onChange={e => {
                        CreateTable(e.target.value)
                        setNodeNumber(e.target.value)
                    }}
                /> узлах: </p>
                <Table columns={columns}/>
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