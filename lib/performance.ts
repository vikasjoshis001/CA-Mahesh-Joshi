// Performance monitoring utilities

// Report Web Vitals to console in development
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}

// Prefetch important routes
export function prefetchRoutes() {
  if (typeof window !== 'undefined') {
    const router = require('next/router').default;
    // Prefetch important pages
    router.prefetch('/about');
    router.prefetch('/services');
    router.prefetch('/contact');
  }
}

// Lazy load components with loading state
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: { ssr?: boolean }
) {
  const LazyComponent = require('react').lazy(importFunc);
  return LazyComponent;
}
