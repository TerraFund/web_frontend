// This would serve a favicon.ico file
// In a real app, you'd place the favicon.ico file in this directory

export async function GET() {
  // Mock favicon response
  return new Response('Mock favicon', {
    headers: {
      'Content-Type': 'image/x-icon',
    },
  });
}