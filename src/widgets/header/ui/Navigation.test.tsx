import { render, screen } from '@testing-library/react';
import { Navigation } from '@/widgets/header/ui/Navigation';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation');

describe('Navigation Component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders navigation links', () => {
    render(<Navigation />);

    expect(
      screen.getByRole('menuitem', { name: /about/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /blog/i })).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Navigation />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
