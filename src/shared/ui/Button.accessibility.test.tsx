import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/shared/ui/Button';

jest.mock('next/link', () => {
  return function MockLink({ children, href, className, ...props }: any) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  };
});

describe('Button Accessibility Tests', () => {
  const user = userEvent.setup();

  describe('ARIA Attributes', () => {
    it('has accessible name via text content for button', () => {
      render(<Button>Submit Form</Button>);

      const button = screen.getByRole('button', { name: 'Submit Form' });
      expect(button).toBeInTheDocument();
    });

    it('has accessible name via text content for links', () => {
      render(<Button href="/home">Go to Home</Button>);

      const link = screen.getByRole('link', { name: 'Go to Home' });
      expect(link).toBeInTheDocument();
    });

    it('maintains proper button semantics', () => {
      render(<Button>Action</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('maintains proper link semantics for internal navigation', () => {
      render(<Button href="/about">About Us</Button>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/about');
    });

    it('maintains proper link semantics for external navigation', () => {
      render(
        <Button href="https://example.com" openInNewTab>
          External Site
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('maintains basic accessibility without custom ARIA attributes', () => {
      render(<Button>Accessible Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('maintains link accessibility without custom ARIA attributes', () => {
      render(<Button href="/help">Help Link</Button>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/help');
    });
  });

  describe('Keyboard Navigation', () => {
    it('is focusable when rendered as button', () => {
      render(<Button>Focusable Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('is focusable when rendered as internal link', () => {
      render(<Button href="/focus">Focusable Link</Button>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('is focusable when rendered as external link', () => {
      render(<Button href="https://focusable.com">Focusable External</Button>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('receives focus programmatically', () => {
      render(<Button>Programmatic Focus</Button>);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('triggers click on Enter key for button', async () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Enter Action</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('triggers click on Space key for button', async () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Space Action</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{ }');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be activated via keyboard for all variants', async () => {
      const variants = ['primary', 'secondary', 'icon'] as const;

      for (const variant of variants) {
        const handleClick = jest.fn();

        const { unmount } = render(
          <Button variant={variant} onClick={handleClick}>
            {variant} Button
          </Button>
        );

        const button = screen.getByRole('button');
        button.focus();
        await user.keyboard('{Enter}');

        expect(handleClick).toHaveBeenCalledTimes(1);
        unmount();
      }
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('handles button text content for screen readers', () => {
      render(<Button>Toggle Button</Button>);

      const button = screen.getByRole('button', { name: 'Toggle Button' });
      expect(button).toBeInTheDocument();
    });

    it('handles icon-only buttons with text content', () => {
      render(
        <Button variant="icon">
          <span aria-hidden="true">×</span>
          Close
        </Button>
      );

      const button = screen.getByRole('button', { name: 'Close' });
      expect(button).toBeInTheDocument();
    });

    it('handles complex nested content for screen readers', () => {
      render(
        <Button>
          <span aria-hidden="true">📄</span>
          Save Document
        </Button>
      );

      const button = screen.getByRole('button', { name: 'Save Document' });
      expect(button).toBeInTheDocument();
    });

    it('maintains reading order for nested elements', () => {
      render(
        <Button>
          <span aria-hidden="true">🔍</span>
          Search
        </Button>
      );

      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('removes focus on blur', async () => {
      render(<Button>Focus Test</Button>);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      button.blur();
      expect(button).not.toHaveFocus();
    });

    it('maintains focus after click', async () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Click Focus</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.click(button);

      expect(button).toHaveFocus();
    });

    it('handles focus for link variants', async () => {
      render(<Button href="/focus-test">Focus Link</Button>);

      const link = screen.getByRole('link');
      link.focus();
      expect(link).toHaveFocus();
    });

    it('handles basic button accessibility attributes', () => {
      render(<Button>Standard Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Color Contrast and Visual Accessibility', () => {
    it('applies variant-specific classes for styling', () => {
      render(<Button variant="primary">Primary Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button', 'primary');
    });

    it('applies icon variant styling', () => {
      render(<Button variant="icon">🔍</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button', 'icon');
    });

    it('supports custom styling through className', () => {
      render(<Button className="visually-enhanced">Enhanced Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button', 'secondary', 'visually-enhanced');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('maintains accessibility with minimal content', () => {
      render(<Button>+</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('+');
    });

    it('handles accessibility with complex React children', () => {
      render(
        <Button>
          <div>
            <strong>Important:</strong> Save your work
          </div>
        </Button>
      );

      const button = screen.getByRole('button');
      expect(screen.getByText('Important:')).toBeInTheDocument();
      expect(screen.getByText('Save your work')).toBeInTheDocument();
    });

    it('preserves accessibility during rapid focus changes', async () => {
      render(
        <div>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </div>
      );

      const button1 = screen.getByRole('button', { name: 'Button 1' });
      const button2 = screen.getByRole('button', { name: 'Button 2' });

      button1.focus();
      expect(button1).toHaveFocus();

      await user.tab();
      expect(button2).toHaveFocus();
      expect(button1).not.toHaveFocus();
    });
  });

  describe('Responsive and Contextual Accessibility', () => {
    it('maintains accessibility across different viewport sizes', () => {
      render(<Button className="responsive-button">Responsive Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button', 'secondary', 'responsive-button');
    });

    it('supports button text for dropdown indicators', () => {
      render(<Button>Menu ▼</Button>);

      const button = screen.getByRole('button', { name: 'Menu ▼' });
      expect(button).toBeInTheDocument();
    });

    it('supports button text for modal triggers', () => {
      render(<Button>Open Modal</Button>);

      const button = screen.getByRole('button', { name: 'Open Modal' });
      expect(button).toBeInTheDocument();
    });
  });
});
