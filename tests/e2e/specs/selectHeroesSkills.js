import viewports from '../configs/viewports.json'

import data from '../configs/data.json'

describe('Select heroes skills', () => {
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

        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-offense]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-armorer]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-archery]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-artillery]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-air]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-fire]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-earth]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=attacker-hero-skills]')
          .find('[cypress-tag=skill-water]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])

        // Select DEFENDER hero
        cy.get('[cypress-tag=defender-hero]')
          .click()
          .find('.multiselect__element')
          .eq(parseInt(Math.random() * data.heroesLength))
          .click()

        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-offense]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-armorer]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-archery]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-artillery]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-air]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-fire]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-earth]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
        cy.get('[cypress-tag=defender-hero-skills]')
          .find('[cypress-tag=skill-water]')
          .select(data.heroSkills.levels[parseInt(Math.random() * data.heroSkills.levels.length)])
      })
    })
  }
})
