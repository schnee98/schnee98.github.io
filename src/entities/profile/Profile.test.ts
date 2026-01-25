import type {
  Profile,
  DescriptionItem,
  Experience,
  Education,
} from '@/entities/profile';

describe('Profile Entity', () => {
  describe('Profile interface', () => {
    it('has all required properties', () => {
      const profile: Profile = {
        name: 'John Doe',
        title: 'Full Stack Developer',
        description: ['Experienced developer', 'Specialized in React'],
        imageUrl: 'https://example.com/profile.jpg',
        email: { address: 'john@example.com', label: 'Email' },
        github: { address: 'https://github.com/johndoe', label: 'GitHub' },
        linkedin: {
          address: 'https://linkedin.com/in/johndoe',
          label: 'LinkedIn',
        },
      };

      expect(profile.name).toBe('John Doe');
      expect(profile.title).toBe('Full Stack Developer');
      expect(profile.description).toEqual([
        'Experienced developer',
        'Specialized in React',
      ]);
      expect(profile.imageUrl).toBe('https://example.com/profile.jpg');
      expect(profile.email).toEqual({
        address: 'john@example.com',
        label: 'Email',
      });
      expect(profile.github).toEqual({
        address: 'https://github.com/johndoe',
        label: 'GitHub',
      });
      expect(profile.linkedin).toEqual({
        address: 'https://linkedin.com/in/johndoe',
        label: 'LinkedIn',
      });
    });
  });

  describe('Link interface (nested in Profile)', () => {
    it('handles various link formats', () => {
      const emailLink = { address: 'user@domain.com', label: 'Email' };
      const githubLink = {
        address: 'https://github.com/user/repo',
        label: 'GitHub',
      };
      const linkedinLink = {
        address: 'https://linkedin.com/in/user',
        label: 'LinkedIn',
      };
      const websiteLink = { address: 'https://example.com', label: 'Website' };

      expect(emailLink.address).toBe('user@domain.com');
      expect(githubLink.address).toBe('https://github.com/user/repo');
      expect(linkedinLink.address).toBe('https://linkedin.com/in/user');
      expect(websiteLink.address).toBe('https://example.com');
    });

    it('handles special characters in links', () => {
      const specialLinks = [
        { address: 'user+tag@domain.co.uk', label: 'Special Email' },
        {
          address: 'https://github.com/user-name_123',
          label: 'GitHub Profile',
        },
        {
          address: 'https://linkedin.com/in/user-with-special-name',
          label: 'LinkedIn',
        },
        { address: 'https://example.com/path/with-特殊', label: 'Special URL' },
      ];

      specialLinks.forEach(link => {
        expect(link.address).toBeDefined();
        expect(link.label).toBeDefined();
      });
    });
  });

  describe('Description property', () => {
    it('handles various description scenarios', () => {
      const descriptionScenarios = [
        ['Single item'],
        ['First item', 'Second item'],
        ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
        [],
        [''],
        ['Item with "quotes" and & symbols'],
        ['Item with émojis 🚀', 'Item with spéciål chàrs'],
        ['A', 'B'],
        [
          'Very long description item that goes on and on',
          'Another long item with many details',
        ],
      ];

      descriptionScenarios.forEach((description, index) => {
        const profile: Profile = {
          name: 'Test User',
          title: 'Developer',
          description,
          imageUrl: 'https://example.com/test.jpg',
          email: { address: `test${index}@example.com`, label: 'Email' },
          github: { address: 'https://github.com/test', label: 'GitHub' },
          linkedin: {
            address: 'https://linkedin.com/in/test',
            label: 'LinkedIn',
          },
        };
        expect(profile.description).toEqual(description);
        expect(Array.isArray(profile.description)).toBe(true);
        expect(profile.description).toHaveLength(description.length);
      });
    });
  });

  describe('Name and Title properties', () => {
    it('handles various name formats', () => {
      const validNames = [
        'John Doe',
        'Mary Jane Watson-Parker',
        'Jean-Luc Picard',
        'Álvaro Fernández',
        '张伟',
        'Владимир Путин',
        'A',
        '',
        ' ',
        'Very long name with many middle names and multiple parts',
      ];

      validNames.forEach(name => {
        const profile: Profile = {
          name,
          title: 'Developer',
          description: ['Test'],
          imageUrl: 'https://example.com/test.jpg',
          email: { address: 'test@example.com', label: 'Email' },
          github: { address: 'https://github.com/test', label: 'GitHub' },
          linkedin: {
            address: 'https://linkedin.com/in/test',
            label: 'LinkedIn',
          },
        };
        expect(profile.name).toBe(name);
      });
    });

    it('handles various title formats', () => {
      const validTitles = [
        'Software Engineer',
        'Senior Full Stack Developer',
        'CTO & Co-Founder',
        'Principal Software Architect',
        'Développeur Web Senior',
        'シニアソフトウェアエンジニア',
        'A',
        '',
        'Very impressive title with many words and descriptions',
      ];

      validTitles.forEach(title => {
        const profile: Profile = {
          name: 'Test User',
          title,
          description: ['Test'],
          imageUrl: 'https://example.com/test.jpg',
          email: { address: 'test@example.com', label: 'Email' },
          github: { address: 'https://github.com/test', label: 'GitHub' },
          linkedin: {
            address: 'https://linkedin.com/in/test',
            label: 'LinkedIn',
          },
        };
        expect(profile.title).toBe(title);
      });
    });
  });

  describe('ImageUrl property', () => {
    it('handles various URL formats', () => {
      const validImageUrls = [
        'https://example.com/profile.jpg',
        'https://cdn.example.com/images/profile.png',
        'https://storage.googleapis.com/bucket/profile.webp',
        'https://subdomain.example.co.uk/path/to/profile.jpeg',
        '',
        'https://example.com/image-with-dashes_123.jpg',
      ];

      validImageUrls.forEach(imageUrl => {
        const profile: Profile = {
          name: 'Test User',
          title: 'Developer',
          description: ['Test'],
          imageUrl,
          email: { address: 'test@example.com', label: 'Email' },
          github: { address: 'https://github.com/test', label: 'GitHub' },
          linkedin: {
            address: 'https://linkedin.com/in/test',
            label: 'LinkedIn',
          },
        };
        expect(profile.imageUrl).toBe(imageUrl);
      });
    });
  });

  describe('Type safety', () => {
    it('requires all mandatory properties', () => {
      const minimalProfile: Profile = {
        name: 'Minimal User',
        title: 'Developer',
        description: ['Minimal description'],
        imageUrl: 'https://example.com/minimal.jpg',
        email: { address: 'minimal@example.com', label: 'Email' },
        github: { address: 'https://github.com/minimal', label: 'GitHub' },
        linkedin: {
          address: 'https://linkedin.com/in/minimal',
          label: 'LinkedIn',
        },
      };

      expect(Object.keys(minimalProfile)).toHaveLength(7);
    });

    it('has proper property types', () => {
      const profile: Profile = {
        name: 'Test User',
        title: 'Developer',
        description: ['Test description'],
        imageUrl: 'https://example.com/test.jpg',
        email: { address: 'test@example.com', label: 'Email' },
        github: { address: 'https://github.com/test', label: 'GitHub' },
        linkedin: {
          address: 'https://linkedin.com/in/test',
          label: 'LinkedIn',
        },
      };

      expect(typeof profile.name).toBe('string');
      expect(typeof profile.title).toBe('string');
      expect(Array.isArray(profile.description)).toBe(true);
      expect(typeof profile.imageUrl).toBe('string');
      expect(typeof profile.email).toBe('object');
      expect(typeof profile.github).toBe('object');
      expect(typeof profile.linkedin).toBe('object');
    });
  });
});

