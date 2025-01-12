"use client";
import React from 'react';
import { ArrowUpDown, Star, TrendingDown, TrendingUp,
   //ArrowRightCircleIcon, 
   //ArrowLeftCircleIcon
   } from 'lucide-react';
import { Stock } from '@/types/stock';
//import { cn } from '@/lib/utils';

interface StockTableProps {
  data: Stock[];
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleSortByName: () => void;
  handleSortByPrice: () => void;
  handleSortByChange: () => void; 
  handleSortByPercentage: () => void;
  handleSortBySymbolName: () => void;
  handleToggleFavorite: (symbol: string) => void;
  currentPage: number;
  totalPage: number;
  activeTab: string;
}

const StockTable = ({ 
  data, 
  //handleNextPage, 
  //handlePreviousPage, 
  handleSortByName, 
  handleSortByPrice, 
  handleSortByChange, 
  handleSortByPercentage, 
  handleSortBySymbolName,
  handleToggleFavorite,
  //currentPage,
  //totalPage,
  //activeTab,
}: StockTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr className=' cursor-pointer'>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={handleSortBySymbolName}>
              <div className="flex items-center space-x-1">
              <div className="flex items-center justify-end space-x-1">
                <span>Symbol</span>
                <ArrowUpDown size={14} className="text-blue-700" />
              </div>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={handleSortByName}>
            <div className="flex items-center space-x-1">
              <div className="flex items-center justify-end space-x-1">
                <span>Company</span>
                <ArrowUpDown size={14} className="text-blue-700 font-bold" />
              </div>
              </div>
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={handleSortByPrice}>
              <div className="flex items-center justify-end space-x-1">
                <span>Price</span>
                <ArrowUpDown size={14} className="text-blue-700 font-bold" />
              </div>
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={handleSortByChange}>
            <div className="flex items-center justify-end space-x-1">
                <span>Change</span>
                <ArrowUpDown size={14} className="text-blue-700 font-bold" />
              </div>
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell" onClick={handleSortByPercentage}>
              <div className="flex items-center justify-end space-x-1">
                <span>% Change</span>
                <ArrowUpDown size={14} className="text-blue-700 font-bold" />
              </div>
            </th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-10">Favorite</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((stock) => {
            const isPositive = parseFloat(stock.change_percentage) > 0;
            return (
              <tr key={stock.id} className="hover:bg-gray-50">
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{stock.company_symbol}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-gray-700">{stock.company}</span>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                  <span className="font-medium text-gray-900">${stock.price}</span>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-1">
                    {parseFloat(stock.change_amount) >= 0 ? (
                      <TrendingUp size={16} className="text-green-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                    <span
                      className={`font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stock.change_amount?.replace("-", "")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap hidden sm:table-cell">
                <div className="flex items-center justify-end space-x-1">
                    {isPositive ? (
                      <TrendingUp size={16} className="text-green-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                    <span
                      className={`font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stock.change_percentage?.replace("-", "")}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center cursor-pointer" onClick={() => handleToggleFavorite(stock.company_symbol)}>
                  {stock.isfavourite ? (
                    <Star size={18} className="text-yellow-400 inline-block" style={{
                      fill: 'currentColor'
                    }} />
                  ) : (
                    <Star size={18} className="text-gray-300 inline-block" />
                  )}
                </td>
              </tr>
            );
          })}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {
        /* Pagination: change ,it true to support pagination. Also in stockSlice make limit as 10 */
      }
      {/* {false && (
     <div className="flex md:justify-end justify-between items-center px-6 py-4 bg-gray-50 gap-x-4">
       
     <button
       disabled={currentPage === 1}
       onClick={handlePreviousPage}
       className='px-4 py-2 text-sm text-white font-bold'
     >
       <div className={cn('flex items-center space-x-1 justify-center', currentPage === 1 ? 'text-gray-400' : 'text-black')}>
        <ArrowLeftCircleIcon size={32} className="inline-block " />
       </div>
     </button>
     <button
       disabled={currentPage === totalPage}
       onClick={handleNextPage}
       className='px-4 py-2 text-sm text-white font-bold'
     >
        <div className={cn('flex items-center space-x-1 justify-center', currentPage === totalPage ? 'text-gray-400' : 'text-black')}>
          <ArrowRightCircleIcon size={32} className="inline-block" />
        </div>
     </button>
     </div>
      )} */}

    </div>
  );
}

export default React.memo(StockTable);