
import { useEffect } from 'react';

export const useAnimateOnScroll = (ref: React.RefObject<HTMLElement>, selector: string, animation = 'animate-slide-up') => {
  useEffect(() => {
    if (!ref.current) return;
    
    const elements = ref.current.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animation);
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [ref, selector, animation]);
};

export const useSingleElementAnimation = (ref: React.RefObject<HTMLElement>, animation = 'animate-fade-in') => {
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animation);
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, animation]);
};
