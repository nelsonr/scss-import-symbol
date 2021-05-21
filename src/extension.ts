'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(
        { language: "scss" }, new SCSSImportDocumentSymbolProvider()
    ));
}

class SCSSImportDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    public provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): Thenable<vscode.DocumentSymbol[]> {
        return new Promise((resolve) => {
            let symbols: vscode.DocumentSymbol[] = [];

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);

                if (line.text.startsWith('@import')) {
                    let symbol = new vscode.DocumentSymbol(
                        line.text,
                        '',
                        vscode.SymbolKind.File,
                        line.range,
                        line.range
                    );

                    symbols.push(symbol);
                }
            }

            resolve(symbols);
        });
    }
}