import apiClient from './apiClient';

/**
 * 이미지 업로드 API (1개씩 저장)
 * @param {FormData} formData - 이미지 파일과 관련 정보가 포함된 FormData 객체
 * FormData 객체 예시 :
 *  폴더명(기능/성격), 사업소 기본키, 테이블명, 테이블 기본키, 이미지 인덱스
 *  formData.append('folder', folder); // 폴더명(기능/성격)
 *  formData.append('companyId', companyId); // 사업소 기본키
 *  formData.append('table', table); // 테이블명
 *  formData.append('tableId', tableId); // 테이블 기본키
 *  formData.append('index', index); // 이미지 인덱스
 *  formData.append('images', file); // 이미지 파일
 *  @returns {Promise} API 응답
 */
export const uploadImages = async (formData) => {
  try {
    const response = await apiClient.post('/img/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 이미지 삭제 API
 * @param {String} image - 삭제할 이미지명
 * @returns {Promise} API 응답
 */
export const deleteImage = async (image) => {
  try {
    const response = await apiClient.post('/img/delete', { image });
    return response.data;
  } catch (error) {
    console.error('이미지 삭제 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 이미지 목록 조회 API
 * 필요 데이터 : 폴더명(기능/성격), 사업소 기본키, 테이블명, 테이블 기본키
 * @param {Number} companyId - 사업소 ID
 * @param {String} folder - 폴더명(기능/성격)
 * @param {String} table - 테이블명
 * @param {Number} tableId - 테이블 기본키
 * @returns {Promise} API 응답
 */
export const getImages = async (companyId, folder, table, tableId) => {
  try {
    const response = await apiClient.post(`/img`, {
      companyId,
      folder,
      table,
      tableId
    });
    return response.data;
  } catch (error) {
    console.error('이미지 목록 조회 중 오류 발생:', error);
    throw error;
  }
};