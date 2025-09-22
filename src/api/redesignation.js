import apiClient from './apiClient';
/**
 * 양식 목록 조회
 */
export const getTemplates = async () => {
  try {
    const response = await apiClient.get('/redesignation/templates');
    return response.data;
  } catch (error) {
    console.error('양식 목록 조회 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 양식 다운로드 URL 생성
 */
export const getTemplateDownloadUrl = (templateId) => {
  return `${apiClient.defaults.baseURL}/redesignation/templates/${templateId}/download`;
};

/**
 * 양식 다운로드
 */
export const downloadTemplate = async (templateId, templateName, fileExtension) => {
  try {
    const response = await apiClient.get(`/redesignation/templates/${templateId}/download`, {
      responseType: 'blob'
    });
    
    // 파일명 추출
    const contentDisposition = response.headers['content-disposition'];
    let filename = templateName;
    
    if (contentDisposition) {
      // filename*=UTF-8''... 형식 확인 (RFC 5987)
      const filenameStarRegex = /filename\*=UTF-8''([^;]+)/i;
      const filenameStarMatch = contentDisposition.match(filenameStarRegex);
      
      // filename="..." 형식 확인
      const filenameRegex = /filename=["']?([^"']+)["']?/i;
      const filenameMatch = contentDisposition.match(filenameRegex);
      
      if (filenameStarMatch && filenameStarMatch[1]) {
        filename = decodeURIComponent(filenameStarMatch[1]);
      } else if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }
    
    // 확장자가 이미 포함되어 있는지 체크 후 없으면 붙임
    if (fileExtension && filename && !filename.toLowerCase().endsWith('.' + fileExtension.toLowerCase())) {
      filename += '.' + fileExtension;
    }
    
    // Blob URL 생성 및 다운로드
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true };
  } catch (error) {
    console.error('양식 다운로드 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 파일 업로드
 */
export const uploadFile = async (file, category, itemId, templateId = null, uploaded_by) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    
    // itemId가 유효한 경우에만 추가 (백엔드는 item_id를 기대함)
    if (itemId) {
      formData.append('item_id', itemId);
    }

    // 템플릿 ID가 있는 경우 추가
    if (templateId) {
      formData.append('templateId', templateId);
    }

    if (uploaded_by) {
      formData.append('uploaded_by', uploaded_by);
    }
    const response = await apiClient.post('/redesignation/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('파일 업로드 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 파일 목록 조회
 */
export const getFiles = async (category, itemId, uploaded_by) => {
  try {
    const params = {};
    if (category) params.category = category;
    // 백엔드는 item_id를 기대함
    if (itemId) params.item_id = itemId;
    if (uploaded_by) params.uploaded_by = uploaded_by;
    console.log('프론트엔드 getFiles 요청 params:', params);

    const response = await apiClient.get('/redesignation/files', { params });
    return response.data;
  } catch (error) {
    console.error('파일 목록 조회 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 파일 다운로드 URL 생성
 */
export const getFileDownloadUrl = (fileId) => {
  return `${apiClient.defaults.baseURL}/redesignation/files/${fileId}/download`;
};

/**
 * 파일 다운로드
 */
export const downloadFile = async (fileId, fileName) => {
  try {
    const response = await apiClient.get(`/redesignation/files/${fileId}/download`, {
      responseType: 'blob'
    });
    
    // 직접 파일명 사용 (서버에서 받은 Content-Disposition 무시)
    // 파일명에 확장자가 없으면 Content-Type에서 추론
    let filename = fileName;
    if (!filename.includes('.')) {
      const contentType = response.headers['content-type'];
      const ext = getExtensionFromMimeType(contentType);
      if (ext) filename += ext;
    }
    
    // Blob URL 생성 및 다운로드
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true };
  } catch (error) {
    console.error('파일 다운로드 중 오류 발생:', error);
    throw error;
  }
};

// MIME 타입에서 확장자 추출 함수
function getExtensionFromMimeType(mimeType) {
  const mimeToExt = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/x-hwp': '.hwp',
    'application/haansofthwp': '.hwp',
    'text/plain': '.txt',
    'image/jpeg': '.jpg',
    'image/png': '.png'
  };
  
  return mimeToExt[mimeType] || '';
}

/**
 * 파일 삭제
 */
export const deleteFile = async (fileId) => {
  try {
    const response = await apiClient.delete(`/redesignation/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('파일 삭제 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 직원별 파일 업로드
 */
export const uploadEmployeeFile = async (employeeId, file, category, templateId = null, uploaded_by) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('employee_id', employeeId); // 백엔드는 employee_id를 기대함
    
    // 템플릿 ID가 있는 경우 추가
    if (templateId) {
      formData.append('templateId', templateId);
    }

    // uploaded_by가 있는 경우 추가
    if (uploaded_by) {
      formData.append('uploaded_by', uploaded_by);
    }

    const response = await apiClient.post(`/redesignation/employees/${employeeId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('직원 파일 업로드 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 직원별 파일 목록 조회
 */
export const getEmployeeFiles = async (employeeId, category) => {
  try {
    const params = {};
    if (category) params.category = category;
    // 백엔드는 employee_id를 기대하지만, URL 경로에 employeeId가 포함되므로 여기서는 추가하지 않음
    // 백엔드 라우트: /employees/:employeeId/files

    const response = await apiClient.get(`/redesignation/employees/${employeeId}/files`, { params });
    return response.data;
  } catch (error) {
    console.error('직원 파일 목록 조회 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 직원별 파일 다운로드 URL 생성
 */
export const getEmployeeFileDownloadUrl = (employeeId, fileId) => {
  return `${apiClient.defaults.baseURL}/redesignation/employees/${employeeId}/files/${fileId}/download`;
};

/**
 * 직원 파일 다운로드
 */
export const downloadEmployeeFile = async (employeeId, fileId) => {
  try {
    if (!employeeId || !fileId) {
      throw new Error('유효하지 않은 직원 ID 또는 파일 ID입니다.');
    }
    
    const response = await apiClient.get(`/redesignation/employees/${employeeId}/files/${fileId}/download`, {
      responseType: 'blob'
    });
    
    // 응답이 비어있는지 확인
    if (response.data.size === 0) {
      throw new Error('다운로드된 파일이 비어있습니다.');
    }
    
    // 파일명 추출
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'employee-file';
    
    // 확장자 매핑
    const mimeToExtension = {
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
      'application/x-hwp': 'hwp',
      'application/haansofthwp': 'hwp',
      'application/zip': 'zip',
      'text/plain': 'txt',
      'text/html': 'html',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif'
    };
    
    // Content-Type에서 확장자 추출
    let fileExtension = '';
    const contentType = response.headers['content-type'];
    if (contentType) {
      fileExtension = mimeToExtension[contentType] || contentType.split('/')[1] || '';
    }
    
    if (contentDisposition) {
      // filename*=UTF-8''... 형식 확인 (RFC 5987)
      const filenameStarRegex = /filename\*=UTF-8''([^;]+)/i;
      const filenameStarMatch = contentDisposition.match(filenameStarRegex);
      
      // filename="..." 형식 확인
      const filenameRegex = /filename=["']?([^"']+)["']?/i;
      const filenameMatch = contentDisposition.match(filenameRegex);
      
      if (filenameStarMatch && filenameStarMatch[1]) {
        // RFC 5987 형식이 있으면 우선 사용
        filename = decodeURIComponent(filenameStarMatch[1]);
      } else if (filenameMatch && filenameMatch[1]) {
        // 일반 filename 형식 사용
        filename = filenameMatch[1];
      }
    }
    
    // 확장자가 이미 포함되어 있는지 확인
    if (fileExtension && !filename.toLowerCase().endsWith('.' + fileExtension.toLowerCase())) {
      filename += '.' + fileExtension;
    }
    
    // Blob URL 생성 및 다운로드
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true };
  } catch (error) {
    console.error('직원 파일 다운로드 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 직원별 파일 삭제
 */
export const deleteEmployeeFile = async (employeeId, fileId) => {
  try {
    const response = await apiClient.delete(`/redesignation/employees/${employeeId}/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('직원 파일 삭제 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 파일 목록 조회 (전체) - 기존 getFiles와 통합 가능성 있음
 */
export const getAllFiles = async () => {
  try {
    const response = await apiClient.get('/redesignation/files');
    return response.data;
  } catch (error) {
    console.error('전체 파일 목록 조회 중 오류 발생:', error);
    throw error;
  }
}; 