import { type Client, type ClientMeta, type Options as Options2, type RequestResult, type TDataShape } from './client';
import type { CheckSsoEnforcementData, CheckSsoEnforcementErrors, CheckSsoEnforcementResponses, CreateAdminPortalSessionData, CreateAdminPortalSessionErrors, CreateAdminPortalSessionResponses, CreateClientData, CreateClientErrors, CreateClientResponses, CreateMyAdminPortalSessionData, CreateMyAdminPortalSessionErrors, CreateMyAdminPortalSessionResponses, CreateOrganizationData, CreateOrganizationErrors, CreateOrganizationInvitationData, CreateOrganizationInvitationErrors, CreateOrganizationInvitationResponses, CreateOrganizationResponses, DeleteClientData, DeleteClientErrors, DeleteClientResponses, EndSessionData, EndSessionErrors, EndSessionPostData, EndSessionPostErrors, EndSessionPostResponses, EndSessionResponses, GetClientData, GetClientErrors, GetClientResponses, GetHealthStatusData, GetHealthStatusErrors, GetHealthStatusResponses, GetJwksData, GetJwksErrors, GetJwksResponses, GetMemberMeData, GetMemberMeErrors, GetMemberMeResponses, GetMyOrganizationData, GetMyOrganizationErrors, GetMyOrganizationResponses, GetOpenIdConfigurationData, GetOpenIdConfigurationErrors, GetOpenIdConfigurationResponses, GetOrganizationData, GetOrganizationErrors, GetOrganizationResponses, GetServiceInfoData, GetServiceInfoErrors, GetServiceInfoResponses, GetUserinfoData, GetUserinfoErrors, GetUserinfoResponses, HandleIdpCallbackData, HandleIdpCallbackErrors, InitiateAuthorizationData, InitiateAuthorizationErrors, IntrospectTokenData, IntrospectTokenErrors, IntrospectTokenResponses, IssueTokensData, IssueTokensErrors, IssueTokensResponses, ListClientsData, ListClientsErrors, ListClientsResponses, ListMembersData, ListMembersErrors, ListMembersResponses, ListOrganizationInvitationsData, ListOrganizationInvitationsErrors, ListOrganizationInvitationsResponses, ListOrganizationMembersData, ListOrganizationMembersErrors, ListOrganizationMembersResponses, ListOrganizationsData, ListOrganizationsErrors, ListOrganizationsResponses, LookupPendingAuthenticationData, LookupPendingAuthenticationErrors, LookupPendingAuthenticationResponses, PostUserinfoData, PostUserinfoErrors, PostUserinfoResponses, RemoveMemberData, RemoveMemberErrors, RemoveMemberResponses, RemoveOrganizationMemberData, RemoveOrganizationMemberErrors, RemoveOrganizationMemberResponses, RevokeOrganizationInvitationData, RevokeOrganizationInvitationErrors, RevokeOrganizationInvitationResponses, RevokeTokenData, RevokeTokenErrors, RevokeTokenResponses, SendInvitationData, SendInvitationErrors, SendInvitationResponses, UpdateClientData, UpdateClientErrors, UpdateClientResponses, UpdateMemberRoleData, UpdateMemberRoleErrors, UpdateMemberRoleResponses, UpdateMyOrganizationData, UpdateMyOrganizationErrors, UpdateMyOrganizationResponses, UpdateOrganizationData, UpdateOrganizationErrors, UpdateOrganizationMemberRoleData, UpdateOrganizationMemberRoleErrors, UpdateOrganizationMemberRoleResponses, UpdateOrganizationResponses } from './types.gen';
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown> = Options2<TData, ThrowOnError, TResponse> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: keyof ClientMeta extends never ? Record<string, unknown> : ClientMeta;
};
/**
 * サービス情報
 *
 * サービス名と OpenID Connect Discovery エンドポイントへのリンクを返します。
 */
