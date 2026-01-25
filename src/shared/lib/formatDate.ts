/**
 * Utility: Date Formatting
 * 계산(Calculation) - 순수 함수
 */

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

