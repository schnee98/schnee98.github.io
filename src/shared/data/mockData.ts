/**
 * Mock data for development
 * In production, this would come from API or CMS
 * Data classification - Pure information
 */

import type { Project } from '@/entities/project';
import type { BlogPost } from '@/entities/blog-post';
import type {
  Profile,
  Experience,
  Education,
  DescriptionItem,
} from '@/entities/profile';
import { getBlogList } from '@/features/blog/posts';

export const profileData: Profile = {
  name: '박주은',
  title: 'Welcome!',
  description: [
    "This is Schnee. ",
    "Frontend Developer interested in the value of solid, reliable and robust products.",
  ],
  imageUrl: 'https://framerusercontent.com/images/T8snMPOr6eSPI6cbUJhGXL8.jpg',
  email: {
    address: 'jooeun0616@gmail.com',
    label: 'jooeun0616@gmail.com',
  },
  github: {
    address: 'https://github.com/schnee98',
    label: 'github.com/schnee98',
  },
  linkedin: {
    address: 'https://www.linkedin.com/in/%EC%A3%BC%EC%9D%80-%EB%B0%95-90281a290/',
    label: '박주은',
  },
};

export const aboutData = {
  title: "안녕하세요, 프론트엔드 개발자 박주은입니다.",
  description: `저는 소프트웨어를 통해 가치를 전달할 수 있을 때 희열을 느낍니다.

프론트엔드 개발을 하고 있고, 사랑받고 신뢰할 수 있는 제품을 만드는 것에 관심이 많습니다.

복잡하거나 레퍼런스가 없는 문제에도 의미있는 가설을 세우고 빠르게 검증하며 해결한 경험이 여러 번 있습니다.

학창시절을 10년동안 독일에서 지내며 편견없는 사고를 몸으로 체득하였고 실용적인 문제해결에 도움이 많이 되고 있습니다.`,
};

export const experienceData: Experience[] = [
  {
    id: '1',
    period: '2025. 06 ~ ',
    company: '비바리퍼블리카 (토스)',
    position: 'Frontend Ops Developer',
    description: [
      {
        text: 'DEUS(토스 디자인 에디터) 플러그인을 모노레포에서 분리하여 운영 효율화 달성',
      },
      {
        text: '새로운 플러그인 시스템 (figma-like) 구성',
      },
      {
        text: 'Sentry 모니터링 시스템 및 성능 최적화',
      },
    ],
  },
  {
    id: '2',
    period: '2024. 08 ~ 2025. 06',
    company: '비바리퍼블리카 (토스)',
    position: 'Frontend Developer Assistant',
    description: [
      {
        text: '1200개 이상의 토스 디자인 프로젝트 마이그레이션',
      },
      {
        text: 'DEUS 사용성 및 안정성 개선',
        subItems: [
          '디자인을 이미지로 내보내기 기능 안정화',
          '토스 사내 사용자들로부터 DEUS의 큰 장점이라는 평가를 이끌어냄',
        ],
      },
      {
        text: '성능 최적화',
        subItems: [
          '디자인 편집에 불필요한 노드를 제거하여 메모리 사용량 55% 단축',
          '노드 복사/붙여넣기 기능의 처리 시간 약 63% 단축',
        ],
      },
    ],
  },
];

export const educationData: Education[] = [
  {
    id: '1',
    period: '2024. 01 ~ 2024. 08',
    institution: '코드스쿼드 2024 마스터즈',
    degree: '웹 프론트엔드 과정',
    description: [
      {
        text: '문제 기반 학습(PBL)을 통한 자기주도적 학습으로 문제해결 능력 증진',
      },
      {
        text: '라이브러리 사용없이 Vanilla JS 위주의 미션 해결',
      },
      {
        text: '개인 프로젝트 (3회)를 통한 FE 역량 증진',
      },
      {
        text: '팀 프로젝트를 통한 협업 경험',
        subItems: [
          '4주 팀 프로젝트 (Issue Tracker)',
          '4주 팀 프로젝트 (Web Editor Service)',
        ],
      },
    ],
  },
  {
    id: '2',
    period: '2017. 10 ~ 2022. 02',
    institution: '독일 드레스덴 공과대학',
    degree: '미디어 컴퓨터공학과',
    description: [
      {
        text: '공학사 취득 (2.5 / 1.0)',
      },
      {
        text: '졸업 논문',
        subItems: [
          '속성 문법을 활용하여 Swagger 문서들을 파싱하고 REST API 테스트를 자동화하는 자바 프레임워크 구현',
          '논문 디펜스를 성공적으로 완료하여 최고 학점(1.0) 취득',
        ],
      },
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Evoke',
    description: 'Brand identity, Packaging',
    tags: ['Brand identity', 'Packaging'],
    imageUrl: 'https://picsum.photos/seed/project1/400/300.jpg',
    imageAlt: 'Sample image from a project',
    link: '/project-detail',
    year: 2022,
  },
  {
    id: '2',
    title: 'Resonance',
    description: 'Brand identity, Packaging',
    tags: ['Brand identity', 'Packaging'],
    imageUrl: 'https://picsum.photos/seed/project2/400/300.jpg',
    imageAlt: 'Alt Text',
    link: '/project-detail',
    year: 2022,
  },
  {
    id: '3',
    title: 'Serenity',
    description: 'Website, Print',
    tags: ['Website', 'Print'],
    imageUrl: 'https://picsum.photos/seed/project3/400/300.jpg',
    imageAlt: 'Alt Text',
    link: '/project-detail',
    year: 2022,
  },
  {
    id: '4',
    title: 'Harmony',
    description: 'Website, Print',
    tags: ['Website', 'Print'],
    imageUrl: 'https://picsum.photos/seed/project4/400/300.jpg',
    imageAlt: 'Alt Text',
    link: '/project-detail',
    year: 2022,
  },
  {
    id: '5',
    title: 'Vibrance',
    description: 'Brand identity, Packaging',
    tags: ['Brand identity', 'Packaging'],
    imageUrl: 'https://picsum.photos/seed/project5/400/300.jpg',
    imageAlt: 'Alt Text',
    link: '/project-detail',
    year: 2023,
  },
  {
    id: '6',
    title: 'Dreamscape',
    description: 'Brand identity, Packaging',
    tags: ['Brand identity', 'Packaging'],
    imageUrl: 'https://picsum.photos/seed/project6/400/300.jpg',
    imageAlt: 'Alt Text',
    link: '/project-detail',
    year: 2023,
  },
  {
    id: '7',
    title: 'Stardust',
    description: 'Website, Print',
    tags: ['Website', 'Print'],
    imageUrl: 'https://picsum.photos/seed/project7/400/300.jpg',
    imageAlt: 'Alt Text',
    link: '/project-detail',
    year: 2023,
  },
  {
    id: '8',
    title: 'Origami',
    description: 'Digital product, Packaging',
    tags: ['Digital product', 'Packaging'],
    imageUrl: 'https://picsum.photos/seed/project8/400/300.jpg',
    imageAlt: 'Alt Text',
    link: '/project-detail',
    year: 2023,
  },
];

const blogListData = getBlogList('date-desc').slice(0, 6);

export const blogPostsData = blogListData.map(post => ({
  slug: post.slug,
  title: post.title,
  date: post.date,
  description: post.description,
  thumbnail: post.thumbnail,
  imageUrl: post.imageUrl,
  category: post.category,
  tags: post.tags ? [...post.tags] : undefined,
}));