export declare const getServiceInfo: <ThrowOnError extends boolean = false>(options?: Options<GetServiceInfoData, ThrowOnError>) => RequestResult<GetServiceInfoResponses, GetServiceInfoErrors, ThrowOnError>;
/**
 * OpenID Connect Discovery
 *
 * OpenID Connect Discovery 1.0 に準拠したプロバイダーメタデータを返します。
 *
 * クライアントはこのエンドポイントを使用して、認可サーバーのエンドポイント URL、
 * サポートする機能、公開鍵の場所などを自動的に検出できます。
 *
 * **レスポンスのキャッシュ**:
 * このエンドポイントのレスポンスは変更頻度が低いため、
 * 適切な期間キャッシュすることを推奨します。
 */
export declare const getOpenIdConfiguration: <ThrowOnError extends boolean = false>(options?: Options<GetOpenIdConfigurationData, ThrowOnError>) => RequestResult<GetOpenIdConfigurationResponses, GetOpenIdConfigurationErrors, ThrowOnError>;
/**
 * ヘルスチェック
 *
 * サービスの稼働状況を確認するためのヘルスチェックエンドポイントです。
 */
export declare const getHealthStatus: <ThrowOnError extends boolean = false>(options?: Options<GetHealthStatusData, ThrowOnError>) => RequestResult<GetHealthStatusResponses, GetHealthStatusErrors, ThrowOnError>;
/**
 * JSON Web Key Set の取得
 *
 * JSON Web Key Set (JWKS) を返します (RFC 7517)。
 *
 * クライアントはこのエンドポイントから公開鍵を取得し、
 * ID トークンの署名を検証します。
 *
 * **キャッシュについて**:
 * - レスポンスには Cache-Control ヘッダーが含まれます
 * - クライアントは指定された期間キャッシュすることを推奨します
 * - 鍵のローテーション時は新しい鍵が追加されます
 */
export declare const getJwks: <ThrowOnError extends boolean = false>(options?: Options<GetJwksData, ThrowOnError>) => RequestResult<GetJwksResponses, GetJwksErrors, ThrowOnError>;
/**
 * 認可フローの開始
 *
 * OAuth 2.0 Authorization Code フロー (RFC 6749) + PKCE (RFC 7636) を開始します。
 *
 * ユーザーをWorkOS Hosted AuthUIにリダイレクトし、認証・認可を行います。
 */
export declare const initiateAuthorization: <ThrowOnError extends boolean = false>(options: Options<InitiateAuthorizationData, ThrowOnError>) => RequestResult<unknown, InitiateAuthorizationErrors, ThrowOnError>;
/**
 * IdP コールバック処理
 *
 * IdP (WorkOS) からの認証コールバックを処理します。
 *
 * このエンドポイントは IdP が認証完了後にユーザーをリダイレクトする先です。
 * 認証成功時は認可コードを発行し、クライアントの redirect_uri へリダイレクトします。
 * 認証失敗時は IdP から受け取ったエラー情報をクライアントへ転送します。
 *
 * SSO を強制している組織のユーザーが非SSO（例: Google ログイン）で認証した場合は、
 * 認可コードを発行せず、upstream (WorkOS) セッションを終了したうえで組織の SSO 接続へ
 * 再ログインさせるリダイレクトを返します。この場合 Location はクライアントの redirect_uri
 * ではなく IdP (WorkOS) を指します。
 *
 * **処理フロー**:
 * 1. IdP から `code` と `state` を受け取る
 * 2. `state` を検証し、対応する認可リクエストを特定
 * 3. IdP の認可コードを検証
 * 4. SSO 強制組織で非SSO認証だった場合: upstream セッションを終了し、SSO 再ログインへリダイレクト
 * 5. それ以外は独自の認可コードを発行
 * 6. クライアントの redirect_uri へ認可コード付きでリダイレクト
 */
