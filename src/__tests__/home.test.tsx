import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

      it('should render all text content and navigation buttons', () => {
        const { getByText } = render(<Home />);
  
        expect(getByText('Master the Market.')).toBeInTheDocument();
        expect(getByText('Build Wealth.')).toBeInTheDocument();
        expect(getByText(/Join over 750,000 traders/)).toBeInTheDocument();
        expect(getByText('Explore Stocks')).toBeInTheDocument();
        expect(getByText('Start Trading')).toBeInTheDocument();
      });

    it('should navigate to correct routes when links are clicked', () => {
      render(<Home />);
      const exploreLink = screen.getByText(/Explore Stocks/i).closest('a');
      const startTradingLink = screen.getByText(/Start Trading/i).closest('a');

      expect(exploreLink).toHaveAttribute('href', '/stocks');
      expect(startTradingLink).toHaveAttribute('href', 'https://fundingpips.com/');
    });
});
