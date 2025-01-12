import reducer, {
    setStocks,
    sortStocksByPrice,
    sortStocksByName,
    sortStocksByChange,
    sortStocksByPercentage,
    sortStocksBySymbolName,
    toggleFavorite,
    filterByPrice,
    filterByChange,
    filterByFavorite,
    filterByChangePercentage,
    fetchStocks,
  } from "@/features/stocks/StockSlice";
  
  import { Stock } from "@/types/stock";
  import { AnyAction } from "@reduxjs/toolkit";
  
  describe("stockSlice", () => {
    const initialState = {
      loading: false,
      stocks: [] as Stock[],
      error: "",
      totalPage: 0,
    };
  
    function getStateAfterAction(action: AnyAction, state = initialState) {
      return reducer(state, action);
    }

    const mockStocks: Stock[] = [
      {
        id: "1",
        company_symbol: "AAPL",
        company: "Apple Inc.",
        price: "175.50",
        change_amount: "-2.40",
        change_percentage: "-1.35",
        isfavourite: false,
        category: "most_actively_traded",
        volume: "2345678",
      },
      {
        id: "2",
        company_symbol: "GOOGL",
        company: "Alphabet Inc.",
        price: "2800.20",
        change_amount: "5.60",
        change_percentage: "0.20",
        isfavourite: true,
        category: "most_actively_traded",
        volume: "2345678",
      },
      {
        id: "3",
        company_symbol: "MSFT",
        company: "Microsoft Corp.",
        price: "300.00",
        change_amount: "10.00",
        change_percentage: "3.45",
        isfavourite: false,
        category: "most_actively_traded",
        volume: "2345678",
      },
    ];
  
    it("should return the initial state on first run", () => {
      const nextState = reducer(undefined, { type: "unknown_action" });
      expect(nextState).toEqual(initialState);
    });
  
    it("should set stocks using setStocks", () => {
      const nextState = getStateAfterAction(setStocks(mockStocks));
      expect(nextState.stocks).toHaveLength(3);
      expect(nextState.stocks[0].company_symbol).toBe("AAPL");
    });
  
    it("should toggle loading true when fetchStocks.pending is dispatched", () => {
      const action = { type: fetchStocks.pending.type };
      const nextState = getStateAfterAction(action);
      expect(nextState.loading).toBe(true);
    });
  
    it("should handle fetchStocks.fulfilled", () => {
      const action = {
        type: fetchStocks.fulfilled.type,
        payload: {
          paginatedData: mockStocks,
          totalPage: 5,
        },
      };
      const nextState = getStateAfterAction(action, {
        ...initialState,
        loading: true,
      });
  
      expect(nextState.loading).toBe(false);
      expect(nextState.stocks).toHaveLength(3);
      expect(nextState.totalPage).toBe(5);
      expect(nextState.error).toBe("");
    });
  
    it("should handle fetchStocks.rejected", () => {
      const action = {
        type: fetchStocks.rejected.type,
        error: { message: "Failed to fetch" },
      };
      const nextState = getStateAfterAction(action, {
        ...initialState,
        loading: true,
      });
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe("Failed to fetch");
    });
  
    it("should sort stocks by price ascending", () => {
      const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
      const action = sortStocksByPrice("asc");
      const nextState = getStateAfterAction(action, stateWithStocks);
  
      expect(nextState.stocks[0].company_symbol).toBe("AAPL");
      expect(nextState.stocks[1].company_symbol).toBe("MSFT"); 
      expect(nextState.stocks[2].company_symbol).toBe("GOOGL"); 
    });
  
    it("should sort stocks by symbol descending", () => {
      const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
      const action = sortStocksByName("desc");
      const nextState = getStateAfterAction(action, stateWithStocks);
  
      expect(nextState.stocks[0].company_symbol).toBe("MSFT");
      expect(nextState.stocks[1].company_symbol).toBe("AAPL");
      expect(nextState.stocks[2].company_symbol).toBe("GOOGL");
    });
  
    it("should sort stocks by symbol descending", () => {
      const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
      const action = sortStocksBySymbolName("desc");
      const nextState = getStateAfterAction(action, stateWithStocks);
  
      // Asc by symbol: AAPL -> GOOGL -> MSFT
      expect(nextState.stocks.map((s) => s.company_symbol)).toEqual([
        "MSFT",
        "GOOGL",
        "AAPL",
      ]);
    });

  
    it("should toggle favorite with toggleFavorite", () => {
      const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
      const action = toggleFavorite("AAPL");
      const nextState = getStateAfterAction(action, stateWithStocks);

      const aapl = nextState.stocks.find((s) => s.company_symbol === "AAPL");
      expect(aapl?.isfavourite).toBe(true);
    });
  
    it("should filter by price range with filterByPrice", () => {
      const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
      const action = filterByPrice({ min: 200, max: 1000 });
      const nextState = getStateAfterAction(action, stateWithStocks);
  
      expect(nextState.stocks).toHaveLength(1);
      expect(nextState.stocks[0].company_symbol).toBe("MSFT");
    });
  
    it("should filter by favorite with filterByFavorite", () => {
      const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
      const action = filterByFavorite();
      const nextState = getStateAfterAction(action, stateWithStocks);

      expect(nextState.stocks).toHaveLength(1);
      expect(nextState.stocks[0].company_symbol).toBe("GOOGL");
    });

    it("should sort stocks by change_amount ascending", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = sortStocksByChange("asc");
        const nextState = getStateAfterAction(action, stateWithStocks);
    
        expect(nextState.stocks[0].company_symbol).toBe("AAPL");
        expect(nextState.stocks[1].company_symbol).toBe("GOOGL");
        expect(nextState.stocks[2].company_symbol).toBe("MSFT");
      });
    
      it("should sort stocks by change_amount descending", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = sortStocksByChange("desc");
        const nextState = getStateAfterAction(action, stateWithStocks);
 
        expect(nextState.stocks[0].company_symbol).toBe("MSFT");
        expect(nextState.stocks[1].company_symbol).toBe("GOOGL");
        expect(nextState.stocks[2].company_symbol).toBe("AAPL");
      });

      it("should sort stocks by change_percentage ascending", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = sortStocksByPercentage("asc");
        const nextState = getStateAfterAction(action, stateWithStocks);

        expect(nextState.stocks[0].company_symbol).toBe("AAPL"); 
        expect(nextState.stocks[1].company_symbol).toBe("GOOGL"); 
        expect(nextState.stocks[2].company_symbol).toBe("MSFT"); 
      });
    
      it("should sort stocks by change_percentage descending", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = sortStocksByPercentage("desc");
        const nextState = getStateAfterAction(action, stateWithStocks);
    
        expect(nextState.stocks[0].company_symbol).toBe("MSFT");
        expect(nextState.stocks[1].company_symbol).toBe("GOOGL");
        expect(nextState.stocks[2].company_symbol).toBe("AAPL");
      });

      it("should filter by change_amount range", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = filterByChange({ min: 0, max: 6 });
        const nextState = getStateAfterAction(action, stateWithStocks);
    
        expect(nextState.stocks).toHaveLength(1);
        expect(nextState.stocks[0].company_symbol).toBe("GOOGL");
      });
    
      it("should filter by change_amount including negative values", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = filterByChange({ min: -10, max: 0 });
        const nextState = getStateAfterAction(action, stateWithStocks);
  
        expect(nextState.stocks).toHaveLength(1);
        expect(nextState.stocks[0].company_symbol).toBe("AAPL");
      });

      it("should filter by change_percentage range", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = filterByChangePercentage({ min: 0, max: 1 });
        const nextState = getStateAfterAction(action, stateWithStocks);

        expect(nextState.stocks).toHaveLength(1);
        expect(nextState.stocks[0].company_symbol).toBe("GOOGL");
      });
    
      it("should filter by change_percentage including negative values", () => {
        const stateWithStocks = { ...initialState, stocks: [...mockStocks] };
        const action = filterByChangePercentage({ min: -2, max: -1 });
        const nextState = getStateAfterAction(action, stateWithStocks);
    
        expect(nextState.stocks).toHaveLength(1);
        expect(nextState.stocks[0].company_symbol).toBe("AAPL");
      });
  });
  