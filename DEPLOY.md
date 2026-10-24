# Đưa portfolio lên GitHub Pages với domain portfolio.tranvanhuy.io.vn

## 1. Tạo repo và đẩy code

```bash
cd portfolio   # thư mục này chính là repo hồ sơ: README.md hiển thị trên trang cá nhân + site portfolio
git add -A && git commit -m "feat: portfolio"
git branch -M main
git remote add origin https://github.com/tranvanhuy-hichan/tranvanhuy-hichan.git   # repo hồ sơ cá nhân (tên trùng username); repo store cũ đã đổi tên nên tên này đã trống
git push -u origin main
```

## 2. Bật GitHub Pages

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Workflow `.github/workflows/deploy.yml` sẽ tự build và deploy mỗi lần push lên `main`.

## 3. Trỏ domain

Tại nơi quản lý DNS của `tranvanhuy.io.vn`, thêm bản ghi:

| Type | Name | Value |
|---|---|---|
| CNAME | `portfolio` | `tranvanhuy-hichan.github.io` |

(Nếu trước đây `portfolio` đang trỏ về Vercel của dự án store, hãy xoá/ghi đè bản ghi cũ và gỡ domain này khỏi project Vercel.)

Sau đó vào **Settings → Pages → Custom domain**, nhập `portfolio.tranvanhuy.io.vn`, chờ GitHub kiểm tra DNS xong thì tick **Enforce HTTPS**.
File `public/CNAME` đã có sẵn để giữ cấu hình domain sau mỗi lần deploy.

## 4. Biến môi trường (form liên hệ)

Repo → **Settings → Secrets and variables → Actions → New repository secret**, thêm:
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.

## 5. Kiểm tra

- https://portfolio.tranvanhuy.io.vn/ hiển thị trang chủ.
- https://portfolio.tranvanhuy.io.vn/projects/nexshop/ mở được trang dự án.
- Dự án `store`: nút **Về tôi** mở sang domain trên.
