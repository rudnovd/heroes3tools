<template>
  <div class="select">
    <div class="container">
      <div class="selected" @click="open">
        <input
          v-show="!selectedValue || search.length"
          :value="search"
          autocomplete="off"
          class="search"
          :name="`input-${label}`"
          :placeholder="placeholder"
          @input="searchElement"
        >
        <button v-if="selectedValue && !search.length" class="selected-value">
          <slot name="selected" :selected="selectedValue">
            {{ selectedValue }}
          </slot>
        </button>
      </div>
      <button v-if="selectedValue" class="clear-button" @click="onClear" />
      <button class="caret" :class="{ 'is-open': opened }" @click="opened = !opened" />
    </div>

    <Transition name="fade">
      <div
        v-if="opened"
        v-bind="virtualScroll ? virtualScrollContainer : void 0"
        class="items"
        :class="dropdownPosition"
        tabindex="-1"
      >
        <ul v-bind="virtualScroll ? wrapperProps : void 0">
          <li v-for="{ index, data } in optionsList" :key="data[label]">
            <button
              class="option-item"
              :class="{ selected: selectedValue && selectedValue[label] === data[label] }"
              :data-umami-event="`select ${data[label]}`"
              @click="onSelect(data, index)"
            >
              <slot name="option" :option="data">
                {{ data[label] }}
              </slot>
            </button>
          </li>
        </ul>
      </div>
    </Transition>

    <div v-if="opened && !options.length" class="no-options">
      <slot name="noOptions">
        {{ t('components.base.baseSelect.noOptions') }}
      </slot>
    </div>

    <div v-if="opened && search.length && !optionsList.length" class="no-options">
      <slot name="noOptionsFound">
        {{ t('components.base.baseSelect.noOptionsFound') }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { Ref } from 'vue'
import i18n from '@/i18n'
import { onClickOutside, useVirtualList } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    value: T | null
    label?: string
    options: T[]
    optionsMaxHeight?: string
    preloadOptionsCount?: number
    virtualScroll?: boolean
    height?: string
    dropdownPosition?: 'top' | 'bottom'
    placeholder?: string
  }>(),
  {
    label: 'name',
    optionsMaxHeight: '300px',
    preloadOptionsCount: 5,
    virtualScroll: false,
    height: '42px',
    dropdownPosition: 'bottom',
    placeholder: () => {
      return i18n.global.t('components.base.baseSelect.selectOptions')
    },
  },
)
const emit = defineEmits<{
  click: [option: T | null]
  select: [option: T]
  clear: []
}>()

const { t } = useI18n()

const opened = ref(false)
const selectedValue: Ref<T | null> = ref(null)
selectedValue.value = props.value
let selectedIndex = 0
const search = ref('')

function onSelect(item: T, index: number) {
  selectedValue.value = item
  opened.value = false
  search.value = ''
  selectedIndex = index
  emit('select', item)
}

function onClear() {
  selectedValue.value = null
  search.value = ''
  if (opened.value) {
    opened.value = false
    selectedIndex = 0
  }
  emit('clear')
}

function searchElement(event: Event) {
  const target = event.currentTarget as HTMLInputElement
  search.value = target.value
}

const firstOptions = computed(() => {
  if (search.value.length) {
    const searchQuery = search.value.toLowerCase()
    return props.options
      .filter((option) => {
        const optionString = option[props.label] as string
        return optionString.toLowerCase().includes(searchQuery)
      })
      .map((data, index) => ({ data, index }))
  }
  else {
    return props.options.map((data, index) => ({ data, index }))
  }
})

const {
  list,
  containerProps: virtualScrollContainer,
  wrapperProps,
} = useVirtualList(firstOptions, {
  itemHeight: Number.parseInt(props.height),
  overscan: props.preloadOptionsCount,
})

function open() {
  if (!opened.value) {
    opened.value = true
    nextTick(() => {
      const top = selectedIndex ? selectedIndex * Number.parseInt(props.height) : 0
      if (props.virtualScroll)
        virtualScrollContainer.ref.value?.scrollTo({ top })
    })
  }
}

const optionsList = computed(() => {
  if (props.virtualScroll) {
    return list.value.map(item => ({ ...item.data, index: item.index }))
  }
  else {
    return firstOptions.value
  }
})

watch(search, () => {
  if (!optionsList.value.length) {
    wrapperProps.value.style.height = '0px'
  }
})

onClickOutside(virtualScrollContainer.ref, () => {
  setTimeout(() => {
    opened.value = false
  }, 100)
})
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  height: v-bind(height);
  line-height: v-bind(height);
  border: 1px solid var(--color-border);
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
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 0;
  outline: none;

  &::placeholder {
    color: var(--color-text);
  }
}

.caret {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 0.625rem;
  height: 1.125rem;
  height: 100%;
  background-color: #999999;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: 0.3s transform;
  transform: rotate(0deg);

  &.is-open {
    pointer-events: auto;
    transform: rotate(180deg);
  }
}

.selected-value {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 8px;
}

.clear-button {
  display: inline-block;
  width: 0.625rem;
  height: 1.125rem;
  height: 100%;
  background-color: #999999;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: 0.3s;

  &:hover {
    background-color: var(--color-text);
  }
}

.items {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 10;
  max-height: v-bind(optionsMaxHeight);
  overflow-y: auto;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-top-width: 0;

  &.top {
    transform: translate(0, calc(-301px - v-bind(height)));
  }
}

.option-item {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  height: v-bind(height);
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: var(--color-bg-deep);
  }

  &.selected {
    background: #26c08e;
  }
}

.no-options {
  padding-left: 8px;
  border: 1px solid var(--color-border);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
