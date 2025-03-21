
import { useState, useEffect } from 'react';
import { Menu, X, Bell, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const NavLink = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => <Link to={href} className="group inline-flex items-center px-1 py-2 text-sm font-medium animated-link">
    {children}
  </Link>;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  // Effect to track scrolling for transparent/solid header transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return <>
      {/* Desktop Header */}
      <header className={cn("fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out", isScrolled ? "bg-white/80 border-b border-gray-200/50 blur-backdrop shadow-sm" : "bg-transparent")}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-display font-bold text-xl">
              Only Family<span className="text-primary"> & </span>Friends
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/how-it-works">How it works</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => navigate('/dashboard')}
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="gap-2"
                >
                  Dashboard
                </Button>
                <div 
                  className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => navigate('/dashboard/profile')}
                >
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={`${profile.first_name || ''} ${profile.last_name || ''}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign in
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden rounded-full p-2 text-gray-500 hover:bg-gray-100 focus:outline-none" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={cn("fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <span className="font-display font-bold text-xl">
            Only Family<span className="text-primary">and</span>Friends
          </span>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 focus:outline-none" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-4 py-6 space-y-2">
          <Link to="/how-it-works" className="block px-4 py-3 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
            How it works
          </Link>
          <Link to="/about" className="block px-4 py-3 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="block px-4 py-3 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block px-4 py-3 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/dashboard/profile" className="block px-4 py-3 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Button className="w-full" onClick={handleSignOut}>Sign out</Button>
              </div>
            </>
          ) : (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button 
                className="w-full mb-2" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/auth');
                }}
              >
                Sign up
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/auth');
                }}
              >
                Sign in
              </Button>
            </div>
          )}
        </nav>
      </div>
    </>;
}
