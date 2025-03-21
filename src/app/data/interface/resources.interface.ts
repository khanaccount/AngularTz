export interface Resources {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ResourcesResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Resources[];
}
