
import { useNavigate } from 'react-router-dom';
import { HomeIcon, PlusCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Property } from '@/types/supabase';

interface PropertyListProps {
  properties: Property[];
  loading: boolean;
}

export function PropertyList({ properties, loading }: PropertyListProps) {
  const navigate = useNavigate();

  return (
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
      
      {loading ? (
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
  );
}
