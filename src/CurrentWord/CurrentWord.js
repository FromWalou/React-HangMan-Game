import React from 'react';
import './CurrentWord.css';

const CurrentWord = ({ currentWord, usedLetter, win }) => {
    return (
        <div id="current_word">
            {
                currentWord.split('').map(
                    (letter, key) => {

                        let status = "found"
                        if (usedLetter.indexOf(letter) === -1) {
                            if (win === -1) {
                                status = "lost"
                            } else {
                                status = "notfound"
                            }
                        }

                        return <span
                                    key={"letter_" +key}
                                    className={status}
                                >{status === "found" ? letter : 
                                (win === -1 ? letter : " –")}</span>
                    }
                    )
            }
        </div>
    )
}

export default CurrentWord