import styled from 'vue3-styled-components';

// 공통 스타일
export const LoginPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const LoginFormContainer = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LoginForm = styled.div`
  height: 700px;
  font-family: Tahoma, Geneva, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 100px auto;
    height: auto;
  }
`;

export const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;

  img {
    width: 80px;
    @media (max-width: 768px) {
      width: 70px;
    }
  }
`;

export const LoginLogo = styled.img`
  width: 80px;
`;

export const LoginTitleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
`;

export const LoginWelcomeTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const LoginWelcomeSubtitle = styled.div`
  font-size: 14px;
`;

export const LoginFormContent = styled.div`
  width: 60%;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 15px;
  box-sizing: border-box;
  color: #000000;
`;

export const LoginSubmit = styled.input`
  width: 100%;
  height: 45px;
  background: #0031E5;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;

  &:hover {
    box-shadow: 0px 2px 6px rgb(64, 159, 197);
    cursor: pointer;
    color: #fff;
  }
`;

export const LoginDivider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 15px 0;
`;

export const LoginDividerLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ddd;
`;

export const LoginDividerText = styled.div`
  margin: 0 10px;
  color: #888;
  font-size: 14px;
`;

export const LoginKakao = styled.img`
  width: 100%;
  max-height: 50px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(45deg, #ffffff, #ffffff, #ffffff);
    box-shadow: 0px 2px 6px rgb(64, 159, 197);
  }
`;

export const LoginDownload = styled.div`
  display: none;
`;

export const LoginBannerContainer = styled.div`
  width: 55%;
  height: 770px;
`;

export const LoginBannerImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const LoginNoticeTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

