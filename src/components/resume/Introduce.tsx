import { Quote } from "./Quote";
import { Segment } from "./Segment";

export function Introduce() {
  return (
    <Segment>
      <h2>Introduce</h2>

      <Quote>
        <p>
          <span>불편한 점을 기능으로 만들고, 개선</span>
          하는 것을 좋아합니다.
        </p>
        <p>
          재현만 할 수 있다면
          <span>고칠 수 없는 버그는 없다</span>고 생각합니다.
        </p>
        <p>
          <span>해결하기 어려운 문제</span> 도 원인과 방법을 찾고{" "}
          <span>최적의 해법을 찾으려 노력합니다.</span>
        </p>
      </Quote>
      <Quote>
        <p>
          <span>코드리뷰</span>로 피드백을 주고 받는 것을 지향합니다.
        </p>
        <p>
          어떤 피드백이라도 <span>하나의 관점</span>
          이라고 생각하고 <span>유연하게 적용</span>
          합니다.
        </p>
        <p>
          <span>구현의도와 일의 진행상황</span>을 팀원들에게{" "}
          <span>공유하는 것이 습관화 되어</span> 있습니다.
        </p>
      </Quote>
      <Quote>
        <p>
          <span>React, Typescript</span> 기반의 개발환경에 능숙합니다.
        </p>
        <p>
          처음 경험하는 기술, 프로젝트를 파악하는데에{" "}
          <span>어려움을 느끼지 않습니다.</span>
        </p>
        <p>
          다양한 디자인 에디터 <span>Figma, Framer</span> 와 협업 툴{" "}
          <span>Slack, Notion, Jira</span> 에 익숙합니다.
        </p>
      </Quote>
    </Segment>
  );
}
