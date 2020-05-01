import React from 'react';
import './Count.css';
import './Count.css'

const Count = ({ attempt, maxAttempt }) => {
    return (
        <div id="life">
            {
                attemptToCount(attempt, maxAttempt).map(
                    (value, key) => { 
                        return <span
                            key={"count_" + key}
                            className={"count " + (value === 1 ? "full" : "empty")}         
                        ></span>
                    }
                )
            }
        </div>
    )
}

function attemptToCount(attempt, maxAttempt) {
    let count = []
    for(let i = 1; i <= maxAttempt; i++) {
        if (i <= attempt) {
            count.push(0)
        } else {
            count.push(1)
        }
    }
    return count
}

export default Count