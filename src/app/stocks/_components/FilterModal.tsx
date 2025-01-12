"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    minPrice?: number;
    maxPrice?: number;
    minChange?: number;
    maxChange?: number;
    minPercentage?: number;
    maxPercentage?: number;
    favorite?: boolean;
  }) => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset,
}) => {
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minChange, setMinChange] = useState<number | undefined>();
  const [maxChange, setMaxChange] = useState<number | undefined>();
  const [minPercentage, setMinPercentage] = useState<number | undefined>();
  const [maxPercentage, setMaxPercentage] = useState<number | undefined>();
  const [favorite, setFavorite] = useState(false);

  const handleApply = () => {
    onApply({
      minPrice,
      maxPrice,
      minChange,
      maxChange,
      minPercentage,
      maxPercentage,
      favorite,
    });
    onClose();
  };

  const handleReset = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinChange(undefined);
    setMaxChange(undefined);
    setMinPercentage(undefined);
    setMaxPercentage(undefined);
    setFavorite(false);

    onReset();
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-md" data-cy="filter-modal">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Filter Stocks
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block font-semibold mb-2">Price Range</label>
            <div className="flex space-x-2">
              <Input
                data-cy="min-price"
                type="number"
                placeholder="Min"
                className=" px-2 py-1 w-full "
                value={minPrice === undefined ? "" : minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <Input
                data-cy="max-price"
                type="number"
                placeholder="Max"
                className=" px-2 py-1 w-full "
                value={maxPrice === undefined ? "" : maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Change Range</label>
            <div className="flex space-x-2">
              <Input
                data-cy="min-change"
                type="number"
                placeholder="Min"
                className=" px-2 py-1 w-full "
                value={minChange === undefined ? "" : minChange}
                onChange={(e) => setMinChange(Number(e.target.value))}
              />
              <Input
                data-cy="max-change"
                type="number"
                placeholder="Max"
                className=" px-2 py-1 w-full "
                value={maxChange === undefined ? "" : maxChange}
                onChange={(e) => setMaxChange(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Change Percentage Range
            </label>
            <div className="flex space-x-2">
              <Input
                data-cy="min-percentage"
                type="number"
                placeholder="Min %"
                className=" px-2 py-1 w-full "
                value={minPercentage === undefined ? "" : minPercentage}
                onChange={(e) => setMinPercentage(Number(e.target.value))}
              />
              <Input
                data-cy="max-percentage"
                type="number"
                placeholder="Max %"
                className=" px-2 py-1 w-full "
                value={maxPercentage === undefined ? "" : maxPercentage}
                onChange={(e) => setMaxPercentage(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              data-cy="favorite"
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
            <label>Favorite Only</label>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3">
            <Button onClick={handleReset} variant={'secondary'} data-cy="reset-filters">
                Reset
            </Button>
          <Button onClick={handleApply} data-cy="apply-filters">
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
