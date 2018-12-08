
export const PieceKind = {
    BLACK: 1,
    WHITE: 2,
    NEUTRON: 3,
    CELL: 4,
    SBLACK: 5,
    SWHITE: 6,
    SCELL: 7,
    SNEUTRON: 8
};

export const rows = ['5', '4', '3', '2', '1', ''];
export const cols = ['', 'A', 'B', 'C', 'D', 'E'];

export const chipKind = {};
chipKind[PieceKind.BLACK] = {
    kind: 'b',
    className: 'btn-floating btn-small waves-effect waves-light deep-purple darken-2'
};
chipKind[PieceKind.WHITE] = {
    kind: 'w',
    className: 'btn-floating btn-small waves-effect waves-light blue lighten-4'
};
chipKind[PieceKind.NEUTRON] = {
    kind: 'n',
    className: 'btn-floating btn-small waves-effect waves-light red darken-4'
};
chipKind[PieceKind.CELL] = {
    kind: 'c',
    className: 'btn-small waves-effect waves-light grey'
};
chipKind[PieceKind.SBLACK] = {
    kind: 'sb',
    className: 'btn-floating btn-small waves-effect waves-light grey darken-2'
};
chipKind[PieceKind.SWHITE] = {
    kind: 'sw',
    className: 'btn-floating btn-small waves-effect waves-light grey lighten-4'
};
chipKind[PieceKind.SCELL] = {
    kind: 'sc',
    className: 'btn-small waves-effect waves-light brown lighten-4'
};
chipKind[PieceKind.SNEUTRON] = {
    kind: 'sn',
    className: 'btn-floating btn-small waves-effect waves-light red lighten-2'
};
