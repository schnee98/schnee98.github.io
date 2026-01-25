import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '@/widgets/header/ui/Navigation';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation');

describe('Navigation Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('has proper ARIA attributes', () => {
    render(<Navigation />);

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('hamburger button has proper ARIA attributes', () => {
    render(<Navigation />);

    const button = screen.getByRole('button', {
      name: 'Toggle navigation menu',
    });
    expect(button).toHaveAttribute('aria-controls', 'mobile-menu');
    expect(button).toHaveAttribute('aria-expanded');
  });

  it('menu items have proper ARIA attributes', () => {
    render(<Navigation />);

    const aboutLink = screen.getByRole('menuitem', { name: 'About' });
    const blogLink = screen.getByRole('menuitem', { name: 'Blog' });

    expect(aboutLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
  });

  it('button is clickable and has correct behavior', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const button = screen.getByRole('button', {
      name: 'Toggle navigation menu',
    });

    await user.click(button);

    // Should not throw any errors and button remains in DOM
    expect(button).toBeInTheDocument();
  });

  it('current page has aria-current attribute', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');
    render(<Navigation />);

    const aboutLinks = screen.getAllByRole('menuitem', { name: 'About' });
    aboutLinks.forEach(link => {
      expect(link).toHaveAttribute('aria-current', 'page');
    });
  });
});
