// frontend/cypress/e2e/auth.cy.js
describe('Authentication Flow', () => {
  it('should register and login successfully', () => {
    cy.visit('http://localhost:3000');
    
    // Register
    cy.get('[data-testid="register-btn"]').click();
    cy.get('[data-testid="username-input"]').type('testuser');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="register-submit"]').click();
    
    // Should redirect to login
    cy.url().should('include', '/login');
    
    // Login
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-submit"]').click();
    
    // Should be logged in and see dashboard
    cy.get('[data-testid="welcome-message"]').should('contain', 'Welcome');
  });
});