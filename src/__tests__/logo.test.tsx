import { Logo } from "@/components/logo";
import { render } from "@testing-library/react";


describe("Logo", () => {
        it('should render logo correctly', () => {
            const { getByAltText, getByText } = render(<Logo />);
      
            const logoImage = getByAltText('Logo');
            const logoText = getByText('Trade Wave');
      
            expect(logoImage).toBeInTheDocument();
            expect(logoImage).toHaveAttribute('src', '/logo.svg');
            expect(logoImage).toHaveAttribute('height', '30');
            expect(logoImage).toHaveAttribute('width', '30');
            expect(logoText).toBeInTheDocument();
            expect(logoText).toHaveClass('text-lg', 'text-neutral-700', 'pb-1', 'font-bold');
          });
});