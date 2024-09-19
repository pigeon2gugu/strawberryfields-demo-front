import { makeAutoObservable } from 'mobx';
import { AgencyPitchingItem } from '@/typings/Pitching/Pitching';
import { getAgencyPitchingsApi } from '@/apis/Pitching/useGetAgencyPitchings';
import { PagedData } from '@/typings/Service/Page';
import { format, parse } from 'date-fns';
import { DATE_FORMAT } from '@/constants/Format';

class AgencyPitchingsStore {
  pitchings: AgencyPitchingItem[] = [];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  constructor() {
    makeAutoObservable(this);
  }

  setPitchingData(pagedData: PagedData<AgencyPitchingItem>) {
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
      const response = await getAgencyPitchingsApi(page - 1, this.pageSize);
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

export const agencyPitchingStore = new AgencyPitchingsStore();