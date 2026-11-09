# math-study

수학 교육용 웹·앱·도구를 **화면, UI/UX, 수학적 상호작용, 상태 모델, 기술 구조, 공개 소스 구조**까지 분석해 축적하는 저장소입니다.

이 저장소의 목적은 서비스 소개가 아니라 다음 질문에 답하는 것입니다.

- 수학 원리를 어떤 **조작 가능한 객체**로 바꾸었는가?
- 사용자의 클릭·드래그·입력·선택을 어떤 **수학 연산/관계**로 해석하는가?
- 수학 객체의 상태와 화면 표현을 어떻게 연결하는가?
- 여러 표현(식·그래프·도형·수모형·표·3D)을 어떻게 동기화하는가?
- 교사용 수업 흐름, 공유, 과제, 저장을 어떻게 연결하는가?
- 공개 저장소가 있다면 실제 **상·하위 폴더와 파일**은 어떻게 역할을 나누는가?
- 비공개 서비스라면 어디까지가 확인된 사실이고 어디부터가 추정인가?
- 다른 교육용 수학 서비스를 만들 때 무엇을 가져오고 무엇은 피해야 하는가?

## 분석 원칙

storytold/craft-anything의 Study → Build → Check 사고방식을 참고하되, 이 저장소에서는 **Study → Model → Compare → Extract**로 사용합니다.

1. **Study**: 공식 사이트·매뉴얼·도움말·공개 저장소를 조사
2. **Model**: 화면 → 행동 → 상태변화 → 수학 의미 → 데이터 구조 순으로 재구성
3. **Compare**: 같은 수학 개념을 서비스마다 어떻게 다르게 풀었는지 비교
4. **Extract**: 재사용 가능한 UI/UX·아키텍처 패턴과 실패 가능성을 추출

### 근거 등급

- **[VERIFIED-UI]** 공식 사이트/매뉴얼/도움말에서 직접 확인
- **[VERIFIED-SOURCE]** 공식 또는 명확한 공개 소스 저장소에서 직접 확인
- **[HISTORICAL-SOURCE]** 과거 공개 소스이며 현재 구조와 다를 수 있음
- **[INFERRED]** 화면·API·행동으로부터 합리적으로 추정한 내부 구조
- **[UNKNOWN]** 공개 근거가 없어 판단 보류

비공개 서비스의 폴더·파일 구조를 실제 구조처럼 만들어 적지 않습니다.

## 현재 분석 대상

| 서비스 | 핵심 관점 | 공개 소스 |
|---|---|---|
| [알지오매스 키즈](services/algeomath-kids/README.md) | 초등 2D/3D/문서/모둠 통합 | 확인되지 않음 |
| [GeoGebra](services/geogebra/README.md) | 동적 수학 객체·의존성 그래프·다중 표현 | 공개 |
| [Desmos](services/desmos/README.md) | 식 목록 중심 그래프/기하 인터페이스 | 핵심 앱 비공개 |
| [Mathigon Polypad](services/mathigon-polypad/README.md) | 가상 수학 교구·타일 문서 모델 | API 공개 |
| [PhET Math](services/phet/README.md) | 개념별 시뮬레이션·다중감각 피드백 | 현재 공개 소스 제한 |
| [Graspable Math](services/graspable-math/README.md) | 수식을 직접 잡고 움직이는 대수 조작 | 핵심 앱 비공개 |
| [Math Learning Center](services/math-learning-center/README.md) | 초등 수모형·가상교구·공유 코드 | 핵심 앱 비공개 |

## 저장소 구조

~~~text
math-study/
├─ README.md
├─ docs/
│  ├─ analysis-method.md
│  └─ comparison-matrix.md
├─ services/
│  ├─ algeomath-kids/
│  ├─ geogebra/
│  ├─ desmos/
│  ├─ mathigon-polypad/
│  ├─ phet/
│  ├─ graspable-math/
│  └─ math-learning-center/
├─ patterns/
│  └─ math-interaction-patterns.md
└─ backlog/
   └─ candidates.md
~~~

## 분석 문서 공통 틀

각 서비스 문서는 가능한 범위에서 다음 순서를 사용합니다.

1. 서비스 역할과 대상 학습자
2. 페이지·화면 구조
3. 주요 UI 컴포넌트와 버튼
4. 핵심 사용자 흐름
5. 수학 개념을 화면 조작으로 바꾸는 방식
6. 객체·상태·연산 모델
7. 선택/드래그/스냅/제약/피드백
8. Undo/Redo와 이력
9. 저장·공유·수업/과제 연동
10. 접근성
11. 기술 스택
12. 공개 소스의 실제 폴더·파일 구조
13. 장점과 구조적 한계
14. 재사용할 설계 패턴
15. 추가 검증이 필요한 항목
16. 출처

## 먼저 볼 문서

- 전체 차이: [docs/comparison-matrix.md](docs/comparison-matrix.md)
- 분석 기준: [docs/analysis-method.md](docs/analysis-method.md)
- 공통 설계 패턴: [patterns/math-interaction-patterns.md](patterns/math-interaction-patterns.md)
- 추가 분석 후보: [backlog/candidates.md](backlog/candidates.md)
