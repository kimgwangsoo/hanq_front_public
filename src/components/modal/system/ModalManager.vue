<template>
  <ManagerContainer>
    <ManagerTable>
      <tr>
        <th>담당자명 *</th>
        <td><input v-model="managerInfo.name" /></td>
      </tr>
      <tr>
        <th>아이디 *</th>
        <td><input v-model="managerInfo.userName" :disabled="manageType === 'Add' ? false : true" /></td>
      </tr>
      <tr>
        <th>암호 *</th>
        <td><input v-model="managerInfo.pw" type="password" placeholder="수정만 가능합니다." /></td>
      </tr>
      <tr>
        <th>부서 *</th>
        <td>
          <select v-model="managerInfo.department">
            <option value="대표">대표</option>
            <option value="사원">사원</option>
            <option value="영업">영업</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>권한 *</th>
        <td>
          <select v-model="managerInfo.role">
            <option value="admin">관리자</option>
            <option value="">일반</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>이메일</th>
        <td><input v-model="managerInfo.email" /></td>
      </tr>
      <tr>
        <th>연락처</th>
        <td><input v-model="managerInfo.phone" /></td>
      </tr>
      <tr>
        <th>본인부담금계좌</th>
        <td><input v-model="managerInfo.bankInfo" /></td>
      </tr>
    </ManagerTable>
  </ManagerContainer>

  <ModalBtnDiv>
    <ModalBtn @click="setManagerData">저장</ModalBtn>
    <ModalBtn class="red" @click="$emit('close')">취소</ModalBtn>
  </ModalBtnDiv>
</template>

<script>
import { toRef } from 'vue';
import * as ModalSystemCss from '@/assets/styles/system/ModalSystemCss.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';
import { addUser, updateUser } from '@/api/user';
import Swal from 'sweetalert2';

export default {
  name: 'ModalManager',
  components: {
    ...ModalSystemCss,
    ...ModalCss,
  },
  props: {
    show: {
      Boolean,
      required: true
    },
    manageType: {
      String,
      default: 'Add'
    },
    managerData: {
      Object,
      default: {}
    },
  },
  emits: ['close', 'getMangerList'],
  setup(props, { emit }) {  
    const managerInfo = toRef(props, 'managerData');

    const setManagerData = async () => {
      // 이메일이 비어있으면 undefined로 설정
      if (managerInfo.value.email === '') {
        managerInfo.value.email = undefined;
      }
      try {
        if (props.manageType === 'Add') {
          if (!managerInfo.value.userName || !managerInfo.value.pw || !managerInfo.value.name) {
            Swal.fire({
              icon: 'error',
              title: '필수 정보를 입력해주세요',
              text: '아이디, 암호, 담당자명은 필수 입력 항목입니다',
            });
            return;
          }
          
          const response = await addUser(managerInfo.value);
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: '담당자 추가 완료',
            });
            emit('getMangerList');
            emit('close');
          } else {
            Swal.fire({
              icon: 'error',
              title: '담당자 추가 실패',
              text: response.message || '오류가 발생했습니다',
            });
          }
        } else {
          delete managerInfo.value.createdAt;
          
          const response = await updateUser(managerInfo.value);
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: '담당자 정보 수정 완료',
            });
            emit('getMangerList');
            emit('close');
          } else {
            Swal.fire({
              icon: 'error',
              title: '담당자 정보 수정 실패',
              text: response.message || '오류가 발생했습니다',
            });
          }
        }
      } catch (error) {
        console.error('담당자 처리 오류:', error);
        Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: '서버 요청 중 오류가 발생했습니다',
        });
      }
    };
    return {
      managerInfo,
      setManagerData,
    };
  },
};
</script>