import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

function LoginPage() {
  function submit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <main className="centered">
      <form className="card login" onSubmit={submit}>
        <p className="eyebrow">BIT COMPUTER</p>
        <h1>직원 포털</h1>
        <label>아이디<input name="username" autoComplete="username" /></label>
        <label>비밀번호<input name="password" type="password" autoComplete="current-password" /></label>
        <button type="submit">로그인</button>
        <p className="muted">현재는 화면 골격입니다. 다음 단계에서 세션 로그인을 연결합니다.</p>
      </form>
    </main>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside>
        <strong>Employee Portal</strong>
        <nav>
          <Link to="/me">내 정보</Link>
          <Link to="/admin/employees">직원 관리</Link>
        </nav>
      </aside>
      <main className="content"><h1>{title}</h1>{children}</main>
    </div>
  );
}

function ProfilePage() {
  return <Shell title="내 정보"><section className="card"><p>본인 인적사항 조회·수정 화면이 들어갈 자리입니다.</p></section></Shell>;
}

function EmployeesPage() {
  return <Shell title="직원 관리"><section className="card"><p>직원 목록·상세·퇴사 처리·배경 조회 기능이 들어갈 자리입니다.</p></section></Shell>;
}

function SystemStatus() {
  const [status, setStatus] = useState('확인 중');
  useEffect(() => {
    fetch('/api/health')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(() => setStatus('백엔드 연결됨'))
      .catch(() => setStatus('백엔드 연결 실패'));
  }, []);
  return <span className="status">{status}</span>;
}

export default function App() {
  return (
    <>
      <SystemStatus />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/admin/employees" element={<EmployeesPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