export declare const handleIdpCallback: <ThrowOnError extends boolean = false>(options?: Options<HandleIdpCallbackData, ThrowOnError>) => RequestResult<unknown, HandleIdpCallbackErrors, ThrowOnError>;
/**
 * トークンエンドポイント
 *
 * OAuth 2.0 Authorization Code グラント (RFC 6749 / RFC 7636)、Refresh Token グラント、および
 * Pending Authentication Token グラント (RFC 6749 Section 4.5 の拡張グラント、multi-organization picker 用) を処理し、
 * アクセス・リフレッシュ・ID トークンを返却します。
 *
 * クライアント認証は **必須** です。いずれかひとつの方式のみを使用してください
 * （`client_secret` と `client_assertion` を同時に送ると `400` になります）:
 *
 * - `client_secret_basic` — HTTP `Authorization: Basic` ヘッダー。**生成 SDK のデフォルト**として扱われます (`ClientBasicAuth`)
 * - `client_secret_post` — `Authorization` ヘッダーを送らず、本文に `client_id` / `client_secret` を含めます。SDK 経由で使う場合は Basic 認証設定を無効化してください
 * - `private_key_jwt` (RFC 7521 / RFC 7523) — `Authorization` ヘッダーを送らず、本文に `client_id` / `client_assertion_type` / `client_assertion` を含めます
 *
 * OAS では `ClientBasicAuth` のみを security として宣言しています（`client_secret_post` / `private_key_jwt` は本文経由のため OAS の securityScheme では表現できませんが、サーバー側で受け付けます）。
 */
export declare const issueTokens: <ThrowOnError extends boolean = false>(options: Options<IssueTokensData, ThrowOnError>) => RequestResult<IssueTokensResponses, IssueTokensErrors, ThrowOnError>;
/**
 * ユーザー情報の取得
 *
 * アクセストークンに関連付けられたユーザーの情報を返します (OpenID Connect Core 1.0 Section 5.3)。
 *
 * **認証方式**:
 * - Authorization ヘッダーに Bearer トークンを指定
 *
 * **返却されるクレーム**:
 * 認可リクエスト時に要求されたスコープに応じて、以下のクレームが返却されます:
 * - `openid`: sub (必須)
 * - `profile`: name
 * - `email`: email, email_verified
 */
export declare const getUserinfo: <ThrowOnError extends boolean = false>(options?: Options<GetUserinfoData, ThrowOnError>) => RequestResult<GetUserinfoResponses, GetUserinfoErrors, ThrowOnError>;
/**
 * ユーザー情報の取得 (POST)
 *
 * アクセストークンに関連付けられたユーザーの情報を返します (OpenID Connect Core 1.0 Section 5.3)。
 *
 * **認証方式**:
 * - Authorization ヘッダーに Bearer トークンを指定
 *
 * > **Note**: RFC 6750 Section 2.2 で定義されている Form-Encoded Body Parameter 方式は
 * > セキュリティ上の理由から非推奨（SHOULD NOT）とされているため、サポートしていません。
 *
 * **返却されるクレーム**:
 * 認可リクエスト時に要求されたスコープに応じて、以下のクレームが返却されます:
 * - `openid`: sub (必須)
 * - `profile`: name
 * - `email`: email, email_verified
 *
 * @see https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 * @see https://datatracker.ietf.org/doc/html/rfc6750#section-2.1
 */
export declare const postUserinfo: <ThrowOnError extends boolean = false>(options?: Options<PostUserinfoData, ThrowOnError>) => RequestResult<PostUserinfoResponses, PostUserinfoErrors, ThrowOnError>;
/**
 * トークン無効化エンドポイント
 *
 * RFC 7009 OAuth 2.0 Token Revocation に準拠したトークン無効化エンドポイント。
 *
 * クライアントは、不要になったアクセストークンまたはリフレッシュトークンを
 * このエンドポイントに送信して無効化できます。これにより、トークン漏洩時の
 * リスクを軽減し、ユーザーのログアウト処理を適切に行うことができます。
 *
 * **認証方式**:
 * - HTTP Basic 認証 (`Authorization: Basic`) でクライアント認証が必須
 *
 * **注意事項**:
 * - 既に無効化されたトークンや存在しないトークンを送信してもエラーにはならず、HTTP 200 が返されます
 * - リフレッシュトークンを無効化すると、それに関連するアクセストークンも無効化されます
 */
