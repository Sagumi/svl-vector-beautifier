export type IndentationType = 'space' | 'tab';
type TokenDescription = { token: string, index: number, indentLevel: number };

const isEmptyVector = (token: string, index: number, text: string): boolean => {
    return (token === ']' && text[index - 1] === '[') || (token === '[' && text[index + 1] === ']');
};

const buildIndentationString = (character: string, level: number, incrementPerLevel: number): string => {
    return character.repeat(Math.max(level, 0) * Math.max(incrementPerLevel, 0));
};

const tokenList = [',', '[', ']', '"', '\''];

export default function parse(text: string, indentationIncrement = 2, indentationType: IndentationType = 'space'): string {
    let indentationCharacter = ' ';
    let result = text.slice();

    if (indentationType === 'tab') {
        indentationCharacter = '\t';
    }

    const descriptionMap: Array<TokenDescription> = [];
    let inDoubleQuotes = false;
    let inSingleQuotes = false;
    let indentLevel = 0;

    for (let index = 0; index < text.length; index += 1) {
        const token = text[index];

        if (tokenList.includes(token)) {
            if (token === '"') {
                inDoubleQuotes = !inDoubleQuotes;
            } else if (token === '\'') {
                inSingleQuotes = !inSingleQuotes;
            } else if (isEmptyVector(token, index, text)) {
                // skip empty vectors
            } else if (!inDoubleQuotes && !inSingleQuotes) {
                if (token === ']') {
                    indentLevel -= 1;
                }

                if (token === '[') {
                    indentLevel += 1;
                }

                descriptionMap.push({ token, index: index + 1, indentLevel });
            }
        }
    }

    for (let i = descriptionMap.length - 1; i >= 0; i -= 1) {
        const { indentLevel, index, token } = descriptionMap[i];
        const indentationString = buildIndentationString(indentationCharacter, indentLevel, indentationIncrement);
        const indexToUse = token === ']' ? index - 1 : index;

        const start = result.substring(0, indexToUse).trimEnd();
        const end = result.substring(indexToUse).trimStart();

        result = `${start}\n${indentationString}${end}`;
    }


    return result;
}
