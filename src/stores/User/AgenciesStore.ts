import { makeAutoObservable } from 'mobx';
import { AgencyItem } from '@/typings/User/User';
import { PagedData } from '@/typings/Service/Page';
import { getAgenciesApi } from '@/apis/User/useGetAgencies';

class AgencyStore {
  agencies: AgencyItem[] = [];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;
  hasMore = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAgencyData(pagedData: PagedData<AgencyItem>, append: boolean = false) {
    if (append) {
      this.agencies = [...this.agencies, ...pagedData.content];
    } else {
      this.agencies = pagedData.content;
    }
    this.currentPage = pagedData.page.number;
    this.totalPages = pagedData.page.totalPages;
    this.totalElements = pagedData.page.totalElements;
    this.pageSize = pagedData.page.size;

    if (this.currentPage < 0) {
      this.currentPage = 0;
    }

    this.hasMore = this.currentPage < this.totalPages - 1;
  }

  async fetchAgenciesWithInfiniteScroll(page: number) {
    if (page > this.totalPages + 1 || this.isLoading || !this.hasMore) {
        return;
    }

    this.isLoading = true;
    try {
      const response = await getAgenciesApi(page, this.pageSize);
      if (response.data.code === 'SUCCESS_NORMAL') {
        this.setAgencyData(response.data.data, true);
      } else {
        console.error('Failed to fetch agencies:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
    } finally {
      this.isLoading = false;
    }
  }

  reset() {
    this.agencies = [];
    this.currentPage = 0;
    this.hasMore = true;
    this.isLoading = false;
  }
}

export const agencyStore = new AgencyStore();
