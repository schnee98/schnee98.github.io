/**
 * Domain Entity: Profile
 * Profile information entity
 */

interface Link {
  readonly address: string;
  readonly label: string;
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly description: string[];
  readonly imageUrl: string;
  readonly email: Link;
  readonly github: Link;
  readonly linkedin: Link;
}

export interface DescriptionItem {
  readonly text: string;
  readonly subItems?: readonly string[];
}

export interface Experience {
  readonly id: string;
  readonly period: string;
  readonly company: string;
  readonly position: string;
  readonly description: readonly DescriptionItem[];
}

export interface Education {
  readonly id: string;
  readonly period: string;
  readonly institution: string;
  readonly degree?: string;
  readonly description: readonly DescriptionItem[];
}

