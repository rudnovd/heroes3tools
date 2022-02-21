<template>
  <div class="select">
    <div class="container" @click="open">
      <div class="selected">
        <input
          v-show="!selectedValue || search.length"
          v-model="search"
          autocomplete="off"
          class="search"
          :placeholder="placeholder"
          @focus="open"
        />
        <div v-if="selectedValue && !search.length" class="selected-value">
          <slot name="selected" :selected="selectedValue">{{ selectedValue }}</slot>
        </div>
      </div>

      <!-- Clear value button -->
      <button v-if="selectedValue" class="clear-button" @click="onClear"></button>

      <!-- Caret button -->
      <button class="caret" :class="{ 'is-open': opened }"></button>
    </div>

    <div
      v-show="opened"
      :ref="containerProps.ref"
      class="items"
      :class="dropdownPosition"
      tabindex="-1"
      @scroll="containerProps.onScroll"
    >
      <ul v-bind="wrapperProps">
        <li
          v-for="{ index, data } in optionsList"
          :key="index"
          class="option-item"
          :class="{ selected: selectedValue && selectedValue[label] === data[label] }"
          @click="onSelect(data)"
        >
          <slot name="option" :option="data">{{ data[label] }}</slot>
        </li>
      </ul>
    </div>

    <div v-if="opened && !options.length" class="no-options">
      <slot name="noOptions">{{ t('components.base.baseSelect.noOptions') }}</slot>
    </div>

    <div v-if="opened && search.length && !optionsList.length" class="no-options">
      <slot name="noOptionsFound">{{ t('components.base.baseSelect.noOptionsFound') }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import i18n from '@/i18n'
import { onClickOutside, useVirtualList } from '@vueuse/core'
import { computed, defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'BaseSelect',
  props: {
    value: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: null as unknown as PropType<Record<string, any> | null>,
      required: true,
    },
    label: {
      type: String,
      default: 'name',
    },
    options: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as () => Array<Record<string, any>>,
      required: true,
    },
    optionsMaxHeight: {
      type: String,
      default: '300px',
    },
    preloadOptionsCount: {
      type: Number,
      default: 5,
    },
    useVirtualScoll: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '42px',
    },
    dropdownPosition: {
      type: String as () => 'top' | 'bottom',
      default: 'bottom',
    },
    placeholder: {
      type: String,
      default: i18n.global.t('components.base.baseSelect.selectOptions'),
    },
  },
  emits: ['click', 'select', 'clear'],
  setup(props, context) {
    const { t } = useI18n()

    const opened = ref(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedValue = ref<Record<string, any> | null>(props.value)
    const search = ref('')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSelect = (item: Record<string, any>) => {
      selectedValue.value = item
      opened.value = false
      search.value = ''
      context.emit('select', item)
    }

    const onClear = () => {
      selectedValue.value = null
      search.value = ''
      if (opened.value) opened.value = false
      context.emit('clear')
    }

    const open = () => {
      if (!opened.value) opened.value = true
    }

    const firstOptions = computed(() => {
      if (search.value.length) {
        return props.options
          .filter((option) => {
            const optionString = option[props.label] as string
            return optionString.toLowerCase().indexOf(search.value.toLowerCase()) > -1
          })
          .map((data, index) => ({ data, index }))
      } else {
        return props.options.map((data, index) => ({ data, index }))
      }
    })

    const { list, containerProps, wrapperProps } = useVirtualList(firstOptions, {
      itemHeight: parseInt(props.height),
      overscan: props.preloadOptionsCount,
    })

    const optionsList = computed(() => {
      if (props.useVirtualScoll) {
        return list.value.map((item) => ({ ...item.data, index: item.index }))
      } else {
        return firstOptions.value
      }
    })

    onClickOutside(containerProps.ref, () => (opened.value = false))

    return {
      t,

      opened,
      selectedValue,
      search,
      optionsList,
      containerProps,
      wrapperProps,

      open,
      onSelect,
      onClear,
    }
  },
})
</script>


<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  height: v-bind(height);
  line-height: v-bind(height);
  border: 1px solid #dee2e6;
  border-radius: 4px;
  outline: none;
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  gap: 16px;
  align-items: center;
  height: inherit;
  padding-right: 16px;
}

.selected {
  height: 100%;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.search {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 0;
  padding-left: 8px;
  font: inherit;
  border: 0;
  outline: none;
}

.caret {
  position: relative;
  z-index: 10;
  flex-grow: 0;
  flex-shrink: 0;
  width: 0.625rem;
  height: 1.125rem;
  height: 100%;
  background-color: #999999;
  transition: 0.3s transform;
  transform: rotate(0deg);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;

  &.is-open {
    pointer-events: auto;
    transform: rotate(180deg);
  }
}

.selected-value {
  display: flex;
  align-items: center;
}

.clear-button {
  display: inline-block;
  width: 0.625rem;
  height: 1.125rem;
  height: 100%;
  background-color: #999999;
  transition: 0.3s;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;

  &:hover {
    background-color: black;
  }
}

.items {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 10;
  max-height: v-bind(optionsMaxHeight);
  overflow-y: auto;
  background: rgb(255, 255, 255);
  border: 1px solid #dee2e6;
  border-top-width: 0;

  &.top {
    transform: translate(0, calc(-301px - v-bind(height)));
  }
}

.option-item {
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background 0.1s;

  &:hover {
    background: rgb(238, 238, 238);
  }

  &.selected {
    background: #26c08e;
  }
}

.no-options {
  border: 1px solid #dee2e6;
}
</style>
