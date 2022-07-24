// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class StorySidebarProvider implements vscode.WebviewViewProvider {
	private _view?: vscode.WebviewView;

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;
		webviewView.webview.html = '<html><body>你好，我是Webview</body></html>';
	}	
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');

		var pos1 = new vscode.Position(9,4);
		var openPath = vscode.Uri.file('C:\\temp\\bad-eval.sarif');
		vscode.workspace.openTextDocument(openPath).then(doc => 
		{
			vscode.window.showTextDocument(doc).then(editor => 
			{
				// Line added - by having a selection at the same position twice, the cursor jumps there
				editor.selections = [new vscode.Selection(pos1,pos1)]; 
		
				// And the visible range jumps there too
				var range = new vscode.Range(pos1, pos1);
				editor.revealRange(range);
			});
		});

	});

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("external-callee", new StorySidebarProvider()));

	context.subscriptions.push(disposable);
}
