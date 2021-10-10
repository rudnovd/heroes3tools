import type { Directive } from 'vue'

let clickOutsideEvent: (event: Event) => void

const clickOutside: Directive = {
  mounted(el) {
    let initialMacrotaskEnded = false
    setTimeout(() => {
      initialMacrotaskEnded = true
    }, 0)

    clickOutsideEvent = (event) => {
      const { target } = event

      if (initialMacrotaskEnded && !(el === target || el.contains(target))) {
        el.dispatchEvent(new Event('clickoutside'))
      }
    }

    document.addEventListener('mousedown', clickOutsideEvent)
    document.addEventListener('touchstart', clickOutsideEvent)
  },
  unmounted() {
    document.removeEventListener('mousedown', clickOutsideEvent)
    document.removeEventListener('touchstart', clickOutsideEvent)
  },
}

export default clickOutside
