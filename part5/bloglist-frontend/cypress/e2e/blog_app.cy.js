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

  describe('Login', function() {
    it('succeeds with right credentials', function() {
      cy.get('#username').type('micpac')
      cy.get('#password').type('fullstack')
      cy.get('#login-button').click()

      cy.contains('Michael Pacleb logged in')
    })

    it('fail with wrong credentials', function() {
      cy.get('#username').type('micpac')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html')
        .should('not.contain', 'Michael Pacleb logged in')
    })
  })


})