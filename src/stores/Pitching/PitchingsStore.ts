import { makeAutoObservable } from 'mobx';
import { ComposerPitchingItem } from '@/typings/Pitching/Pitching';
import { PagedData } from '@/typings/Service/Page';
import { getPitchingsApi } from '@/apis/Pitching/useGetComposerPitchings';
import { format, parse } from 'date-fns';
import { DATE_FORMAT } from '@/constants/Format';

class PitchingStore {
  pitchings: ComposerPitchingItem[] = [];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  constructor() {
    makeAutoObservable(this);
  }

  setPitchingData(pagedData: PagedData<ComposerPitchingItem>) {
    this.pitchings = pagedData.content.map(item => ({
      ...item,
      createdAt: format(parse(item.createdAt, 'yyyy-MM-dd HH:mm:ss', new Date()), DATE_FORMAT)
    }));
    this.currentPage = pagedData.page.number;
    this.totalPages = pagedData.page.totalPages;
    this.totalElements = pagedData.page.totalElements;
    this.pageSize = pagedData.page.size;
  }

  async fetchPitchings(page: number) {
    try {
      const response = await getPitchingsApi(page, this.pageSize);
      if (response.data.code === 'SUCCESS_NORMAL') {
        this.setPitchingData(response.data.data);
      } else {
        console.error('Failed to fetch pitchings:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching pitchings:', error);
    }
  }
}

export const pitchingStore = new PitchingStore();
