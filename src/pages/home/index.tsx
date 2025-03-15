export const HomePage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="grid gap-4 mt-8 md:grid-cols-3">
        {/* Primary Card */}
        <div className="bg-primary border-primary border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Primary</h2>
          <p>Uses automatic contrast text</p>
        </div>

        {/* Secondary Card */}
        <div className="bg-secondary border-primary border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Secondary</h2>
          <p>Perfect for highlights</p>
        </div>

        {/* Tertiary Card */}
        <div className="bg-tertiary border-primary border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Tertiary</h2>
          <p>Great for accents</p>
        </div>
      </div>
    </div>
  )
}
