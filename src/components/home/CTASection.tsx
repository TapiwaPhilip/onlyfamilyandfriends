
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSingleElementAnimation } from '@/hooks/useAnimateOnScroll';

export const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useSingleElementAnimation(ctaRef);
  
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto opacity-0" ref={ctaRef}>
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
  );
};
