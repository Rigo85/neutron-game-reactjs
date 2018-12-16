import React from 'react';
import { Spring, animated as a, template as t } from 'react-spring'

import { ChipKind, PieceKind, cellClickAction } from "../../core/GameUtils";

const styles = {
    container: { backgroundColor: '#9e9e9e', float: 'left', border: '1px solid', height: '50px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', willChange: 'background' },
    shape: { width: '50px', height: '50px', willChange: 'transform' }
}

const ChipContent = ({ toggle, fill, rotate }) => {
    return (
        <a.div style={{ ...styles.container }}>
            <a.svg style={{ ...styles.shape, fill, transform: t`rotate3d(0,1,0,${rotate})` }} version="1.1" viewBox="0 0 400 400">
                <g style={{ cursor: 'pointer' }} fillRule="evenodd" onClick={toggle}>
                    <circle cx="200" cy="200" r="170" />
                </g>
            </a.svg>
        </a.div>
    );
}

const CellContent = ({ toggle, fill, rotate }) => {
    return (
        <a.div style={{ ...styles.container }}>
            <a.svg style={{ ...styles.shape, fill, transform: t`rotate3d(0,1,0,${rotate})` }} version="1.1" viewBox="0 0 400 400">
                <g style={{ cursor: 'pointer' }} fillRule="evenodd" onClick={toggle}>
                    <rect x="0" y="0" width="400" height="400" />
                </g>
            </a.svg>
        </a.div>
    );
}

function Chip({ pieceKind, row, col, userData, setUserData }) {
    const child = pieceKind === PieceKind.CELL ? CellContent : ChipContent;
    const board = userData.board;
    const chip = board[row][col];
    const handleToggleAction = () => {
        cellClickAction(userData, setUserData, row, col);
    };

    return (
        <Spring
            native
            from={{
                fill: ChipKind[pieceKind].color(chip ? chip.toggle : false),
                rotate: (chip ? chip.toggle : false) ? '0deg' : '180deg'
            }}
            to={{
                fill: ChipKind[pieceKind].color(chip ? chip.toggle : false),
                rotate: (chip ? chip.toggle : false) ? '0deg' : '180deg'
            }}
            toggle={handleToggleAction}
            children={child}
        />
    )
}

export default Chip;
