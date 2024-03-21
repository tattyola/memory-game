import React, {useState} from 'react';

const Square = ({card, openCard}) => {

    return (
        <button
            onClick={() => openCard(card.id, card.picture)}
            className={`square ${card.isOpen && 'blocked'}`}
        >
            {card.isOpen && card.picture}
        </button>
    );
};

export default Square;
