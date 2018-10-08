import { loopColorTransitions, colorOfDepth } from './colorsByDeepLvl';

test('should work', () => {
    const sourceColorsList: colorOfDepth[] = ["red","orange","green", "blue"];
    const result: colorOfDepth[] = loopColorTransitions(sourceColorsList,false);
    
    const expectedResult: colorOfDepth[] = ["red","orange","green", "blue", "green","orange"];
    expect(result).toEqual(expectedResult);
});