import Move from "./Move";
import FullMove from "./FullMove";

export const PieceKind = {
    BLACK: 1,
    WHITE: 2,
    NEUTRON: 3,
    CELL: 4
};

export const Direction = {
    NORTH: 1,
    SOUTH: 2,
    EAST: 3,
    WEST: 4,
    NORTHEAST: 5,
    NORTHWEST: 6,
    SOUTHEAST: 7,
    SOUTHWEST: 8
};

export const rows = ['5', '4', '3', '2', '1', ''];
export const cols = ['', 'A', 'B', 'C', 'D', 'E'];

export const ChipKind = {};
ChipKind[PieceKind.BLACK] = {
    kind: 'b',
    color: toggle => !toggle ? '#512da8' : '#616161'
};
ChipKind[PieceKind.WHITE] = {
    kind: 'w',
    color: toggle => !toggle ? '#bbdefb' : '#f5f5f5'
};
ChipKind[PieceKind.NEUTRON] = {
    kind: 'n',
    color: toggle => !toggle ? '#b71c1c' : '#e57373'
};
ChipKind[PieceKind.CELL] = {
    kind: 'c',
    color: toggle => !toggle ? '#9e9e9e' : '#d7ccc8'
};

const rotation = [PieceKind.NEUTRON, PieceKind.WHITE];

function getWhoMove(userData) {
    return rotation[userData.whoMove];
}

function updateWhoMove(userData) {
    return (userData.whoMove + 1) % 2;
}

export function kind2Name(pieceKind) {
    const names = { 1: 'BLACK', 2: 'WHITE', 3: 'NEUTRON' };
    return names[pieceKind] || 'NO KIND';
}

export function moveToString(move) {
    const chars = ['a', 'b', 'c', 'd', 'e'];
    return `${chars[move.col]}${5 - move.row}`;
}

export function fullMoveToString(fullMove) {
    if (fullMove.moves.length) {
        const piece1Kind = kind2Name(fullMove.moves[1].kind);
        const piece2Kind = kind2Name(fullMove.moves[3].kind);
        return `${piece1Kind}: ${moveToString(fullMove.moves[0])}-${moveToString(fullMove.moves[1])}, ` +
            `${piece2Kind}: ${moveToString(fullMove.moves[2])}-${moveToString(fullMove.moves[3])}`;
    }

    return `EMPTY FULLMOVE with score = ${fullMove.score}`;
}

export function cellClickAction(userData, setUserData, row, col) {
    const board = userData.board;
    const chip = board[row][col];

    if (chip.kind === getWhoMove(userData)) {
        // poner todo toggle == false
        const boardOnToggleOff = board.map(row => row.map(chip => ({ ...chip, toggle: false })));
        // obtener los posibles movimientos para la posición seleccionada
        const move = new Move(row, col, getWhoMove(userData));
        const m = moves(move, board);
        // actualizar el board dados estos movimientos
        // FIX no me gusta esta solución, estoy malgastando tiempo de CPU, pero es la mejor forma "funcional" que se me ocurre ahora.
        const boardOnPossibleMoves = boardOnToggleOff.map((rowArr, row) => rowArr.map((chip, col) => ({ ...chip, toggle: m.find(move => move.row === row && move.col === col) ? true : false })));
        // actualizar selectedChip
        setUserData({ ...userData, board: boardOnPossibleMoves, selectedChip: move });
    } else if (chip.kind === PieceKind.CELL && chip.toggle) {
        const boardOnMoveApplied = applyMove(userData.selectedChip, new Move(row, col, userData.selectedChip.kind), userData.board);
        const boardOnToggleOff = boardOnMoveApplied.map(row => row.map(chip => ({ ...chip, toggle: false })));
        let movements = userData.movements;
        let neutronFrom = undefined;
        let neutronTo = undefined;
        if (getWhoMove(userData) === PieceKind.WHITE) {
            // check game over!
            // update movements
            const movement = new FullMove([userData.neutronFrom, userData.neutronTo, userData.selectedChip, new Move(row, col, userData.selectedChip.kind)], 0);
            movements = movements.concat(movement);
            const endGame = { success: false };
            if (!endGame.success) {
                // aplicar minimax
                // obtener fullmove
                // verificar si el minimax ganó sino aplicar la jugada realizada.
            }
        } else {
            neutronFrom = userData.selectedChip;
            neutronTo = new Move(row, col, userData.selectedChip.kind);
            // check end game.
        }

        setUserData({
            ...userData,
            board: boardOnToggleOff,
            selectedChip: undefined,
            whoMove: updateWhoMove(userData),
            neutronFrom: neutronFrom,
            neutronTo: neutronTo,
            movements: movements
        });
    }
    else {
        const boardOnToggleOff = board.map(row => row.map(chip => ({ ...chip, toggle: false })));
        setUserData({ ...userData, board: boardOnToggleOff, selectedChip: undefined });
    }
}

