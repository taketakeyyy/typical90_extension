# これは開発者用のドキュメントです

# Project Files

* `typical90_extension/`
  - プロジェクトフォルダ
* `typical90_extension/dst/`
  - Chrome拡張で公開するフォルダ
* `typical90_extension/src/`
  - ソースファイルフォルダ

# Development Environment Installation
## node.js
10.16.0 LTS

* Download for Windows: https://nodejs.org/ja/

## Install Development Environment

`typical90_extension/`フォルダへ移動し、以下を実行してください。

```
> npm ci
```

`node_modules` がローカルに作成されたら成功です。

以下のコマンドでTypeScriptファイルをビルドします。

```
# 開発用ビルド
> npm run build-dev

# 製品版ビルド
> npm run build
```

## How to develop
 `content_scripts.ts` にプログラムのエントリポイントがあります。

ビルドされたすべての ts ファイルは js にトランスパイルされ、`typical90_extension/dst/bin`に出力されます。

# Publish (and Update)

最終的に公開するファイルは `typical90_extension/dst/` 以下のすべてのファイルになります。

`dst`フォルダをzip化し、Chrome Web Storeに公開します。

更新する際は、`manifest.json` の `version` を忘れずに上げてください。