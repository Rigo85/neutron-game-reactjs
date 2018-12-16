
export const PieceKind = {
    BLACK: 1,
    WHITE: 2,
    NEUTRON: 3,
    CELL: 4
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
    userData.whoMove = (userData.whoMove + 1) % 2;
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

export function cellClickAction(userData, setUserData, row, col){
    const board = userData.board;
    const chip = board[row][col];
    setUserData({
        ...userData,
        board: Object.assign(
            [...board],
            {
                [row]: Object.assign(
                    [...board[row]],
                    {
                        [col]:
                        {
                            kind: chip ? chip.kind : PieceKind.CELL,
                            toggle: !(chip ? chip.toggle : false),
                        }
                    })
            })
    });
}