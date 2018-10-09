
function changeArrayInFunction(testArray: string[]): void {
    testArray[1] = "LoremIpsum";
};

test('should change array inside function', () => {
    const myArray: string[] = [
        "foobar", "baz"
    ];

    changeArrayInFunction(myArray);

    expect(myArray).toEqual(["foobar", "LoremIpsum"]);
});