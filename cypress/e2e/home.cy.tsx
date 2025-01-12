describe('Home Screen', () => {
  it('Home screen loaded without any issue', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=home-title]').should('be.visible');
    cy.get('[data-cy=home-description]').should('be.visible');
    cy.get('[data-cy=explore-stocks-title]').should('be.visible');
    cy.get('[data-cy=start-trading-title]').should('be.visible');
  })

  it('Explore Stocks button navigates to Stocks page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=explore-stocks-title]').click();
    cy.url().should('include', '/stocks');
  })
})