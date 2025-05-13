
import { useEffect } from 'react';

export const usePageTransition = (duration = 300) => {
  useEffect(() => {
    // Add entry animation class to the main element
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.classList.add('animate-fade-in');
      
      // Remove the animation class after it completes
      const timer = setTimeout(() => {
        mainElement.classList.remove('animate-fade-in');
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
};

// Staggered animation for multiple elements
export const useStaggeredAnimation = (selector: string, staggerDelay = 100) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
      const htmlElement = el as HTMLElement;
      htmlElement.style.opacity = '0';
      htmlElement.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        htmlElement.style.transition = 'opacity 400ms ease, transform 400ms ease';
        htmlElement.style.opacity = '1';
        htmlElement.style.transform = 'translateY(0)';
      }, index * staggerDelay);
    });
    
    return () => {
      elements.forEach((el) => {
        const htmlElement = el as HTMLElement;
        htmlElement.style.opacity = '';
        htmlElement.style.transform = '';
        htmlElement.style.transition = '';
      });
    };
  }, [selector, staggerDelay]);
};
