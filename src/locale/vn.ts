const vn = {
  appName: 'CreScorex',
  welcome: {
    _nav: 'Welcome',
    subtext: 'CHÀO MỪNG ĐẾN VỚI',
    userAgreement: {
      [0]: 'Với việc tạo tài khoản, bạn đã đồng ý với ',
      [1]: ' và ',
      [2]: ' của chúng tôi',
    },
    termsOfService: 'điều khoản dịch vụ',
    privacyPolicy: 'chính sách bảo mật',
  },
  signIn: {
    _nav: 'Sign In',
    usernameInput: 'Số điện thoại',
    passwordInput: 'Mật khẩu',
    forgetPassword: 'Quên mật khẩu?',
    submitBtn: 'Đăng Nhập',
    askSignUpTxt: 'Chưa có tài khoản?',
    signUpTxt: 'Đăng Ký',
  },
  signUp: {
    _nav: 'Sign Up',
    backTxt: 'Quay lại',
    licenseCodeInput: 'Mã bản quyền',
    emailInput: 'Địa chỉ email',
    phoneInput: 'Số điện thoại',
    passwordInput: 'Mật khẩu',
    rePasswordInput: 'Xác nhận mật khẩu',
    submitBtn: 'Đăng Ký',
  },
  forgotPassword: {
    _nav: 'Forgot Password',
    backTxt: 'Quay lại',
    usernameInput: 'Số điện thoại',
    submitBtn: 'Xác nhận'
  }, 
  home: {
    _nav: 'Trang chủ',
    header: 'Lịch sử tra cứu',
    firstSubHeader: 'Điểm tín dụng',
    suggestion: 'Đề xuất',
    suggestionContent: {
      low: '',
      middle:
        'Bạn nên duy trì số dư tài khoản trung bình hàng tháng lớn hơn 15.000.000 VND để có thể cải thiện điểm tín dụng.',
      high: '',
    },
    secondSubHeader: ' Tính toán khoản vay',
    result: 'Kết quả:',
    resultContent: 'Xác suất vay thành công là %{percentage} phần trăm',
    consultation: 'Một số lời khuyên cho khách hàng:',
    consultationContent: [
      'Quý khách có thể cân nhắc khoản vay với số tiền ít hơn',
      'Quý khách cần duy trì số dư tài khoản hàng tháng tốt hơn để cải thiện điểm tín dụng cá nhân',
    ],
    loanOptionsInput: 'Chọn kiểu vay',
    loanAmountInput: 'Số tiền vay',
    recommendContent: {
      header: 'Đề xuất khoản vay',
      submitBtn: 'Xác nhận'
    },
    submitBtn: 'Tiếp tục',
  },
  search: {
    _nav: 'Tra cứu',
    phoneNumInput: 'Số điện thoại',
    // New input
    otpCodeInput: 'Mã OTP',
    submitBtn: 'Tra cứu >',
  },
  changePassword: {
    _nav: 'Đổi mật khẩu',
    oldPassInput: 'Nhập mật khẩu cũ',
    newPassInput: 'Nhập mật khẩu mới',
    confirmPassInput: 'Nhập lại mật khẩu mới',
    submitBtn: 'Xác nhận',
  },
  aboutMe: {
    _nav: 'Thông tin cá nhân',
    additional: 'Bổ sung',
    bank: 'Ngân hàng',
    accId: 'Mã khách hàng',
    accStatus: 'Tình trạng tài khoản',
    email: 'Email',
    phoneNum: 'Số điện thoại',
    signOutBtn: 'Đăng xuất',
    changePassBtn: 'Đổi mật khẩu',
  },
}

export default vn
