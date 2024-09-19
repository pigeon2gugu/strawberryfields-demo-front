import React, { useState } from 'react';
import { uploadTrackApi } from '@/apis/Track/useUploadTrack';
import { TRACK_FILE } from '@/constants/TrackFile';

interface TrackUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const TrackUploadModal: React.FC<TrackUploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > TRACK_FILE.MAX_FILE_SIZE) {
        setError('파일 크기는 100MB를 초과할 수 없습니다.');
        return;
      }
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !TRACK_FILE.ALLOWED_EXTENSIONS.includes(fileExtension)) {
        setError('허용되는 파일 형식은 .mp3와 .wav입니다.');
        return;
      }
      setFile(selectedFile);
      setError(null); // 파일이 유효할 때 에러 초기화
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }
    setIsUploading(true);
    setError(null);
    try {
      const response = await uploadTrackApi(file);
      if (response.data.code === 'SUCCESS_NORMAL') {
        onUploadSuccess();
        onClose();
      } else {
        setError('업로드에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setError('업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">곡 업로드</h2>
        <div className="mb-4">
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept=".mp3,.wav" 
            disabled={isUploading}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isUploading && <p className="text-blue-500 mb-4">업로드 중입니다. 잠시만 기다려주세요...</p>}
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            disabled={isUploading}
          >
            취소
          </button>
          <button 
            onClick={handleUpload} 
            className={`px-4 py-2 ${isUploading || error ? 'bg-gray-400' : 'bg-black'} text-white rounded`}
            disabled={isUploading || !file || error !== null}
          >
            {isUploading ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackUploadModal;
