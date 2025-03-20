
import { useNavigate } from 'react-router-dom';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PropertyList } from '@/components/dashboard/PropertyList';
import { BookingList } from '@/components/dashboard/BookingList';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  console.log('Dashboard rendering. Auth state:', { user, authLoading });

  // Use an empty string as fallback when user is not defined
  const userId = user?.id || '';
  const { properties, bookings, invitations, loading, errors, refetch } = useDashboardData(userId);

  // Debug logs
  console.log('Auth state:', { user, authLoading });
  console.log('Dashboard data:', { properties, bookings, invitations, loading, errors });

  // Redirect to auth page if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      console.log('User not authenticated, redirecting to auth page');
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Refetch data when user changes or signs in
  useEffect(() => {
    if (user) {
      console.log('User authenticated, fetching dashboard data');
      refetch();
    }
  }, [user, refetch]);

  // Function to render error alerts
  const renderErrorAlert = (error: string | null, title: string) => {
    if (!error) return null;
    
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  };

  // If still loading auth state, show loading UI
  if (authLoading) {
    console.log('Auth is loading, showing skeleton UI');
    return (
      <DashboardLayout>
        <div className="py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
          <Skeleton className="h-64 rounded-lg mb-8" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </DashboardLayout>
    );
  }

  // If no user, Auth redirect will happen via useEffect
  if (!user) {
    console.log('No user found, returning null');
    return null;
  }

  // If data is loading but user is authenticated, show a simpler loading state
  if (loading.properties || loading.bookings || loading.invitations) {
    console.log('Dashboard data is loading, showing progress toast');
    toast.info('Loading your dashboard data...');
  }

  console.log('Rendering full dashboard UI');
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! Here's an overview of your properties and bookings.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate('/dashboard/properties/new')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>

        {/* Error displays */}
        {renderErrorAlert(errors.properties, "Properties Error")}
        {renderErrorAlert(errors.bookings, "Bookings Error")}
        {renderErrorAlert(errors.invitations, "Invitations Error")}

        {/* Overview cards */}
        <DashboardStats 
          properties={properties}
          bookings={bookings}
          invitations={invitations}
          loading={loading}
        />

        {/* My Properties */}
        <PropertyList 
          properties={properties}
          loading={loading.properties}
        />

        {/* Upcoming Bookings */}
        <BookingList 
          bookings={bookings}
          loading={loading.bookings}
        />
      </div>
    </DashboardLayout>
  );
}
