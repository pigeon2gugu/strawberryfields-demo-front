// src/stores/trackStore.ts

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

  constructor() {
    makeAutoObservable(this);
  }

  setTrackData(pagedData: PagedData<TrackItem>) {
    this.tracks = pagedData.content;
    this.currentPage = pagedData.page.number;
    this.totalPages = pagedData.page.totalPages;
    this.totalElements = pagedData.page.totalElements;
    this.pageSize = pagedData.page.size;
  }

  async fetchTracks(page: number = 0) {
    try {
      const response = await getTracksApi(page);
      if (response.data.code === 'SUCCESS_NORMAL') {
        this.setTrackData(response.data.data);
      } else {
        console.error('Failed to fetch tracks:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  }
}

export const trackStore = new TrackStore();