export declare const revokeToken: <ThrowOnError extends boolean = false>(options: Options<RevokeTokenData, ThrowOnError>) => RequestResult<RevokeTokenResponses, RevokeTokenErrors, ThrowOnError>;
/**
 * トークンイントロスペクションエンドポイント
 *
 * RFC 7662 OAuth 2.0 Token Introspection に準拠したトークン検証エンドポイント。
 *
 * リソースサーバーは、受け取ったアクセストークンの有効性とメタ情報を
 * このエンドポイントに問い合わせることで確認できます。
 *
 * **認証方式**:
 * - **リソースサーバー**: HTTP Basic 認証 (`Authorization: Basic`) でクライアント認証が必須
 * - RFC 6749 Section 2.3.1 に従い、`client_id:client_secret` を Base64 エンコードして送信
 * - トークンスキャン攻撃を防ぐため、認証なしでのアクセスは許可されません
 *
 * **注意事項**:
 * - 無効なトークン（期限切れ、失効済み、存在しない等）の場合、`active: false` が返されます
 * - 認可サーバーは、リソースサーバーに応じて返却するスコープ情報を制限する場合があります
 * - レスポンスをキャッシュする場合、トークンの有効期限（`exp`）を考慮してください
 */
export declare const introspectToken: <ThrowOnError extends boolean = false>(options: Options<IntrospectTokenData, ThrowOnError>) => RequestResult<IntrospectTokenResponses, IntrospectTokenErrors, ThrowOnError>;
/**
 * ログアウトエンドポイント
 *
 * [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0.html) に準拠したログアウトエンドポイント。
 *
 * RP (Relying Party) は、このエンドポイントにユーザーをリダイレクトすることで、
 * OP (OpenID Provider) でのセッションを終了させることができます。
 *
 * **パラメータの組み合わせ**:
 * - `id_token_hint` のみ: ID トークンからユーザーとクライアントを特定
 * - `id_token_hint` + `post_logout_redirect_uri`: ログアウト後に指定 URI へリダイレクト
 * - `client_id` + `post_logout_redirect_uri`: クライアント ID でリダイレクト URI を検証
 *
 * **処理フロー**:
 * 1. `id_token_hint` または `client_id` からクライアントを特定
 * 2. OP でのユーザーセッションを終了
 * 3. `post_logout_redirect_uri` が有効な場合、そこへリダイレクト
 * 4. リダイレクト URI が指定されていない場合、ログアウト完了画面を表示
 *
 * **注意事項**:
 * - `post_logout_redirect_uri` は事前にクライアント登録時に許可リストに登録されている必要があります
 * - 無効なパラメータが渡された場合でもエラーは返さず、セッション終了のみ行います
 */
export declare const endSession: <ThrowOnError extends boolean = false>(options?: Options<EndSessionData, ThrowOnError>) => RequestResult<EndSessionResponses, EndSessionErrors, ThrowOnError>;
/**
 * ログアウトエンドポイント (POST)
 *
 * [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0.html) に準拠したログアウトエンドポイント（POST メソッド）。
 *
 * GET メソッドと同等の機能を提供しますが、パラメータをリクエストボディで送信します。
 * ID トークンが長い場合や、URL の長さ制限を回避する必要がある場合に有用です。
 *
 * 詳細な処理フローについては GET メソッドの説明を参照してください。
 */
