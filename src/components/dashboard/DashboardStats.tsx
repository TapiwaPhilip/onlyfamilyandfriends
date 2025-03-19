
import { HomeIcon, CalendarDays, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Property, Booking, Invitation } from '@/types/supabase';

interface DashboardStatsProps {
  properties: Property[];
  bookings: Booking[];
  invitations: Invitation[];
  loading: {
    properties: boolean;
    bookings: boolean;
    invitations: boolean;
  };
}

export function DashboardStats({ properties, bookings, invitations, loading }: DashboardStatsProps) {
  return (
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
  );
}
