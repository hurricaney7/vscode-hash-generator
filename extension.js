// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * Randomly generate a random hash string
 * @param {*} length Length of this random string
 */
function generateRandomHashString(length) {
	let str = "1234567890abcdefghijklmnopqrstuvwxyz";
	let result = '';
	for (var i = 0; i < length + 1; i++) {
		var index = Math.ceil(Math.random() * 36);
		result = result + str.charAt(index);
	}
	return result;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Register genterate hash value command
	let generator = vscode.commands.registerCommand('extension.genhash', () => {
		let activeTextEditor = vscode.window.activeTextEditor;
		let edits = [
			vscode.TextEdit.insert(activeTextEditor.selection.active, generateRandomHashString(8))
		];
		// Insert the text
		let uri = activeTextEditor.document.uri;
		let edit = new vscode.WorkspaceEdit();
		edit.set(uri, edits);
		vscode.workspace.applyEdit(edit);

		return true;
	});
	context.subscriptions.push(generator);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
