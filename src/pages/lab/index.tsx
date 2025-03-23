import { BaseButton } from '../../components/BaseButton';

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
        <BaseButton>Button Primary</BaseButton>

        <BaseButton buttonStyle="outline">Button Secondary</BaseButton>

        <BaseButton buttonStyle="ghost">Button Tertiary</BaseButton>
      </div>
    </div>
  );
};
