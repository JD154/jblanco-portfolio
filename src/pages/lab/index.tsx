export const LabPage = () => {
  return (
    <div className="min-h-screen p-8">
      <h3 className="text-foreground text-xl font-bold">Cards:</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Primary Card */}
        <div className="bg-card-foreground text-primary-foreground rounded-lg border p-6">
          <h2 className="mb-2 text-xl font-bold">Primary</h2>
          <p>Uses automatic contrast text</p>
        </div>

        {/* Secondary Card */}
        <div className="bg-secondary text-foreground border-border rounded-lg border p-6">
          <h2 className="mb-2 text-xl font-bold">Secondary</h2>
          <p>Perfect for highlights</p>
        </div>
      </div>
      <h3 className="text-foreground mt-8 text-xl font-bold">Links:</h3>

      <div className="mt-4">
        <a href="#" className="text-foreground opacity-80 hover:opacity-100">
          Primary Link
        </a>
      </div>

      <h3 className="text-foreground mt-8 text-xl font-bold">Buttons:</h3>

      <div className="mt-4 flex gap-4">
        <button className="bg-primary  text-primary-foreground cursor-pointer rounded-lg border px-4 py-2 text-sm font-bold opacity-100 hover:opacity-90">
          Button Primary
        </button>

        <button className="bg-secondary text-primary border-border cursor-pointer rounded-lg border px-4 py-2 text-sm font-bold opacity-80 hover:opacity-100">
          Button Secondary
        </button>

        <button className="border-transparent hover:border-border cursor-pointer rounded-lg border-1 px-4 py-2 text-sm font-bold">
          Button Tertiary
        </button>
      </div>
    </div>
  )
}
