import apiClient from './apiClient';

/**
 * 회사 ID로 문서 옵션 조회
 */
export const getDocOptionsByCompanyId = async (companyId) => {
  try {
    const response = await apiClient.get(`/service/doc-options/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('문서 옵션 조회 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 문서 옵션 생성
 */
export const createDocOption = async (docOption) => {
  try {
    const response = await apiClient.post('/service/doc-options', docOption);
    return response.data;
  } catch (error) {
    console.error('문서 옵션 생성 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 문서 옵션 업데이트
 */
export const updateDocOption = async (id, docOption) => {
  try {
    const response = await apiClient.put(`/service/doc-options/${id}`, docOption);
    return response.data;
  } catch (error) {
    console.error('문서 옵션 업데이트 중 오류 발생:', error);
    throw error;
  }
};
