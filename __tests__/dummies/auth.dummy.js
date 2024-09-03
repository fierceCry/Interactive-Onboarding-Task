export const signUpData = {
  username: 'aa4518@naver.com',
  password: '12345678',
  nickname: 'kimmangyu',
};

export const signUpResponse = {
  message: "회원가입이 완료되었습니다.",
  data: {
    username: "aa45111@naver.com",
    nickname: "김만규",
    authorities: [
      {
        authorityName: "ROLE_USER"
      }
    ]
  }
}

export const signInData = {
  "username": "aa45111@naver.com",
  "nickname": "김만규",
  "authorities": [
      {
          "authorityName": "ROLE_USER"
      }
  ]
}

export const signInResponse = {
  accessToken: 'accessToken',
};
