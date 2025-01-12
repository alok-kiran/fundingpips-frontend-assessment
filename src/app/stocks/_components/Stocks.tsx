"use client";
import React, { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { 
  fetchStocks, 
  sortStocksByName, 
  sortStocksByPrice, 
  sortStocksByChange, 
  sortStocksByPercentage, 
  sortStocksBySymbolName, 
  toggleFavorite, 
  filterByPrice, 
  filterByChange, 
  filterByFavorite, 
  filterByChangePercentage 
} from '../../../features/stocks/StockSlice';
import { TabButton } from './TabButton';
import { FilterModal } from './FilterModal';
import Image from 'next/image';
import StockTable from './StockTable';

function Stocks() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [nameSortOrder, setNameSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceSortOrder, setPriceSortOrder] = useState<'asc' | 'desc'>('asc');
  const [changeSortOrder, setChangeSortOrder] = useState<'asc' | 'desc'>('asc');
  const [percentageSortOrder, setPercentageSortOrder] = useState<'asc' | 'desc'>('asc');
  const [symbolSortOrder, setSymbolSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { stocks, error, totalPage, loading } = useAppSelector(state => state.stocks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStocks({ currentPage }));
  }, [dispatch, currentPage]);

  // Filtered stocks based on active tab
  const filteredStocks =
    activeTab === 'all'
      ? stocks
      : stocks.filter(stock => stock.isfavourite);

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSortByName = () => {
    const newOrder = nameSortOrder === 'asc' ? 'desc' : 'asc';
    setNameSortOrder(newOrder);
    dispatch(sortStocksByName(newOrder));
  };

  const handleSortByPrice = () => {
    const newOrder = priceSortOrder === 'asc' ? 'desc' : 'asc';
    setPriceSortOrder(newOrder);
    dispatch(sortStocksByPrice(newOrder));
  };

  const handleSortByChange = () => {
    const newOrder = changeSortOrder === 'asc' ? 'desc' : 'asc';
    setChangeSortOrder(newOrder);
    dispatch(sortStocksByChange(newOrder));
  };

  const handleSortByPercentage = () => {
    const newOrder = percentageSortOrder === 'asc' ? 'desc' : 'asc';
    setPercentageSortOrder(newOrder);
    dispatch(sortStocksByPercentage(newOrder));
  };

  const handleSortBySymbolName = () => {
    const newOrder = symbolSortOrder === 'asc' ? 'desc' : 'asc';
    setSymbolSortOrder(newOrder);
    dispatch(sortStocksBySymbolName(newOrder));
  };

  const handleToggleFavorite = (symbol: string) => {
    dispatch(toggleFavorite(symbol));
  };

  // ---- OPEN / CLOSE MODAL ----
  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  // ---- APPLY FILTERS ----
  const handleApplyFilters = (filters: {
    minPrice?: number;
    maxPrice?: number;
    minChange?: number;
    maxChange?: number;
    minPercentage?: number;
    maxPercentage?: number;
    favorite?: boolean;
  }) => {
    const {
      minPrice,
      maxPrice,
      minChange,
      maxChange,
      minPercentage,
      maxPercentage,
      favorite,
    } = filters;
    if (minPrice !== undefined || maxPrice !== undefined) {
      dispatch(filterByPrice({ min: minPrice ?? 0, max: maxPrice ?? Number.MAX_VALUE }));
    }
    if (minChange !== undefined || maxChange !== undefined) {
      dispatch(filterByChange({ min: minChange ?? 0, max: maxChange ?? Number.MAX_VALUE }));
    }
    if (minPercentage !== undefined || maxPercentage !== undefined) {
      dispatch(filterByChangePercentage({ min: minPercentage ?? 0, max: maxPercentage ?? Number.MAX_VALUE }));
    }
    if (favorite) {
      dispatch(filterByFavorite());
    }
  };

  const handleResetFilters = () => {
    dispatch(fetchStocks({ currentPage }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-white">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950/20 p-4 md:p-8 mt-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col space-y-6">
          <div className=' flex flex-row justify-start items-center gap-x-4'>
            <div>
                <Image src="/logo.svg" alt="logo" width={42} height={42} />
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900" data-cy="stock-page-title">Market Overview</h1>
          </div>
          
          <div className="border-b border-gray-200 flex flex-row justify-between items-center">
            <div className="flex space-x-8">
              <TabButton
                active={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
              >
                All Stocks
              </TabButton>
              <TabButton
                active={activeTab === 'favorites'}
                onClick={() => setActiveTab('favorites')}
              >
                Favorites
              </TabButton>
            </div>

            {activeTab === 'all' && (
              <div
                data-cy="filter-button"
                className="space-x-2 flex flex-row justify-between items-center cursor-pointer"
                onClick={openFilterModal}
              >
                <p>Filter Stocks</p>
                <SlidersHorizontal size={16} className="text-blue-700" />
              </div>
            )}
          </div>

          <StockTable
            data={filteredStocks}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handleSortByName={handleSortByName}
            handleSortByPrice={handleSortByPrice}
            handleSortByChange={handleSortByChange}
            handleSortByPercentage={handleSortByPercentage}
            handleSortBySymbolName={handleSortBySymbolName}
            handleToggleFavorite={handleToggleFavorite}
            currentPage={currentPage}
            totalPage={totalPage}
            activeTab={activeTab}
          />
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </div>
  );
}

export default Stocks;
