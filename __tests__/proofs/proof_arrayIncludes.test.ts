describe('proof array.includes(...)', () => {
    it('arrays .includes method is not natively supported by TS (to use this, object must be declared as "any") ', () => {
        const someArray: any = [11, 52, 56, 88];
        let result: boolean;

        result = someArray.includes(11);
        expect(result).toBe(true);

        result = someArray.includes("fooobar");
        expect(result).toBe(false);
    });

    it("filtering out entire (small) array from another (bigger) array", () => {
        const smallArray: number[] = [11, 22, 33];
        const bigArray: number[] = [11, 22, 33, 44, 55, 66, 77, 88];

        const result: number[] = bigArray.filter(item => {
            if (smallArray.indexOf(item) === -1)
                return true;
            else return false;
        });
        const expectedResult = [44, 55, 66, 77, 88];
        expect(result).toEqual(expectedResult);
    });
});
