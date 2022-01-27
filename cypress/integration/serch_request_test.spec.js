describe('Test search request', () => {
    before( () => {   // для инициализации перед любым тестом
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/countries', { fixture: 'countries.json' }).as('getCountries')
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/cities', { fixture: 'cities.json' }).as('getCities')
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/airlines', { fixture: 'airlines.json' }).as('getAirlines')

        cy.visit('http://localhost:9000')
        cy.get('[data-hook=main-form]').should('be.visible')

        cy.wait('@getCountries')
        cy.wait('@getCities')
        cy.wait('@getAirlines')
    })

    beforeEach( () => {  // для независимости послед.тестов
        cy.initElements() //создание комманды для выноса повторов

        cy.fillTheForm()
    })

    it('Form submit with correct params', () => {
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/prices/cheap*', (req) => {
            expect(req.query.currency).to.equal('USD')
            expect(req.query.depart_date).to.equal('2022-01')
            expect(req.query.origin).to.equal('KRK')
            expect(req.query.destination).to.equal('AMS')
        })        

        cy.get('@submitButton').click()

    })

    it('Tickets display corrects', () => {
        cy.intercept('GET', 'http://aviasales-api.herokuapp.com/prices/cheap*', { fixture:'tickets.json'})

        cy.get('@submitButton').click()

        cy.get('[data-hook=ticketsContainer]').as('ticketsContainer')
        cy.get('@ticketsContainer').find('.ticket-card').should('have.length', 2)
    })
})