export declare const endSessionPost: <ThrowOnError extends boolean = false>(options?: Options<EndSessionPostData, ThrowOnError>) => RequestResult<EndSessionPostResponses, EndSessionPostErrors, ThrowOnError>;
/**
 * 保留中認証トークンの組織候補ルックアップ
 *
 * `pending_authentication_token` を、組織選択 picker UI 表示用のデータに変換する。
 *
 * **このフローは認可サーバ側の organization 選択画面に置き換えられました。**
 * `/oauth/authorize` は `organization_selection_required` を返さなくなり、`pending_authentication_token` を
 * 発行しません。現在この経路で有効なトークンを受け取る方法はありません。エンドポイントとグラントは
 * 後続の PR で deprecated としてマークし、その後削除します。
 *
 * BFF (client) はこのレスポンスから:
 * - マスク済みの email (画面表示用ヒント)
 * - ユーザが active membership を保有する active organization の一覧 (id / name / display_name)
 *
 * を取得し、ユーザに組織を選ばせる。選択後、`POST /oauth/token` の
 * `https://auth.studio.design/oauth/grant-types/pending-authentication-token` グラントで
 * 認証フローを完了する。
 *
 * **認証**: pending_authentication_token の所持自体が認証 (短 TTL + opaque、単回 lookup)。
 * クライアント認証は不要。
 *
 * **なぜ POST か** (credential が URL に出ない設計):
 * - token は credential 相当のため、URL に出すと access log / Referer / browser history /
 * CDN cache / OpenTelemetry trace 等に漏洩する経路が増える
 * - レスポンスヘッダの `no-store` / `no-referrer` だけでは URL ベースの漏洩は防げない
 * - `/oauth/token` と同じく POST + body で credential を受け取る
 *
 * **PII / セキュリティ**:
 * - レスポンスに含まれる email は必ずマスク済み (`***user@example.com` 形式)
 * - `Referrer-Policy: no-referrer` / `Cache-Control: no-store` を必ず付与
 * - token が見つからない / 期限切れ / consumed のいずれの理由でも 404 を返す (列挙攻撃防止)
 */
export declare const lookupPendingAuthentication: <ThrowOnError extends boolean = false>(options: Options<LookupPendingAuthenticationData, ThrowOnError>) => RequestResult<LookupPendingAuthenticationResponses, LookupPendingAuthenticationErrors, ThrowOnError>;
/**
 * クライアント一覧取得
 *
 * 登録済みの OAuth 2.0 クライアント一覧をページネーション付きで取得します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const listClients: <ThrowOnError extends boolean = false>(options?: Options<ListClientsData, ThrowOnError>) => RequestResult<ListClientsResponses, ListClientsErrors, ThrowOnError>;
/**
 * クライアント登録
 *
 * 新しい OAuth 2.0 クライアントを登録します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 *
 * **重要**: レスポンスに含まれる `client_secret` は一度しか表示されません。
 * 安全な場所に保存してください。
 */
