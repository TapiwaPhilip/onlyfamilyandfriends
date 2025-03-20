
import React from 'react';

type FeatureCardProps = {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
};

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: FeatureCardProps) => {
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
