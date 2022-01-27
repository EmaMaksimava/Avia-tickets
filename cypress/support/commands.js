// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add( 'initElements', () => {
    cy.get('[data-hook=autocompliteOrigin]').as('autocompliteOrigin')
    cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
    cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')
    cy.get('[data-hook=datepickerDepartWrap] .datepicker-modal').as('modalWindow')
    cy.get('[data-hook=submitButton]').as('submitButton')
    cy.get('[data-hook=resetButton]').as('resetButton')
})

Cypress.Commands.add('fillTheForm', () => {
    cy.get('@resetButton').click()

    cy.get('[data-hook=autocompliteOrigin]').type('Краков')
    cy.get('.field-origin .autocomplete-content li:first').contains('Краков,Польша').click()

    cy.get('@autocompleteDestination').type('Амстердам')
    cy.get('.field-destination .autocomplete-content li:first').contains('Амстердам,Нидерланды').click()

    cy.get('@datepickerDepartInput').click()
    cy.get('@modalWindow').should('be.visible')

    cy.get('[data-hook=datepickerDepartWrap] .datepicker-modal .is-today').as('today')
    cy.get('[data-hook=datepickerDepartWrap] .datepicker-modal .btn-flat').as('modalBtns')

    cy.get('@today').click()
    cy.get('@today').should('have.class', 'is-selected')
    cy.get('@modalBtns').contains('Ok').click()
})