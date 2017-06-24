import { move } from './slidingBlocks';



/**
 * 
 * redux reducer: the state corresponds to the position of all blocks
 * field is an array of 16 elements. The element with a value of 0 is the 
 * blank position
 * 
 * @param {*} state 
 * @param {*} action 
 */
const game = (state = { field:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0] }, action) => {
  switch (action.type) {
    case 'MOVE':
      return {
        ...state,
        field: move( action.from, action.to, state.field)
      }
      case 'INIT':
      return {
          ...state,
          field: action.field
      }
      
    default:
      return state;  
  }
  
}



export default game;