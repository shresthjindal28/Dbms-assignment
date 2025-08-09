// Simple placeholder image using data URI
// This creates a gray rectangle with "No Image" text
export const getPlaceholderImage = (width: number = 300, height: number = 200): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
    
    // Border
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, width - 1, height - 1);
    
    // Text
    ctx.fillStyle = '#9ca3af';
    ctx.font = `${Math.max(12, Math.min(16, width / 20))}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('No Image', width / 2, height / 2);
  }
  
  return canvas.toDataURL();
};

// Pre-generated placeholder images for common sizes
export const PLACEHOLDER_IMAGES = {
  small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iNTkiIGhlaWdodD0iNTkiIHN0cm9rZT0iI0QxRDVEMiIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOUNBM0FGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=',
  medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iMjk5IiBoZWlnaHQ9IjE5OSIgc3Ryb2tlPSIjRDFENUQyIiBzdHJva2Utd2lkdGg9IjEiLz4KPHRleHQgeD0iMTUwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K',
  large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iMzk5IiBoZWlnaHQ9IjI5OSIgc3Ryb2tlPSIjRDFENUQyIiBzdHJva2Utd2lkdGg9IjEiLz4KPHRleHQgeD0iMjAwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'
};
