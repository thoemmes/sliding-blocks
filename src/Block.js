import React from 'react';
import { connect } from 'react-redux';

const BLANK = 0;

/**
 * A Block is a rectangle displaying a number, the position determines its location in
 * the game grid(field). The field is a 4x4 grid represented by an array of 16 elements. 
 * the positioning is achieved by using the flex-box order attribute. each Block has  it's
 * order attribute set to position. By changing the position prop a Block can be moved
 * @param {object} props  
 */
export const Block = ({ number, position }) => {
    return (
        <div className={`box box${number}`} draggable="true" style={{ order: position }}

            onDragStart={
                e => { 
                   e.dataTransfer.setData('text', position +''); //convert position to text (for edge)
                }
            }  >{number}</div>
    )
}

/**
 * The blank position in the game grid (no number is displayed), but position is indicated
 * by number zero in redux store array
 * 
 * @param {object} props 
 */
export const BlankBlock = ({ position, drop }) => {
    return (
        <div className='box box0' style={{ order: position }}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
                let from = parseInt(e.dataTransfer.getData('text'), 10);
                //console.log('drop from', e.dataTransfer.getData('text'), 'to ', position);
                drop(from, position);
            }} > </div>
    )
}

/**
 * 
 *  position  corresponds to the position of 0 in the field array
 * 
 * @param {object} state redux state
 */
const mapStateToProps = state => {

    return {
        position: state.field.indexOf(BLANK)
    }

}

/**
 * 
 * action creator for block movements 
 * @param {number} from 
 * @param {number} to 
 */
const moveBlock = (from, to) => {
    return {
        type: 'MOVE',
        from,
        to
    };
}

/**
 * 
 * dispatch a move action
 * @param {function} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        drop: (from, to) => {
            dispatch(moveBlock(from, to));
        }
    }
}

export const BlankBlockComponent = connect(mapStateToProps, mapDispatchToProps)(BlankBlock);

/**
 * generate a props object that makes the position of the Block available as a prop
 * 
 * @param {number} number 
 */
const propsFactory = (number) => {

    return (state) => {
        return {
            position: state.field.indexOf(number),
            number: number
        };

    }
}

/**
 * create a component for a sliding block that displays the "number" 
 * @param {number} number  number to display
 */
const blockFactory = (number) => {

    const mapStateToProps = propsFactory(number);
    return connect(mapStateToProps)(Block);
};

export default blockFactory;
