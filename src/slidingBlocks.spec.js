import { isNeighbor, isFinished, move, neighbors } from './slidingBlocks';

describe('SlidingBlocks', () => {

    describe('isNeighbor', () => {

        it('detects row neighbor', () => {

            expect(isNeighbor(1, 2)).toBeTruthy();
            expect(isNeighbor(2, 1)).toBeTruthy();

        });

        it('should return false if in row but with gap', () => {

            expect(isNeighbor(1, 3)).toBeFalsy();
            expect(isNeighbor(3, 1)).toBeFalsy();

        });

        it('should return false if self', () => {

            expect(isNeighbor(1, 1)).toBeFalsy();

        });

        it('should return false on row begin/end', () => {

            expect(isNeighbor(3, 4)).toBeFalsy();
            expect(isNeighbor(4, 3)).toBeFalsy();

        });

        it('should return true on limits', () => {

            expect(isNeighbor(0, 1)).toBeTruthy();
            expect(isNeighbor(1, 0)).toBeTruthy();

            expect(isNeighbor(14, 15)).toBeTruthy();
            expect(isNeighbor(15, 14)).toBeTruthy();
        });

        it('should detect (vertical) neighbor in row before or after', () => {

            expect(isNeighbor(2, 6)).toBeTruthy();
            expect(isNeighbor(6, 2)).toBeTruthy();


        });

        it('should reject neighbor in row before next or after next', () => {

            expect(isNeighbor(2, 10)).toBeFalsy();
            expect(isNeighbor(10, 2)).toBeFalsy();


        });

        it('should reject if diagonal', () => {

            expect(isNeighbor(2, 7)).toBeFalsy();
            expect(isNeighbor(7, 2)).toBeFalsy();


        });

        it('should return true on limits', () => {

            expect(isNeighbor(0, 4)).toBeTruthy();
            expect(isNeighbor(4, 0)).toBeTruthy();

            expect(isNeighbor(11, 15)).toBeTruthy();
            expect(isNeighbor(15, 11)).toBeTruthy();

        });

    });

    describe('isFinished', () => {

        it('should detect winnning position', () => {
            const winningField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
            expect(isFinished(winningField)).toBeTruthy();
        });

        it('should detect swapped position', () => {
            const field = [1, 2, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
            expect(isFinished(field)).toBeFalsy();
        });

        it('should not accept truncated or elongated fields', () => {
            const field = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            expect(isFinished(field)).toBeFalsy();
            field.push(0);
            expect(isFinished(field)).toBeTruthy();
            field.push(0);
            expect(isFinished(field)).toBeFalsy();

        });

    });

    describe('move', () => {


        it('should not move to occupied position', () => {
            const field = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15];
            const next = move(4, 8, field);
            expect(next).toEqual(field);

        });

        it('should  swap positions  5  and 9', () => {
            const field = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15];
            const next = move(5, 9, field);
            expect(next).toEqual([1, 2, 3, 4, 5, 0, 7, 8, 9, 6, 10, 11, 12, 13, 14, 15]);

        });

        it('should  swap positions  14 and 15', () => {
            const field = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
            const next = move(14, 15, field);
            expect(next).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15]);

        });
    });

    describe('neighbors', () =>{

        it('finds 4 neighbors for middle blocks', () =>{

            expect(neighbors(6)).toEqual([2,5,7,10]);
        });

        it('finds 3 neighbors for side blocks', () =>{

            expect(neighbors(7)).toEqual([3,6,11]);
            expect(neighbors(1)).toEqual([0,2,5]);
            expect(neighbors(14)).toEqual([10,13,15]);
            expect(neighbors(8)).toEqual([4,9,12]);
        
        });

        it('finds 2 neighbors for corner blocks', () =>{

            expect(neighbors(0)).toEqual([1,4]);
            expect(neighbors(3)).toEqual([2,7]);
            expect(neighbors(12)).toEqual([8,13]);
            expect(neighbors(15)).toEqual([11,14]);
            
        });

    });

})