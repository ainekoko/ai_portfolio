import { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkillDocument from './SkillDocument';
import { DOCUMENT_SKILL } from '@/utils/skillData';

const meta: Meta<typeof SkillDocument> = {
  component: SkillDocument,
  title: 'components/skill/SkillDocument',
  args: {
    documentData: DOCUMENT_SKILL,
  },
  argTypes: {
    documentData: {
      control: 'object',
      description:
        '設計書関連のデータ配列。各要素はtitle（設計書のタイトル）、description（設計書の説明）を含む',
      table: {
        type: {
          summary: 'Array<SkillItemType>',
          detail: `interface SkillItemType {
                    title: string;    // 設計書のタイトル（例: "要件概要書"）
                    description: string;      // 設計書の説明（例: "QAの資料作成等"）
                  }`,
        },
      },
    },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'SkillAccordionコンポーネントは、スキルのアコーディオン表示を提供します。クリックで展開・折りたたみが可能で、スキルデータをリスト形式で表示します。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkillDocument>;

/**
 * デフォルトの表示状態
 */
export const Default: Story = {};

/**
 * 少数のスキルデータ
 */
export const FewSkills: Story = {
  args: {
    documentData: [
      {
        title: 'HTML5',
        description: 'QAの資料作成等',
      },
    ],
  },
};
