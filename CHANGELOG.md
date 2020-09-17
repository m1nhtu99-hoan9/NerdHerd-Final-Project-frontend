# CHANGELOG 

## Log: 18/09/2020

- PUBLISH VERSION 1.0.0

## Log: 07/09/2020 (End of Week 10)

- [x] `UserCreditInfoCard`: bổ sung mục tính toán khoản vay
- [x] `SearchScreen`: bổ sung quy trình search điểm tín dụng theo số điện thoại
- [x] Hoàn thiện giao diện
- [x] Hoàn thiện transition animation


## Log: 01/09/2020 (End of Week 9)

Fixes based on PM's feedback:

- [x] `LoginScreen`: Form quên mật khẩu, và nút quay lại màn hình giới thiệu
- [x] `LoginScreen`: Nút quay lại dẫn đến màn hình <s>giới thiệu</s> đăng nhập
- [x] `SignUpScreen`: Đăng ký xong sẽ process đến màn hình đăng nhập chứ không process đến màn hình chính luôn
- [x] `SearchScreen`: <s>Sau khi tra cứu thì sẽ quay lại màn hình lịch sử tra cứu và tại cái lịch sử tra cứu đấy sẽ là hiển thị thông tin mới của số điện thoại vừa tra cứu</s> (Phần này liên quan đến backend nên có thể tính sau nhưng process cứ phải chuẩn đã)

## Log: End of Week 8

- [x] Redesign layout for `Welcome` screen
- [x] Fix bug: changing font family of 'user agreement' text components would interpolate newline character to them
- [x] Comeback touchable text for `SignUp` screen
- [ ] Form validation