import React, { useState, useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { trackStore } from '@/stores/Track/TracksStore';
import { agencyStore } from '@/stores/User/AgenciesStore';
import { createPitchingApi } from '@/apis/Pitching/useCreatePitching';
import { MAX_DESCRIPTION_LENGTH } from '@/constants/Format'

interface PitchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PitchingModal: React.FC<PitchingModalProps> = observer(({ isOpen, onClose, onSuccess }) => {
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [selectedAgencyId, setSelectedAgencyId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isAgencyOpen, setIsAgencyOpen] = useState(false);

  const tracksEndRef = useRef<HTMLDivElement>(null);
  const agenciesEndRef = useRef<HTMLDivElement>(null);

  const [trackPage, setTrackPage] = useState(1);
  const [agencyPage, setAgencyPage] = useState(1);

  const resetForm = () => {
    setSelectedTrackId(null);
    setSelectedAgencyId(null);
    setDescription('');
    setError(null);
    trackStore.reset();
    agencyStore.reset();
    setIsTrackOpen(false);
    setIsAgencyOpen(false);
    setCharCount(0);

    setTrackPage(1);
    setAgencyPage(1);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      trackStore.fetchTracksWithInfiniteScroll(trackPage);
    }
  }, [trackPage, isOpen]);

  useEffect(() => {
    if (isOpen) {
      agencyStore.fetchAgenciesWithInfiniteScroll(agencyPage);
    }
  }, [agencyPage, isOpen]);

  const handleSubmit = async () => {
    if (!selectedTrackId || !selectedAgencyId) {
      setError('곡과 받는 사람을 선택해주세요.');
      return;
    }

    try {
      await createPitchingApi({
        trackId: selectedTrackId,
        agencyId: selectedAgencyId,
        description: description || undefined,
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Failed to create pitching:', error);
      if (error.response && error.response.data.code === 'DUPLICATED_PITCHING_REQUEST') {
        setError('이미 피칭한 곡입니다.');
      } else {
        setError('피칭 생성에 실패했습니다.');
      }
    }
  };

  // Track scroll event
  const handleTrackScroll = useCallback(() => {
    if (tracksEndRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tracksEndRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && trackStore.hasMore) {
        setTrackPage((prevPage) => prevPage + 1); // Update trackPage
      }
    }
  }, []);

  // Agency scroll event
  const handleAgencyScroll = useCallback(() => {
    if (agenciesEndRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = agenciesEndRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && agencyStore.hasMore) {
        setAgencyPage((prevPage) => prevPage + 1); // Update agencyPage
      }
    }
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(inputText);
      setCharCount(inputText.length);
    }
  };

  const handleTrackSelect = (trackId: number) => {
    setSelectedTrackId(trackId);
    setIsTrackOpen(false);
  };

  const handleAgencySelect = (agencyId: number) => {
    setSelectedAgencyId(agencyId);
    setIsAgencyOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">피칭</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2">곡</label>
          <button
            onClick={() => setIsTrackOpen(!isTrackOpen)}
            className="w-full p-2 border rounded"
          >
            {selectedTrackId
              ? trackStore.tracks.find(track => track.id === selectedTrackId)?.title || '곡 선택'
              : '피칭할 곡을 선택하세요'}
          </button>
          {isTrackOpen && (
            <div className="h-40 overflow-y-auto border mt-2" ref={tracksEndRef} onScroll={handleTrackScroll}>
              {trackStore.tracks.map(track => (
                <div
                  key={track.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleTrackSelect(track.id)}
                >
                  {track.title}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">받는 사람</label>
          <button
            onClick={() => setIsAgencyOpen(!isAgencyOpen)}
            className="w-full p-2 border rounded"
          >
            {selectedAgencyId
              ? agencyStore.agencies.find(agency => agency.id === selectedAgencyId)?.company || '받는 사람 선택'
              : '데모곡을 받는 사람을 선택하세요'}
          </button>
          {isAgencyOpen && (
            <div className="h-40 overflow-y-auto border mt-2" ref={agenciesEndRef} onScroll={handleAgencyScroll}>
              {agencyStore.agencies.map(agency => (
                <div
                  key={agency.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAgencySelect(agency.id)}
                >
                  {agency.company}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">설명</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className={`w-full p-2 border rounded ${
              charCount > MAX_DESCRIPTION_LENGTH * 0.9 ? 'border-yellow-500' : ''
            }`}
            rows={4}
            placeholder="(선택 사항) 메시지를 입력하세요. (최대 500자)"
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
          <div className={`text-sm mt-1 text-right 'text-gray-500'}`}>
            {charCount}/{MAX_DESCRIPTION_LENGTH}
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">취소</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white rounded">피칭하기</button>
        </div>
      </div>
    </div>
  );
});

export default PitchingModal;