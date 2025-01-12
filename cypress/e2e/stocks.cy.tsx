import { expect } from 'chai';

describe('Stocks Screen', () => {
    it('Stocks screen loaded without any issue', () => {
        cy.visit('http://localhost:3000/stocks');
        cy.contains('Stocks').should('be.visible');
        cy.get('[data-cy=stock-page-title]').should('be.visible');
        cy.get('[data-cy=logo]').should('be.visible');
    });

    it('Filter button opens filter modal', () => {
        cy.visit('http://localhost:3000/stocks');
        cy.get('[data-cy=filter-button]').click();
        cy.get('[data-cy=filter-modal]').should('be.visible');
    });

    it('Put min and max price in filter modal', () => {
        cy.visit('http://localhost:3000/stocks');
        cy.get('[data-cy=filter-button]').click();
        cy.get('[data-cy=min-price]').type('100');
        cy.get('[data-cy=max-price]').type('200');
        cy.get('[data-cy=min-price]').should('have.value', '100');
        cy.get('[data-cy=max-price]').should('have.value', '200');
        cy.get('[data-cy=apply-filters]').click();
        cy.get('[data-cy=stock-price]').each(($el) => {
            const price = parseFloat($el.text().replace('$', ''));
            expect(price).to.be.gte(100);
            expect(price).to.be.lte(200);
        });
    });

    it('Put min and max change in filter modal', () => {
        cy.visit('http://localhost:3000/stocks');
        cy.get('[data-cy=filter-button]').click();
        cy.get('[data-cy=min-change]').type('1');
        cy.get('[data-cy=max-change]').type('2');
        cy.get('[data-cy=min-change]').should('have.value', '1');
        cy.get('[data-cy=max-change]').should('have.value', '2');
        cy.get('[data-cy=apply-filters]').click();
        cy.get('[data-cy=stock-change-amount]').each(($el) => {
            const change = parseFloat($el.text());
            expect(change).to.be.gte(1);
            expect(change).to.be.lte(2);
        });
    });

    it('Put min and max change percentage in filter modal', () => {
        cy.visit('http://localhost:3000/stocks');
        cy.get('[data-cy=filter-button]').click();
        cy.get('[data-cy=min-percentage]').type('1');
        cy.get('[data-cy=max-percentage]').type('2');
        cy.get('[data-cy=min-percentage]').should('have.value', '1');
        cy.get('[data-cy=max-percentage]').should('have.value', '2');
        cy.get('[data-cy=apply-filters]').click();
        cy.get('[data-cy=stock-change-percentage]').each(($el) => {
            const percentage = parseFloat($el.text().replace('%', ''));
            expect(percentage).to.be.gte(1);
            expect(percentage).to.be.lte(2);
        });
    });

    it('Reset Filters', () => {
        cy.visit('http://localhost:3000/stocks');
        cy.get('[data-cy=filter-button]').click();
        cy.get('[data-cy=min-price]').type('100');
        cy.get('[data-cy=max-price]').type('200');
        cy.get('[data-cy=min-change]').type('1');
        cy.get('[data-cy=max-change]').type('2');
        cy.get('[data-cy=min-percentage]').type('1');
        cy.get('[data-cy=max-percentage]').type('2');
        cy.get('[data-cy=reset-filters]').click();
    });

    // // Sorting the stocks

    it('Sort by Company Symbol', () => {
        cy.visit('http://localhost:3000/stocks');
        cy.get('[data-cy=symbol-sort]').click();
        cy.get('[data-cy=symbol-sort]').click();
        //name sort
        cy.get('[data-cy=name-sort]').click();
        cy.get('[data-cy=name-sort]').click();

        //price sort
        cy.get('[data-cy=price-sort]').click();
        cy.get('[data-cy=price-sort]').click();

        //change sort
        cy.get('[data-cy=change-sort]').click();
        cy.get('[data-cy=change-sort]').click();

        //percentage sort
        cy.wait(3000)
        cy.get('[data-cy=percentage-sort]').click();
        cy.get('[data-cy=percentage-sort]').click();

        // Need to write logic for checking the sorting order

    });
});