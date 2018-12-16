import React from 'react';
import { cols, rows } from "../../core/GameUtils";

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

export default Header;