describe('DescriptionItem Interface', () => {
  it('has all required properties', () => {
    const item: DescriptionItem = {
      text: 'Main description text',
    };

    expect(item.text).toBe('Main description text');
    expect(item.subItems).toBeUndefined();
  });

  it('allows optional subItems', () => {
    const item: DescriptionItem = {
      text: 'Main description text',
      subItems: ['Sub item 1', 'Sub item 2'],
    };

    expect(item.text).toBe('Main description text');
    expect(item.subItems).toEqual(['Sub item 1', 'Sub item 2']);
  });

  it('handles empty subItems', () => {
    const item: DescriptionItem = {
      text: 'Main description text',
      subItems: [],
    };

    expect(item.text).toBe('Main description text');
    expect(item.subItems).toEqual([]);
  });

  it('handles various text content', () => {
    const textVariations = [
      'Simple text',
      'Text with "quotes" and & symbols',
      'Text with émojis 🚀',
      'Text with spéciål chàrs',
      'A',
      '',
      ' ',
      'Very long description text with many words and detailed explanations',
    ];

    textVariations.forEach(text => {
      const item: DescriptionItem = { text };
      expect(item.text).toBe(text);
    });
  });

  it('handles various subItems scenarios', () => {
    const subItemsScenarios = [
      undefined,
      [],
      ['Single item'],
      ['Item 1', 'Item 2', 'Item 3'],
      ['Item with "special" chars', 'Item with émojis 🎉'],
      ['A', 'B'],
    ];

    subItemsScenarios.forEach((subItems, index) => {
      const item: DescriptionItem = {
        text: `Test item ${index}`,
        subItems,
      };
      expect(item.subItems).toEqual(subItems);
    });
  });
});

