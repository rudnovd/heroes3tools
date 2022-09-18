<template>
  <div class="select" role="listbox" @keydown="onKeypress">
    <input
      v-show="opened || !selectedValue || search.length"
      ref="inputRef"
      :value="search"
      autocomplete="off"
      class="search-input"
      :placeholder="placeholder"
      @focus="onOpen"
      @click="onOpen"
      @input="searchElement"
      @keydown="onInputKeydown"
    />
    <div v-if="!opened && selectedValue && !search.length" class="selected-value" @click="onOpen">
      <slot name="selected" :selected="selectedValue">{{ selectedValue }}</slot>
    </div>

    <!-- Clear button -->
    <button v-show="selectedValue" class="clear-button" @click="onClose(true)">
      <svg viewBox="0 0 320 512" fill="currentColor" stroke="transparent" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
        />
      </svg>
    </button>

    <!-- Caret button -->
    <button ref="caretRef" class="caret-button" :class="{ 'is-open': opened }" @click="opened ? onClose() : onOpen()">
      <svg viewBox="0 0 320 512" fill="currentColor" stroke="transparent" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
        />
      </svg>
    </button>

    <Transition name="fade">
      <div
        v-show="opened"
        :ref="containerProps.ref"
        class="items"
        :class="dropdownPosition"
        @scroll="containerProps.onScroll"
      >
        <ul v-bind="wrapperProps">
          <li
            v-for="dataObject in list"
            :key="dataObject[label]"
            class="item"
            :class="{
              selected: dataObject.index === selectedIndex,
              highlighted: dataObject.index === highlightedIndex,
            }"
            @click="onSelect(dataObject.data, dataObject.index)"
          >
            <slot name="option" :option="dataObject.data">{{ dataObject.data[label] }}</slot>
          </li>

          <li v-if="!opened && !options.length" class="item no-options">
            <slot name="noOptions">{{ t('components.base.baseSelect.noOptions') }}</slot>
          </li>

          <li v-if="opened && search.length && !list.length" class="item no-options">
            <slot name="noOptionsFound">{{ t('components.base.baseSelect.noOptionsFound') }}</slot>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import i18n from '@/i18n'
import { onClickOutside, useVirtualList } from '@vueuse/core'
import { computed, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    value: object | null
    label?: string
    options: Array<object>
    optionsMaxHeight?: string
    preloadOptionsCount?: number
    useVirtualScoll?: boolean
    height?: string
    dropdownPosition?: 'top' | 'bottom'
    placeholder?: string
  }>(),
  {
    label: 'name',
    optionsMaxHeight: '300px',
    preloadOptionsCount: 5,
    useVirtualScoll: false,
    height: '42px',
    dropdownPosition: 'bottom',
    placeholder: i18n.global.t('components.base.baseSelect.selectOptions'),
  }
)
const emit = defineEmits(['open', 'close', 'select', 'clear'])

const { t } = useI18n()

const opened = ref(false)
const selectedValue = ref<object | null>(props.value)
const search = ref('')
const selectedIndex = ref(-1)
const highlightedIndex = ref(-1)
const inputRef = ref<HTMLElement>()
const caretRef = ref<HTMLElement>()

let { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  (() =>
    computed(() => {
      if (search.value.length) {
        return props.options.filter((option) => {
          const optionString = option[props.label] as string
          return optionString.toLowerCase().indexOf(search.value.toLowerCase()) > -1
        })
      } else {
        return props.options
      }
    }))(),
  {
    itemHeight: parseInt(props.height),
    overscan: props.useVirtualScoll ? props.preloadOptionsCount : props.options.length,
  }
)

const onOpen = () => {
  if (!opened.value) {
    opened.value = true

    if (selectedIndex.value >= 0) {
      highlightedIndex.value = selectedIndex.value
    }

    nextTick(() => {
      inputRef.value?.focus()

      if (selectedIndex.value) {
        scrollTo(selectedIndex.value - 3)
      }
    })
  }
  emit('open')
}

const onClose = (clear?: boolean) => {
  opened.value = false

  if (clear) {
    onClear()
  }
  emit('close')
}

const onSelect = (item: object, index: number) => {
  selectedValue.value = item
  selectedIndex.value = index
  search.value = ''
  emit('select', item)
  onClose()
}

const onClear = () => {
  selectedValue.value = null
  search.value = ''
  selectedIndex.value = -1
  highlightedIndex.value = -1
  emit('clear')
}

const searchElement = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement
  search.value = target.value
  highlightedIndex.value = -1
}

const onKeypress = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      inputRef.value?.blur()
      close()
      break
    case 'ArrowUp':
      if (list.value.length && highlightedIndex.value > 0) {
        highlightedIndex.value--
        scrollTo(highlightedIndex.value - 3)
      }
      break
    case 'ArrowDown':
      if (list.value.length && highlightedIndex.value < props.options.length - 1) {
        highlightedIndex.value++
        scrollTo(highlightedIndex.value - 3)
      }
      break
    case 'Enter':
      if (highlightedIndex.value >= 0) {
        onSelect(props.options[highlightedIndex.value], highlightedIndex.value)
      } else if (search.value.length && list.value.length) {
        onSelect(
          list.value[0].data,
          props.options.findIndex((item) => item[props.label] === list.value[0].data[props.label]) || 0
        )
      }
  }
}

const onInputKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault()
  }
}

onClickOutside(
  containerProps.ref,
  () => {
    onClose()
  },
  {
    ignore: [inputRef, caretRef],
  }
)
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
  height: v-bind(height);
  padding: 0 1rem 0 0.5rem;
  line-height: v-bind(height);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.search-input {
  height: calc(100% - 2px);
  padding: 0;
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 0;
  outline: none;

  &::placeholder {
    color: var(--color-text);
  }
}

.selected-value {
  display: flex;
  gap: 8px;
  align-items: center;
  height: calc(100% - 4px);
}

.caret-button {
  display: inline-flex;
  align-items: center;
  width: 0.625rem;
  height: 100%;
  transition: 0.5s transform;
  transform: rotate(0deg);

  &.is-open {
    pointer-events: auto;
    transform: rotate(180deg);
  }
}

.clear-button {
  display: inline-flex;
  align-items: center;
  width: 0.625rem;
  height: 100%;
  transition: 0.3s;
}

.items {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 10;
  min-height: v-bind(height);
  max-height: v-bind(optionsMaxHeight);
  overflow-y: auto;
  background: var(--color-bg);
  border: solid;
  border-color: var(--color-border);
  border-width: 0 1px 1px 1px;

  &.top {
    top: calc(-1 * v-bind(optionsMaxHeight));
  }

  &.bottom {
    top: v-bind(height);
  }

  ul {
    min-height: v-bind(height);
  }
}

.item {
  display: flex;
  gap: 8px;
  align-items: center;
  height: v-bind(height);
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--color-bg-deep);
  }

  &.selected,
  &.highlighted {
    background: #26c08e;
  }
}

.no-options {
  pointer-events: none;
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
