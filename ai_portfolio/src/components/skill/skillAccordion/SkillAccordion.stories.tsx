import { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkillAccordion from './SkillAccordion';
import { SKILL_DATA } from '@/utils/skillData';

const meta: Meta<typeof SkillAccordion> = {
  component: SkillAccordion,
  title: 'components/skill/SkillAccordion',
  args: {
    id: 'another',
    skillData: SKILL_DATA.another,
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'アコーディオンの一意のID',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'another' },
      },
    },
    skillData: {
      control: 'object',
      description:
        'スキルデータの配列。各要素はlabel（スキル名）、img（アイコンパス）、year（経験年数）を含む',
      table: {
        type: {
          summary: 'Array<SkillItemType>',
          detail: `interface SkillItemType {
                    label: string;    // スキルの名前（例: "HTML5"）
                    img: string;      // アイコン画像のパス（例: "/assets/images/icons8-html.svg"）
                    year: number;     // 経験年数（例: 8）
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
type Story = StoryObj<typeof SkillAccordion>;

/**
 * デフォルトの表示状態
 */
export const Default: Story = {};

/**
 * 少数のスキルデータ
 */
export const FewSkills: Story = {
  args: {
    id: 'test',
    skillData: [
      {
        label: 'HTML5',
        img: '/assets/images/icons8-html.svg',
        year: 8,
      },
      {
        label: 'CSS',
        img: '/assets/images/icons8-css.svg',
        year: 8,
      },
      {
        label: 'JavaScript',
        img: '/assets/images/icons8-js.svg',
        year: 6,
      },
    ],
  },
};

/**
 * スキルデータが空の場合
 */
export const EmptySkills: Story = {
  args: {
    id: 'empty',
    skillData: [],
  },
};
