
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const heroImages = [
  '/placeholder.svg', 
  '/placeholder.svg', 
  '/placeholder.svg'
];

export const HeroSection = () => {
  return (
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
  );
};
