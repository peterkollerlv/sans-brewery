export type Brewery = {
  id: number;
  name: string;
  brewery_type: string;
  street?: string;
  address_2?: string;
  address_3?: string;
  city?: string;
  state?: string;
  county_province?: string;
  postal_code?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
  phone?: number;
  website_url?: string;
  updated_at?: Date;
  created_at: Date;
};
