/**
 * Domain Entity: Project
 * 비즈니스 로직의 핵심 - 프로젝트 엔티티
 * 외부 프레임워크에 의존하지 않는 순수한 도메인 모델
 */

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly year?: number;
  readonly link: string;
}

export interface ProjectFilters {
  readonly tags?: readonly string[];
  readonly year?: number;
}

