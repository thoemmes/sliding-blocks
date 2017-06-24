import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import { initializeGame, isFinished } from './slidingBlocks';
import blockFactory, { BlankBlockComponent } from './Block';
import game from './reducers';


const Result = ({ field }) => {
  return (
    <h1 className="msg" style={{ display: isFinished(field) ? 'block' : 'none' }}>Success!!</h1>
  )
}

const mapStateToProps = (state) => {
  return {
    field: state.field
  }
}
const ResultComponent = connect(mapStateToProps)(Result);

const initAction = (field) => {
  return {
    type: 'INIT',
    field
  };
}
const store = createStore(game);
const init = () => {
  store.dispatch(initAction(initializeGame([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 3)));
}

init();

class App extends Component {
  render() {

    const Block1 = blockFactory(1);
    const Block2 = blockFactory(2);
    const Block3 = blockFactory(3);
    const Block4 = blockFactory(4);
    const Block5 = blockFactory(5);
    const Block6 = blockFactory(6);
    const Block7 = blockFactory(7);
    const Block8 = blockFactory(8);
    const Block9 = blockFactory(9);
    const Block10 = blockFactory(10);
    const Block11 = blockFactory(11);
    const Block12 = blockFactory(12);
    const Block13 = blockFactory(13);
    const Block14 = blockFactory(14);
    const Block15 = blockFactory(15);

    return (
      <Provider store={store}>
        <div>
          <div className="game" >
            <div className="field">
              <Block1 /><Block2 /><Block3 /><Block4 />
              <Block5 /><Block6 /><Block7 /><Block8 />
              <Block9 /><Block10 /><Block11 /><Block12 />
              <Block13 /><Block14 /><Block15 /><BlankBlockComponent />
            </div>
            <ResultComponent />
          </div>
          <button className="button" onClick={e => init()} >New Game</button>
        </div>
      </Provider>
    );
  }
}

export default App;
