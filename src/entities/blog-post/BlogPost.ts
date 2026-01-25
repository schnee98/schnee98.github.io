/**
 * Blog post entity
 */

export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly date: Date;
  readonly imageUrl?: string;
  readonly content?: string;
  readonly category?: string;
  readonly tags?: readonly string[];
}

