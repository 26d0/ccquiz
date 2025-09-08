import WorldMap from "../components/WorldMap";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          World Map Demo
        </h1>
        <p className="text-lg text-gray-600">
          Interactive world map using Leaflet
        </p>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="h-[600px]">
            <WorldMap />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Click on the markers to see city names. Zoom and pan to explore the world!
          </p>
        </div>
      </main>
    </div>
  );
}
