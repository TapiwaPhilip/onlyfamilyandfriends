
export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  image_url: string | null;
  price_per_night: number | null;
  max_guests: number | null;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  property_id: string;
  guest_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type Invitation = {
  id: string;
  sender_id: string;
  email: string;
  property_id: string | null;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  message: string;
  is_read: boolean;
  related_id: string | null;
  created_at: string;
};
