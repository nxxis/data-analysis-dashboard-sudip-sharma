import React from 'react';
import BrokenExamples from '@/components/BrokenExamples';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BrokenDemoPage = () => {
  return (
    <main className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Broken Demo — Week 8</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This page contains examples used in Week 8: skeleton loaders,
            memoization and an ErrorBoundary demo.
          </p>
          <BrokenExamples />
        </CardContent>
      </Card>
    </main>
  );
};

export default BrokenDemoPage;
