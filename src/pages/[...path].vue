<template>
  <section class="error-page">
    <div class="error-window">
      <div>
        <span>{{ $t('components.errorPage.data.nothingHere') }}</span>
        <span>{{ $t('components.errorPage.data.whereCouldItBe') }}</span>
      </div>
      <router-link class="home-link" to="/">
        {{ $t('components.errorPage.returnToHomeButton') }}
      </router-link>
    </div>
  </section>
</template>

<style>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.error-window {
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-content: center;
  min-width: 18.75rem;
  min-height: 18.75rem;
  font-weight: 600;
  color: rgb(255 255 255);
  background: url('/images/windows/base-bg.webp');
  box-shadow:
    0 0 0 0.125rem rgb(0 0 0),
    0 0 0 0.1875rem rgb(124 111 64),
    0 0 0 0.25rem rgb(255 251 139),
    0 0 0 0.3125rem rgb(138 121 74),
    0 0 0 0.375rem rgb(114 90 44),
    0 0 0 0.4375rem rgb(33 27 23),
    1.25rem 1.25rem 0 0 rgb(33 27 23 / 80%);
  & > div {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
}
.home-link {
  padding: 0.5rem;
  margin-bottom: 1rem;
  color: rgb(255 255 255);
  text-align: center;
  background: url('/images/windows/base-dark-bg.webp');
  border: 1px solid var(--color-border);
  transition: border-color 0.25s;
  &:hover {
    border-color: rgb(255 255 255 / 50%);
  }
}
</style>
