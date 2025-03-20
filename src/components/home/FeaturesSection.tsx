
import React, { useRef } from 'react';
import { Home, Mail, Users, Calendar } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

export const FeaturesSection = () => {
  const featuresRef = useRef<HTMLElement>(null);
  
  useAnimateOnScroll(featuresRef, '.feature-item', 'animate-slide-up');
  
  return (
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
  );
};