describe('Experience Interface', () => {
  it('has all required properties', () => {
    const experience: Experience = {
      id: 'exp-1',
      period: '2020-2023',
      company: 'Tech Company',
      position: 'Senior Developer',
      description: [
        { text: 'Led development team' },
        {
          text: 'Architected solutions',
          subItems: ['Web apps', 'Mobile apps'],
        },
      ],
    };

    expect(experience.id).toBe('exp-1');
    expect(experience.period).toBe('2020-2023');
    expect(experience.company).toBe('Tech Company');
    expect(experience.position).toBe('Senior Developer');
    expect(experience.description).toHaveLength(2);
  });

  it('handles various period formats', () => {
    const periods = [
      '2020-2023',
      'Jan 2020 - Dec 2023',
      '2020年 - 2023年',
      '2020',
      'Present',
      '2020 - Present',
    ];

    periods.forEach((period, index) => {
      const experience: Experience = {
        id: `exp-${index}`,
        period,
        company: 'Test Company',
        position: 'Developer',
        description: [{ text: 'Test description' }],
      };
      expect(experience.period).toBe(period);
    });
  });

  it('handles various company and position names', () => {
    const validNames = [
      'Simple Name',
      'Company & Co.',
      'Tech Solutions Inc.',
      ' Société Anonyme',
      '株式会社',
      'A',
      '',
      'Very long company name with many words and descriptions',
    ];

    validNames.forEach((company, index) => {
      const experience: Experience = {
        id: `exp-${index}`,
        period: '2020-2023',
        company,
        position: 'Developer',
        description: [{ text: 'Test description' }],
      };
      expect(experience.company).toBe(company);
    });
  });

  it('handles complex description scenarios', () => {
    const descriptionScenarios = [
      [{ text: 'Simple description' }],
      [
        { text: 'First responsibility' },
        { text: 'Second responsibility', subItems: ['Task 1', 'Task 2'] },
        { text: 'Third responsibility', subItems: [] },
      ],
      [],
    ];

    descriptionScenarios.forEach((description, index) => {
      const experience: Experience = {
        id: `exp-${index}`,
        period: '2020-2023',
        company: 'Test Company',
        position: 'Developer',
        description,
      };
      expect(experience.description).toEqual(description);
    });
  });
});

describe('Education Interface', () => {
  it('has all required properties', () => {
    const education: Education = {
      id: 'edu-1',
      period: '2016-2020',
      institution: 'University Name',
      degree: 'Bachelor of Science',
      description: [
        { text: 'Studied Computer Science' },
        {
          text: 'Relevant coursework',
          subItems: ['Algorithms', 'Data Structures'],
        },
      ],
    };

    expect(education.id).toBe('edu-1');
    expect(education.period).toBe('2016-2020');
    expect(education.institution).toBe('University Name');
    expect(education.degree).toBe('Bachelor of Science');
    expect(education.description).toHaveLength(2);
  });

  it('allows optional degree', () => {
    const education: Education = {
      id: 'edu-2',
      period: '2018-2019',
      institution: 'Bootcamp',
      description: [{ text: 'Intensive training program' }],
    };

    expect(education.degree).toBeUndefined();
    expect(education.institution).toBe('Bootcamp');
  });

  it('handles various institution names', () => {
    const institutions = [
      'University of Technology',
      'State College & Institute',
      'École Supérieure',
      '東京大学',
      'A',
      '',
      'Very long institution name with many departments and specializations',
    ];

    institutions.forEach((institution, index) => {
      const education: Education = {
        id: `edu-${index}`,
        period: '2016-2020',
        institution,
        description: [{ text: 'Test description' }],
      };
      expect(education.institution).toBe(institution);
    });
  });

  it('handles various degree formats', () => {
    const degrees = [
      undefined,
      'Bachelor of Science',
      'Master of Arts',
      'PhD in Computer Science',
      'B.S. Computer Science',
      'Licence Professionnelle',
      '修士号',
      '',
      'Very long degree name with many specializations and honors',
    ];

    degrees.forEach((degree, index) => {
      const education: Education = {
        id: `edu-${index}`,
        period: '2016-2020',
        institution: 'Test University',
        degree,
        description: [{ text: 'Test description' }],
      };
      expect(education.degree).toBe(degree);
    });
  });

  it('handles complex description scenarios similar to Experience', () => {
    const descriptionScenarios = [
      [{ text: 'Core curriculum' }],
      [
        { text: 'Major courses', subItems: ['Math', 'Physics'] },
        { text: 'Electives' },
        { text: 'Thesis work', subItems: ['Research', 'Writing'] },
      ],
    ];

    descriptionScenarios.forEach((description, index) => {
      const education: Education = {
        id: `edu-${index}`,
        period: '2016-2020',
        institution: 'Test University',
        description,
      };
      expect(education.description).toEqual(description);
    });
  });
});
