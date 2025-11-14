import { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkillItemList from './SkillItemList';
import { SKILL_DATA } from '@/utils/skillData';

const meta: Meta<typeof SkillItemList> = {
  component: SkillItemList,
  title: 'components/skill/SkillItemList',
  args: {
    id: '1',
    title: 'another',
    skillData: SKILL_DATA.another,
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'アコーディオンの一意のID',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
      },
    },

    title: {
      control: 'text',
      description: 'スキルリストのタイトル',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'another' },
      },
    },

    skillData: {
      control: 'object',
      description:
        'スキルリストの一意な識別子。コンポーネントのID属性として使用されます。',
      table: {
        type: {
          summary: 'Array<SkillItemType>',
          detail: `interface SkillItemType {
                    label: string;    
                    img: string;      
                    year: number;     
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
type Story = StoryObj<typeof SkillItemList>;

/**
 * デフォルトの表示状態
 */
export const Default: Story = {};
