<template>
  <div class="forbidden-container">
    <div class="forbidden-content">
      <div class="forbidden-icon">
        <span class="lock-icon">🔒</span>
      </div>
      <h1>접근이 제한되었습니다</h1>
      <p>죄송합니다. 이 페이지에 접근할 권한이 없습니다.</p>
      <p class="error-code">Error Code: 403 Forbidden</p>
      <div class="action-buttons">
        <router-link to="/" class="btn btn-primary">홈으로 돌아가기</router-link>
        <button @click="goBack" class="btn btn-secondary">이전 페이지로</button>
      </div>
      <p class="contact-info">
        접근 권한이 필요하시면 관리자에게 문의하세요: <a href="mailto:admin@example.com">admin@example.com</a>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ForbiddenPage',
  setup() {
    const router = useRouter();
    
    const goBack = () => {
      router.go(-1);
    };
    
    return {
      goBack
    };
  }
});
</script>

<style scoped>
.forbidden-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
  background-color: #f8f9fa;
}

.forbidden-content {
  max-width: 600px;
  padding: 40px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.forbidden-icon {
  margin-bottom: 20px;
}

.lock-icon {
  font-size: 72px;
  line-height: 1;
}

h1 {
  font-size: 28px;
  color: #dc3545;
  margin-bottom: 16px;
}

p {
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 16px;
}

.error-code {
  font-family: monospace;
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 24px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
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

.contact-info {
  font-size: 14px;
  color: #6c757d;
  margin-top: 10px;
}

.contact-info a {
  color: #007bff;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

@media (max-width: 576px) {
  .forbidden-content {
    padding: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }
  
  .lock-icon {
    font-size: 60px;
  }
  
  h1 {
    font-size: 24px;
  }
}
</style> 