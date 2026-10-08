🇯🇵 日本語
WORKFLOW HUB

チームの業務を効率的に管理・共有するための 業務管理Webアプリケーション

📌 プロジェクト概要

WORKFLOW HUBは、チームや組織内で発生する業務を体系的に管理し、メンバー間で進捗状況を共有するために開発するWebアプリケーションです。

業務の登録、担当者の設定、進捗状況の管理、業務内容の確認などを一つのサービスで管理できることを目標としています。

実際の企業での利用を想定し、ユーザー認証、権限管理、REST API、データベース設計、CRUD機能を中心に開発します。

🎯 開発目的
実際の業務環境を想定した業務管理システムの開発
React / Spring Bootを利用したFull-Stack開発
REST APIの設計・実装
PostgreSQLを利用したデータ管理
JWTによるユーザー認証・権限管理
Git / GitHubを利用した開発管理
保守性を考慮したプロジェクト構成
🛠 使用技術
Frontend
React
TypeScript
React Router
Axios
HTML5
CSS3
Backend
Java
Spring Boot
Spring Security
JWT
MyBatis
Maven
Database
PostgreSQL
Development
Git
GitHub
Visual Studio Code
Eclipse
✨ 主な機能
👤 ユーザー管理
会員登録
ログイン / ログアウト
JWTによる認証
ユーザー権限管理
ユーザー情報の管理
📋 業務管理
業務登録
業務一覧
業務詳細
業務編集
業務削除
担当者設定
業務ステータス変更
🔄 業務ステータス
TODO
  ↓
IN_PROGRESS
  ↓
DONE
📊 ダッシュボード
全業務数
進行中の業務
完了した業務
ユーザー別業務状況
📢 掲示板
お知らせ一覧
お知らせ登録
お知らせ編集
お知らせ削除
コメント機能
🏗 システム構成
React / TypeScript
        │
        │ REST API
        ▼
Spring Boot
Spring Security
JWT
MyBatis
        │
        │ SQL
        ▼
PostgreSQL
🔐 認証・権限管理

JWT（JSON Web Token）を利用してユーザー認証を行います。

ログイン
  ↓
ID / Password認証
  ↓
JWT発行
  ↓
Frontendで管理
  ↓
API Request
  ↓
Authorization Header
  ↓
Backend認証
  ↓
API処理

ユーザー権限によって利用できる機能を分けます。

USER
 ├── 業務確認
 ├── 自分の業務管理
 └── 掲示板利用

ADMIN
 ├── ユーザー管理
 ├── 全業務管理
 ├── 掲示板管理
 └── システム管理
🗄 データベース

PostgreSQLを使用してデータを管理します。

主要テーブル:

users
tasks
task_comments
notices
refresh_tokens

開発の進行に合わせて、必要なテーブルを追加・変更します。

📡 API

FrontendとBackendはREST APIを使用して通信します。

POST   /api/auth/login
POST   /api/auth/signup

GET    /api/tasks
GET    /api/tasks/{id}
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}

GET    /api/users
GET    /api/notices
POST   /api/notices
PUT    /api/notices/{id}
DELETE /api/notices/{id}


---------------------------- 韓国語 ----------------------------------

WORKFLOW HUB

팀의 업무를 효율적으로 관리하고 공유하기 위한 업무 관리 웹 애플리케이션

📌 프로젝트 소개

WORKFLOW HUB는 팀 또는 조직에서 발생하는 업무를 체계적으로 관리하고 구성원 간의 업무 진행 상황을 공유하기 위해 제작하는 웹 애플리케이션입니다.

업무 등록부터 진행 상태 관리, 담당자 지정, 업무 내용 확인까지 하나의 서비스에서 관리할 수 있도록 구현하는 것을 목표로 합니다.

또한 실제 기업의 업무 환경을 고려하여 사용자 인증, 권한 관리, REST API, 데이터베이스 설계 및 CRUD 기능​을 중심으로 개발합니다.

