import viewports from '../configs/viewports.json'

import data from '../configs/data.json'

describe('Select all', () => {
  for (let viewport in viewports) {
    context(`${viewport} viewport`, () => {
      it(`Select all`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        // Select ATTACKER unit
        cy.get('[cypress-tag=pick-attacker-unit-button]')
          .click()
        cy.get('#pick-attacker-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(parseInt(Math.random() * data.unitsLength))
          .click()

        // Select DEFENDER unit
        cy.get('[cypress-tag=pick-defender-unit-button]')
          .click()
        cy.get('#pick-defender-unit-modal')
          .find('[cypress-tag=pick-unit-button]')
          .eq(parseInt(Math.random() * data.unitsLength))
          .click()

        // Input attacker units count
        cy.get('[cypress-tag=attacker-units-count]')
          .type(parseInt(Math.random() * 999))

        // Input defender units count
        cy.get('[cypress-tag=defender-units-count]')
          .type(parseInt(Math.random() * 999))

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

        // Select ATTACKER stats
        cy.get('[cypress-tag=attacker-hero-stats]')
          .find('[cypress-tag=hero-stats-level]')
          .type(parseInt(Math.random() * data.heroStats.maxLevel))
        cy.get('[cypress-tag=attacker-hero-stats]')
          .find('[cypress-tag=hero-stats-attack]')
          .type(parseInt(Math.random() * data.heroStats.maxAttack))
        cy.get('[cypress-tag=attacker-hero-stats]')
          .find('[cypress-tag=hero-stats-defense]')
          .type(parseInt(Math.random() * data.heroStats.maxDefense))

        // Select DEFENDER stats
        cy.get('[cypress-tag=defender-hero-stats]')
          .find('[cypress-tag=hero-stats-level]')
          .type(parseInt(Math.random() * data.heroStats.maxLevel))
        cy.get('[cypress-tag=defender-hero-stats]')
          .find('[cypress-tag=hero-stats-attack]')
          .type(parseInt(Math.random() * data.heroStats.maxAttack))
        cy.get('[cypress-tag=defender-hero-stats]')
          .find('[cypress-tag=hero-stats-defense]')
          .type(parseInt(Math.random() * data.heroStats.maxDefense))

        // Select ATTACKER skills
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

        // Select DEFENDER skills
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

        // Select ATTACKER effects
        for (let i = 0; i < 12; i++) {
          if (parseInt(Math.random() * 100) > 50) {
            cy.get('[cypress-tag=attacker-hero-effects]')
              .find('.custom-checkbox')
              .eq(i)
              .click()
          }
        }

        // Select DEFENDER effects
        for (let i = 0; i < 12; i++) {
          if (parseInt(Math.random() * 100) > 50) {
            cy.get('[cypress-tag=defender-hero-effects]')
              .find('.custom-checkbox')
              .eq(i)
              .click()
          }
        }

        // Select terrain
        cy.get('[cypress-tag=terrain-select]')
          .select(data.terrains[parseInt(Math.random() * 8)])
      })
    })
  }
})
