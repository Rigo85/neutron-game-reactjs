// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { fullMoveToString, newUserData } from "../../core/GameUtils";
import Header from "./BoardHeader";
import Chip from "./BoardChip";

import './BoardGame.css';

function Board({ userData, setUserData }) {
    return [...Array(36).keys()].map(i => {
        const row = parseInt(i / 6);
        const col = i % 6;
        if (row > 4 || !col) return <Header key={col * 6 + row} row={row} col={col} />;
        return <Chip key={col * 6 + row} userData={userData} setUserData={setUserData} pieceKind={userData.board[row][col - 1].kind} row={row} col={col - 1} />;
    });
}

function Movements({ userData }) {
    const items = userData.movements
        .map((mov, i) => <li key={i}>{fullMoveToString(mov)}</li>)
        ;

    return <>
        <label>Movements</label>
        <ul className="collection height-limiter">
            {items}
        </ul>
    </>;
}

export const BoardAndMovements = (props) => {
    // const initialUserData = () => window.localStorage.getItem("neutron-game-state") ?
    //     JSON.parse(window.localStorage.getItem("neutron-game-state")) : newUserData;
    const initialUserData = newUserData;

    const [userData, setUserData] = useState(initialUserData);

    // useEffect(() => {
    //     window.localStorage.setItem("neutron-game-state", JSON.stringify(userData));
    // }, [userData]);

    return (
        <div className="row justify-content-center">
            <div className="col">
                <div className="board">
                    <Board userData={userData} setUserData={setUserData} />
                </div>
            </div>
            <div className="col">
                <Movements userData={userData} />
            </div>
        </div>
    );
};
