import * as vscode from 'vscode';
import parse, { IndentationType } from './parser';

export default class BeautifyVector {
    static async beautify(indentationIncrement?: number, indentationCharacter?: IndentationType): Promise<void> {
        const textEditor = vscode.window.activeTextEditor;

        if (textEditor) {
            const text = textEditor.document.getText();
            const parsedText = parse(text, indentationIncrement, indentationCharacter);

            await textEditor
                .edit((editBuilder) => this.editTextEditorContent(editBuilder, textEditor, parsedText))
                .then(this.handleSuccess, this.handleFailure);
        }
    }

    private static handleSuccess(fullfilled: boolean): void {
        if (fullfilled) {
            // do nothing
        } else {
            // do nothing either
        }
    }

    private static handleFailure(fail: any): void {
        console.log('Failed');
        console.log(fail);
    }

    private static editTextEditorContent(editBuilder: vscode.TextEditorEdit, textEditor: vscode.TextEditor, parsedText: string): void {
        const lastLineIndex = textEditor.document.lineCount - 1;
        const lastCharacterIndex = textEditor.document.lineAt(lastLineIndex).text.length;

        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(lastLineIndex, lastCharacterIndex);
        const allTextRange = new vscode.Range(start, end);

        editBuilder.delete(allTextRange);
        editBuilder.insert(start, parsedText);
    }
}