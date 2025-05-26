import { createI18n } from "vue-i18n";

const messages = {
  en: {
    misc: {
      pleaseLogin: "Please login first",
      networkError: "Network error",
      formatSelect: "Choose format",
      title: "Title",
      ok: "OK",
      cancel: "Cancel",
      login: "Login",
      share: "Share",
      loggingIn: "Logging in...",
      connectingDesktop: "Connecting to desktop app",
      ensureDesktopRunning:
        "Please ensure the desktop app is running and waiting for connection",
      secureConnection: "Secure Connection",
      autoRedirect: "Auto Redirect",
      gettingToken: "Getting authentication token...",
      connectingApp: "Connecting to desktop app...",
      verifyingIdentity: "Verifying identity...",
      loginSuccess: "Login successful! Redirecting...",
      completed: "Login completed successfully",
      connectionFailed: "Connection failed, please retry",
      checkDesktopApp:
        "Login failed, please check your network connection or try again later",
    },
    menu: {
      public: "Public",
      folder: "Folder",
      about: "About",
      language: "language",
    },
    button: {
      signin: "Sign in",
      signinWithWeibo: "Sign in with Weibo",
      signinWithGitHub: "Sign in with GitHub",
      logout: "Sign out",
      new: "New",
      save: "Save",
    },
    title: {
      signinWith: "Sign in with",
    },
    about: {
      1: "Thank you for the free service provided by Netify and Fly.io.",
      2: "Regularly Data Backup is recommended.",
      3: `Should you require customization features, please reach out to ssshooterx{'@'}gmail.com.`,
    },
  },
  cn: {
    misc: {
      pleaseLogin: "请点击右上角按钮登陆",
      networkError: "网络错误",
      formatSelect: "格式选择",
      title: "标题",
      ok: "确定",
      cancel: "取消",
      login: "登陆",
      share: "分享",
      loggingIn: "正在唤起登录……",
      connectingDesktop: "正在连接桌面应用",
      ensureDesktopRunning: "请确保桌面应用已启动并处于可连接状态",
      secureConnection: "安全连接",
      autoRedirect: "自动跳转",
      gettingToken: "正在获取认证令牌...",
      connectingApp: "正在连接桌面应用...",
      verifyingIdentity: "正在验证身份...",
      loginSuccess: "登录成功！正在跳转...",
      completed: "登录已完成",
      connectionFailed: "连接失败，请重试",
      checkDesktopApp: "登录失败，请检查网络连接或稍后重试",
    },
    menu: {
      public: "公开",
      folder: "文件夹",
      about: "关于",
      language: "语言",
    },
    button: {
      signin: "登录",
      signinWithWeibo: "使用微博登陆",
      signinWithGitHub: "使用 GitHub 登陆",
      logout: "退出登录",
      new: "新建",
      save: "保存",
    },
    title: {
      signinWith: "登陆方式",
    },
    about: {
      1: "感谢 netify 和 fly.io 提供的免费服务",
      2: "请注意数据备份，编辑好的思维导图请下载归档",
      3: `接受定制功能，联系邮箱 ssshooterx{'@'}gmail.com`,
    },
  },
  ja: {
    misc: {
      pleaseLogin: "ログインが必要です",
      networkError: "ネットワークエラー",
      formatSelect: "ファイル形式",
      title: "タイトル",
      ok: "OK",
      cancel: "キャンセル",
      login: "ログイン",
      share: "共有",
      loggingIn: "ログイン中...",
      connectingDesktop: "デスクトップアプリに接続中",
      ensureDesktopRunning:
        "デスクトップアプリが起動して接続可能な状態であることを確認してください",
      secureConnection: "セキュア接続",
      autoRedirect: "自動リダイレクト",
      gettingToken: "認証トークンを取得中...",
      connectingApp: "デスクトップアプリに接続中...",
      verifyingIdentity: "身元を確認中...",
      loginSuccess: "ログイン成功！リダイレクト中...",
      completed: "ログインが完了しました",
      connectionFailed: "接続に失敗しました、再試行してください",
      checkDesktopApp:
        "ログインに失敗しました、ネットワーク接続を確認するか後でもう一度お試しください",
    },
    menu: {
      public: "公開",
      folder: "フォルダ",
      about: "基本情報",
      language: "言語",
    },
    button: {
      signin: "ログイン",
      logout: "ログアウト",
      signinWithWeibo: "Weibo でログイン",
      signinWithGitHub: "GitHub でログイン",
      new: "新規",
      save: "保存",
    },
    title: {
      signinWith: "ログイン方法",
    },
    about: {
      1: "Thank you for the free service provided by Netify and Fly.io.",
      2: "Regularly Data Backup is recommended.",
      3: `Should you require customization features, please reach out to ssshooterx{'@'}gmail.com.`,
    },
  },
};
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || "en",
  fallbackLocale: "en", // set fallback locale
  globalInjection: true,
  messages,
});

export default i18n;
