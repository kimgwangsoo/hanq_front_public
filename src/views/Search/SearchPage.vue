<template>
  <div class="search-page">
    <h1>수급자조회하기</h1>
    <div class="search-container">
      <div class="search-form">
        <div class="form-group">
          <label for="search-type">검색 유형</label>
          <select id="search-type" v-model="searchType">
            <option value="name">이름</option>
            <option value="number">장기요양번호</option>
            <option value="phone">전화번호</option>
            <option value="address">주소</option>
          </select>
        </div>
        <div class="form-group">
          <label for="search-keyword">검색어</label>
          <input 
            type="text" 
            id="search-keyword" 
            v-model="keyword" 
            placeholder="검색어를 입력하세요"
            @keyup.enter="searchRecipients"
          />
        </div>
        <button class="search-button" @click="searchRecipients">검색</button>
      </div>
      
      <div class="search-results" v-if="searchPerformed">
        <h2>검색 결과</h2>
        <table class="results-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>장기요양번호</th>
              <th>생년월일</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="recipients.length === 0">
              <td colspan="6">검색 결과가 없습니다.</td>
            </tr>
            <tr v-for="recipient in recipients" :key="recipient.id">
              <td>{{ recipient.name }}</td>
              <td>{{ recipient.number }}</td>
              <td>{{ recipient.birthdate }}</td>
              <td>{{ recipient.phone }}</td>
              <td>{{ recipient.address }}</td>
              <td>
                <button class="detail-button" @click="viewDetail(recipient.id)">상세보기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchPage',
  setup() {
    const searchType = ref('name');
    const keyword = ref('');
    const recipients = ref([]);
    const searchPerformed = ref(false);
    
    // 수급자 검색 함수
    const searchRecipients = async () => {
      if (!keyword.value.trim()) {
        alert('검색어를 입력하세요.');
        return;
      }
      
      try {
        // 실제 API 호출 대신 더미 데이터 사용
        // const response = await axios.get('/api/recipients/search', {
        //   params: {
        //     type: searchType.value,
        //     keyword: keyword.value
        //   }
        // });
        // recipients.value = response.data;
        
        // 더미 데이터
        recipients.value = [
          {
            id: 1,
            name: '김철수',
            number: 'L2311123307',
            birthdate: '1950-05-15',
            phone: '010-1234-5678',
            address: '서울시 강남구 테헤란로 123'
          },
          {
            id: 2,
            name: '이영희',
            number: 'L2311123308',
            birthdate: '1955-08-20',
            phone: '010-9876-5432',
            address: '서울시 서초구 반포대로 456'
          }
        ];
        
        searchPerformed.value = true;
      } catch (error) {
        console.error('수급자 검색 중 오류 발생:', error);
        alert('검색 중 오류가 발생했습니다.');
      }
    };
    
    // 수급자 상세 정보 보기
    const viewDetail = (id) => {
      // 실제로는 라우터를 사용하여 상세 페이지로 이동
      console.log(`수급자 ID ${id}의 상세 정보 보기`);
      // router.push(`/recipient/${id}`);
    };
    
    return {
      searchType,
      keyword,
      recipients,
      searchPerformed,
      searchRecipients,
      viewDetail
    };
  }
};
</script>

<style scoped>
.search-page {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #1a2136;
}

.search-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.search-form {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

select, input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.search-button {
  padding: 10px 20px;
  background-color: #1a2136;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.search-button:hover {
  background-color: #2c3e50;
}

.search-results {
  margin-top: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
}

.results-table th, .results-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.results-table th {
  background-color: #f5f5f5;
  font-weight: 500;
  color: #333;
}

.results-table tr:hover {
  background-color: #f9f9f9;
}

.detail-button {
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.detail-button:hover {
  background-color: #2980b9;
}
</style> 