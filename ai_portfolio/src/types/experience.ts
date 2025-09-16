/**
 * experience.ts
 * 職務経歴に関する型定義
 */
export interface JobIntroductionLeftItem {
  jobName: string;
  jobPeriod: string;
  content: React.ReactNode;
}

/**
 * 職務経歴情報の型定義
 */
export interface JobIntroductionRightItem {
  jobName: string;
  jobPeriod?: string;
  content: React.ReactNode;
}
