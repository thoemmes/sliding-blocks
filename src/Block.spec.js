import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import blockFactory, { Block, BlankBlock, BlankBlockComponent } from './Block';

import game from './reducers';
import { createStore } from 'redux';

describe('Block', () => {

    it('renders Block', () => {
        const block = renderer.create(<Block number="3" position="0" />);
        expect(block).toMatchSnapshot();
    });

    it('renders Block with correct position', () => {
        const block = shallow(<Block number="3" position="14" />);
        expect(block.props().style.order).toEqual("14");
    });

    it('renders BlankBlock', () => {
        const blankBlock = renderer.create(<BlankBlock position="5" />);
        expect(blankBlock).toMatchSnapshot();
    });

    describe('BlockComponent', () => {

        let store;
        beforeEach(() => {
            store = createStore(game);

        });


        it('stores the position of the block in dataTranfer on dragstart', () => {

            const setData = jest.fn();
            const BlockComponent = blockFactory(5);
            const block = mount(<BlockComponent store={store} />);
            block.simulate('dragstart', {
                dataTransfer: {
                    setData
                }
            });

            expect(setData.mock.calls[0][0]).toBe('text');
            expect(setData.mock.calls[0][1]).toBe('4'); //initially Block with number 5 is at position 4 [1,2,3,4,5 ....]
        });
    })

    describe('BlankBlockComponent', () => {
        let store;
        beforeEach(() => {
            store = createStore(game);

        });

        it('changes the position of the block if the drop event fires', () => {

            store.dispatch({
                type: 'INIT',
                field: [1, 2, 6, 0, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            });
            const block = mount(<BlankBlockComponent store={store} position="3" />);
            block.simulate('drop', {    //slide block from position 2 (number 6) to position 3
                dataTransfer: {
                    getData: (type) => 2
                }
            });

            expect(store.getState().field).toEqual([1, 2, 0, 6, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        });

        it(' does not change the position of the block if an invalid  move action is dispatched', () => {
            store.dispatch({
                type: 'INIT',
                field: [1, 2, 6, 0, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            });
            const block = mount(<BlankBlockComponent store={store} position="3" />);
            block.simulate('drop', {  // try to slide block from position 1 (number 2) to position 3 
                dataTransfer: {
                    getData: (type) => 1
                }
            });

            expect(store.getState().field).toEqual([1, 2, 6, 0, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        });

    })

});
