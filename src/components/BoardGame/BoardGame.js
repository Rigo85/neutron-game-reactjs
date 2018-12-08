import React, { useEffect, useState } from 'react';
import { chipKind, cols, rows, PieceKind } from "./GameUtils";
import './BoardGame.css';

function HeaderChip({ row, col }) {
    if (row === 5) {
        // eslint-disable-next-line
        return <a className="btn-flat disabled header-row">{cols[col]}</a>
    }
    if (!col) {
        // eslint-disable-next-line
        return <a className="btn-flat disabled header-col">{rows[row]}</a>
    }
    return <></>;
}

function Header({ row, col }) {
    return <div className="cell"><HeaderChip row={row} col={col} /></div>;
}

function Chip({ pieceKind, row, col }) {
    return (
        <div className='btn-small waves-effect waves-light grey cell border-chip'>
            {/* eslint-disable-next-line */}
            <a className={`${chipKind[pieceKind].className} chip-a`} id={`${chipKind[pieceKind].kind}-${row}-${col - 1}`}>
            </a>
        </div>
    );
}

const newBoard = [
    [PieceKind.BLACK, PieceKind.BLACK, PieceKind.BLACK, PieceKind.BLACK, PieceKind.BLACK],
    [PieceKind.CELL, PieceKind.CELL, PieceKind.CELL, PieceKind.CELL, PieceKind.CELL],
    [PieceKind.CELL, PieceKind.CELL, PieceKind.NEUTRON, PieceKind.CELL, PieceKind.CELL],
    [PieceKind.CELL, PieceKind.CELL, PieceKind.CELL, PieceKind.CELL, PieceKind.CELL],
    [PieceKind.WHITE, PieceKind.WHITE, PieceKind.WHITE, PieceKind.WHITE, PieceKind.WHITE]];

function Board(props) {
    const [board] = useState(newBoard);

    return [...Array(36).keys()].map(i => {
        const row = parseInt(i / 6);
        const col = i % 6;
        if (row > 4 || !col) return <Header key={col * 6 + row} row={row} col={col} />;
        return <Chip key={col * 6 + row} pieceKind={board[row][col - 1]} row={row} col={col} />;
    });
}

function Movements(props) {
    return <>
        <label>Movements</label>
        <ul className="collection height-limiter">
        </ul>
    </>
}

export const BoardAndMovements = (props) => {
    useEffect(() => {

    });

    return (
        <div className="row justify-content-center">

            <div className="col">
                <div className="board">
                    <Board />
                </div>
            </div>
            <div className="col">
                <Movements />
            </div>
        </div>
    );
};
