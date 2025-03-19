
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!userId) {
      // Reset loading states if there's no user ID
      setLoading({
        properties: false,
        bookings: false,
        invitations: false
      });
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch properties
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', userId)
          .limit(5);

        if (propertiesError) {
          setErrors(prev => ({ ...prev, properties: 'Failed to load your properties. Please try again later.' }));
          toast.error("Error loading properties", {
            description: "We couldn't load your properties. Please try again later."
          });
          console.error('Properties fetch error:', propertiesError);
        } else {
          setProperties(propertiesData as Property[] || []);
          setErrors(prev => ({ ...prev, properties: null }));
        }
        setLoading(prev => ({ ...prev, properties: false }));

        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('guest_id', userId)
          .order('start_date', { ascending: true })
          .limit(5);

        if (bookingsError) {
          setErrors(prev => ({ ...prev, bookings: 'Failed to load your bookings. Please try again later.' }));
          toast.error("Error loading bookings", {
            description: "We couldn't load your upcoming bookings. Please try again later."
          });
          console.error('Bookings fetch error:', bookingsError);
        } else {
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
        const { data: invitationsData, error: invitationsError } = await supabase
          .from('invitations')
          .select('*')
          .eq('sender_id', userId)
          .limit(5);

        if (invitationsError) {
          setErrors(prev => ({ ...prev, invitations: 'Failed to load your invitations. Please try again later.' }));
          toast.error("Error loading invitations", {
            description: "We couldn't load your invitations. Please try again later."
          });
          console.error('Invitations fetch error:', invitationsError);
        } else {
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
    };

    fetchData();
  }, [userId]);

  return { properties, bookings, invitations, loading, errors };
}
