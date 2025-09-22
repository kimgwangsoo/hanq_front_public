<template>
    <ModalOverlayDiv v-if="show">
    <ModalDivArea :style="{ width, height }" @click.stop>
      <ModalCloseBtn @click="close">X</ModalCloseBtn>
      <ModalScrollArea :class="{ 'scrollAreaBorder': scrollAreaBorder }">
        <slot></slot>
      </ModalScrollArea>
    </ModalDivArea>
  </ModalOverlayDiv>
</template>
<script>
    import * as ModalCss from '@/assets/styles/ModalCss.js';
    export default ({
      components: {
        ...ModalCss,
      },
      name: 'ModalPage',
      props: {
          show: {
            type: Boolean,
            required: true
          },
          width: {
            type: String,
            default: '95%' // 기본 너비
          },
          height: {
            type: String,
            default: '95%' // 기본 높이
          },
          scrollAreaBorder: {
            type: Boolean,
            default: false
          }
      },
      methods: {
          close() {
            this.$emit('update:show', false);
            this.$emit('close');
          }
      }
    });
</script>