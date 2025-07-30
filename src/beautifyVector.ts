import * as vscode from 'vscode';
import parse from './parser';

export default class BeautifyVector {
    static async beautify() {
        const textEditor = vscode.window.activeTextEditor;
        if (textEditor) {
            const text = textEditor.document.getText();
            const parsedText = parse(text);

            const success = await textEditor.edit((editBuilder: vscode.TextEditorEdit): void => {
                const lastLineIndex = textEditor.document.lineCount - 1;
                const lastCharacterIndex = textEditor.document.lineAt(lastLineIndex).text.length;

                console.log({ lastLineIndex, lastCharacterIndex });

                const start = new vscode.Position(0, 0);
                const end = new vscode.Position(lastLineIndex, lastCharacterIndex);
                const allTextRange = new vscode.Range(start, end);

                editBuilder.delete(allTextRange);
                editBuilder.insert(start, parsedText);
            }).then((fullfilled) => {
                console.log(fullfilled);
            }, (fail) => {
                console.log(fail);
            });
        }
    }
}