export declare const createClient: <ThrowOnError extends boolean = false>(options: Options<CreateClientData, ThrowOnError>) => RequestResult<CreateClientResponses, CreateClientErrors, ThrowOnError>;
/**
 * クライアント削除
 *
 * 指定された OAuth 2.0 クライアントを削除します。
 *
 * **警告**: この操作は取り消せません。削除されたクライアントに関連するトークンは無効化されます。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const deleteClient: <ThrowOnError extends boolean = false>(options: Options<DeleteClientData, ThrowOnError>) => RequestResult<DeleteClientResponses, DeleteClientErrors, ThrowOnError>;
/**
 * クライアント詳細取得
 *
 * 指定された OAuth 2.0 クライアントの詳細情報を取得します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const getClient: <ThrowOnError extends boolean = false>(options: Options<GetClientData, ThrowOnError>) => RequestResult<GetClientResponses, GetClientErrors, ThrowOnError>;
/**
 * クライアント更新
 *
 * 指定された OAuth 2.0 クライアントの情報を更新します。
 * リクエストボディに含まれるフィールドのみが更新されます。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const updateClient: <ThrowOnError extends boolean = false>(options: Options<UpdateClientData, ThrowOnError>) => RequestResult<UpdateClientResponses, UpdateClientErrors, ThrowOnError>;
/**
 * 組織一覧取得
 *
 * 登録済みの組織一覧をページネーション付きで取得します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const listOrganizations: <ThrowOnError extends boolean = false>(options?: Options<ListOrganizationsData, ThrowOnError>) => RequestResult<ListOrganizationsResponses, ListOrganizationsErrors, ThrowOnError>;
/**
 * 組織登録
 *
 * 新しい組織を登録します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const createOrganization: <ThrowOnError extends boolean = false>(options: Options<CreateOrganizationData, ThrowOnError>) => RequestResult<CreateOrganizationResponses, CreateOrganizationErrors, ThrowOnError>;
/**
 * 組織詳細取得
 *
 * 指定された組織の詳細情報を取得します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const getOrganization: <ThrowOnError extends boolean = false>(options: Options<GetOrganizationData, ThrowOnError>) => RequestResult<GetOrganizationResponses, GetOrganizationErrors, ThrowOnError>;
/**
 * 組織更新
 *
 * 指定された組織の情報を更新します。
 * リクエストボディに含まれるフィールドのみが更新されます。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const updateOrganization: <ThrowOnError extends boolean = false>(options: Options<UpdateOrganizationData, ThrowOnError>) => RequestResult<UpdateOrganizationResponses, UpdateOrganizationErrors, ThrowOnError>;
/**
 * 組織メンバー一覧取得
 *
 * 指定された組織のメンバー一覧をページネーション付きで取得します。
 *
 * sort/filter/search パラメータでメンバーを絞り込めます。
 * `include_counts=true` を指定した場合のみ、フィルタ適用前のロール別/ドメイン分類別集計を含めます。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const listOrganizationMembers: <ThrowOnError extends boolean = false>(options: Options<ListOrganizationMembersData, ThrowOnError>) => RequestResult<ListOrganizationMembersResponses, ListOrganizationMembersErrors, ThrowOnError>;
/**
 * メンバー削除
 *
 * 指定された組織からメンバーを削除します。
 *
 * 組織の最後の Owner は削除できません。
 * 削除対象のメンバーが組織内で唯一の Owner ロールを持つ場合、409 Conflict が返されます。
 * Admin / Security Admin / Member は最低人数制約なく削除可能です（Owner が Admin / Security Admin の業務を全て遂行できるため）。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const removeOrganizationMember: <ThrowOnError extends boolean = false>(options: Options<RemoveOrganizationMemberData, ThrowOnError>) => RequestResult<RemoveOrganizationMemberResponses, RemoveOrganizationMemberErrors, ThrowOnError>;
/**
 * メンバーロール変更
 *
 * 指定された組織メンバーのロールを変更します。
 *
 * 変更可能なロール: `owner`, `admin`, `security_admin`, `member`
 *
 * **制約**:
 * - 組織内の最後の Owner のロールは変更できません（組織のロックアウト防止のため）。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const updateOrganizationMemberRole: <ThrowOnError extends boolean = false>(options: Options<UpdateOrganizationMemberRoleData, ThrowOnError>) => RequestResult<UpdateOrganizationMemberRoleResponses, UpdateOrganizationMemberRoleErrors, ThrowOnError>;
/**
 * 招待一覧取得
 *
 * 指定された組織への招待一覧をページネーション付きで取得します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const listOrganizationInvitations: <ThrowOnError extends boolean = false>(options: Options<ListOrganizationInvitationsData, ThrowOnError>) => RequestResult<ListOrganizationInvitationsResponses, ListOrganizationInvitationsErrors, ThrowOnError>;
/**
 * メンバー招待
 *
 * 指定された組織にメンバーを招待します。
 *
 * 招待メールが指定されたメールアドレスに送信されます。
 * 招待には有効期限があり、期限内に承認されない場合は自動的に失効します。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const createOrganizationInvitation: <ThrowOnError extends boolean = false>(options: Options<CreateOrganizationInvitationData, ThrowOnError>) => RequestResult<CreateOrganizationInvitationResponses, CreateOrganizationInvitationErrors, ThrowOnError>;
/**
 * 招待取消
 *
 * 指定された組織への招待を取り消します。
 *
 * pending状態の招待のみ取り消し可能です。
 * 既に承諾済み、期限切れ、または取消済みの招待は取り消せません。
 *
 * **認証**: 管理者権限を持つ Bearer トークンが必要です。
 */
export declare const revokeOrganizationInvitation: <ThrowOnError extends boolean = false>(options: Options<RevokeOrganizationInvitationData, ThrowOnError>) => RequestResult<RevokeOrganizationInvitationResponses, RevokeOrganizationInvitationErrors, ThrowOnError>;
/**
 * Admin Portal セッション生成
 *
 * 指定された組織の WorkOS Admin Portal セッションを生成します。
 *
 * 生成されたポータル URL にIT管理者がアクセスすることで、
 * SSO接続の設定、ドメイン認証、監査ログの閲覧をセルフサービスで行えます。
 * ポータル URL は発行から5分間有効です。
 *
 * **認可**: `owner` または `security_admin` ロールが必要です。
 */
