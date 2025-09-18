import React from 'react';

/**
 *
 * 会社情報の型定義
 * @param param0 - companyData: 会社情報の配列
 * @returns
 */
const CompanyBox = ({ companyData }) => {
  console.log(companyData);
  return (
    <>
      {companyData.map((data, index: number) => (
        <div
          key={index}
          className='w-full flex-shrink-0 px-2'
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className='bg-white p-5 border-double shadow-[0_0_0_15px_#eaf4f4] border-[#a0b4b4] border-4'>
            <div className='max-w-2xl mx-auto bg-white'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='p-4 text-lg text-center jp'>
                      {data.outsourcedCompany}
                    </th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  <tr>
                    <td className='p-6'>
                      <div className='space-y-1.5 jp'>
                        <div className='flex items-start'>
                          <span className='mr-2'>◆</span>
                          <span className='mr-8'>参画期間</span>
                          <span>{data.period}</span>
                        </div>
                        <div className='flex items-start'>
                          <span className='mr-2'>◆</span>
                          <span className='mr-16'>規模</span>
                          <span>{data.scale}</span>
                        </div>
                        <div className='flex items-start'>
                          <span className='mr-2'>◆</span>
                          <span className='mr-6'>担当フェーズ</span>
                          <span>{data.phase}</span>
                        </div>
                        <div>
                          <div className='flex items-start mb-2'>
                            <span className='text-black mr-2'>◆</span>
                            <span className='font-semibold'>業務内容</span>
                          </div>
                          <div className='ml-6'>
                            <span className='text-black mr-2'>•</span>
                            <span>{data.bussinessContent}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4'>
                      <div className='border-t-2 border-dashed border-gray-400 pt-4'>
                        <h3 className='font-bold text-lg mb-4 jp'>開発環境</h3>
                        <div className='space-y-1.5 jp'>
                          <div>
                            <span className='font-semibold'>【言語】</span>
                            <span className='ml-2'>
                              {data.devenvironment.language?.join(' / ')}
                            </span>
                          </div>
                          <div>
                            <span className='font-semibold'>【OS】</span>
                            <span className='ml-4'>
                              {data.devenvironment.os}
                            </span>
                          </div>
                          <div>
                            <span className='font-semibold'>【FW】</span>
                            <span className='ml-4'>
                              {data.devenvironment.framework?.join(' / ')}
                            </span>
                          </div>
                          <div>
                            <span className='font-semibold'>【ツール】</span>
                            <span className='ml-2'>
                              {data.devenvironment.tool?.join(' / ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='p-6'>
                      <p className='leading-relaxed jp'>{data.content}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CompanyBox;
