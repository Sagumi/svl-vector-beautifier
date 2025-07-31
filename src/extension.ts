// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import BeautifyVector from './beautifyVector';
import { IndentationType } from './parser';

type TIndentationCharacter = IndentationType | undefined;
type TIndentationIncrement = number | undefined;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('svl-vector-beautifier.beautify', () => {
		const config = vscode.workspace.getConfiguration('svlVectorBeautifier');
		const indentationCharacter: TIndentationCharacter = config.get('indentationCharacter');
		const indentationIncrement: TIndentationIncrement = config.get('indentationIncrement');

		BeautifyVector.beautify(indentationIncrement, indentationCharacter);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