export declare const createAdminPortalSession: <ThrowOnError extends boolean = false>(options: Options<CreateAdminPortalSessionData, ThrowOnError>) => RequestResult<CreateAdminPortalSessionResponses, CreateAdminPortalSessionErrors, ThrowOnError>;
/**
 * 自分が所属する組織情報取得（組織メンバー向け）
 *
 * 認証済みユーザーが所属する組織の詳細情報（name・display_name・状態フラグ等）を取得します。
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織のメンバーであることが必要です（ロール不問）。
 */
export declare const getMyOrganization: <ThrowOnError extends boolean = false>(options: Options<GetMyOrganizationData, ThrowOnError>) => RequestResult<GetMyOrganizationResponses, GetMyOrganizationErrors, ThrowOnError>;
/**
 * 自分が所属する組織情報更新（組織メンバー向け）
 *
 * 組織の Owner / Admin / Security Admin が、自組織の `display_name` を更新します。
 *
 * user-facing 版は `display_name` のみ更新可能です。
 * `name` (slug) / `is_active` / `is_sso_enforced` は管理者専用エンドポイント
 * (`PATCH /admin/organizations/{organization_id}`) からのみ更新できます。
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織の Owner / Admin / Security Admin のいずれかであることが必要です。
 * Member ロールは 403 を返します。
 */
export declare const updateMyOrganization: <ThrowOnError extends boolean = false>(options: Options<UpdateMyOrganizationData, ThrowOnError>) => RequestResult<UpdateMyOrganizationResponses, UpdateMyOrganizationErrors, ThrowOnError>;
/**
 * 組織Adminによるメンバー招待
 *
 * 組織の Owner または Admin が、自組織にメンバーを招待します。
 *
 * 招待メールが指定されたメールアドレスに送信されます。
 * 招待には有効期限があり、期限内に承認されない場合は自動的に失効します。
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織の Owner または Admin であることが必要です。
 *
 * **ロールの制約**:
 * - Owner は `owner`, `admin`, `security_admin`, `member` を指定可能
 * - Admin は `admin`, `security_admin`, `member` を指定可能（`owner` は不可 — 権限エスカレーション防止）
 */
export declare const sendInvitation: <ThrowOnError extends boolean = false>(options: Options<SendInvitationData, ThrowOnError>) => RequestResult<SendInvitationResponses, SendInvitationErrors, ThrowOnError>;
/**
 * 組織メンバー一覧取得（組織メンバー向け）
 *
 * 組織メンバー自身が、自分の所属組織のメンバー一覧をページネーション付きで取得します。
 *
 * sort/filter/search パラメータでメンバーを絞り込めます。
 * `include_counts=true` を指定した場合のみ、フィルタ適用前のロール別/ドメイン分類別集計を含めます。
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織のメンバーであることが必要です（ロール不問）。
 */
export declare const listMembers: <ThrowOnError extends boolean = false>(options: Options<ListMembersData, ThrowOnError>) => RequestResult<ListMembersResponses, ListMembersErrors, ThrowOnError>;
/**
 * 自分自身の組織メンバー情報取得（組織メンバー向け）
 *
 * 認証済みユーザー自身の組織メンバー情報（ロール・アバター・最終アクセス・ドメイン分類等）を取得します。
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織のメンバーであることが必要です（ロール不問）。
 */
export declare const getMemberMe: <ThrowOnError extends boolean = false>(options: Options<GetMemberMeData, ThrowOnError>) => RequestResult<GetMemberMeResponses, GetMemberMeErrors, ThrowOnError>;
/**
 * メンバー削除（組織メンバー向け）
 *
 * 組織の Owner / Admin が、自組織のメンバーを削除します。
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織の Owner または Admin であることが必要です。
 * Security Admin / Member は 403 を返します（ロール変更エンドポイント [PATCH] が Owner のみであるのに対し、削除は Owner / Admin の両方に開放されています）。
 *
 * **制約**:
 * - 自分自身を削除することはできません（409、`cannot-delete-self`）。脱退フローは別エンドポイントで提供する想定です。
 * - 組織内の最後の Owner は削除できません（ロックアウト防止のため、409、`last-owner-cannot-be-removed`）。
 * - Admin / Security Admin / Member は最低人数制約なく削除可能です（Owner が Admin / Security Admin の業務を全て遂行できるため）。
 */
