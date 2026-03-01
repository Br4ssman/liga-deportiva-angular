describe('Pruebas E2E - Liga Deportiva', () => {
  
  // Test 1: Éxito y Validación Visual (Rúbrica: 2 puntos)
  it('Debe mostrar la lista de jugadores correctamente', () => {
    cy.visit('http://localhost:4200/jugadores'); 
    
    // Validamos que el título principal de la sección existe
    cy.get('h2').contains('Jugadores').should('be.visible');
    
    // En lugar de table, buscamos el contenedor de las tarjetas (cards)
    // que tiene el ID "listaJugadores" en tu HTML
    cy.get('#listaJugadores').should('exist');
  });

  // Test 2: Error Controlado (Rúbrica: 2 puntos)
  it('Debe mostrar un error con credenciales incorrectas en Login', () => {
    cy.visit('http://localhost:4200/acceso');
    
    /** * Como tienes dos inputs con el mismo nombre, le decimos a Cypress 
     * que use el SEGUNDO (el de la derecha, que es el de Login)
     */
    cy.get('input[formControlName="username"]').eq(1).type('usuario_erroneo');
    cy.get('input[formControlName="password"]').eq(1).type('123456');
    
    // Hacemos click en el botón Acceder que está dentro de la columna de Login
    cy.get('.bg-light button').contains('Acceder').click();
    
    // Capturamos el alert que lanzas en tu archivo acceso.ts
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Credenciales incorrectas');
    });
  });
});