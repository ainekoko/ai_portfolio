import React from 'react';

/**
 * 設計書関連コンポーネントのプロパティ
 * @param documentData - 設計書関連のデータ配列
 */
interface DocumentSkillProps {
  documentData: DocumentItem[];
}

/**
 * 設計書関連のデータアイテム
 * @param title - 設計書のタイトル
 * @param description - 設計書の説明
 */
interface DocumentItem {
  title: string;
  description: string;
}

/**
 * 設計書関連コンポーネント
 * @param param0 - documentData: 設計書関連のデータ配列
 */
const DocumentSkill = ({ documentData }: DocumentSkillProps) => {
  return (
    <div className='container bg-white p-8 rounded-lg shadow-sm'>
      <h2 className='text-xl font-bold text-gray-800 mb-6'>設計書関連</h2>

      <ul className='space-y-4 list-none pl-0'>
        {documentData.map((item, index) => (
          <li key={index} className='relative pl-6'>
            <span className='absolute left-0 top-1 text-gray-600'>-</span>
            <div>
              <span className='text-gray-800 font-medium'>{item.title}</span>
              <span className='text-gray-600 ml-2'>{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentSkill;