export declare const removeMember: <ThrowOnError extends boolean = false>(options: Options<RemoveMemberData, ThrowOnError>) => RequestResult<RemoveMemberResponses, RemoveMemberErrors, ThrowOnError>;
/**
 * メンバーロール変更（組織メンバー向け）
 *
 * 組織のメンバーが、自組織のメンバーのロールを変更します。
 *
 * 変更可能なロール: `owner`, `admin`, `security_admin`, `member`
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織のメンバーであることが必要です。実際に許可される操作はターゲットによって分岐します。
 *
 * - **他メンバーのロール変更**: リクエストユーザーが Owner であることが必要です。
 * Owner 以外のロール（Admin / Security Admin / Member）が他メンバーを対象にした場合は 403 を返します（`owner-required`）。
 * - **自分自身のロール変更**: 任意のロールから「厳密な降格」のみ許可されます。
 * ロールの partial order は Owner > Admin > Member、Owner > Security Admin > Member であり、
 * Admin と Security Admin は権限集合が重ならないため横移動も拒否されます。
 * 昇格や横移動を要求した場合は 422 を返します（`self-role-change-must-be-downgrade`）。
 * 同じロールを指定した場合は冪等に 200 を返します。
 *
 * **制約**:
 * - 組織内の最後の Owner のロールは変更できません（ロックアウト防止のため、409）。
 * 自分自身を降格しようとした場合も、自分が最後の Owner であればこのガードで弾かれます。
 */
export declare const updateMemberRole: <ThrowOnError extends boolean = false>(options: Options<UpdateMemberRoleData, ThrowOnError>) => RequestResult<UpdateMemberRoleResponses, UpdateMemberRoleErrors, ThrowOnError>;
/**
 * 自組織のAdmin Portal セッション生成（組織メンバー向け）
 *
 * 認証済みユーザーが所属する組織の WorkOS Admin Portal セッションを生成します。
 *
 * 生成されたポータル URL にアクセスすることで、
 * SSO接続の設定、ドメイン認証、監査ログの閲覧をセルフサービスで行えます。
 * ポータル URL は発行から5分間有効です。
 *
 * **認証**: ユーザーの Bearer トークン（OAuth アクセストークン）が必要です。
 * **認可**: リクエストユーザーが対象組織の Owner / Security Admin のいずれかであることが必要です。
 * Admin / Member ロールは 403 を返します。
 */
export declare const createMyAdminPortalSession: <ThrowOnError extends boolean = false>(options: Options<CreateMyAdminPortalSessionData, ThrowOnError>) => RequestResult<CreateMyAdminPortalSessionResponses, CreateMyAdminPortalSessionErrors, ThrowOnError>;
/**
 * SSO 強制判定エンドポイント
 *
 * リソースサーバーが、指定されたメールアドレスまたはユーザーIDに対して
 * SSO 強制が適用されているかを問い合わせるエンドポイント。
 *
 * **認証方式**:
 * - HTTP Basic 認証 (`Authorization: Basic`) でクライアント認証が必須
 * - RFC 6749 Section 2.3.1 に従い、`client_id:client_secret` を Base64 エンコードして送信
 *
 * **パラメータ**:
 * - `email` または `sub` の少なくとも一方を指定する必要があります
 * - 両方指定された場合は `email` が優先されます
 * - `sub` が指定されたがユーザーが見つからない場合は `enforced: false` が返されます
 */
export declare const checkSsoEnforcement: <ThrowOnError extends boolean = false>(options?: Options<CheckSsoEnforcementData, ThrowOnError>) => RequestResult<CheckSsoEnforcementResponses, CheckSsoEnforcementErrors, ThrowOnError>;
//# sourceMappingURL=sdk.gen.d.ts.map