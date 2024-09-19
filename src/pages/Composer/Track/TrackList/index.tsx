import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { trackStore } from '@/stores/Track/TracksStore';
import TrackUploadModal from './Components/TrackUploadModal';

const TrackListPage: React.FC = observer(() => {
  const [page, setPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    trackStore.fetchTracksWithPagination(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleUploadSuccess = () => {
    trackStore.fetchTracksWithPagination(page);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">곡 업로드 목록</h1>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          곡 업로드
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">곡 제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">아티스트</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trackStore.tracks.map((track, index) => (
              <tr key={track.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trackStore.currentPage * trackStore.pageSize + index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{track.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.artist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(trackStore.totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${trackStore.currentPage === i ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <TrackUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
});

export default TrackListPage;