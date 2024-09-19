import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { pitchingStore } from '@/stores/Pitching/PitchingsStore';

const PitchingListPage: React.FC = observer(() => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    pitchingStore.fetchPitchings(page - 1);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">피칭 내역</h1>
        <button 
          onClick={() => {/* TODO: 피칭하기 기능 구현 */}}
          className="px-4 py-2 bg-black text-white rounded"
        >
          피칭하기
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">곡 제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">받는 사람</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">피칭 일시</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pitchingStore.pitchings.map((pitching, index) => (
              <tr key={pitching.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitchingStore.currentPage * pitchingStore.pageSize + index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pitching.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitching.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitching.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(pitchingStore.totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${pitchingStore.currentPage === i ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
});

export default PitchingListPage;