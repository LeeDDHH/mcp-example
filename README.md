# MCP Example

Model Context Protocol (MCP) のサンプルプロジェクトです。

## チュートリアルについて

このプロジェクトは、以下の記事を参考に作成されたチュートリアルプロジェクトです：

- [簡易な自作 MCP サーバーをお試しで実装する方法](https://zenn.dev/smartround_dev/articles/02af1058e9f80f)

## プロジェクトの目的

このプロジェクトは、Cursor IDE の MCP 機能を使用して、AI アシスタントと連携するツールを開発するためのサンプルとして作成されました。MCP を使用することで、AI アシスタントが直接ツールを呼び出し、その結果をユーザーに提供することができます。

## MCP について

Model Context Protocol (MCP) は、AI アシスタントとツール間の通信を標準化するプロトコルです。これにより、AI アシスタントは以下のようなことが可能になります：

- ツールの呼び出し
- ツールからの結果の取得
- ツールの状態管理
- エラーハンドリング

## 概要

このプロジェクトは、MCP を使用したシンプルなツールの実装例を示しています。以下の機能を提供します：

- 数値を 2 倍にする機能
- テスト用の文字列データを取得する機能
- 環境変数からデータを取得する機能

## 必要条件

- Node.js
- TypeScript
- Cursor IDE

## 実行環境

このプロジェクトは以下の環境で動作確認を行っています：

- OS: macOS 23.2.0 (darwin)
- Node.js: v20.11.1
- npm: 10.2.4
- Cursor IDE: 最新バージョン

## インストール

```bash
npm install
```

## ビルド

```bash
npm run build
```

## 使用方法

### 通常の実行方法

ビルド後、以下のコマンドで実行できます：

```bash
./build/index.js
```

### Cursor での MCP 機能の使用方法

#### 方法 1: Cursor Settings での登録（推奨）

1. プロジェクトをビルドします：

   ```bash
   npm run build
   ```

2. Cursor IDE を開き、Settings（設定）を開きます

3. "MCP Servers"セクションで以下のように設定を追加します：

   - Command: `node`
   - Arguments: `["/path/to/your/project/root/build/index.js"]`
   - Environment Variables: `FOO=BAR`

   または、JSON で直接設定する場合は、以下のような形式で追加します：

   ```json
   {
     "mcpServers": [
       {
         "command": "node",
         "args": ["/path/to/your/project/root/build/index.js"],
         "env": {
           "FOO": "BAR"
         }
       }
     ]
   }
   ```

4. 設定を保存すると、Cursor の AI アシスタントで自動的に MCP サーバーが利用可能になります

#### 方法 2: 手動での起動

1. プロジェクトをビルドします：

   ```bash
   npm run build
   ```

2. Cursor IDE でプロジェクトを開きます

3. プロジェクトのルートディレクトリで以下のコマンドを実行して、MCP サーバーを起動します：

   ```bash
   ./build/index.js
   ```

4. Cursor の AI アシスタントで以下のようなコマンドを実行できます：
   - 数値を 2 倍にする：
     ```
     double_numberを使って70012の結果を教えて下さい
     ```
   - テストテキストを取得する：
     ```
     get_test_textを実行してください
     ```
   - 環境変数からデータを取得する：
     ```
     get_test_with_envを実行してください
     ```

## 利用可能なツール

1. `double_number`

   - 説明：与えられた数値を 2 倍にします
   - パラメータ：`num`（数値）

2. `get_test_text`

   - 説明：テスト用の文字列データを取得します
   - パラメータ：なし
   - 注意事項：
     - このツールを使用する前に、テストサーバーを起動する必要があります
     - テストサーバーの起動方法：
       ```bash
       npx http-server dummy -p 3000
       ```

3. `get_test_with_env`
   - 説明：環境変数からデータを取得します
   - パラメータ：なし
   - 注意事項：
     - このツールを使用する前に、環境変数を設定する必要があります
     - 環境変数の設定方法：
       ```bash
       export FOO=BAR
       ```

## プロジェクト構造

```
mcp-example/
├── build/          # ビルドされたJavaScriptファイル
├── dummy/          # テスト用のダミーデータ
├── src/            # ソースコード
│   └── index.ts    # メインの実装ファイル
├── package.json    # プロジェクト設定
└── tsconfig.json   # TypeScript設定
```

## 開発者向け情報

### 新しいツールの追加方法

1. `src/index.ts`を開き、以下のような形式で新しいツールを追加します：

```typescript
server.tool(
  "tool_name",
  "ツールの説明",
  {
    // パラメータの定義
    param1: z.string().describe("パラメータ1の説明"),
    param2: z.number().describe("パラメータ2の説明"),
  },
  async ({ param1, param2 }) => ({
    content: [
      {
        type: "text",
        text: "結果のテキスト",
      },
    ],
  })
);
```

2. プロジェクトをビルドします：

```bash
npm run build
```

3. MCP サーバーを再起動します

### カスタマイズのヒント

- ツールのパラメータは`zod`を使用して定義します
- ツールの戻り値は`content`配列で指定します
- 環境変数は`env`オブジェクトで設定できます
- エラーハンドリングは`try-catch`ブロックで実装します

## トラブルシューティング

### MCP サーバーが起動しない場合

1. プロジェクトが正しくビルドされているか確認：

   ```bash
   npm run build
   ```

2. 実行権限が付与されているか確認：

   ```bash
   chmod +x build/index.js
   ```

3. 必要な依存関係がインストールされているか確認：
   ```bash
   npm install
   ```

### テストサーバーに接続できない場合

1. ポート 3000 が使用可能か確認：

   ```bash
   lsof -i :3000
   ```

2. 別のポートで試す：
   ```bash
   npx http-server dummy -p 3001
   ```

### 環境変数が取得できない場合

1. Cursor Settings で環境変数を設定します：

   - "MCP Servers"セクションで以下のように設定を追加します：
     - Command: `node`
     - Arguments: `["/path/to/your/project/root/build/index.js"]`
     - Environment Variables: `FOO=BAR`

   または、JSON で直接設定する場合は、以下のような形式で追加します：

   ```json
   {
     "mcpServers": [
       {
         "command": "node",
         "args": ["/path/to/your/project/root/build/index.js"],
         "env": {
           "FOO": "BAR"
         }
       }
     ]
   }
   ```

2. 設定を保存後、MCP サーバーを再起動します

## 依存関係

- @modelcontextprotocol/sdk: ^1.9.0
- zod: ^3.24.2

## 開発環境

- TypeScript: ^5.8.3
- @types/node: ^22.14.1

## ライセンス

ISC
