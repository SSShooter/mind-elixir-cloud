import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    misc: {
      pleaseLogin: 'Please login first',
      networkError: 'Network error',
      formatSelect: 'Choose format',
      title: 'Title',
      ok: 'OK',
      cancel: 'Cancel',
      login: 'Login',
      share: 'Share',
    },
    menu: {
      public: 'Public',
      folder: 'Folder',
      about: 'About',
      language: 'language',
    },
    button: {
      signin: 'Sign in',
      signinWithWeibo: 'Sign in with Weibo',
      signinWithGitHub: 'Sign in with GitHub',
      logout: 'Sign out',
      new: 'New',
      save: 'Save',
    },
    title: {
      signinWith: 'Sign in with',
    },
    about: {
      1: 'Thank you for the free service provided by Netify and Fly.io.',
      2: 'Regularly Data Backup is recommended.',
      3: `Should you require customization features, please reach out to ssshooterx{'@'}gmail.com.`,
    },
  },
  cn: {
    misc: {
      pleaseLogin: '请点击右上角按钮登陆',
      networkError: '网络错误',
      formatSelect: '格式选择',
      title: '标题',
      ok: '确定',
      cancel: '取消',
      login: '登陆',
      share: '分享',
    },
    menu: {
      public: '公开',
      folder: '文件夹',
      about: '关于',
      language: '语言',
    },
    button: {
      signin: '登录',
      signinWithWeibo: '使用微博登陆',
      signinWithGitHub: '使用 GitHub 登陆',
      logout: '退出登录',
      new: '新建',
      save: '保存',
    },
    title: {
      signinWith: '登陆方式',
    },
    about: {
      1: '感谢 netify 和 fly.io 提供的免费服务',
      2: '请注意数据备份，编辑好的思维导图请下载归档',
      3: `接受定制功能，联系邮箱 ssshooterx{'@'}gmail.com`,
    },
  },
  ja: {
    misc: {
      pleaseLogin: 'ログインが必要です',
      networkError: 'ネットワークエラー',
      formatSelect: 'ファイル形式',
      title: 'タイトル',
      ok: 'OK',
      cancel: 'キャンセル',
      login: 'ログイン',
      share: '共有',
    },
    menu: {
      public: '公開',
      folder: 'フォルダ',
      about: '基本情報',
      language: '言語',
    },
    button: {
      signin: 'ログイン',
      logout: 'ログアウト',
      signinWithWeibo: 'Weibo でログイン',
      signinWithGitHub: 'GitHub でログイン',
      new: '新規',
      save: '保存',
    },
    title: {
      signinWith: 'ログイン方法',
    },
    about: {
      1: 'Thank you for the free service provided by Netify and Fly.io.',
      2: 'Regularly Data Backup is recommended.',
      3: `Should you require customization features, please reach out to ssshooterx{'@'}gmail.com.`,
    },
  },
}
const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  globalInjection: true,
  messages,
})

export default i18n
