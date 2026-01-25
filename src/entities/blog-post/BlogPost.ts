/**
 * Blog post entity
 * Extends the base blog post with additional fields for static site generation
 */

export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly date: Date;
  readonly description: string;
  readonly thumbnail: string;
  readonly imageUrl?: string;
  readonly content?: string;
  readonly category?: string;
  readonly tags?: readonly string[];
}
