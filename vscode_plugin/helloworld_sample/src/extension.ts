// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fetch from 'node-fetch';

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

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | null> = new vscode.EventEmitter<TreeItem | null>();
	readonly onDidChangeTreeData: vscode.Event<TreeItem | null> = this._onDidChangeTreeData.event;

	data: TreeItem[];

	constructor() {
		this.data = [];
		const disposable = vscode.commands.registerCommand('extension.helloWorld2', () => {
			this.refresh();
		});
	}


	getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
		if (element === undefined) {
			return this.data;
		}
		return element.children;
	}

    transferCallGraph2TreeJson(callGraph: any, callerFlag:boolean) {   
        let id = 0;
        let parentNode:any = null;             
        function insertNodeIntoTree(node: any, newNode: any) {
            //console.log(node.method_full);
            newNode.data = {};
            newNode.data.fullMethod = node.method_full;
            newNode.label = node.method_full;
			newNode.collapsibleState = vscode.TreeItemCollapsibleState.None;
            if (node.hasOwnProperty('lineNum')) {
                newNode.data.lineNum = node.lineNum;
            }
            if (callerFlag && parentNode != null) {
                newNode.data.callerMethod = parentNode.method_full;
            }
            id++;
            newNode.key = id;

            if (node.children != null) {
                if (callerFlag) {
                    parentNode = node;
                }                
                newNode.children = new Array(node.children.length);
				newNode.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
                for (let i = 0; i < node.children.length; i++) {
                    newNode.children[i] = new TreeItem('');
                    insertNodeIntoTree(node.children[i], newNode.children[i]);
                }
            }
        }

        var newNode = new TreeItem('');
        insertNodeIntoTree(callGraph, newNode)
		this.data = [newNode];
        //console.log(callGraph);
        //console.log(JSON.stringify(newNode, null, '\t'));
        //return [newNode];
    }	

	refresh() {
		let data = `{
			"method_hash": "Z4lMSWOI60SP_uKDAewipg#031",
			"method_full": "test.call_graph.method_call.TestMCCaller:test1a()",
			"children": [
				{
					"method_hash": "bcB3E0Ite2EG8fsL_A-eTQ#02e",
					"method_full": "test.call_graph.method_call.TestMCCaller:str()",
					"lineNum": 20
				},
				{
					"method_hash": "SP_MOiuKbyMirmBMygzpGw#040",
					"method_full": "test.call_graph.method_call.TestMCCallee:test1(java.lang.String)",
					"lineNum": 21
				}
			]
		}`

		this.transferCallGraph2TreeJson(JSON.parse(data), true);
		this._onDidChangeTreeData.fire(null);
	}
}

class TreeItem extends vscode.TreeItem {
	children: TreeItem[] | undefined;
	data: any;

	constructor(label: string, children?: TreeItem[]) {
		super(
			label,
			children === undefined ? vscode.TreeItemCollapsibleState.None :
				vscode.TreeItemCollapsibleState.Expanded);
		//this.children = children;
	}

	contextValue = 'mytreeitem';
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

		fetch('http://127.0.0.1:8080/projects').then(res => res.json()).then(
			json => {
				vscode.window.showInformationMessage(JSON.stringify(json))
			}
		);

		var pos1 = new vscode.Position(9, 4);
		var openPath = vscode.Uri.file('C:\\temp\\bad-eval.sarif');
		vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc).then(editor => {
				// Line added - by having a selection at the same position twice, the cursor jumps there
				editor.selections = [new vscode.Selection(pos1, pos1)];

				// And the visible range jumps there too
				var range = new vscode.Range(pos1, pos1);
				editor.revealRange(range);
			});
		});

	});

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("external-callee", new StorySidebarProvider()));

	context.subscriptions.push(disposable);
	vscode.window.registerTreeDataProvider('external-callee2', new TreeDataProvider());
}
