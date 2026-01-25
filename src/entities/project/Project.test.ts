import type { Project, ProjectFilters } from '@/entities/project';

describe('Project Entity', () => {
  describe('Project interface', () => {
    it('has all required readonly properties', () => {
      const project: Project = {
        id: 'project-1',
        title: 'Test Project',
        description: 'A test project description',
        tags: ['React', 'TypeScript'],
        imageUrl: 'https://example.com/image.jpg',
        imageAlt: 'Test project image',
        link: 'https://github.com/test/project',
      };

      expect(project.id).toBe('project-1');
      expect(project.title).toBe('Test Project');
      expect(project.description).toBe('A test project description');
      expect(project.tags).toEqual(['React', 'TypeScript']);
      expect(project.imageUrl).toBe('https://example.com/image.jpg');
      expect(project.imageAlt).toBe('Test project image');
      expect(project.link).toBe('https://github.com/test/project');
      expect(project.year).toBeUndefined();
    });

    it('allows optional year property', () => {
      const project: Project = {
        id: 'project-1',
        title: 'Test Project',
        description: 'A test project description',
        tags: ['React', 'TypeScript'],
        imageUrl: 'https://example.com/image.jpg',
        imageAlt: 'Test project image',
        link: 'https://github.com/test/project',
        year: 2023,
      };

      expect(project.year).toBe(2023);
    });
  });

  describe('ProjectFilters interface', () => {
    it('allows empty filters', () => {
      const filters: ProjectFilters = {};
      expect(Object.keys(filters)).toHaveLength(0);
    });

    it('allows tag-only filter', () => {
      const filters: ProjectFilters = {
        tags: ['React', 'TypeScript'],
      };
      expect(filters.tags).toEqual(['React', 'TypeScript']);
      expect(filters.year).toBeUndefined();
    });

    it('allows year-only filter', () => {
      const filters: ProjectFilters = {
        year: 2023,
      };
      expect(filters.year).toBe(2023);
      expect(filters.tags).toBeUndefined();
    });

    it('allows combined filters', () => {
      const filters: ProjectFilters = {
        tags: ['React'],
        year: 2023,
      };
      expect(filters.tags).toEqual(['React']);
      expect(filters.year).toBe(2023);
    });
  });

  describe('Edge cases and validation', () => {
    it('handles empty tags array', () => {
      const project: Project = {
        id: 'project-1',
        title: 'Test Project',
        description: 'A test project description',
        tags: [],
        imageUrl: 'https://example.com/image.jpg',
        imageAlt: 'Test project image',
        link: 'https://github.com/test/project',
      };

      expect(project.tags).toEqual([]);
      expect(project.tags).toHaveLength(0);
    });

    it('handles single tag', () => {
      const project: Project = {
        id: 'project-1',
        title: 'Test Project',
        description: 'A test project description',
        tags: ['JavaScript'],
        imageUrl: 'https://example.com/image.jpg',
        imageAlt: 'Test project image',
        link: 'https://github.com/test/project',
      };

      expect(project.tags).toEqual(['JavaScript']);
      expect(project.tags).toHaveLength(1);
    });

    it('handles many tags', () => {
      const project: Project = {
        id: 'project-1',
        title: 'Test Project',
        description: 'A test project description',
        tags: [
          'React',
          'TypeScript',
          'Node.js',
          'MongoDB',
          'Docker',
          'AWS',
          'Jest',
          'Cypress',
        ],
        imageUrl: 'https://example.com/image.jpg',
        imageAlt: 'Test project image',
        link: 'https://github.com/test/project',
      };

      expect(project.tags).toHaveLength(8);
      expect(project.tags).toContain('React');
      expect(project.tags).toContain('Cypress');
    });

    it('handles valid year ranges', () => {
      const validYears = [1990, 2000, 2010, 2020, 2023, 2030];

      validYears.forEach(year => {
        const project: Project = {
          id: `project-${year}`,
          title: `Project ${year}`,
          description: 'A test project description',
          tags: ['Test'],
          imageUrl: 'https://example.com/image.jpg',
          imageAlt: 'Test project image',
          link: 'https://github.com/test/project',
          year,
        };
        expect(project.year).toBe(year);
      });
    });

    it('handles different URL formats', () => {
      const validUrls = [
        'https://github.com/user/repo',
        'https://example.com',
        'https://demo.project.com/path',
        'https://subdomain.example.co.uk',
      ];

      validUrls.forEach((link, index) => {
        const project: Project = {
          id: `project-${index}`,
          title: `Project ${index}`,
          description: 'A test project description',
          tags: ['Test'],
          imageUrl: 'https://example.com/image.jpg',
          imageAlt: 'Test project image',
          link,
        };
        expect(project.link).toBe(link);
      });
    });

    it('handles special characters in project data', () => {
      const project: Project = {
        id: 'project-special-123_!',
        title: 'Project & Special "Characters" Test',
        description: 'Description with émojis 🚀 and spéciål chàrs',
        tags: ['React-CLI', 'TypeScript@Next', 'Node.js#Latest'],
        imageUrl: 'https://example.com/image-with-dash.jpg',
        imageAlt: 'Image alt: 特殊な文字 and ñiño',
        link: 'https://github.com/user/repo-name-with_underscore',
        year: 2023,
      };

      expect(project.id).toBe('project-special-123_!');
      expect(project.title).toBe('Project & Special "Characters" Test');
      expect(project.description).toBe(
        'Description with émojis 🚀 and spéciål chàrs'
      );
      expect(project.tags).toEqual([
        'React-CLI',
        'TypeScript@Next',
        'Node.js#Latest',
      ]);
      expect(project.imageAlt).toBe('Image alt: 特殊な文字 and ñiño');
      expect(project.link).toBe(
        'https://github.com/user/repo-name-with_underscore'
      );
      expect(project.year).toBe(2023);
    });
  });

  describe('Type safety and structure', () => {
    it('requires all mandatory properties', () => {
      const minimalProject: Project = {
        id: 'minimal',
        title: 'Minimal',
        description: 'Minimal description',
        tags: ['Minimal'],
        imageUrl: 'https://example.com/minimal.jpg',
        imageAlt: 'Minimal image',
        link: 'https://github.com/minimal/minimal',
      };

      expect(Object.keys(minimalProject)).toHaveLength(7);
      expect(Object.keys(minimalProject)).not.toContain('year');
    });

    it('has proper property types', () => {
      const project: Project = {
        id: 'test',
        title: 'Test',
        description: 'Test description',
        tags: ['Test'],
        imageUrl: 'https://example.com/test.jpg',
        imageAlt: 'Test alt',
        link: 'https://example.com/test',
      };

      expect(typeof project.id).toBe('string');
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(Array.isArray(project.tags)).toBe(true);
      expect(typeof project.imageUrl).toBe('string');
      expect(typeof project.imageAlt).toBe('string');
      expect(typeof project.link).toBe('string');
    });
  });
});
