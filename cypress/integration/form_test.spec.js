describe('Form', () => {
    it('When visiting the home page, the form is visible', () => {
        cy.visit('http://localhost:9000')
        cy.get('[data-hook=main-form]').should('be.visible')
    })

    it('When typing a value into autocomplete origin, this is visible', () => {
        cy.get('[data-hook=autocompliteOrigin]').should('be.visible')
        cy.get('[data-hook=autocompliteOrigin]').type('Краков')
        cy.get('[data-hook=autocompliteOrigin]').should('have.value', 'Краков')
    })

    it('When typing a value into autocomplete destination, this is visible', () => {
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
        cy.get('@autocompleteDestination').should('be.visible')
        cy.get('@autocompleteDestination').type('Париж')
        cy.get('@autocompleteDestination').should('have.value', 'Париж')
    })

    it('When clicking on the depart datepicker modal should open', () => {
        cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-modal').as('modalWindow')
        cy.get('@datepickerDepartInput').click()
        cy.get('@modalWindow').should('be.visible')
        
    })

    it('After selecting the departing date, it should be displayed in the input field', () => {
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-modal .is-today').as('today')
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-modal .btn-flat').as('modalBtns')
        cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')

        cy.get('@today').click()
        cy.get('@today').should('have.class', 'is-selected')
        cy.get('@modalBtns').contains('Ok').click()

        cy.get('@datepickerDepartInput').then(($input) => {
            const val = $input.val()
            // 2022-01
            expect(val).to.match(/^\d{4}-\d{2}$/)
        })
    })
})