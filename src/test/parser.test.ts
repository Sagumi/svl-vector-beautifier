// import fs from 'fs';
// import parse from '../parser';

// const validateIndentation = (str: string, expectedIndentationCount: Array<number>): void => {
//     const parsed = parse(str);
//     const indentationText = [...parsed.matchAll(/^[ \t]*./gm)];
//     const indentationCounts = indentationText.map(e => (e[0].match(/ /g) || []).length);

//     expect(indentationCounts).toEqual(expectedIndentationCount);
// };

// const validateLineCount = (str: string, expectedLineCount: number): void => {
//     const parsed = parse(str);
//     const lines = [...parsed.matchAll(/\n.*/gm)];

//     expect(lines).toHaveLength(expectedLineCount);
// };

// describe('Beautifier Tests', () => {
//     describe('Generic Object', () => {
//         let sampleText = '';
//         let parseResult = '';

//         beforeAll(() => {
//             sampleText = fs.readFileSync('__tests__\\samples\\vectorObject.txt', 'utf-8');
//         });

//         beforeEach(() => {
//             parseResult = parse(sampleText);
//         });

//         it('Open brackets ([) are at the end of line', () => {
//             const result = [...parseResult.matchAll(/\[$/gm)];

//             expect(result).toHaveLength(9);
//         });

//         it('End brackets (]) are at the end of line, or followed by a comma', () => {
//             const result = [...parseResult.matchAll(/\],{0,1}$/gm)];

//             expect(result).toHaveLength(9);
//         });

//         it('Open brackets ([) indentation is incremented by sets of 2 spaces', () => {
//             const result = [...parseResult.matchAll(/.*\[$/gm)];
//             const expectedIndentationCount = [0, 2, 4, 6, 8, 8, 6, 8, 10];
//             const indentationCounts = result.map(e => (e[0].match(/ /g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);
//         });

//         it('Close brackets (]) indentation is decremented by sets of 2 spaces', () => {
//             const result = [...parseResult.matchAll(/.*\],{0,1}$/gm)];
//             const expectedIndentationCount = [8, 8, 6, 10, 8, 6, 4, 2, 0];
//             const indentationCounts = result.map(e => (e[0].match(/ /g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);
//         });

//         it('Responds to the different indentation depth', () => {
//             let parsedString = parse(sampleText, 4);
//             let result = [...parsedString.matchAll(/.*\[$/gm)];
//             let expectedIndentationCount = [0, 1, 2, 3, 4, 4, 3, 4, 5].map(e => e * 4);
//             let indentationCounts = result.map(e => (e[0].match(/ /g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);

//             parsedString = parse(sampleText, 3);
//             result = [...parsedString.matchAll(/.*\[$/gm)];
//             expectedIndentationCount = [0, 1, 2, 3, 4, 4, 3, 4, 5].map(e => e * 3);
//             indentationCounts = result.map(e => (e[0].match(/ /g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);

//             parsedString = parse(sampleText, 8);
//             result = [...parsedString.matchAll(/.*\[$/gm)];
//             expectedIndentationCount = [0, 1, 2, 3, 4, 4, 3, 4, 5].map(e => e * 8);
//             indentationCounts = result.map(e => (e[0].match(/ /g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);
//         });

//         it('Does not add negative indentation', () => {
//             const parsedString = parse(sampleText, -1);
//             const result = [...parsedString.matchAll(/.*\[$/gm)];
//             const expectedIndentationCount = [0, 1, 2, 3, 4, 4, 3, 4, 5].map(e => e * 0);
//             const indentationCounts = result.map(e => (e[0].match(/ /g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);
//         });

//         it('Can use tabs instead of spaces', () => {
//             let parsedString = parse(sampleText, 1, 'tab');
//             let result = [...parsedString.matchAll(/.*\[$/gm)];
//             let expectedIndentationCount = [0, 1, 2, 3, 4, 4, 3, 4, 5];
//             let indentationCounts = result.map(e => (e[0].match(/\t/g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);

//             parsedString = parse(sampleText, 2, 'tab');
//             result = [...parsedString.matchAll(/.*\[$/gm)];
//             expectedIndentationCount = [0, 1, 2, 3, 4, 4, 3, 4, 5].map(e => e * 2);
//             indentationCounts = result.map(e => (e[0].match(/\t/g) || []).length);

