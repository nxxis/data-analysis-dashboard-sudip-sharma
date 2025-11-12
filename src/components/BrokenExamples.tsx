import React, { useMemo, useState, useCallback } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Button } from './ui/button';

// Small demo component showcasing an intentional error, a skeleton loader simulation,
// and a memoization example for Week 8 polishing exercises.
const HeavyList = React.memo(({ items }: { items: number[] }) => {
  // Simulate an expensive computation per render
  const computed = useMemo(() => {
    // pretend this is expensive
    return items.map((n) => ({ n, squared: n * n }));
  }, [items]);

  return (
    <div className="space-y-1">
      {computed.map((row) => (
        <div key={row.n} className="text-sm text-gray-700">
          {row.n} → {row.squared}
        </div>
      ))}
    </div>
  );
});

const BrokenExamples = () => {
  const [throwError, setThrowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(5);

  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => i + 1),
    [count]
  );

  const startLoading = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }, []);

  if (throwError) {
    // Intentionally throw to demonstrate ErrorBoundary
    throw new Error('💥 Intentional demo error from BrokenExamples');
  }

  return (
    <div className="space-y-6">
      <section>
        <h3 className="font-semibold">Skeleton / Loading Demo</h3>
        <p className="text-sm text-muted-foreground">
          Simulates a short loading state.
        </p>
        <div className="mt-2">
          <Button onClick={startLoading} disabled={loading}>
            {loading ? 'Loading...' : 'Simulate Load'}
          </Button>
        </div>
        {loading && (
          <div className="mt-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        )}
      </section>

      <section>
        <h3 className="font-semibold">Memoization / Heavy List Demo</h3>
        <p className="text-sm text-muted-foreground">
          Change the list length to see memoized updates.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Button onClick={() => setCount((c) => Math.max(1, c - 1))}>-</Button>
          <div className="text-sm">Items: {count}</div>
          <Button onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>
        <div className="mt-3">
          <HeavyList items={items} />
        </div>
      </section>

      <section>
        <h3 className="font-semibold">Error Boundary Demo</h3>
        <p className="text-sm text-muted-foreground">
          Click to trigger an intentional error and observe ErrorBoundary
          behavior.
        </p>
        <div className="mt-2">
          <Button variant="destructive" onClick={() => setThrowError(true)}>
            Trigger Error
          </Button>
        </div>
      </section>
    </div>
  );
};

const BrokenExamplesWithBoundary = () => (
  <ErrorBoundary>
    <BrokenExamples />
  </ErrorBoundary>
);

export default BrokenExamplesWithBoundary;
