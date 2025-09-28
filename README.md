# 🚀 Carbon Dashboard: ESG Report Management

**Next.js 14**, **TypeScript**, **TailwindCSS**로 구축한 현대적인 ESG 보고서 및 기업 탄소 배출량 관리 시스템입니다. Next.js App Router의 **서버 컴포넌트**와 **클라이언트 컴포넌트**를 효과적으로 조합하여 현대적인 데이터 관리 워크플로우를 구현했습니다.

![대시보드 미리보기](https://github.com/user-attachments/assets/746637bf-aeaa-4c50-aa61-c527c05f559c)

## ✨ 주요 기능

### 📊 메인 대시보드 (핵심 기능)
- **다중 기업 배출량 비교 차트**: 여러 기업의 탄소 배출량을 시간별로 비교 분석
- **실시간 데이터 시각화**: Recharts를 활용한 인터랙티브 차트
- **전체 기업 및 보고서 현황 요약**: 등록된 모든 데이터의 한눈에 보기
- **반응형 대시보드 레이아웃**: 모든 디바이스에서 최적화된 사용자 경험
- **직관적인 내비게이션**: 기업별 상세 페이지로 원클릭 이동

### 📋 ESG 보고서 관리 시스템

| 기능 영역 | 설명 | 파일/경로 |
| :--- | :--- | :--- |
| **대시보드** | 전체 기업 및 보고서 현황을 요약하여 제공하는 메인 페이지 | `src/app/page.tsx` |
| **보고서 목록** | 등록된 모든 ESG 보고서를 조회하고 상세 페이지로 이동 가능 | `src/app/posts/page.tsx` |
| **보고서 상세/조회** | 특정 보고서의 제목, 내용, 관련 회사 ID를 확인 | `src/app/posts/[id]/page.tsx` |
| **보고서 생성** | 새로운 ESG 보고서를 작성하고 시스템에 등록 | `src/app/posts/new/page.tsx` |
| **보고서 수정** | 기존 보고서의 제목 및 내용을 수정하고 저장 | `src/app/posts/[id]/edit/page.tsx` |
| **보고서 삭제** | 보고서 상세 페이지에서 클라이언트 컴포넌트를 통해 영구적으로 삭제 | `src/components/DeleteButton.tsx` |

### 🏢 기업 데이터 관리
- **개별 기업 상세 페이지**: 단일 기업의 시간별 배출량 추적
- **국가별 데이터 분석**: 지역별 탄소 배출량 현황
- **월별 세부 분석**: 시계열 데이터를 통한 트렌드 분석
- **기업별 ESG 보고서 연동**: 배출량 데이터와 보고서의 유기적 연결

## 💻 기술 스택

### Frontend & Core
| 범주 | 기술 | 설명 |
| :--- | :--- | :--- |
| **프레임워크** | **Next.js 14** (App Router) | React 기반 풀스택 프레임워크, 서버 컴포넌트 활용한 효율적 데이터 페칭 |
| **언어** | **TypeScript** | 정적 타입 검사를 통한 안정성 확보 및 개발 효율 증대 |
| **스타일링** | **Tailwind CSS** | 유틸리티-퍼스트 CSS 프레임워크로 빠르고 일관된 디자인 |
| **차트** | **Recharts** | React 기반 차트 라이브러리로 반응형 데이터 시각화 |

### Data & Logic
| 범주 | 기술 | 설명 |
| :--- | :--- | :--- |
| **API** | **Local Mock API** (`/lib/api.ts`) | 개발 환경용 인메모리 데이터 스토어 및 비동기 API 모킹 |
| **상태 관리** | **React Hooks** | `useState`, `useEffect`를 통한 클라이언트 상태 관리 |
| **데이터 페칭** | **Server Components** | Next.js 서버 컴포넌트의 `async/await`로 서버사이드 데이터 처리 |

## 🚀 시작하기

### 사전 요구사항
- Node.js 18+ 
- npm, yarn, 또는 pnpm

### 설치 및 실행

```bash
# 저장소 복제
git clone [YOUR_REPOSITORY_URL]
cd carbon-dashboard

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 시작
npm run dev
# 또는  
yarn dev
```

🔗 **http://localhost:3000** 에서 애플리케이션을 확인할 수 있습니다.

### 프로덕션 빌드

```bash
# 프로덕션 빌드 생성
npm run build

# 프로덕션 서버 시작  
npm start
```

## ⚙️ 아키텍처 및 개발 특징

### 서버 컴포넌트 vs 클라이언트 컴포넌트

| 특징 | 서버 컴포넌트 (Server Components) | 클라이언트 컴포넌트 (Client Components) |
| :--- | :--- | :--- |
| **파일 지정** | 기본값 (지시문 없음) | 파일 상단에 `"use client"` 명시 |
| **주요 역할** | 데이터 페칭 (`async/await`), SEO, 초기 로딩 속도 최적화 | 사용자 상호작용, Hooks (`useState`, `useEffect`), 브라우저 API 사용 |
| **적용 사례** | `PostDetailPage`, `PostPage` (데이터 조회) | `EditPostPage`, `NewPostForm`, `DeleteButton` (폼 제출 및 상태 관리) |

### 데이터 관리 및 갱신

- **Mock API**: `src/lib/api.ts` 파일에서 모든 CRUD 작업을 인메모리로 처리하여 실제 백엔드 없이 기능 테스트
- **Optimistic UI**: 데이터 수정/삭제 성공 후 **`router.refresh()`**를 사용하여 Next.js 서버 컴포넌트 캐시 무효화
- **실시간 차트 업데이트**: 차트는 props 변경시에만 재렌더링되어 성능 최적화

### 핵심 컴포넌트

| 컴포넌트 | 용도 | 위치 |
|----------|------|------|
| `Navigation` | 기업 링크가 포함된 지속적 사이드바 | `src/components/Navigation.tsx` |
| `EmissionsChart` | 단일 기업 시계열 시각화 | `src/components/EmissionsChart.tsx` |
| `MultiCompanyChart` | **대시보드 메인 차트** - 다중 기업 비교 분석 | `src/components/MultiCompanyChart.tsx` |
| `PostForm` | ESG 보고서 생성/편집 | `src/components/PostForm.tsx` |

## 🎨 디자인 시스템

### 시각적 계층구조
- **대시보드**: 중앙 집중식 레이아웃으로 차트와 요약 정보 최적 배치
- **내비게이션**: 호버 상태와 명확한 계층구조를 가진 왼쪽 사이드바
- **카드**: 일관된 `bg-white rounded-xl shadow p-4` 스타일링
- **차트**: 접근성을 고려한 색상 팔레트와 반응형 디자인

### 사용자 경험
- **직관적 내비게이션**: 대시보드 → 기업 상세 → 보고서로 이어지는 자연스러운 플로우
- **실시간 피드백**: 로딩 상태, 성공/오류 메시지, 폼 검증
- **반응형 디자인**: 데스크톱 최적화된 레이아웃

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 대시보드
│   ├── posts/             # ESG 보고서 관리 페이지들
│   └── company/           # 기업별 상세 페이지
├── components/            # 재사용 가능한 React 컴포넌트
│   ├── MultiCompanyChart.tsx  # 대시보드 메인 차트
│   ├── EmissionsChart.tsx     # 개별 기업 차트
│   └── Navigation.tsx         # 사이드바 내비게이션
├── lib/                   # API 및 유틸리티
│   └── api.ts            # Mock API 및 데이터 관리
├── types/                # TypeScript 타입 정의
└── styles/               # 글로벌 스타일 및 Tailwind 설정
```

## 📋 프로젝트 특징

- **ESG 중심 설계**: 지속가능성 보고서와 탄소 배출량 데이터의 유기적 연동
- **Modern Next.js**: App Router, 서버/클라이언트 컴포넌트 분리로 최적화된 성능
- **시각화 중심**: 복잡한 데이터를 직관적인 차트로 표현
- **확장 가능한 구조**: 실제 백엔드 연동시 최소한의 코드 변경으로 마이그레이션 가능

## ⏱ 개발 타임라인

| 단계 | 소요시간 | 작업 내용 |
|------|----------|-----------|
| **프로젝트 설정** | 30분 | Next.js + TypeScript + Tailwind 환경 구성 |
| **대시보드 개발** | 3-4시간 | 메인 대시보드, 다중 차트, 레이아웃 구성 |
| **ESG 보고서 시스템** | 4-5시간 | CRUD 기능, 폼 처리, 라우팅 |
| **차트 및 시각화** | 2시간 | Recharts 통합, 반응형 차트 구현 |
| **문서화 및 마무리** | 1시간 | README 작성, 코드 정리, 배포 준비 |
| **전체** | **약 10-12시간** | 완전한 ESG 대시보드 시스템 구현 |

👨‍💻 개발자
손한별 (HanbyeolSon74)

GitHub: @HanbyeolSon74
이 프로젝트는 HanaLoop을 위한 프론트엔드 기술 시연 과제로 개발되었습니다.

## 🤝 기여 및 문의

질문이나 피드백이 있으시면 GitHub Issues를 통해 연락해 주세요.

## 📄 라이선스

이 프로젝트는 평가 및 학습 목적으로 생성되었습니다.
