import viewports from '../configs/viewports.json'

import data from '../configs/data.json'

describe('Select heroes', () => {
  for (let viewport in viewports) {
    context(`${viewport} viewport`, () => {
      it(`Select first hero`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Select ATTACKER hero
        cy.get('[cypress-tag=attacker-hero]')
          .click()
          .find('.multiselect__element')
          .eq(0)
          .click()

        // Select DEFENDER hero
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__element')
          .eq(0)
          .click()
      })

      it(`Select last hero`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Select ATTACKER hero
        cy.get('[cypress-tag=attacker-hero]')
          .click()
          .find('.multiselect__element')
          .eq(data.heroesLength)
          .click()

        // Select DEFENDER hero
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__element')
          .eq(data.heroesLength)
          .click()
      })

      it(`Select random hero`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Select ATTACKER hero
        cy.get('[cypress-tag=attacker-hero]')
          .click()
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()

        // Select DEFENDER hero
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()
      })

      it(`Search hero`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Get ATTACKER hero-select
        cy.get('[cypress-tag=attacker-hero]')
          .click()
          .find('.multiselect__input')
          .type('Gunnar')

        // Select first result
        cy.get('[cypress-tag=attacker-hero]')
          .find('.multiselect__element')
          .eq(0)
          .click()

        // Get DEFENDER hero-select
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__input')
          .type('Adela')

        // Select first result
        cy.get('[cypress-tag=defender-hero]')
          .find('.multiselect__element')
          .eq(0)
          .click()
      })

      it(`Start search hero, then clear, then select random`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Get ATTACKER hero-select
        cy.get('[cypress-tag=attacker-hero]')
          .click()
          .find('.multiselect__input')
          .type('Shakti')
          .clear()

        // Select random hero
        cy.get('[cypress-tag=attacker-hero]')
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()

        // Get DEFENDER hero-select
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__input')
          .type('Pasis')
          .clear()

        // Select random hero
        cy.get('[cypress-tag=defender-hero]')
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()
      })
    })
  }
})
