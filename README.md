# Tanstack Query

TanStack Query는 서버로부터 데이터 가져오기, 데이터 캐싱, 캐시 제어 등
**데이터를 쉽고 효율적으로 관리할 수 있는 라이브러리**

## 한마디로 클라이언트에서 제어하지 않거나 소유하지 않은 위치에 관리되는 상태 특성

1. **원격으로 유지되며, 제어하거나 소유할 수 없음**
2. **패칭과 업데이트를 위해 비동기 API 가 필요**
3. **소유권이 공유되며 사용자가 모르는 사이에 다른 사용자가 변경 가능**
4. **주의하지 않으면 애플리케이션에서 오래된 상태가 될 수 있음**

## 서버 상태의 추가적인 문제점

1. **캐싱 (프로그래밍에서 가장 어려운 것 중 하나)**
2. **동일한 데이터에 대한 여러 요청을 단일 요청으로 병합**
3. **백그라운드에서 "오래된" 데이터 업데이트**
4. **데이터가 "오래된" 시점 파악**
5. **데이터 업데이트를 가능한 빨리 반영**
6. **페이지네이션 및 지연 로딩과 같은 성능 최적화**
7. **서버 상태의 메모리 및 가비지 컬렉션 관리**
8. **구조적 공유로 쿼리 결과 메모이제이션**

## `useInfiniteQuery` 무한스크롤

## `useQuery` 게시글 조회

**간단예제**

```javascript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

## `useMutation` 게시글 생성, 수정, 삭제
