/**
 * IT業界の職務経歴データ配列
 */
export const ITJOB_INTRODUCTION = [
  {
    outsourcedCompany: 'ショッピングサイト（制作会社）',
    period: '自社/出社/3か月',
    scale: 'ディレクター1名、FE5名',
    phase: ['開発', '運用', '保守'],
    bussinessContent: [
      '会員ページの改修作業（月5件程）',
      '単体テスト・結合テスト',
      'クロスブラウザテスト（IE、Firefox、Chrome）',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'PHP'],
      framework: ['Laravel'],
      os: 'Windows',
      tool: ['VSCode', 'Chatwork'],
    },
    achievements: [
      '実務未経験から3ヶ月で即戦力として貢献',
      '既存コードの理解と改修をスムーズに実施',
    ],
    content: (
      <>
        初の実務案件として基本作法を学びながら改修作業を担当。
        <br />
        独学で習得したHTML/CSSの知識を活かし、スムーズに業務をキャッチアップしました。
        <br />
        先輩方の丁寧なコードレビューにより、実践的なコーディングスキルを習得できました。
      </>
    ),
    hukidashi: '仲の良い同期と毎月飲み会をして本当に楽しかったです！',
  },
  {
    outsourcedCompany: 'クラウドサービス会社（自社）',
    period: '常駐先/出社/6か月',
    scale: 'PM2名、その他15名',
    phase: ['カスタマーサポート', '技術講師'],
    bussinessContent: [
      '顧客からの技術的な問い合わせ対応（月平均50件）',
      '新人エンジニア向けのGit・クラウド研修の実施',
      'ナレッジベースの構築と運用',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'PHP'],
      framework: ['Laravel'],
      os: 'Mac',
      tool: ['VSCode', 'GitHub', 'Chatwork'],
    },
    achievements: [
      '新人研修の為、現場の独自クラウド環境の講師を務める',
      'ナレッジベース構築により問い合わせ対応時間を30%削減',
    ],
    content: (
      <>
        カスタマーサポートでは不具合調査とナレッジベース構築を担当。
        <br />
        技術講師として新人エンジニアへのGit・クラウド研修を実施し、私自身未経験だったため、質問を想定した徹底的な準備により、教える技術とコミュニケーション能力を向上させました。
        <br />
        この経験を通じて、より実践的な開発業務に携わりたいと考え、次のステップへ進みました。
      </>
    ),
    hukidashi: <>研修資料作りで、自分の理解度も深まりました！</>,
  },
  {
    outsourcedCompany: '保険会社（SIer）',
    period: '常駐先/出社/1年半',
    scale: '営業1名、PM4名、デザイナー3名、FE8名、BE8名',
    phase: ['UI/UXデザイン', '詳細設計', '開発', 'テスト'],
    bussinessContent: [
      'デザイン案の作成とプレゼンテーション',
      '保険シミュレーションページ作成',
      'レガシーコードのVue.js移行',
      '単体テスト・結合テスト',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript'],
      framework: ['Vue.js', 'Jest'],
      database: ['MySQL'],
      os: 'Windows',
      tool: ['Adobe XD', 'Storybook', 'GitLab', 'Slack', 'Docker'],
      libraries: ['Vuex', 'Vue Router', 'Axios'],
    },
    achievements: [
      'Vue.js未経験から1.5年で複雑なシミュレーションページを実装',
      'テストカバレッジ100%を達成し、本番環境でのバグゼロを実現',
      'デザインシステムの構築提案でUI一貫性を向上',
    ],
    content: (
      <>
        デザインからフレームワーク・CSS選定までの調査とプレゼンテーションを実施し、チーム全体のスキル向上と団結力を高めました。
        <br />
        Vue.jsは初めてでしたが、経験者のコードレビューを通じて実践的なスキルを習得。
        <br />
        テスト設計では本番環境でのトラブル発生防止のため、カバレッジ100%を達成し、徹底的な品質管理を実現しました。
      </>
    ),
    hukidashi: (
      <>Vue.jsの学習が大変でしたが、コードレビューで大きく成長できました！</>
    ),
  },
  {
    outsourcedCompany: '化粧品ECサイト運営会社（自社）',
    period: '常駐先/ハイブリッド/6か月',
    scale: 'PM1名、SEO1名、FE1名、BE3名',
    phase: ['UI/UXデザイン', '開発', 'テスト'],
    bussinessContent: [
      '会員TOPページの全面リニューアル（デザイン〜実装）',
      'レスポンシブデザインの実装',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript'],
      framework: ['Vue.js'],
      os: 'Windows',
      tool: ['VSCode', 'Skype', 'Adobe XD'],
      libraries: ['Vuex', 'Intersection Observer API'],
    },
    achievements: [
      '企画部とのヒアリングから要件定義を主導',
      '初の単独開発案件を完遂',
      'ページ読み込み速度を40%改善（Lazy Loading実装）',
    ],
    content: (
      <>
        企画部へのヒアリングからデザイン案の考案・実装まで一貫して担当。
        <br />
        初の単独開発案件でしたが、前案件での経験を活かしスムーズに開発を進め、TOPページの全面リニューアルを成功させました。
        <br />
        パフォーマンス最適化にも注力し、ユーザー体験の向上に貢献しました。
      </>
    ),
    hukidashi: (
      <>
        前職の化粧品業界の知識が活かせて、とても嬉しかったです！コロナによりショッピングページは中止になりましたが…（泣）
      </>
    ),
  },
  {
    outsourcedCompany: '新聞オンライン版運営会社（自社）',
    period: '常駐先/ハイブリッド/2年',
    scale: 'PM2名、デザイナー1名、コーダー1名、FE1名、他部署20名程',
    phase: ['UI/UXデザイン', '企画', '開発', 'テスト'],
    bussinessContent: [
      'イベント特設ページの企画・作成（年間15件以上）',
      'D3.js・Flourishを使用したデータビジュアライゼーション',
      'オリンピック・選挙・マラソン等のリアルタイム速報機能',
      'WordPress REST APIを活用したヘッドレスCMS構築',
      '既存ページの改修・最適化（月平均10件）',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript'],
      framework: ['Laravel'],
      cms: ['WordPress'],
      os: 'Windows',
      tool: ['Slack', 'Adobe XD', 'Photoshop', 'GitHub', 'Docker'],
      libraries: ['D3.js', 'Flourish', 'jQuery', 'GSAP', 'Chart.js'],
    },
    achievements: [
      'オリンピック特設ページで前年比130%の閲覧数を達成',
      'インタラクティブなデータビジュアライゼーションでユーザーエンゲージメント向上',
      '短期間（2週間）でのイベントページ公開を実現',
    ],
    content: (
      <>
        イベント毎に担当事業部とヒアリングを実施し、要望に沿ったイベントページと機能を作成。
        <br />
        短期間で集客する必要があったため、目を引くデザインとインタラクティブな機能を提案・実装し、
        <strong>前年比130%の閲覧数向上</strong>を達成しました。
        <br />
        特に選挙特設ページでは、D3.jsを使用したリアルタイムの当選状況可視化機能が高評価を獲得。
        <br />
        この現場で動きのあるサイトの面白さを実感し、フロントエンド技術をより深く追求したいと考えるきっかけとなりました。
      </>
    ),
    hukidashi: (
      <>
        オリンピック期間中は残業続きでしたが、メンバーと応援したりとやりがいのある2年間でした！
      </>
    ),
  },
  {
    outsourcedCompany: '銀行系システム開発会社（SIer）',
    period: '常駐先/フルリモート/1年',
    scale: '100名以上（内FEチーム20名）',
    phase: [
      'UI/UXデザイン',
      '要件定義',
      '基本設計',
      '詳細設計',
      '開発',
      'テスト',
    ],
    bussinessContent: [
      '業務システムの新規作成（50ページ以上）',
      'デザインシステムの構築とコンポーネント設計',
      'ページリーダーとしてタスク管理・新人教育',
      '単体テスト・結合テスト（Jest）',
    ],
    devenvironment: {
      language: ['HTML', 'CSS', 'SASS', 'JavaScript', 'TypeScript'],
      framework: ['Vue.js', 'Jest'],
      os: 'Windows',
      tool: ['Teams', 'Adobe XD', 'Photoshop', 'GitLab', 'Storybook'],
      libraries: ['Vuex', 'Vue Router', 'Vuelidate', 'Axios'],
      testing: ['Jest', 'Vue Testing Library'],
    },
    achievements: [
      'FEチームリーダーとして5名のメンバー管理',
      '要件定義から本番リリースまで一貫して担当',
      'Storybookによるコンポーネント管理導入でUI品質向上',
      'テストカバレッジ90%以上を維持',
    ],
    leadership: [
      'チームメンバーへのタスク振り分けと進捗管理',
      '新人エンジニア2名のメンター担当',
      '週次の進捗報告とプレゼンテーション実施',
      'コードレビュー文化の定着に貢献',
    ],
    content: (
      <>
        複数のワークフローシステムの中で1つのシステムのFEリーダーを担当。
        <br />
        要件定義からテストまで一貫して携わり、新人さんもいたのでメンターとしてサポートしました。
        初のフルリモート案件のため、報連相を徹底し、1日の作業を日報形式で記録。
        <br />
        不明点があれば即座にオンライン会議を設定するなど、コミュニケーションの質を重視しました。
        <br />
        この経験を通じて、技術力だけでなくチームマネジメントのスキルも大きく向上しました。
      </>
    ),
    hukidashi: (
      <>
        初のNext.js案件でしたが、前回の経験を活かしてスムーズに対応できました！
      </>
    ),
  },
];
