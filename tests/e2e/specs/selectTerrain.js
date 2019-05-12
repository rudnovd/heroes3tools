import viewports from '../configs/viewports.json'

import data from '../configs/data.json'

describe('Select terrain', () => {
  for (let viewport in viewports) {
    context(`${viewport} viewport`, () => {
      it(`Select first hero`, () => {
        cy.viewport(viewports[viewport][0], viewports[viewport][1])

        cy.visit('/')

        for (let i = 0; i < data.terrains.length; i++) {
          cy.get('[cypress-tag=terrain-select]')
            .select(data.terrains[i])
        }
      })
    })
  }
})
