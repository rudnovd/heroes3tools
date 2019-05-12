import viewports from '../configs/viewports.json'

import data from '../configs/data.json'

describe('Select units', () => {
  for (let viewport in viewports) {
    context(`${viewport} viewport`, () => {
      it(`Select first unit by button`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        cy.get('[cypress-tag=pick-attacker-unit-button]')
          .click()
        cy.get('#pick-attacker-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(0)
          .click()

        cy.get('[cypress-tag=pick-defender-unit-button]')
          .click()
        cy.get('#pick-defender-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(0)
          .click()
      })

      it(`Select first unit by image`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        cy.get('[cypress-tag=attacker-picked-unit-image]')
          .click()
        cy.get('#pick-attacker-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(0)
          .click()

        cy.get('[cypress-tag=defender-picked-unit-image]')
          .click()
        cy.get('#pick-defender-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(0)
          .click()
      })

      it(`Select last unit by button`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        cy.get('[cypress-tag=pick-attacker-unit-button]')
          .click()
        cy.get('#pick-attacker-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(data.unitsLength)
          .click()

        cy.get('[cypress-tag=pick-defender-unit-button]')
          .click()
        cy.get('#pick-defender-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(data.unitsLength)
          .click()
      })

      it(`Select random unit`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        cy.get('[cypress-tag=pick-attacker-unit-button]')
          .click()
        cy.get('#pick-attacker-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(parseInt(Math.random() * data.unitsLength))
          .click()

        cy.get('[cypress-tag=pick-defender-unit-button]')
          .click()
        cy.get('#pick-defender-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(parseInt(Math.random() * data.unitsLength))
          .click()
      })

      it(`Search units`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        cy.get('[cypress-tag=pick-attacker-unit-button]')
          .click()
        cy.get('#pick-attacker-unit-modal')
          .find('[cypress-tag=find-unit-input]')
          .type('Angel')
        cy.get('#pick-attacker-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(0)
          .click()

        cy.get('[cypress-tag=pick-defender-unit-button]')
          .click()
        cy.get('#pick-defender-unit-modal')
          .find('[cypress-tag=find-unit-input]')
          .type('Devil')
        cy.get('#pick-defender-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(0)
          .click()
      })

      it(`Open and close modal`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        cy.get('[cypress-tag=pick-attacker-unit-button]')
          .click()
        cy.get('#pick-attacker-unit-modal')
          .find('.close')
          .click()

        cy.get('[cypress-tag=pick-defender-unit-button]')
          .click()
        cy.get('#pick-defender-unit-modal')
          .find('.close')
          .click()
      })
    })
  }
})
