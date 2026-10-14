# URBAN THREADS

Website thương mại điện tử thời trang demo được xây dựng bằng HTML, CSS và JavaScript thuần, tập trung vào trải nghiệm mua sắm streetwear và dashboard quản trị bán hàng.

## 1. Giới thiệu

Urban Threads là demo front-end cho cửa hàng thời trang đường phố dành cho giới trẻ, có giao diện hiện đại, thanh toán mô phỏng, quản lý đơn hàng và dashboard quản trị thao tác trên LocalStorage.

## 2. Tính năng chính

- Trang chủ, shop, lọc, tìm kiếm và chi tiết sản phẩm
- Wishlist, giỏ hàng và checkout mô phỏng
- Đăng ký, đăng nhập, quên mật khẩu, phân quyền demo
- Theo dõi đơn hàng và trung tâm thông báo
- Hồ sơ cá nhân, sổ địa chỉ, cài đặt người dùng
- Dashboard quản trị: sản phẩm, IMEI, hóa đơn, khách hàng, voucher, doanh thu
- Dữ liệu lưu trong LocalStorage để thao tác nhanh trên trình duyệt

## 3. Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript ES6+
- LocalStorage / SessionStorage (demo)
- Chart.js
- SheetJS (xlsx)
- Font Awesome
- Google Fonts

## 4. Cấu trúc thư mục

- index.html
- shop.html
- product-detail.html
- cart.html
- checkout.html
- order-success.html
- order-tracking.html
- notifications.html
- profile.html
- addresses.html
- settings.html
- login.html
- register.html
- forgot-password.html
- admin/
- css/
- js/
- README.md

## 5. Cách chạy

1. Mở thư mục dự án trong VS Code.
2. Cài đặt tiện ích Live Server nếu chưa có.
3. Nhấn chuột phải vào file index.html và chọn Open with Live Server.
4. Hoặc chạy lệnh trên terminal:

```bash
cd "c:/Users/Administrator/Downloads/webquanao"
python -m http.server 8000
```

Sau đó mở http://localhost:8000/ trong trình duyệt.

## 6. Tài khoản demo

- Admin: admin@urbanthreads.demo / Admin123!
- Staff: staff@urbanthreads.demo / Staff123!
- Customer: customer@urbanthreads.demo / Customer123!

> Đây là tài khoản demo cho mục đích kiểm thử frontend, không phải hệ thống xác thực thực tế.

## 7. Khởi tạo dữ liệu mẫu

Khi tải trang lần đầu tiên, ứng dụng sẽ tự động tạo dữ liệu demo vào LocalStorage nếu chưa có. Dữ liệu bao gồm:

- Sản phẩm
- Người dùng
- Giỏ hàng và wishlist
- Voucher
- Đơn hàng
- Thông báo
- Cài đặt

## 8. Kiểm thử chức năng

1. Mở trang chủ và xem danh mục sản phẩm.
2. Tìm kiếm và lọc sản phẩm.
3. Chọn màu và kích thước trong chi tiết sản phẩm.
4. Thêm sản phẩm vào giỏ hàng và wishlist.
5. Đăng ký và đăng nhập bằng tài khoản demo.
6. Điền thông tin checkout và đặt hàng.
7. Theo dõi đơn hàng trên trang tracking.
8. Truy cập admin/dashboard.html với tài khoản admin/staff.

## 9. Hạn chế của phiên bản frontend-only

- Không có backend thực sự.
- Không có xác thực bảo mật doanh nghiệp.
- Không có thanh toán ngân hàng/ ví điện tử thật.
- Không có email thật hoặc hệ thống gửi thông báo nền tảng.
- LocalStorage chỉ phù hợp cho demo trong trình duyệt.

## 10. Hướng phát triển backend sau này

- Chuyển sang Node.js / Express hoặc Laravel / ASP.NET Core.
- Tách dữ liệu sản phẩm, khách hàng, đơn hàng, voucher ra database.
- Bảo mật xác thực bằng JWT, refresh token, password hash.
- Tích hợp thanh toán thực tế với Stripe / VNPay / MoMo.
- Kết nối quản lý IMEI và dashboard doanh thu với API thực tế.

## 11. Thư viện/CDN được dùng

- Google Fonts
- Font Awesome
- Chart.js
- SheetJS

## 12. Lưu ý

Project là demo học tập / prototype UI thực tế, không biểu thị hệ thống production. Mục tiêu chính là cung cấp trải nghiệm storefront và quản trị bán hàng thật trên frontend.
