import React from 'react';
import Square from "./Square";

const Board = ({board, openCard, isBlocked}) => {
    return (
        <div className={isBlocked ? 'board blocked' : 'board'}>
            {board.map((el) =>
                <Square
                    card={el}
                    openCard={openCard}
                    isBlocked={isBlocked}
                />
            )}
        </div>
    );
};

export default Board;
