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

  it('login form is shown', function() {
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
          author: 'Wanda Maximoff',
          url: 'https://example.com/another-blog-post'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('Another Blog Post Wanda Maximoff').parent().find('#toggle-button').click()
        cy.contains('Another Blog Post Wanda Maximoff').parent().find('#like-button').click()

        cy.contains('Another Blog Post Wanda Maximoff').parent().find('#likes-info')
          .should('contain', 'likes 1')
      })

      it('a blog can be removed but window confirm cancelled', function() {
        cy.contains('Another Blog Post Wanda Maximoff').parent().find('#toggle-button').click()
        cy.contains('Another Blog Post Wanda Maximoff').parent().find('#remove-button').click()
        cy.on('window:confirm', function(str){
          expect(str).to.equal('Remove blog Another Blog Post by Wanda Maximoff')
        })

        cy.on('window:confirm', () => false)
        cy.get('html')
          .should('contain', 'Another Blog Post Wanda Maximoff')
      })

      it('a blog can be removed and window confirmed', function() {
        cy.contains('Another Blog Post Wanda Maximoff').parent().find('#toggle-button').click()
        cy.contains('Another Blog Post Wanda Maximoff').parent().find('#remove-button').click()
        cy.on('window:confirm', function(str){
          expect(str).to.equal('Remove blog Another Blog Post by Wanda Maximoff')
        })

        cy.on('window:confirm', () => true)
        cy.get('html')
          .should('not.contain', 'Another Blog Post Wanda Maximoff')
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

      it('several blogs can be liked', function() {
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

  describe('Unauthorized blog deletion', function(){
    it('blog can\'t be deleted by other users', function() {
      cy.login({
        username: 'micpac',
        password: 'fullstack'
      })

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

      cy.get('html').find('#logout-button').click()

      const user2 = {
        name: 'Peter Parker',
        username: 'spiderman',
        password: 'pparker01'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user2)

      cy.login({
        username: 'spiderman',
        password: 'pparker01'
      })

      cy.contains('Blog Post 1 Tony Stark').parent().find('#toggle-button').click()
      cy.contains('Blog Post 1 Tony Stark').parent().get('#remove-button')
        .should('not.exist')
    })
  })

  describe('Sorted blogs', function(){
    beforeEach(function(){
      cy.login({
        username: 'micpac',
        password: 'fullstack'
      })

      cy.createBlog({
        title: 'Blog Post 1',
        author: 'Tony Stark',
        url: 'https://example.com/blog-post-1',
        likes: 5
      })

      cy.createBlog({
        title: 'Blog Post 2',
        author: 'Steve Rogers',
        url: 'https://example.com/blog-post-2',
        likes: 25
      })

      cy.createBlog({
        title: 'Blog Post 3',
        author: 'Stephen Strange',
        url: 'https://example.com/blog-post-3',
        likes: 56
      })

      cy.createBlog({
        title: 'Blog Post 4',
        author: 'Bruce Banner',
        url: 'https://example.com/blog-post-4',
        likes: 3
      })
    })

    it('blogs should be in descending order', function(){
      cy.get('.blog').eq(0).should('contain', 'Blog Post 3 Stephen Strange')
      cy.get('.blog').eq(1).should('contain', 'Blog Post 2 Steve Rogers')
      cy.get('.blog').eq(2).should('contain', 'Blog Post 1 Tony Stark')
      cy.get('.blog').eq(3).should('contain', 'Blog Post 4 Bruce Banner')
    })
  })


})