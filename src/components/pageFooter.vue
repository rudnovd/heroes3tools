<template lang='pug'>
b-container.footer.mt-5
  b-row.mt-2
    b-col(cols='auto')
      b-button(class='text-muted' variant='link' size='sm' @click='howToUseModalShow()')
        | {{ $t('how-to-use') }}
    b-col(class='ml-auto' cols='auto')
      b-button(class='text-muted' variant='link' size='sm' @click='licenseInformationModalShow()')
        | {{ $t('license-information') }}
  b-row
    b-col(cols='auto')
      b-button(class='text-muted' variant='link' size='sm' @click='sendErrorModalShow()')
        | {{ $t('find-error-?') }}
    b-col(class='ml-auto' cols='auto')
      b-button(
        class='text-muted'
        variant='link'
        size='sm'
        @click='openURL("https://github.com/rudnovd/heroes3-damage-calculator")'
      )
        | {{ $t('source-code') }}

  //- License information modal
  b-modal(
    v-if='licenseInformationModal'
    title='License information'
    ref='licenseInformationModal'
    size='lg'
    ok-disabled=true
    cancel-disabled=true
    hide-footer=true
  )
    //- Modal content
    b-row
      b-col(cols='12')
        p MIT License
        p Copyright (c) 2019
          b-link(href='https://github.com/rudnovd')  https://github.com/rudnovd
        p Permission is hereby granted, free of charge, to any person obtaining a copy
          | of this software and associated documentation files (the "Software"), to deal
          | in the Software without restriction, including without limitation the rights
          | to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          | copies of the Software, and to permit persons to whom the Software is
          | furnished to do so, subject to the following conditions:

        p The above copyright notice and this permission notice shall be included in all
          | copies or substantial portions of the Software.

        p THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          | IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          | FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          | AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          | LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          | OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          | SOFTWARE.

  //- Send error modal
  b-modal(
    title='Send error'
    ref='sendErrorModal'
    size='lg'
    ok-disabled=true
    cancel-disabled=true
    hide-footer=true
  )
    //- Modal content
    b-row(align-v='center' v-if='sendErrorModal')
      b-col(cols='10' offset='1')
        iframe(src="https://docs.google.com/forms/d/e/1FAIpQLScB1GE0fEa-jIxkDmcMj-JFG5voOLuzLU-duU3_NW_AC4YMkQ/viewform?embedded=true" width="640" height="471" frameborder="0" marginheight="0" marginwidth="0") Загрузка...

  //- How to use modal
  b-modal(
    v-if='howToUseModal'
    title='How to use?'
    ref='howToUseModal'
    size='lg'
    ok-disabled=true
    cancel-disabled=true
    hide-footer=true
  )
    //- Modal content
    b-row
      b-col(cols='12')
        p Soon

</template>

<script>
export default {
  name: 'pageFooter',
  data () {
    return {
      sendErrorModal: false,
      licenseInformationModal: true,
      howToUseModal: true
    }
  },
  methods: {
    openURL (url) {
      window.open(url)
    },
    sendErrorModalShow () {
      this.sendErrorModal = true
      this.$refs.sendErrorModal.show()
    },
    licenseInformationModalShow () {
      this.$refs.licenseInformationModal.show()
      // this.licenseInformationModal = true
    },
    howToUseModalShow () {
      this.$refs.howToUseModal.show()
      // this.howToUseModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid rgba(0,0,0,.1);
}
</style>

<i18n>
{
  "en": {
    "how-to-use": "How to use",
    "license-information": "License information",
    "find-error-?": "Find error?",
    "source-code": "Source code"
  },
  "ru": {
    "how-to-use": "Как пользоваться",
    "license-information": "Информация о лицензии",
    "find-error-?": "Нашли ошибку?",
    "source-code": "Исходный код"
  }
}
</i18n>
