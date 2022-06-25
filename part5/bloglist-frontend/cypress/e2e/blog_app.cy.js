describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Michael Pacleb',
      username: 'micpac',
      password: 'fullstack'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', () => {
    cy.visit('http://localhost:3000')
  })


})