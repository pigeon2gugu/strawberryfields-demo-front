export interface ComposerPitchingItem {
    id: number;
    title: string;
    company: string;
    createdAt: string;
  }

export interface CreatePitchingRequest {
    trackId: number;
    agencyId: number;
    description?: string;
  }
  
export interface CreatePitchingResponse {
      id: number;
  }
