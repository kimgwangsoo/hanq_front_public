<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않거나, 삭제되었거나, 주소가 변경되었을 수 있습니다.</p>
      <div class="action-buttons">
        <router-link to="/" class="btn btn-primary">홈으로 돌아가기</router-link>
        <button @click="goBack" class="btn btn-secondary">이전 페이지로</button>
      </div>
      <div class="search-section">
        <p>찾으시는 것이 있으신가요?</p>
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="검색어를 입력하세요..." 
            @keyup.enter="performSearch"
          >
          <button @click="performSearch" class="search-btn">검색</button>
        </div>
      </div>
      <div class="quick-links">
        <p>자주 찾는 페이지:</p>
        <ul>
          <li><router-link to="/dashboard">대시보드</router-link></li>
          <li><router-link to="/order">주문 관리</router-link></li>
          <li><router-link to="/product">상품 관리</router-link></li>
          <li><router-link to="/client">고객 관리</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NotFoundPage',
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    
    const goBack = () => {
      router.go(-1);
    };
    
    const performSearch = () => {
      if (searchQuery.value.trim()) {
        // 여기에 실제 검색 기능 구현
        // 예: router.push({ path: '/search', query: { q: searchQuery.value } });
        console.log('검색어:', searchQuery.value);
        // 임시 구현: 검색어를 포함하는 경로로 이동 (데모용)
        router.push('/');
      }
    };
    
    return {
      searchQuery,
      goBack,
      performSearch
    };
  }
});
</script>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
  background-color: #f8f9fa;
}

.not-found-content {
  max-width: 700px;
  padding: 40px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  color: #e9ecef;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  color: #343a40;
  margin-bottom: 16px;
}

p {
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
}

.btn {
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.search-section {
  margin-bottom: 24px;
  padding: 20px 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.search-box {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-box input:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.search-btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #0069d9;
}

.quick-links {
  margin-top: 20px;
}

.quick-links ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}

.quick-links a {
  color: #007bff;
  text-decoration: none;
}

.quick-links a:hover {
  text-decoration: underline;
}

@media (max-width: 576px) {
  .not-found-content {
    padding: 20px;
  }
  
  .error-code {
    font-size: 100px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .quick-links ul {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 