# Triển khai portfolio lên Vercel với domain portfolio.tranvanhuy.io.vn

Repo: `tranvanhuy-hichan/tranvanhuy-hichan`. Mỗi lần push lên `main`, Vercel tự build và deploy.

## 1. Tạo project trên Vercel

Add New → Project → import repo `tranvanhuy-hichan`. Vercel tự nhận Next.js (site xuất tĩnh, thư mục `out`), giữ mặc định.

## 2. Biến môi trường (form liên hệ)

Project → Settings → Environment Variables, thêm cho cả Production/Preview:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

(giá trị giống file `.env.local`). Sau khi thêm, vào Deployments → Redeploy để biến có hiệu lực.

## 3. Domain

- Gỡ `portfolio.tranvanhuy.io.vn` khỏi project `store` (Settings → Domains → Remove).
- Thêm domain đó vào project portfolio (Settings → Domains).
- Cloudflare DNS: bản ghi `portfolio` theo đúng hướng dẫn Vercel hiển thị, để **DNS only** (đám mây xám), không bật proxy.

## 4. Kiểm tra

- https://portfolio.tranvanhuy.io.vn/ hiển thị trang chủ portfolio.
- https://portfolio.tranvanhuy.io.vn/projects/nexshop/ mở được trang dự án.
- Dự án `store` (sau khi deploy lại): nút **Về tôi** mở tab mới sang domain trên.
