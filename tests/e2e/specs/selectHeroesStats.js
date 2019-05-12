import viewports from '../configs/viewports.json'

import data from '../configs/data.json'

describe('Select heroes stats', () => {
  for (let viewport in viewports) {
    context(`${viewport} viewport`, () => {
      it(`Select hero stats`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Select ATTACKER hero
        cy.get('[cypress-tag=attacker-hero]')
          .click()
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()

        cy.get('[cypress-tag=attacker-hero-stats]')
          .find('[cypress-tag=hero-stats-level]')
          .type(parseInt(Math.random() * data.heroStats.maxLevel))
        cy.get('[cypress-tag=attacker-hero-stats]')
          .find('[cypress-tag=hero-stats-attack]')
          .type(parseInt(Math.random() * data.heroStats.maxAttack))
        cy.get('[cypress-tag=attacker-hero-stats]')
          .find('[cypress-tag=hero-stats-defense]')
          .type(parseInt(Math.random() * data.heroStats.maxDefense))

        // Select DEFENDER hero
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()

        cy.get('[cypress-tag=defender-hero-stats]')
          .find('[cypress-tag=hero-stats-level]')
          .type(parseInt(Math.random() * data.heroStats.maxLevel))
        cy.get('[cypress-tag=defender-hero-stats]')
          .find('[cypress-tag=hero-stats-attack]')
          .type(parseInt(Math.random() * data.heroStats.maxAttack))
        cy.get('[cypress-tag=defender-hero-stats]')
          .find('[cypress-tag=hero-stats-defense]')
          .type(parseInt(Math.random() * data.heroStats.maxDefense))
      })
    })
  }
})
