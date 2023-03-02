
import AddUpdateComponent from '../../src/components/AddUpdateComponent'

describe('AddUpdateComponent.cy.js', () => {
  it('playground', () => {
    cy.mount(<AddUpdateComponent/>)

    cy.get('input').should('have.value', '');
  })
})