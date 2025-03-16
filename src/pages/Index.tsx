
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Home, Mail, Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Hero images - we will add mock images for the purposes of wireframing
const heroImages = [
  '/placeholder.svg', 
  '/placeholder.svg', 
  '/placeholder.svg'
];

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="p-6 rounded-xl bg-white border border-gray-200 hover-scale smooth-transition">
      <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-display text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

const animateOnScroll = (elements: NodeListOf<Element>) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
        entry.target.classList.remove('opacity-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    observer.observe(el);
  });
};

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up animation observers
    if (featuresRef.current) {
      const features = featuresRef.current.querySelectorAll('.feature-item');
      animateOnScroll(features);
    }

    // Animate the CTA section
    if (ctaRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(ctaRef.current);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
                <span className="font-medium">Now in beta</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Rent places from your <span className="text-primary">friends & family</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                An invite-only booking platform for your place. Simplify coordination for family holiday homes and share with trusted friends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  Get started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn more
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                <div className="grid grid-cols-2 gap-2 absolute inset-0 p-3">
                  <div className="col-span-2 h-40 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={heroImages[0]} 
                      alt="Holiday home" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={heroImages[1]} 
                      alt="Holiday home interior" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={heroImages[2]} 
                      alt="Holiday home garden" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 blur-backdrop">
                <div className="relative bg-white/90 rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">Booking confirmed!</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Your stay at Mountain Cabin has been confirmed for July 12-19.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              OnlyFamilyandFriends provides a simple way to manage and book shared properties
              with the people who matter most to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-item opacity-0">
              <FeatureCard
                icon={Home}
                title="List your property"
                description="Add your holiday home or apartment with photos, descriptions, and all the essential details."
              />
            </div>
            <div className="feature-item opacity-0" style={{ transitionDelay: '0.1s' }}>
              <FeatureCard
                icon={Mail}
                title="Invite your people"
                description="Send email invitations to family members and trusted friends who you want to share your space with."
              />
            </div>
            <div className="feature-item opacity-0" style={{ transitionDelay: '0.2s' }}>
              <FeatureCard
                icon={Calendar}
                title="Manage bookings"
                description="View, accept or decline booking requests with our simple dashboard. No overlapping reservations."
              />
            </div>
            <div className="feature-item opacity-0" style={{ transitionDelay: '0.3s' }}>
              <FeatureCard
                icon={Users}
                title="Share with confidence"
                description="Only invited users can see and book your property, ensuring your space is shared only with people you trust."
              />
            </div>
            <div className="feature-item opacity-0" style={{ transitionDelay: '0.4s' }}>
              <FeatureCard
                icon={Mail}
                title="Get notified"
                description="Receive instant notifications for booking requests, confirmations, and other important updates."
              />
            </div>
            <div className="feature-item opacity-0" style={{ transitionDelay: '0.5s' }}>
              <FeatureCard
                icon={Calendar}
                title="Easy scheduling"
                description="View availability calendar to plan ahead and avoid those long WhatsApp conversations about dates."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" ref={ctaRef}>
        <div className="max-w-4xl mx-auto opacity-0">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to simplify your property sharing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join OnlyFamilyandFriends today and transform how you coordinate family holiday homes and shared spaces.
            </p>
            <Button size="lg" className="gap-2">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
