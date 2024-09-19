import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { agencyPitchingStore } from '@/stores/Pitching/AgencyPitchingsStore';

const AgencyPitchingListPage: React.FC = observer(() => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    agencyPitchingStore.fetchPitchings(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">곡</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">곡 제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">보낸 사람</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">피칭 일시</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agencyPitchingStore.pitchings.map((pitching, index) => (
              <tr key={pitching.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agencyPitchingStore.currentPage * agencyPitchingStore.pageSize + index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pitching.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitching.artist}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitching.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(agencyPitchingStore.totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${agencyPitchingStore.currentPage === i ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
});

export default AgencyPitchingListPage;