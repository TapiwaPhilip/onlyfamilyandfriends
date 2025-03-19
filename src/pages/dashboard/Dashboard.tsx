
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

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { properties, bookings, invitations, loading, errors } = useDashboardData(user?.id);

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
