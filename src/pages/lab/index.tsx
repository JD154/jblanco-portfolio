import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const LabPage = () => {
  return (
    <div className="min-h-screen p-4">
      <h3 className="text-xl font-bold text-foreground">Cards:</h3>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        {/* Secondary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <h3 className="mt-8 text-xl font-bold text-foreground">Links:</h3>

      <div className="mt-4">
        <a href="#" className="text-foreground opacity-80 hover:opacity-100">
          Primary Link
        </a>
      </div>

      <h3 className="mt-8 text-xl font-bold text-foreground">Buttons:</h3>

      <div className="flex gap-4 mt-4">
        <Button>Button Primary</Button>

        <Button variant="secondary">Button Secondary</Button>

        <Button variant="outline">Button outline</Button>

        <Button variant="ghost">Button ghost</Button>
      </div>
    </div>
  );
};
