import Link from 'next/link';

export default function NotFoundView() {
  return (
    <main className="flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="max-w-lg w-full text-center pf-card p-8 sm:p-12">
        <span className="pf-pill pf-pill-sun -rotate-3 mb-4">Lỗi 404</span>
        <h1 className="pf-heading text-7xl sm:text-8xl mb-4">
          4<span className="pf-brand">0</span>4
        </h1>
        <p className="pf-soft text-base font-semibold mb-8 leading-relaxed">Trang bạn tìm không tồn tại hoặc đã bị di chuyển.</p>
        <div className="btn-row justify-center">
          <Link href="/" className="pf-btn">Về trang chủ</Link>
          <Link href="/#contact" className="pf-btn-ghost">Liên hệ</Link>
        </div>
      </div>
    </main>
  );
}
