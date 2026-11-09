# Graspable Math 구현 참조

## 0. 분류

- 핵심: **Gesture → Legal Algebra Rewrite**
- 핵심 소스: 비공개
- 공식 Learn 페이지에서 현재 확인:
  - simplifying
  - commutative/distributive properties
  - solving equations
  - term tracing
  - scrubbing numbers
  - derivations
  - rewriting
  - substitution
  - placeholders
  - drag & drop
  - undo/redo
  - saving/sharing

---

## 1. 가장 중요한 내부 모델

Canvas 위 글자 위치가 아닙니다.

**[INFERRED]** 최소한 다음과 같은 expression tree가 필요합니다.

~~~ts
type Expr =
  | { type: "number"; value: number }
  | { type: "symbol"; name: string }
  | { type: "add"; terms: Expr[] }
  | { type: "mul"; factors: Expr[] }
  | { type: "pow"; base: Expr; exponent: Expr }
  | { type: "fraction"; numerator: Expr; denominator: Expr };
~~~

UI token은 이 AST node를 참조합니다.

~~~text
AST node ID
   ↕
rendered token bounds
~~~

---

## 2. Gesture recognition과 Algebra engine을 분리

~~~text
Pointer Gesture
  ↓
Gesture Interpreter
  ↓
candidate semantic operation
  ↓
Rewrite Validator
  ↓ legal?
  ├─ yes → new AST + animation
  └─ no  → snap back / feedback
~~~

Drag handler 안에서 수식을 문자열 치환하면 안 됩니다.

---

## 3. 클린룸 rewrite engine

공통 코드:
`reference-implementations/src/rewrite-engine.ts`

예:

~~~ts
const equation = {
  left: {
    type: "add",
    terms: [
      { type: "symbol", name: "x" },
      { type: "number", value: 3 }
    ]
  },
  right: { type: "number", value: 10 }
} satisfies Equation;

const next = moveAddendAcrossEquals(equation, "left", 1);
~~~

결과 의미:

~~~text
x + 3 = 10
→ x = 10 - 3
~~~

중요한 점은 “3을 화면 오른쪽으로 120px 이동”이 history가 아니라:

~~~ts
{
  type: "move-across-equals",
  from: "left",
  termIndex: 1
}
~~~

가 history가 된다는 것입니다.

---

## 4. Legal transform registry

실제 서비스 규모에서는 operation registry가 필요합니다.

~~~ts
interface RewriteRule {
  id: string;
  canApply(context: RewriteContext): boolean;
  apply(context: RewriteContext): RewriteResult;
  explain(result: RewriteResult): string;
}
~~~

예:
- commute
- associate
- distribute
- factor
- combine-like-terms
- cancel
- move-across-equals
- substitute

---

## 5. Token selection

수학식 선택은 일반 text selection과 다릅니다.

~~~text
2x + 3
││   │
││   └ number node
│└ coefficient/product
└ whole product node
~~~

pointer 위치에서 가장 작은 node만 고정 선택하지 말고:
- click
- repeated click
- drag
- keyboard expand selection

등으로 AST ancestor를 선택할 수 있어야 합니다.

---

## 6. Animation: node identity 유지

식 변형 애니메이션에서 가장 중요한 것은 **같은 항이 어디로 갔는지**입니다.

~~~ts
interface RenderToken {
  nodeId: string;
  bounds: DOMRect;
}
~~~

rewrite 전후 node ID mapping:

~~~ts
type RewriteResult = {
  expression: Expr;
  identityMap: Map<string, string>;
};
~~~

이 mapping을 사용해 FLIP animation 등을 만들면 항이 순간이동하지 않습니다.

---

## 7. Illegal Action feedback

잘못된 제스처:

~~~text
gesture
 ↓
candidate rule = none
 ↓
short shake
snap back
optional hint
~~~

모달 경고를 띄우지 않는 편이 조작 흐름을 덜 끊습니다.

---

## 8. Derivation history

~~~ts
interface DerivationStep {
  before: Expr;
  ruleId: string;
  after: Expr;
  explanation?: string;
}
~~~

이 기록은:
- Undo
- 풀이 재생
- 학생 전략 분석
- 자동 설명
에 함께 사용할 수 있습니다.

---

## 9. Term tracing

공식 Learn 페이지에서 term tracing이 별도 기능으로 다뤄집니다.

구현하려면 derivation step의 identity mapping을 보존해야 합니다.

~~~text
step 0 node x#1
  ↓ identity
step 1 node x#7
  ↓
step 2 node x#12
~~~

텍스트 문자열 비교만으로는 계수를 묶거나 distribute한 후 identity를 추적하기 어렵습니다.

---

## 10. 권장 폴더

~~~text
algebra/
  ast/
  parser/
  simplify/
  rules/

interaction/
  token-hit-test/
  gesture/
  selection/

derivation/
  history/
  identity/

render/
  layout/
  animation/
~~~

---

## 11. 확인 출처

- https://graspablemath.com/learn

내부 AST나 rewrite rule 구조는 공개된 것이 아니므로 [INFERRED]이며, 본 저장소 코드는 독립 구현입니다.
