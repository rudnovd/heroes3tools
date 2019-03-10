<template lang='pug'>
b-container.footer.mt-5
  b-row(): b-col(cols='auto').ml-auto.mt-2
    p(): b-link.text-muted(href='#' @click='$refs.sendErrorModal.show()') Find error?
  b-row(): b-col(cols='auto').ml-auto
    p(): b-link.text-muted(href='https://github.com/Hyuugo/heroes3-damage-calculator') Source repository
    b-modal(
      title='Send error'
      ref='sendErrorModal'
      size='lg'
      no-close-on-backdrop=true
      ok-disabled=true
      cancel-disabled=true
      hide-footer=true
    )
      //- Modal content
      b-row(align-v='center')
        b-col(cols='10' offset='1')
          iframe(src="https://docs.google.com/forms/d/e/1FAIpQLScB1GE0fEa-jIxkDmcMj-JFG5voOLuzLU-duU3_NW_AC4YMkQ/viewform?embedded=true" width="640" height="471" frameborder="0" marginheight="0" marginwidth="0") Загрузка...
</template>

<script>
export default {
  name: 'pageFooter',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid rgba(0,0,0,.1);
}
</style>
