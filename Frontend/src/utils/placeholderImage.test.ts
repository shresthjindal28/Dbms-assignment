import { PLACEHOLDER_IMAGES } from './placeholderImage';

describe('Placeholder Images', () => {
  test('should have valid data URIs for all placeholder sizes', () => {
    expect(PLACEHOLDER_IMAGES.small).toMatch(/^data:image\/svg\+xml;base64,/);
    expect(PLACEHOLDER_IMAGES.medium).toMatch(/^data:image\/svg\+xml;base64,/);
    expect(PLACEHOLDER_IMAGES.large).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  test('should have different sizes for different placeholder types', () => {
    const smallLength = PLACEHOLDER_IMAGES.small.length;
    const mediumLength = PLACEHOLDER_IMAGES.medium.length;
    const largeLength = PLACEHOLDER_IMAGES.large.length;
    
    // Each size should be different (larger images have more data)
    expect(mediumLength).toBeGreaterThan(smallLength);
    expect(largeLength).toBeGreaterThan(mediumLength);
  });
});