🎯 프로젝트 목표
실제 업무 환경을 고려한 업무 관리 시스템 구현
React와 Spring Boot를 활용한 Full-Stack 개발 경험
REST API 설계 및 구현
PostgreSQL을 활용한 데이터 관리
JWT 기반 사용자 인증 및 권한 관리
Git / GitHub를 활용한 프로젝트 관리
유지보수하기 쉬운 프로젝트 구조 설계
🛠 기술 스택
Frontend
React
TypeScript
React Router
Axios
HTML5
CSS3
Backend
Java
Spring Boot
Spring Security
JWT
MyBatis
Maven
Database
PostgreSQL
Development
Git
GitHub
Visual Studio Code
Eclipse
✨ 주요 기능
👤 사용자 관리
회원가입
로그인 / 로그아웃
JWT 기반 인증
사용자 권한 관리
사용자 정보 조회 및 수정
📋 업무 관리
업무 등록
업무 조회
업무 수정
업무 삭제
담당자 지정
업무 상태 변경
🔄 업무 상태 관리

업무 진행 상황을 다음과 같이 관리합니다.

TODO
  ↓
IN_PROGRESS
  ↓
DONE
📊 대시보드
전체 업무 수 확인
진행 중인 업무 확인
완료된 업무 확인
사용자별 업무 현황 확인
📢 게시판
공지사항 조회
게시글 작성
게시글 수정
게시글 삭제
댓글 기능
🏗 시스템 구조
┌──────────────────────┐
│      React           │
│   TypeScript         │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│    Spring Boot       │
│  Spring Security     │
│       JWT            │
│      MyBatis         │
└──────────┬───────────┘
           │
           │ SQL
           ▼
┌──────────────────────┐
│     PostgreSQL       │
└──────────────────────┘
📁 프로젝트 구조
WORKFLOW-HUB
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   ├── hooks
│   │   └── utils
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   └── resources
│   │   └── test
│   └── pom.xml
│
├── database
│   └── schema.sql
│
├── docs
│   ├── ERD
│   ├── API
│   └── design
│
└── README.md
🔐 인증 및 권한

사용자 인증에는 JWT(JSON Web Token)​를 사용합니다.

로그인
  ↓
ID / Password 검증
  ↓
JWT 발급
  ↓
Frontend 저장
  ↓
API 요청
  ↓
Authorization Header
  ↓
Backend 인증
  ↓
API 처리

사용자의 권한에 따라 접근할 수 있는 기능을 구분할 예정입니다.

USER
 ├── 업무 조회
 ├── 자신의 업무 관리
 └── 게시판 이용

ADMIN
 ├── 사용자 관리
 ├── 전체 업무 관리
 ├── 게시판 관리
 └── 시스템 관리
🗄 데이터베이스

주요 데이터는 PostgreSQL을 사용하여 관리합니다.

예정된 주요 테이블:

users
 └── 사용자 정보

tasks
 └── 업무 정보

task_comments
 └── 업무 댓글

notices
 └── 공지사항

refresh_tokens
 └── 인증 정보

※ 프로젝트 개발 과정에서 실제 요구사항에 맞춰 테이블을 추가 및 수정합니다.

📡 API

REST API 방식으로 Frontend와 Backend를 연결합니다.

예시:

POST   /api/auth/login
POST   /api/auth/signup

GET    /api/tasks
GET    /api/tasks/{id}
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}

GET    /api/users
GET    /api/notices
POST   /api/notices
PUT    /api/notices/{id}
DELETE /api/notices/{id}
🖥 화면 구성

현재 개발 중인 프로젝트로, 기능 구현에 따라 화면을 추가할 예정입니다.

로그인
┌─────────────────────────┐
│      WORKFLOW HUB       │
│                         │
│  ID                     │
│  [________________]     │
│                         │
│  Password               │
│  [________________]     │
│                         │
│       [ Login ]         │
│                         │
│       Sign Up           │
└─────────────────────────┘
Dashboard
┌─────────────────────────────────────┐
│ WORKFLOW HUB                        │
├─────────────────────────────────────┤
│                                     │
│  전체 업무     진행 중     완료      │
│     20           8          12      │
│                                     │
├─────────────────────────────────────┤
│ 최근 업무                           │
│                                     │
│ □ 업무 A       IN_PROGRESS          │
│ □ 업무 B       TODO                 │
│ □ 업무 C       DONE                 │
│                                     │
└─────────────────────────────────────┘