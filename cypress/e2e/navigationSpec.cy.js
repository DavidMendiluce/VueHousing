describe('navigation spec', () => {
  it('goes to the different paths of the website', () => {
    cy.visit('/');

    cy.get('[data-cy="about-link"]').click();
    cy.get('h1:contains("About")');
    
    cy.get('[data-cy="house-link"]').click();
    cy.get('h1:contains("Houses")');

    cy.get('[data-cy="house-container"]').first().click();
    cy.url().should('include', 'houseDetails')

  })
})