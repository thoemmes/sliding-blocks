import _ from 'lodash';

const COLUMNS = 4;
const ROWS = 4;


/**
 * checks whether p1 and p2 are adjacent blocks in one row
 * 
 * @param {number} p1 position in field
 * @param {number} p2 position in field
 */
const isHorizontalNeighbor = (p1, p2) => {
    let pos1, pos2;
    // assign p1, p2 to pos1, pos2 so that pos1 is lesser than pos2
    //(swaps values if p2 is lesser than p1)
    p1 <= p2 ? [pos1, pos2] = [p1, p2] : [pos2, pos1] = [p1, p2];

    if (pos1 + 1 === pos2) { // direct neighbors

        if (pos1 % COLUMNS !== 3 && pos2 % COLUMNS !== 0) { //pos1 is not rightmost block and pos2 is not leftmost block (row-i -> row-i+1) 
            return true;
        }
    }

    return false;

}
/**
 * checks if p2 is in same column as p1 but either one row above or one row below p1
 * 
 * @param {number} pos1  position in field 
 * @param {number} pos2  position in field 
 */
const isVerticalNeighbor = (pos1, pos2) => {
    if (pos1 + COLUMNS === pos2) {
        return true;
    } else if (pos1 - COLUMNS === pos2) {
        return true;

    }

    return false;

}

/**
 * 
 * checks if pos2 is direct neighbor  of pos1 either in horizontally pr vertically
 * 
 * @param {number} pos1 position in field
 * @param {number} pos2 position in field
 */
export const isNeighbor = (pos1, pos2) => {

    return isVerticalNeighbor(pos1, pos2) ||
        isHorizontalNeighbor(pos1, pos2);
}


/**
 * 
 * returns an array with all neighbors of pos, that is all possible block moves from pos
 * @param {number} pos position in field
 */
export const neighbors = (pos) => {
    const neighbs = [];
    //move upwards
    if (pos - COLUMNS >= 0) {
        neighbs.push(pos - COLUMNS);
    }
    // move to the left
    if (pos - 1 >= 0 && isHorizontalNeighbor(pos - 1, pos)) {
        neighbs.push(pos - 1);
    }
    // move to the right
    if (pos + 1 < COLUMNS * ROWS && isHorizontalNeighbor(pos, pos + 1)) {
        neighbs.push(pos + 1);
    }
    //move downwards
    if (pos + COLUMNS < COLUMNS * ROWS) {
        neighbs.push(pos + COLUMNS);
    }

    return neighbs;
}
/**
 * 
 * the blank field in the sliding block game is encoded by 0
 * if the value at position pos is zero this is the blank block in the game
 * 
 * @param {array} field the position of all blocks
 * @param {number} pos the position to check
 */
export const isBlank = (field, pos) => {
    if (pos >= 0 && pos < field.length) {
        return field[pos] === 0;
    }

    return false;
}

/**
 * 
 * checks if a block can be moved from position from to position to
 * @param {number} to 
 * @param {number} from 
 * @param {array} field 
 */
const isValidMove = (from, to, field) => {
    return isBlank(field, to) &&
        isNeighbor(from, to);
}

/**
 * 
 * moves a block from position from to position to if possible
 * and returns a new array with changed positions. if move is not allowed
 * the original unchanged field is returned 
 * @param {number} from 
 * @param {number} to 
 * @param {array} field 
 */
export const move = (from, to, field) => {
    if (isValidMove(from, to, field)) {
        const moved = Array.from(field);
        let tmp = field[to];
        moved[to] = moved[from];
        moved[from] = tmp;
        //console.log(moved);
        return moved;

    }
    //move not possible return unchanged field
    return field;
}

// speed up execution by caching the results for neigbor search 
const nb = _.memoize(neighbors);
/**
 * Since not all permutations of positions can be completely sorted by moving the blocks, the initial block positions
 * are determined by randomly moving the blocks starting with the competely sorted blocks. Thus it is guaranteed that the 
 * blocks can be sorted
 * @param {*} startField  
 * @param {*} moves number of moves
 */
export const initializeGame = (startField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,0], moves = 80) => {

    // find the blank position
    let to = startField.findIndex(item => item === 0);

    let field = startField;
    // move one of the neighbors to the blank position
    // repeat with the new blank position
    for (let i = 0; i < moves; ++i) {
        let froms = nb(to); // possible blocks to be moved
        //choose one block
        let index = Math.floor(Math.random() * froms.length);
        //let index = Math.round(Math.random() * (froms.length - 1));
        field = move(froms[index], to, field);
        
        //this is the new blank position for the next iteration
        to = froms[index];
    }

    return field;
}

/**
 * checks whether the puzzle is solved ( completely sorted)
 * 
 * @param {*} field 
 */
export const isFinished = (field) => {
    const winningField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

    //exclude truncated or irregular fields
    if (winningField.length !== field.length) {
        return false;
    }
    // compare every position
    return winningField.every((item, index) => item === field[index]);
}




