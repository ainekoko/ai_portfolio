/**
 * IT業界の職務経歴書の左側の型定義
 * @interface JobIntroductionLeftItem
 * @property {string} jobName - 会社名
 * @property {string} jobPeriod - 参画期間
 * @property {React.ReactNode} content - 仕事内容の詳細説明
 */
export interface ItJobIntroductionLeftItem {
  jobName: string;
  jobPeriod: string;
  content: React.ReactNode;
}

/**
 * IT業界の職務経歴書
 * @interface JobIntroductionRightItem
 * @property {string} outsourcedCompany - 派遣先企業名
 * @property {string} period - 参画期間
 * @property {string} scale - チーム規模
 * @property {string} phase - 担当フェーズ
 * @property {string[]} bussinessContent - 業務内容のリスト
 * @property {object} devenvironment - 開発環境の詳細
 * @property {string[]} devenvironment.language - 使用言語のリスト
 * @property {string[]} devenvironment.framework - 使用フレームワークのリスト
 * @property {string[]} devenvironment.database - 使用データベースのリスト
 * @property {string} devenvironment.os - 使用OS
 * @property {string[]} devenvironment.tool - 使用ツールのリスト
 * @property {string} content - 業務内容の詳細説明
 */
export interface ItJobIntroductionLeftItem {
  outsourcedCompany: string;
  period: string;
  scale: string;
  phase: string;
  bussinessContent: string[];
  devenvironment: {
    language: string[];
    framework: string[];
    database: string[];
    os: string;
    tool: string[];
  };
  content: string;
}
