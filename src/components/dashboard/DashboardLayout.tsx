import { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  Mail, 
  Settings,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { NotificationList } from './NotificationList';
import { useNotifications } from '@/hooks/useNotifications';

interface DashboardLayoutProps {
  children: ReactNode;
}

const NavItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </NavLink>
);

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, profile, signOut, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { notifications, loading: notificationsLoading, error: notificationsError, unreadCount, markAsRead, markAllAsRead } = useNotifications(user?.id);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 flex">
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-5">
                <Skeleton className="h-8 w-40" />
              </div>
              <div className="px-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-1 flex-col lg:pl-64">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <main className="flex-1 pb-8 px-4 sm:px-6 lg:px-8">
              <div className="py-6">
                <Skeleton className="h-10 w-1/3 mb-6" />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex">
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <span className="font-display font-bold text-xl">
                Only Family<span className="text-primary"> & </span>Friends
              </span>
            </div>
            <div className="mt-2 flex flex-col flex-1 px-3 space-y-1">
              <NavItem to="/dashboard" icon={Home} label="Dashboard" />
              <NavItem to="/dashboard/properties" icon={Home} label="My Properties" />
              <NavItem to="/dashboard/bookings" icon={Calendar} label="My Bookings" />
              <NavItem to="/dashboard/invitations" icon={Mail} label="Invitations" />
              <NavItem to="/dashboard/profile" icon={User} label="Profile" />
              <NavItem to="/dashboard/settings" icon={Settings} label="Settings" />
              
              <div className="mt-auto pt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-display font-bold text-xl">
                  Only Family<span className="text-primary"> & </span>Friends
                </span>
                <SheetClose className="rounded-full p-1 hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </SheetClose>
              </div>
              <div className="flex-1 overflow-auto py-2 px-3 space-y-1">
                <NavItem 
                  to="/dashboard" 
                  icon={Home} 
                  label="Dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem 
                  to="/dashboard/properties" 
                  icon={Home} 
                  label="My Properties" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem 
                  to="/dashboard/bookings" 
                  icon={Calendar} 
                  label="My Bookings" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem 
                  to="/dashboard/invitations" 
                  icon={Mail} 
                  label="Invitations" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem 
                  to="/dashboard/profile" 
                  icon={User} 
                  label="Profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem 
                  to="/dashboard/settings" 
                  icon={Settings} 
                  label="Settings" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
              <div className="p-3 border-t">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-2 sm:px-6 lg:px-8 flex items-center justify-between">
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open sidebar</span>
              </Button>
            </SheetTrigger>
            
            <div className="flex items-center space-x-4">
              <NotificationList 
                notifications={notifications}
                loading={notificationsLoading}
                error={notificationsError}
                unreadCount={unreadCount}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={`${profile.first_name || ''} ${profile.last_name || ''}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div className="ml-2 hidden md:flex flex-col">
                  <span className="text-sm font-medium">
                    {profile?.first_name} {profile?.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto pb-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
