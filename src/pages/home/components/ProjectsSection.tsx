import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const content = [
  {
    title: 'Collaborative Editing',
    description:
      'Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.',
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: 'Real time changes',
    description:
      'See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.',
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: 'Version control',
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
  {
    title: 'Running out of content',
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Running out of content
      </div>
    ),
  },
];

export const ProjectsSection = () => {
  return (
    <section
      id="projects-section"
      className="max-w-2xl lg:max-w-4xl mx-auto relative z-10 flex items-center flex-col justify-center text-center"
    >
      {/* <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-200 dark:to-neutral-400 text-center font-sans font-bold drop-shadow-md dark:drop-shadow-white/40 drop-shadow-black/40">
        My Projects
      </h1>
      <h6 className="dark:text-neutral-400 max-w-lg mt-4 mb-8 text-md text-center relative z-10">
        Here are some of my projects that I have worked on. You can find more on my GitHub.
      </h6> */}

      <Tabs defaultValue="account" className="items-center w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Projects</TabsTrigger>
          <TabsTrigger value="password">Work History</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <StickyScroll content={content} />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};
