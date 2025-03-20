
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Property, Booking, Invitation } from '@/types/supabase';
import { toast } from 'sonner';

interface DashboardData {
  properties: Property[];
  bookings: Booking[];
  invitations: Invitation[];
  loading: {
    properties: boolean;
    bookings: boolean;
    invitations: boolean;
  };
  errors: {
    properties: string | null;
    bookings: string | null;
    invitations: string | null;
  };
  refetch: () => Promise<void>;
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
  const [errors, setErrors] = useState({
    properties: null,
    bookings: null,
    invitations: null
  });

  const fetchData = useCallback(async () => {
    console.log('Fetching dashboard data for user ID:', userId);
    if (!userId) {
      // Reset loading states if there's no user ID
      console.log('No user ID provided or empty string, resetting loading states');
      setLoading({
        properties: false,
        bookings: false,
        invitations: false
      });
      
      // Clear any existing data
      setProperties([]);
      setBookings([]);
      setInvitations([]);
      return;
    }

    // Reset errors before fetching
    setErrors({
      properties: null,
      bookings: null,
      invitations: null
    });

    // Set loading states to true
    setLoading({
      properties: true,
      bookings: true,
      invitations: true
    });

    try {
      // Fetch properties
      console.log('Fetching properties for user ID:', userId);
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', userId)
        .limit(5);

      if (propertiesError) {
        console.error('Properties fetch error:', propertiesError);
        setErrors(prev => ({ ...prev, properties: 'Failed to load your properties. Please try again later.' }));
        toast.error("Error loading properties", {
          description: "We couldn't load your properties. Please try again later."
        });
      } else {
        console.log('Properties fetched successfully:', propertiesData);
        setProperties(propertiesData || []);
        setErrors(prev => ({ ...prev, properties: null }));
      }
      setLoading(prev => ({ ...prev, properties: false }));

      // Fetch bookings
      console.log('Fetching bookings for user ID:', userId);
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('guest_id', userId)
        .order('start_date', { ascending: true })
        .limit(5);

      if (bookingsError) {
        console.error('Bookings fetch error:', bookingsError);
        setErrors(prev => ({ ...prev, bookings: 'Failed to load your bookings. Please try again later.' }));
        toast.error("Error loading bookings", {
          description: "We couldn't load your upcoming bookings. Please try again later."
        });
      } else {
        console.log('Bookings fetched successfully:', bookingsData);
        // Cast the status to the appropriate type
        const typedBookings = bookingsData ? bookingsData.map(booking => ({
          ...booking,
          status: booking.status as Booking['status']
        })) : [];
        
        setBookings(typedBookings);
        setErrors(prev => ({ ...prev, bookings: null }));
      }
      setLoading(prev => ({ ...prev, bookings: false }));

      // Fetch invitations
      console.log('Fetching invitations for user ID:', userId);
      const { data: invitationsData, error: invitationsError } = await supabase
        .from('invitations')
        .select('*')
        .eq('sender_id', userId)
        .limit(5);

      if (invitationsError) {
        console.error('Invitations fetch error:', invitationsError);
        setErrors(prev => ({ ...prev, invitations: 'Failed to load your invitations. Please try again later.' }));
        toast.error("Error loading invitations", {
          description: "We couldn't load your invitations. Please try again later."
        });
      } else {
        console.log('Invitations fetched successfully:', invitationsData);
        // Cast the status to the appropriate type
        const typedInvitations = invitationsData ? invitationsData.map(invitation => ({
          ...invitation,
          status: invitation.status as Invitation['status']
        })) : [];
        
        setInvitations(typedInvitations);
        setErrors(prev => ({ ...prev, invitations: null }));
      }
      setLoading(prev => ({ ...prev, invitations: false }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error("Error loading dashboard", {
        description: "Something went wrong. Please try refreshing the page."
      });
      
      // Set all loading states to false on error
      setLoading({
        properties: false,
        bookings: false,
        invitations: false
      });
    }
  }, [userId]);

  // Initial data fetch
  useEffect(() => {
    if (userId) {
      console.log('Initial data fetch for user ID:', userId);
      fetchData();
    }
  }, [fetchData, userId]);

  return { properties, bookings, invitations, loading, errors, refetch: fetchData };
}
