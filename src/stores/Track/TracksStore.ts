import { makeAutoObservable } from 'mobx';
import { TrackItem } from '@/typings/Track/track';
import { PagedData } from '@/typings/Service/Page';
import { getTracksApi } from '@/apis/Track/useGetTracks';

class TrackStore {
  tracks: TrackItem[] = [];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;
  hasMore = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTrackData(pagedData: PagedData<TrackItem>, append: boolean = false) {
    if (append) {
      this.tracks = [...this.tracks, ...pagedData.content];
    } else {
      this.tracks = pagedData.content;
    }
    this.currentPage = pagedData.page.number;
    this.totalPages = pagedData.page.totalPages;
    this.totalElements = pagedData.page.totalElements;
    this.pageSize = pagedData.page.size;

    if (this.currentPage < 0) {
        this.currentPage = 0;
      }

  }


  async fetchTracksWithPagination(page: number) {
    try {
      const response = await getTracksApi(page, this.pageSize);
      if (response.data.code === 'SUCCESS_NORMAL') {
        this.setTrackData(response.data.data, false);
      } else {
        console.error('Failed to fetch tracks:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  }

  async fetchTracksWithInfiniteScroll(page: number = 1) {
    if (page != 1 && (page > this.totalPages || this.isLoading || !this.hasMore)) {
        return;
    }

    this.isLoading = true;
    try {
      const response = await getTracksApi(page, this.pageSize);
      if (response.data.code === 'SUCCESS_NORMAL') {
        this.setTrackData(response.data.data, true);
      } else {
        console.error('Failed to fetch tracks:', response.data.message);
        this.hasMore = false;
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      this.hasMore = false;
    } finally {
      this.isLoading = false;
    }
  }

  reset() {
    this.tracks = [];
    this.currentPage = 0;
    this.hasMore = true;
    this.isLoading = false;
  }
}

export const trackStore = new TrackStore();