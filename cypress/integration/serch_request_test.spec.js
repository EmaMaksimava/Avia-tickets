describe('Test search request', () => {
    it('Visit home page', () => {
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/countries', { fixture: 'countries.json' }).as('getCountries')
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/cities', { fixture: 'cities.json' }).as('getCities')
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/airlines', { fixture: 'airlines.json' }).as('getAirlines')

        cy.visit('http://localhost:9000')
        cy.get('[data-hook=main-form]').should('be.visible')

        cy.wait('@getCountries')
        cy.wait('@getCities')
        cy.wait('@getAirlines')
    })

    it('Form submit with correct params', () => {
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/prices/cheap*', (req) => {
            expect(req.query.currency).to.equal('USD')
            expect(req.query.depart_date).to.equal('2022-01')
            expect(req.query.origin).to.equal('KRK')
            expect(req.query.destination).to.equal('AMS')
        })

        cy.get('[data-hook=autocompliteOrigin]').as('autocompliteOrigin')
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
        cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-modal').as('modalWindow')
        cy.get('[data-hook=submitButton]').as('submitButton')

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

        cy.get('@submitButton').click()

    })

    it('Tickets display corrects', () => {
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/prices/cheap*', { fixture:'tickets.json'})
        cy.get('[data-hook=ticketsContainer]').as('ticketsContainer')
        cy.get('@ticketsContainer').find('.ticket-card').should('have.length', 2)
    })
})