# Phát triển portfolio

Next.js (static export) + Tailwind, triển khai lên Vercel tại **https://portfolio.tranvanhuy.io.vn**. (`README.md` là hồ sơ hiển thị trên trang cá nhân GitHub, không phải tài liệu dự án.)

## Chạy local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # xuất site tĩnh ra thư mục out/
```

## Sửa nội dung

Toàn bộ nội dung nằm trong `data/` (không có database, không cần admin):

| File | Nội dung |
|---|---|
| `data/personal/personal.json` | Họ tên, giới thiệu, email, số điện thoại, mạng xã hội (vi + en) |
| `data/stats.json` | Các số liệu nổi bật |
| `data/experiences.json`, `data/education.json`, `data/skills.json` | Kinh nghiệm, học vấn, kỹ năng |
| `data/whatIBuild.json`, `data/ui.json` | Mục "Tôi xây dựng gì" và chữ giao diện |
| `data/projects/<slug>/project.json` | Từng dự án |

Thêm dự án mới: tạo `data/projects/<slug>/project.json`, bỏ ảnh vào `public/project-images/<slug>/`, rồi thêm một dòng vào `lib/portfolio/projectSources.ts`.

Nút **Tải CV** trỏ tới `/cv.pdf`: đặt file CV vào `public/cv.pdf`.

Form liên hệ dùng EmailJS (gửi từ trình duyệt). Tạo `.env.local`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Thiếu các biến này thì form chạy chế độ giả lập (không gửi mail thật).

## Triển khai

Xem [DEPLOY.md](DEPLOY.md).

## Domain và thương hiệu

Tên thương hiệu và domain nằm ở một chỗ: `lib/site.ts`, đọc từ biến môi trường (xem `.env.example`). Đổi domain: đặt `NEXT_PUBLIC_ROOT_DOMAIN`, `NEXT_PUBLIC_PORTFOLIO_URL`, `NEXT_PUBLIC_STORE_URL` trên Vercel rồi Redeploy, không cần sửa code. Store có file tương ứng `lib/site/config.ts`; hai bên dùng chung `ROOT_DOMAIN`.

Giao diện sáng/tối được chia sẻ giữa store và portfolio bằng cookie `ht_theme` trên domain gốc (chỉ hoạt động khi hai site cùng domain gốc).