//             expect(indentationCounts).toEqual(expectedIndentationCount);
//         });

//         it('Can handle when there are additionnal ] characters at the end of the string', () => {
//             const text = `['$DATA/dataset_mol.mdb','$DATA','mdb',[title:'dataset_mol.mdb',cfgCtx:[pjc:[updated:1710164666],uic:[sessionName:'dataset_mol.mdb']]]]]]`;
//             expect(() => parse(text)).not.toThrow();
//         });

//         it('Additionnal ] characters at the end of the string have an indentation of 0', () => {
//             const text = `['$DATA/dataset_mol.mdb','$DATA','mdb',[title:'dataset_mol.mdb',cfgCtx:[pjc:[updated:1710164666],uic:[sessionName:'dataset_mol.mdb']]]]]]`;
//             validateIndentation(
//                 text,
//                 [0, 2, 2, 2, 2,
//                     4, 4, 6, 8, 6,
//                     6, 8, 6, 4, 2,
//                     0, 0, 0,
//                 ],
//             );
//         });
//     });

//     describe('Object with smiles', () => {
//         let smileSample = '';

//         beforeAll(() => {
//             smileSample = fs.readFileSync('__tests__\\samples\\vectorObjectWithSmiles.txt', 'utf-8');
//         });

//         it('Doesn\'t break up a [ when it\'s inside a smiles', () => {
//             validateLineCount(
//                 smileSample,
//                 27,
//             );

//             validateLineCount(
//                 '[ \'FC(F)(F)c1nn(c(-c2ccc(F)cc2)c1)-c1ccc([N+](=O)[O-])cc1\':[] ]',
//                 3,
//             );
//             validateLineCount(
//                 '[ \'[R2:1]C=1C(=O)CCC=1[R1:2]\':[567,569,640] ]',
//                 7,
//             );
//         });

//         it('Keeps indentation correct', () => {
//             validateIndentation(
//                 smileSample,
//                 [
//                     0, 2, 2, 2, 2,
//                     2, 2, 2, 2, 2,
//                     2, 2, 2, 2, 2,
//                     2, 2, 2, 2, 2,
//                     2, 2, 2, 2, 2,
//                     2, 0,
//                 ],
//             );

//             validateIndentation(
//                 '[ \'FC(F)(F)c1nn(c(-c2ccc(F)cc2)c1)-c1ccc([N+](=O)[O-])cc1\':[] ]',
//                 [0, 2, 0],
//             );

//             validateIndentation(
//                 '[ \'[R2:1]C=1C(=O)CCC=1[R1:2]\':[567,569,640] ]',
//                 [0, 2, 4, 4, 4, 2, 0],
//             );

//             validateIndentation(
//                 '[ \'[R2:1]c1cc(F)c(F)cc1.[R1:2]c1ccc(S(=O)(=O)C)cc1\':[556,561,605] ]',
//                 [0, 2, 4, 4, 4, 2, 0],
//             );
//         });

//         it('Keeps empty vectors', () => {
//             validateIndentation(
//                 '[\'Brc1c(C)n(c(-c2ccc(S(=O)(=O)C)cc2)c1)-c1ccc(F)cc1\':[] ]',
//                 [0, 2, 0],
//             );
//         });

//         it('Ignores a [ between double quotes', () => {
//             validateIndentation(
//                 '[i_smi:"[R0:3]c1n(c(c([H])n1)-c1ccc(S(=O)(=O)C)cc1)-c1ccc(F)cc1",u_smi:["[R0:3]Br","[R0:3]C","[R0:3]C#N","[R0:3]C(=O)c1ccccc1","[R0:3]Cl"]]',
//                 [0, 2, 2, 4, 4, 4, 4, 4, 2, 0],
//             );

//             validateIndentation(
//                 '[["[R2]C1=C(c2ccc(S(=O)(=O)N)cc2)CCC1","[R2]C=1C(=O)CCC=1c1ccc(S(=O)(=O)C)cc1","[R2]C1=C([R1])CC2(C1)CC2"]]',
//                 [0, 2, 4, 4, 4, 2, 0],
//             );
//         });
//     });
// });
