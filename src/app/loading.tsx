export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background_light">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading TerraFund...</p>
      </div>
    </div>
  );
}