export const newUserData = {
    board: [
        [
            { kind: PieceKind.BLACK, toggle: false },
            { kind: PieceKind.BLACK, toggle: false },
            { kind: PieceKind.BLACK, toggle: false },
            { kind: PieceKind.BLACK, toggle: false },
            { kind: PieceKind.BLACK, toggle: false }
        ],
        [
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false }
        ],
        [
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.NEUTRON, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false }
        ],
        [
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false },
            { kind: PieceKind.CELL, toggle: false }
        ],
        [
            { kind: PieceKind.WHITE, toggle: false },
            { kind: PieceKind.WHITE, toggle: false },
            { kind: PieceKind.WHITE, toggle: false },
            { kind: PieceKind.WHITE, toggle: false },
            { kind: PieceKind.WHITE, toggle: false }
        ]],
    movements: [
        // {
        //     moves: [
        //         { row: 2, col: 2, kind: PieceKind.NEUTRON },
        //         { row: 1, col: 2, kind: PieceKind.NEUTRON },
        //         { row: 4, col: 0, kind: PieceKind.WHITE },
        //         { row: 1, col: 0, kind: PieceKind.WHITE }
        //     ],
        //     score: 0
        // }
    ],
    whoMove: 0,
    selectedChip: undefined,
    neutronFrom: undefined,
    neutronTo: undefined
};

export function moves(startPoint, board) {
    const directions = [
        Direction.NORTH, Direction.SOUTH,
        Direction.EAST, Direction.WEST,
        Direction.NORTHEAST, Direction.NORTHWEST,
        Direction.SOUTHEAST, Direction.SOUTHWEST];

    return directions
        .map(direction => checkMove(startPoint, direction, board))
        .filter(m => m);
}

const checkMove = (move, direction, board) => {
    function _check(row, col, incR, incC, board) {
        if (!inBounds(row, incR) ||
            !inBounds(col, incC) ||
            board[row + incR][col + incC].kind !== PieceKind.CELL) return { row: row, col: col };
        return _check(row + incR, col + incC, incR, incC, board);
    }

    const { row, col } = _check(move.row, move.col, getRowMove(direction), getColMove(direction), board);

    return row === move.row && col === move.col ? null : new Move(row, col, move.kind);
}

const getRowMove = (direction) => {
    const result = {};
    result[Direction.NORTH] = -1;
    result[Direction.SOUTH] = 1;
    result[Direction.NORTHEAST] = -1;
    result[Direction.NORTHWEST] = -1;
    result[Direction.SOUTHEAST] = 1;
    result[Direction.SOUTHWEST] = 1;

    return result[direction] || 0;
}

const getColMove = (direction) => {
    const result = {};
    result[Direction.WEST] = -1;
    result[Direction.EAST] = 1;
    result[Direction.NORTHEAST] = 1;
    result[Direction.NORTHWEST] = -1;
    result[Direction.SOUTHEAST] = 1;
    result[Direction.SOUTHWEST] = -1;

    return result[direction] || 0;
}

const inBounds = (value, inc) => {
    return value + inc >= 0 && value + inc < 5;
}

const applyMove = (from, to, board) => {
    const boardOnMoveApplied = board.map(
        (rowArr, row) => rowArr.map(
            (chip, col) => {
                if (to.row === row && to.col === col)
                    return { ...chip, kind: to.kind };
                if (from.row === row && from.col === col && from.col * 5 + from.row !== to.col * 5 + to.row)
                    return { ...chip, kind: PieceKind.CELL };
                return chip;
            }));

    return boardOnMoveApplied
}