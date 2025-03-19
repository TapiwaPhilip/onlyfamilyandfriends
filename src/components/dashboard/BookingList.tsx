
import { useNavigate } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Booking } from '@/types/supabase';

interface BookingListProps {
  bookings: Booking[];
  loading: boolean;
}

export function BookingList({ bookings, loading }: BookingListProps) {
  const navigate = useNavigate();
  const upcomingBookings = bookings.filter(b => new Date(b.start_date) > new Date());

  return (
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
      
      {loading ? (
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
      ) : upcomingBookings.length > 0 ? (
        <div className="space-y-4">
          {upcomingBookings
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
  );
}
