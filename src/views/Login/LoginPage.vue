<template>
  <LoginPageContainer>
    <LoginFormContainer>
      <LoginForm>
        <LoginTitle>
          <img src="@/assets/img/icon.png"/>
          <LoginTitleText>
            <LoginWelcomeTitle>환영합니다</LoginWelcomeTitle>
            <LoginWelcomeSubtitle>환영합니다! 로그인 정보를 입력해주세요.</LoginWelcomeSubtitle>
          </LoginTitleText>
        </LoginTitle>
        
        <LoginFormContent>
          <LoginInput
            type="text"
            v-model="username"
            id="username"
            placeholder="ID"
            required
            @keyup.enter="handleLogin"
          />
          <LoginInput
            type="password"
            v-model="password"
            id="password"
            placeholder="PW"
            required
            @keyup.enter="handleLogin"
          />
          <LoginSubmit
            type="submit"
            value="로그인"
            @click="handleLogin"
          />
          
          <LoginDivider>
            <LoginDividerLine />
            <LoginDividerText>또는</LoginDividerText>
            <LoginDividerLine />
          </LoginDivider>
          
          <img src="@/assets/img/kakao_login_large_wide.png" style="width: 100%; cursor: pointer;" @click="kakaoLogin" />
        </LoginFormContent>

          <LoginDownload>
            <a target="_blank"
               href="https://drive.google.com/file/d/17cZv-ibGEWfF9wUVwpdhuFxyk7AWiH7b/view?usp=sharing">DownLoad</a>
          </LoginDownload>
        </LoginForm>
      </LoginFormContainer>
      
      <LoginBannerContainer class="mobileNone">
        <img src="@/assets/img/login_banner1.png" style="width: 100%; cursor: pointer;" />
      </LoginBannerContainer>
    </LoginPageContainer>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import * as PublicCss from '@/assets/styles/public.js';
import * as LoginPageCss from '@/assets/styles/LoginPageCss';

export default defineComponent({
  name: 'LoginPage',
  components: {
    ...PublicCss,
    ...LoginPageCss,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const username = ref('');
    const password = ref('');
    
    const handleLogin = async () => {
      if (!username.value || !password.value) {
        Swal.fire('입력 오류', '아이디와 비밀번호를 모두 입력해주세요.', 'error');
        return;
      }

      Swal.fire({
        title: '로그인 중...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const success = await store.dispatch('login', {
          username: username.value,
          password: password.value,
        });

        if (success) {
          Swal.close();
          // Swal.fire({
          //   icon: 'success',
          //   title: '로그인 성공',
          //   text: '환영합니다!',
          //   timer: 1500,
          //   showConfirmButton: false,
          // });

          const redirectPath = localStorage.getItem('redirectPath') || '/';
          localStorage.removeItem('redirectPath');
          router.push(redirectPath);
        } else {
          throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
      } catch (error) {
        Swal.close();
        console.error('로그인 오류:', error);
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: error.message,
          confirmButtonText: '확인',
        });
      }
    };
    
    const kakaoLogin = () => {
      // 카카오 로그인 로직 (현재는 구현되지 않음)
      Swal.fire('준비 중', '카카오 로그인 기능은 현재 준비 중입니다.', 'info');
    };

    return { 
      store, 
      router, 
      username, 
      password, 
      handleLogin, 
      kakaoLogin 
    };
  }
});
</script>

