import '@testing-library/jest-dom'

jest.mock('next/server', () => ({
  NextResponse: {
    json: (data) => ({
      status: 200,
      headers: {
        get: (key) => key === 'content-type' ? 'application/json' : null
      },
      json: () => Promise.resolve(data)
    })
  }
}))

jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, fill, priority, loading, ...props }) {
    return (
      <img 
        src={src} 
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : (loading || 'lazy')}
        {...(fill && { 'data-fill': 'true' })}
        {...(priority && { 'data-priority': 'true' })}
        {...props}
      />
    );
  };
});

global.Request = class MockRequest {
  constructor(url) {
    this.url = url
  }
}