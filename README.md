# Spring Boot TODO Manager
 
 Java 21 + Spring Boot + React + TypeScript + MySQL で構築した学習用Todoアプリケーションです。
 
 ## 概要
 
 このプロジェクトは、バックエンドをSpring BootのREST API、フロントエンドをReactで構成したCRUDアプリです。
 現在はTodoの作成・一覧表示・更新・削除を実装済みで、Entity / DTO / REST API / React state の流れを学ぶための教材として拡張を続けています。
 
 ## 技術スタック
 
 - **バックエンド**: Java 21, Spring Boot 3.x
 - **フロントエンド**: React, TypeScript, Vite
 - **ビルドツール**: Maven
 - **データベース**: MySQL 8.x
 - **ORM**: Spring Data JPA
 - **監査機能**: Spring Data JPA Auditing
 - **開発補助**: TablePlus
 
 ## 現在の機能
 
 - **Todo作成**
 - **Todo一覧表示**
 - **Todo詳細取得**
 - **Todo更新**
 - **Todo削除**
 - **ステータス管理**
   - `PENDING`
   - `IN_PROGRESS`
   - `ON_HOLD`
   - `COMPLETED`
 - **優先度管理**
   - `HIGH`
   - `MEDIUM`
   - `LOW`
 - **期日管理**
 - **作成日時 / 更新日時の自動管理**
 
 ## ディレクトリ構成
 
 ```text
 springboot-todo-manager/
 ├── backend/
 │   └── src/main/java/com/example/todomanager/
 │       ├── controller/
 │       ├── dto/
 │       ├── entity/
 │       ├── enums/
 │       ├── repository/
 │       └── service/
 ├── frontend/
 │   └── src/
 │       ├── components/
 │       ├── services/
 │       └── types/
 └── README.md
 ```
 
 ## アーキテクチャの考え方
 
 ### バックエンド
 
 - `Entity`
   - DBとやり取りするためのデータ構造
 - `Repository`
   - DBアクセスを担当
 - `Service`
   - 業務ロジックを担当
 - `Controller`
   - HTTPリクエストを受け取り、レスポンスを返す
 - `DTO`
   - 画面表示用・API返却用のデータ構造
 
 ### フロントエンド
 
 - `App.tsx`
   - Todo一覧状態の保持と全体の接続役
 - `TodoForm.tsx`
   - Todo作成フォーム
 - `TodoList.tsx`
   - Todo一覧表示と編集・削除操作
 - `todoApi.ts`
   - バックエンドAPIとの通信処理
 - `todoDisplayDto.ts`
   - フロント側の型定義
 
 ## データの流れ
 
 1. ユーザーがReact画面で入力
 2. フロントエンドがAPIへHTTPリクエスト送信
 3. Controllerがリクエストを受け取る
 4. Serviceが業務ロジックを実行する
 5. RepositoryがDBに保存・取得する
 6. EntityをDTOに変換してレスポンスとして返す
 7. ReactがDTOを受け取り、画面を更新する
 
 ## 起動方法
 
 ### 事前準備
 
 1. MySQLを起動する
 2. `todo_app` データベースを用意する
 3. バックエンドのDB接続設定を確認する
 
 ### バックエンド起動
 
 ```bash
 ./mvnw spring-boot:run
 ```
 
 または
 
 ```bash
 mvn spring-boot:run
 ```
 
 デフォルト起動先:
 
 - `http://localhost:8080`
 
 ### フロントエンド起動
 
 ```bash
 npm install
 npm run dev
 ```
 
 デフォルト起動先:
 
 - `http://localhost:5173`
 
 ## APIエンドポイント
 
 - `GET /api/todos`
   - Todo一覧取得
 - `GET /api/todos/{id}`
   - Todo詳細取得
 - `POST /api/todos`
   - Todo作成
 - `PUT /api/todos/{id}`
   - Todo更新
 - `DELETE /api/todos/{id}`
   - Todo削除
 
 ## 学習ポイント
 
 このプロジェクトでは次の理解を深めることを目的にしています。
 
 - **SQLの基礎**
   - 読み取りと書き込み
   - 今後は検索・絞り込み・集計も追加予定
 - **Spring Bootの基礎**
   - 引数の受け取り方
   - Controller / Service / Repository の責務分離
   - EntityとDTOの違い
 - **React / TypeScriptの基礎**
   - state管理
   - propsでのデータ受け渡し
   - API通信と再レンダリング
 - **REST APIの理解**
   - `GET`, `POST`, `PUT`, `DELETE`
   - リクエストとレスポンスの流れ
 
 ## 今後の拡張ロードマップ
 
 ### 段階1
 
 - 検索
 - 絞り込み
 - ソート
 
 ### 段階2
 
 - カテゴリ
 - タグ
 - 集計表示
 
 ### 段階3
 
 - 一覧画面 / 詳細画面 / 編集画面の分離
 - カスタムフック導入
 - Contextなどの構成強化
 
 ### 段階4
 
 - バリデーション強化
 - 例外処理強化
 
 ### 段階5
 
 - ユーザー認証
 - ユーザーごとのTodo管理
 
 ## 現在の学習テーマ
 
 次の拡張では、まず **検索・絞り込み・ソート** を実装し、以下を重点的に学ぶ予定です。
 
 - SQLの `WHERE` / `LIKE` / `ORDER BY`
 - Spring Bootでの検索条件の受け取り方
 - Reactでの検索フォームと一覧更新の設計