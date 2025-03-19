
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Property, Booking, Invitation } from '@/types/supabase';

interface DashboardData {
  properties: Property[];
  bookings: Booking[];
  invitations: Invitation[];
  loading: {
    properties: boolean;
    bookings: boolean;
    invitations: boolean;
  };
}

export function useDashboardData(userId: string | undefined): DashboardData {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState({
    properties: true,
    bookings: true,
    invitations: true
  });

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Fetch properties
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', userId)
          .limit(5);

        if (propertiesError) throw propertiesError;
        setProperties(propertiesData as Property[]);
        setLoading(prev => ({ ...prev, properties: false }));

        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('guest_id', userId)
          .order('start_date', { ascending: true })
          .limit(5);

        if (bookingsError) throw bookingsError;
        
        // Cast the status to the appropriate type
        const typedBookings = bookingsData.map(booking => ({
          ...booking,
          status: booking.status as Booking['status']
        }));
        
        setBookings(typedBookings);
        setLoading(prev => ({ ...prev, bookings: false }));

        // Fetch invitations
        const { data: invitationsData, error: invitationsError } = await supabase
          .from('invitations')
          .select('*')
          .eq('sender_id', userId)
          .limit(5);

        if (invitationsError) throw invitationsError;
        
        // Cast the status to the appropriate type
        const typedInvitations = invitationsData.map(invitation => ({
          ...invitation,
          status: invitation.status as Invitation['status']
        }));
        
        setInvitations(typedInvitations);
        setLoading(prev => ({ ...prev, invitations: false }));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return { properties, bookings, invitations, loading };
}
