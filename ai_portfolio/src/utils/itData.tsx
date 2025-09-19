/**
 * 職務経歴に関するデータ
 */
export const ITJOB_INTRODUCTION_LEFT = {
  jobName: 'SES',
  jobPeriod: '2018~2024',
  content: (
    <>
      畑違いの業種に転職するにあたり、IT業界の事を全く知らなかったので不安だった為
      <br />
      一先ずスクールに通い友達のネイルサイトを作成し、転職活動に挑みました！
      <br />
      有り難いことに拾って頂きSESとして未熟な私にも様々な現場で経験が出来、本当に感謝をしています。
      <br />
      契約の関係上、作成したサイトは転載する事が出来ませんがその現場での業務を記載しましたので見て頂けると幸いです。　
    </>
  ),
};

/**
 * 職務経歴右側のデータ配列
 */
export const ITJOB_INTRODUCTION_RIGHT = [
  {
    outsourcedCompany: 'ショッピングサイト運営会社',
    period: '自社/出社/3か月',
    scale: 'ディレクター1名、FE5名',
    phase: '開発',
    bussinessContent: ['会員ページの改修作業'],
    devenvironment: {
      language: ['HTML', 'CSS', 'PHP'],
      framework: ['Laravel'],
      database: [],
      os: 'Windows',
      tool: ['VSCode', 'GitHub', 'Chatwork'],
    },
    content: '先輩方から基本作法を学びながらページの改修作業を行いました。',
  },
  {
    outsourcedCompany: 'クラウドサービス提供会社',
    period: '常駐先/出社/6か月',
    scale: 'PM2名、その他15名',
    phase: 'カスタマー/講師/開発',
    bussinessContent: [
      '顧客からの問い合わせへの返答・返信',
      '新人や先方へのクラウドの作法講師',
      '一部サイトの改修作業',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'PHP'],
      framework: ['Laravel'],
      database: [],
      os: 'Mac',
      tool: ['VSCode', 'GitHub', 'Chatwork'],
    },
    content:
      'カスタマーでは不具合調査によるナレッジ作成や、調査方法を学ぶことが出来ました。講師では主に初学者へのGitやクラウド関連の作法の作法講師だったので、質問されるであろう事象を理解する為何度も勉強したり、人に教える難しさを学びました。',
  },
  {
    outsourcedCompany: '保険会社',
    period: '常駐先/出社/1年半',
    scale: '営業1名、PM4名、designer3名、FE8名、BE8名',
    phase: 'デザイン/詳細設計/開発/テスト',
    bussinessContent: [
      'デザイン案の作成',
      '保険シミュレーションページ作成',
      '一部ページのVue移行作業',
      '単体・結合テスト',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript'],
      framework: ['Vue', 'Jest'],
      database: ['MySQL'],
      os: 'Windows',
      tool: ['XD', 'storybook', 'GitLab', 'Slack', 'Json', 'Docker'],
    },
    content:
      'デザインからFW、CSS選定等を調査をする事でメンバー間へプレゼンする為の自身のスキル向上と団結力が生まれました。Vueに関しては初見だった為、経験者がレビューを行い、書き方等本当勉強させて頂きました。テスト設計では本番環境でのトラブル発生防止のため、カバレッジ100％は勿論、動作エラーの解消を徹底しました。',
  },
  {
    outsourcedCompany: '化粧品運営会社',
    period: '常駐先/ハイブリット/6か月',
    scale: 'PM1名、SEO1名、FE1名、BE3名',
    phase: 'デザイン/開発/テスト',
    bussinessContent: [
      '旧会員TOPページの新規デザイン作成',
      '動作の悪いページの最適化',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript'],
      framework: ['Vue'],
      database: [],
      os: 'Windows',
      tool: ['VSCode', 'Skype'],
    },
    content:
      '企画部へヒアリングし、デザイン案の考案から担当させて頂きました！そして初の一人開発の為、心配ではありましたが前の現場での知識のお陰でスムーズに進める事が出来ました。※TOPページ完了後、他ページの改修予定ではありましたが、コロナにより打ち切りになってしまった事が心残りです；',
  },
  {
    outsourcedCompany: '新聞オンライン版運営会社',
    period: '常駐先/ハイブリット/2年',
    scale: 'PM2名、デザイナー1名、コーダー1名、FE1名、他部署20名程',
    phase: 'デザイン/企画/開発/テスト',
    bussinessContent: [
      'イベント関連のページの作成',
      '閲覧数が増える様なグラフや動作のあるページを企画、作成',
      'オリンピック/選挙/マラソン等のイベント関連',
      '既存ページの改修作業',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript'],
      framework: ['Laravel'],
      database: [],
      csm: ['WordPress'],
      os: 'Windows',
      tool: [
        'slack',
        'XD',
        'PS',
        'GitHub',
        '3D.js',
        'Flourish',
        'jQuery',
        'Docker',
        'Json',
        'XHTML',
      ],
    },
    content:
      'イベント毎に担当事業部でヒアリングをし、要望に沿ったイベントページや機能を作成しました。短期間で集客しなければいけない為、如何に目を引くデザインを考え提案した所、前年比より閲覧数を増やすことが出来ました。そして動きのあるサイトの面白さをこの現場で知り、より深く知っていきたいと思ったきっかけでもあります！',
  },
  {
    outsourcedCompany: '銀行系システム開発会社',
    period: '常駐先/フルリモート/1年',
    scale: '100名以上（内担当プロジェクトメンバーFE20名）',
    phase: 'デザイン/要件概要書/基本設計/詳細設計/開発/テスト',
    bussinessContent: [
      '業務システムの新規作成',
      '既存ページを基準にデザインから作成',
      'メンバーへのタスク振り分け、新人教育等',
      '単体・結合テスト',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript'],
      framework: ['Vue', 'Jest'],
      os: 'Windows',
      tool: ['Teams', 'XD', 'PS', 'GitLab', 'JEST', 'storybook'],
    },
    content:
      '複数のWFシステムの内、一つのWFのリーダーとなり要件定義からテストまでを一通り携わり、メンバーへのタスク振り分けや新人への指導なども行い、遅れているメンバーがいないか逐一報連相を欠かさないよう心がけました。初の大規模開発とフルリモートの為、報連相が本当に大事だと体感した現場でした！なので抜けがない様に1日の作業を日記形式に残し、メンバー間でも少しでも不明点があれば通話で打ち合わせをする等を徹底しました。',
  },
];
