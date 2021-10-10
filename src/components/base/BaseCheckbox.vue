<template>
  <label class="check option" :class="[{ 'check-disabled': disabled }, `check-color-${color}`]">
    <input
      class="check-input"
      type="checkbox"
      :value="value"
      :checked="value"
      :disabled="disabled"
      @change="$emit('change', value)"
    />
    <svg class="checkbox" viewBox="0 0 20 20">
      <rect class="check-focus" x="0.5" y="0.5" width="19" height="19" rx="4" />
      <rect class="check-square" x="3" y="3" width="14" height="14" rx="2" />
      <polyline class="check-mark" points="5 9 9 13 15 6" />
    </svg>
    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCheckbox',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'default',
    },
  },
  emits: ['change'],
})
</script>

<style lang="scss" scoped>
.option {
  display: block;
  margin-bottom: 0.5em;
  width: fit-content;
}

.check {
  padding-left: 1.2em;
}

.check-disabled {
  opacity: 0.5;
}

.check-input {
  position: absolute;
  appearance: none;
}

.checkbox {
  position: absolute;
  margin-left: -1.6em;
  width: 1.4em;
  height: 1.4em;
}

.check-focus {
  fill: none;
}

.check-square {
  stroke: rgba(0, 0, 0, 0.25);
  fill: rgb(255, 255, 255);
  stroke-width: 1px;
}

.check-mark {
  fill: none;
  stroke-width: 2px;
}

.check-input:disabled + * .check-square {
  stroke: rgb(155, 155, 155);
  fill: rgb(234, 234, 234);
}

.check-input:checked:disabled + * .check-square {
  fill: rgb(155, 155, 155);
}

.check-input:checked:disabled + * .check-mark {
  fill: rgb(74, 144, 226);
}

.check-color-default {
  .check-input:checked + * .check-mark {
    stroke: rgb(255, 255, 255);
  }

  .check-input:checked + * .check-square {
    fill: rgb(74, 144, 226);
    stroke: rgb(74, 144, 226);
  }

  .check-input:focus + * .check-focus {
    fill: rgb(74, 144, 226);
  }
}

@each $color, $color-value in $calculator-colors {
  .check-color-#{$color} {
    .check-input:checked + * .check-mark {
      stroke: map.get($calculator-colors-text, $color);
    }

    .check-input:checked + * .check-square {
      stroke: $color-value;
      fill: $color-value;
    }

    .check-input:focus + * .check-focus {
      fill: color.adjust($color-value, $red: -10, $green: -10, $blue: -10);
    }
  }
}
</style>
