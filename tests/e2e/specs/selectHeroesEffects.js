import viewports from '../configs/viewports.json'

import data from '../configs/data.json'

describe('Select heroes effects', () => {
  for (let viewport in viewports) {
    context(`${viewport} viewport`, () => {
      it(`Select hero skills`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Select ATTACKER hero
        cy.get('[cypress-tag=attacker-hero]')
          .click()
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()

        for (let i = 0; i < 12; i++) {
          cy.get('[cypress-tag=attacker-hero-effects]')
            .find('.custom-checkbox')
            .eq(i)
            .click()
        }

        // Select DEFENDER hero
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()

        for (let i = 0; i < 12; i++) {
          cy.get('[cypress-tag=defender-hero-effects]')
            .find('.custom-checkbox')
            .eq(i)
            .click()
        }
      })
    })
  }
})
