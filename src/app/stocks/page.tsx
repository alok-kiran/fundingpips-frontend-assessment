import React, { lazy, Suspense } from 'react';

const Stocks = lazy(() => import('@/app/stocks/_components/Stocks'));

function StocksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <Stocks />
    </Suspense>
  )
}

export default StocksPage;
