
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarDays, 
  Users, 
  PlusCircle,
  ArrowRight
} from 'lucide-react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Property, Booking, Invitation } from '@/types/supabase';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState({
    properties: true,
    bookings: true,
    invitations: true
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch properties
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', user.id)
          .limit(5);

        if (propertiesError) throw propertiesError;
        setProperties(propertiesData);
        setLoading(prev => ({ ...prev, properties: false }));

        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('guest_id', user.id)
          .order('start_date', { ascending: true })
          .limit(5);

        if (bookingsError) throw bookingsError;
        setBookings(bookingsData);
        setLoading(prev => ({ ...prev, bookings: false }));

        // Fetch invitations
        const { data: invitationsData, error: invitationsError } = await supabase
          .from('invitations')
          .select('*')
          .eq('sender_id', user.id)
          .limit(5);

        if (invitationsError) throw invitationsError;
        setInvitations(invitationsData);
        setLoading(prev => ({ ...prev, invitations: false }));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Here's an overview of your properties and bookings.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate('/dashboard/properties/new')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Properties</CardTitle>
              <HomeIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading.properties ? <Skeleton className="h-8 w-16" /> : properties.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Properties you've added
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading.bookings ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  bookings.filter(b => new Date(b.start_date) > new Date()).length
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Your upcoming trips
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invitations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading.invitations ? <Skeleton className="h-8 w-16" /> : invitations.length}
              </div>
              <p className="text-xs text-muted-foreground">
                People you've invited
              </p>
            </CardContent>
          </Card>
        </div>

        {/* My Properties */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">My Properties</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm"
              onClick={() => navigate('/dashboard/properties')}
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          {loading.properties ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <CardHeader className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover-scale">
                  <div className="h-40 bg-gray-100 relative">
                    {property.image_url ? (
                      <img 
                        src={property.image_url} 
                        alt={property.title} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-gray-100">
                        <HomeIcon className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <CardDescription>
                      {property.city}{property.city && property.country ? ', ' : ''}{property.country}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="text-sm">
                      {property.price_per_night ? (
                        <span className="font-medium">${property.price_per_night}/night</span>
                      ) : (
                        <span className="text-muted-foreground">No price set</span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/dashboard/properties/${property.id}`)}
                    >
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="overflow-hidden border-dashed flex flex-col items-center justify-center p-6 h-full text-center">
                <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Add a new property</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  List your vacation home, apartment, or other space
                </p>
                <Button onClick={() => navigate('/dashboard/properties/new')}>
                  Add Property
                </Button>
              </Card>
            </div>
          ) : (
            <Card className="bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <HomeIcon className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">No properties yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-4">
                  Start by adding your first property to share with friends and family.
                </p>
                <Button onClick={() => navigate('/dashboard/properties/new')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Property
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Upcoming Bookings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Upcoming Bookings</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm"
              onClick={() => navigate('/dashboard/bookings')}
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          {loading.bookings ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Skeleton className="h-16 w-16 rounded-md mr-4" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-1/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : bookings.filter(b => new Date(b.start_date) > new Date()).length > 0 ? (
            <div className="space-y-4">
              {bookings
                .filter(b => new Date(b.start_date) > new Date())
                .slice(0, 5)
                .map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="sm:mr-4 mb-4 sm:mb-0">
                          <div className="bg-primary/10 text-primary p-3 rounded-md inline-flex">
                            <CalendarDays className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Upcoming trip</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/dashboard/bookings/${booking.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <Card className="bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <CalendarDays className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground text-center max-w-md mb-4">
                  Browse properties to book your next stay.
                </p>
                <Button onClick={() => navigate('/properties')}>
                  Browse Properties
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
