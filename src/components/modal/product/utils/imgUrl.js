export const getProductImageUrl = (pcode) => {
  return `/assets/img/products/p${pcode}.jpg`;
  // try {
  //   // 기본 이미지 경로 사용
  //   return `/assets/img/products/p${pcode}.jpg`;
  // } catch (error) {
  //   console.error('이미지 URL 생성 오류:', error);
  //   return '/assets/img/no-image.jpg'; // 기본 이미지 경로
  // }
}

export default {
  getProductImageUrl
}