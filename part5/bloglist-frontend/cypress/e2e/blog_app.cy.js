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

  describe('When logged in', function() {
    beforeEach(function(){
      cy.login({
        username: 'micpac',
        password: 'fullstack'
      })
    })

    it('blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('E2E Testing using Cypress')
      cy.get('#author').type('Monica Grace')
      cy.get('#url').type('https://example.com/e2e-testing-cypress')
      cy.get('#submit-button').click()

      cy.contains('E2E Testing using Cypress')
    })

    describe('A blog exist', function() {
      beforeEach(function(){
        cy.createBlog({
          title: 'Another Blog Post',
          author: 'Jenny Muchnik',
          url: 'https://example.com/another-blog-post'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('Another Blog Post Jenny Muchnik').parent().find('#toggle-button').click()
        cy.contains('Another Blog Post Jenny Muchnik').parent().find('#like-button').click()

        cy.contains('Another Blog Post Jenny Muchnik').parent().find('#likes-info')
          .should('contain', 'likes 1')
      })
    })

    describe('Several blogs exist', function() {
      beforeEach(function(){
        cy.createBlog({
          title: 'Blog Post 1',
          author: 'Tony Stark',
          url: 'https://example.com/blog-post-1'
        })
        cy.createBlog({
          title: 'Blog Post 2',
          author: 'Steve Rogers',
          url: 'https://example.com/blog-post-2'
        })
        cy.createBlog({
          title: 'Blog Post 3',
          author: 'Stephen Strange',
          url: 'https://example.com/blog-post-3'
        })
      })

      it.only('several blogs can be liked', function() {
        cy.contains('Blog Post 2 Steve Rogers').parent().find('#toggle-button').click()
        cy.contains('Blog Post 2 Steve Rogers').parent().find('#like-button').click()
        cy.contains('Blog Post 2 Steve Rogers').parent().find('#like-button').click()

        cy.contains('Blog Post 2 Steve Rogers').parent().find('#likes-info')
          .should('contain', 'likes 2')

        cy.contains('Blog Post 3 Stephen Strange').parent().find('#toggle-button').click()
        cy.contains('Blog Post 3 Stephen Strange').parent().find('#like-button').click()

        cy.contains('Blog Post 3 Stephen Strange').parent().find('#likes-info')
          .should('contain', 'likes 1')
      })

      
    })
  })


})