export interface IAppStoreState {
  auto_download: boolean;
  request_interval: number;
  export_format: string;
  export_fields: string[];
  /** Optional self-hosted backend used for website contact enrichment. */
  backend_url?: string;
  /** Before export, fill missing email/phone by scraping each business website. */
  enrich_missing?: boolean;
  /** Skip collecting location (lat/long/address) data during extraction. */
  collect_location?: boolean;
}

export interface IExtractWebsiteResult {
  data: {
    url: string;
    email?: string;
    emails?: string[];
    socials?: string[];
    phones?: string[];
  }[];
  results: number;
  permissionMissing?: boolean;
}
