<template>
  <RImageContainer>
    <RTitleContainer>
      <RModalTitle>변경 전</RModalTitle>
      <RModalTitle class="redFont">변경 후</RModalTitle>
    </RTitleContainer>
    <RDetailImage v-if="currentImage" :src="currentImage" alt="Rate Detail" />
    <RNoImage v-else>이미지가 없습니다</RNoImage>
  </RImageContainer>

  <ModalBtnHeightDiv />
  <ModalBtnDiv>
    <ModalBtn @click="prevImage">
      <i class="material-icons">arrow_back</i>
    </ModalBtn>
    <ModalBtn @click="nextImage">
      <i class="material-icons">arrow_forward</i>
    </ModalBtn>
  </ModalBtnDiv>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as RateCss from '@/assets/styles/rate/RateCss.js';

export default {
  name: 'ModalRateDetail',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...RateCss,
  },
  props: {
    imgKeyword: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const images = ref([])
    const currentIndex = ref(0)
    
    const prefixMap = {
      'one': 'A1_',
      'two': 'A2_',
      'three': 'A3_',
      'four': 'A4_',
      'five': 'A5_',
      'six': 'B6_',
      'seven': 'B7_',
      'eight': 'B8_',
      'nine': 'B9_',
      'ten': 'B10_',
      'eleven': 'B11_',
      'twelve': 'B12_',
      'thirteen': 'C13_',
      'fourteen': 'C14_',
      'fifteen': 'C15_',
      'sixteen': 'C16_',
      'seventeen': 'C17_',
      'eighteen': 'C18_',
      'nineteen': 'D19_',
      'twenty': 'D20_',
      'twentyOne': 'D21_',
      'twentyTwo': 'D22_',
      'twentyThree': 'D23_',
      'twentyFour': 'E24_',
      'twentyFive': 'E25_',
      'twentySix': 'E26_',
      'twentySeven': 'E27_',
      'twentyEight': 'E28_',
    }

    // imgKeyword prop이 변경될 때마다 이미지 다시 로드
    watch(() => props.imgKeyword, async (newVal) => {
      if (newVal) {
        await loadImages()
      }
    })
    
    // 현재 표시할 이미지 경로
    const currentImage = computed(() => {
      if (images.value.length > 0) {
        return images.value[currentIndex.value]
      }
      return null
    })
    
    // 이미지 로드 함수
    const loadImages = async () => {
      try {
        const prefix = prefixMap[props.imgKeyword]
        if (!prefix) {
          console.warn('유효하지 않은 이미지 키워드:', props.imgKeyword)
          return
        }
        
        // 이미지 배열 초기화
        images.value = []
        currentIndex.value = 0
        
        // 이미지 파일 경로 추가
        const baseUrl = `/file/rate_img/${prefix}`
        
        // 이미지 존재 여부를 확인하는 함수
        const checkImageExists = (url) => {
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
            img.src = url
          })
        }
        
        // 동적으로 이미지 찾기
        const tempImages = []
        let i = 0
        let hasMoreImages = true
        while (hasMoreImages) {
          const imagePath = `${baseUrl}${i}.png`
          const exists = await checkImageExists(imagePath)

          if (exists) {
            tempImages.push(imagePath)
            i++
          } else {
            // 연속된 번호의 이미지가 더 이상 없으면 중단
            hasMoreImages = false
          }
        }
        
        // 찾은 이미지가 있으면 배열에 추가
        if (tempImages.length > 0) {
          images.value = tempImages
        } else {
          console.warn('해당 프리픽스에 대한 이미지를 찾을 수 없습니다:', prefix)
        }
      } catch (error) {
        console.error('이미지 로드 중 오류 발생:', error)
      }
    }
    
    // 다음 이미지로 이동
    const nextImage = () => {
      if (images.value.length <= 1) {
        return;
      }
      
      if (currentIndex.value < images.value.length - 1) {
        currentIndex.value++;
      } else {
        // 마지막 이미지면 처음으로 돌아감
        currentIndex.value = 0;
      }
    }

    // 이전 이미지로 이동
    const prevImage = () => {
      if (images.value.length <= 1) {
        return;
      }
      
      if (currentIndex.value > 0) {
        currentIndex.value--;
      } else {
        // 첫 이미지면 마지막으로 돌아감
        currentIndex.value = images.value.length - 1;
      }
    }
    
    // props가 변경될 때 이미지 다시 로드
    onMounted(async () => {
      await loadImages()
    })
    
    return {
      images,
      currentIndex,
      currentImage,
      prevImage,
      nextImage,
    }
  }
}
</script>