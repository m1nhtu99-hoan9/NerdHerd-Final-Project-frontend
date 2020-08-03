const vn = {
  appName: 'CreScorex', 
  screens: {
    signIn: {
      _nav: 'Sign In',
      usernameInput: 'Username',
      passwordInput: 'Password', 
      forgetPassword: 'Forget Password?',
      submitBtn: 'Sign In'
    }, 
    home: {
      _nav: 'Home',
      header: 'Search History', 
      firstSubHeader: 'Credit Score', 
      suggestion: 'Suggestion', 
      suggestionContent: {
        low: '', 
        middle: '', 
        high: ''
      }, 
      secondSubHeader: 'Loan Options',
      result: 'Result:', 
      resultContent: 'Xác suất vay thành công là %{percentage} phần trăm',
      consultation: 'Suggestive advices to the customer:',
      consultationContent: [
        'Quý khách có thể cân nhắc khoản vay với số tiền ít hơn', 
        'Quý khách cần duy trì số dư tài khoản hàng tháng tốt hơn để cải thiện điểm tín dụng cá nhân'
      ], 
      loanOptionsInput: 'Pick your loan type', 
      loanAmountInput: 'Your loan amount', 
      submitBtn: 'Process >' 
    }, 
    search: {
      _nav: 'Search',
      phoneNumInput: 'Phone Number', 
      submitBtn: 'Process >'
    }, 
    changePassword: {
      _nav: 'Change Password',
      oldPassInput: 'Current password', 
      newPassInput: 'New password', 
      confirmPassInput: 'Re-type new password',
      submitBtn: 'Submit'
    }, 
    aboutMe: {
      _nav: 'About Me', 
      bank: 'Bank', 
      accId: 'Account ID', 
      accStatus: 'Account Status', 
      email: 'Email',
      phoneNum: 'Phone Number', 
      signOutBtn: 'Sign Out', 
      changePassBtn: 'Change Password'
    }
  }
}

export default vn