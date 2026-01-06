import { Dock } from './components/dock';
import {
  About,
  Status,
  Weather,
  Location,
  Projects,
  Skills,
  Blog,
  Playing,
  GitHubGraph,
  LocalTime,
  Tools,
  Interests,
  TechStack,
  Learning,
} from './components/widget';

export default function Home() {
  return (
    <div className="min-h-screen pb-24">
      <Dock />
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-12 md:pt-8">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="w-full lg:w-[360px] flex-shrink-0">
            <About />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1"><Status /></div>
            <div className="md:col-span-2 md:row-span-2"><Location /></div>
            <div className="md:col-span-1"><GitHubGraph /></div>
            <div className="md:col-span-1"><Weather /></div>
            <div className="md:col-span-1"><LocalTime /></div>
            <div className="md:col-span-2"><TechStack /></div>
            <div className="md:col-span-2"><Learning /></div>
            <div className="md:col-span-1 md:row-span-2"><Skills /></div>
            <div className="md:col-span-2 md:row-span-2"><Blog /></div>
            <div className="md:col-span-1 md:row-span-2"><Playing /></div>
            <div className="md:col-span-4 grid md:grid-cols-4 gap-4 h-[148px]">
              <div className="md:col-span-2 h-full"><Tools /></div>
              <div className="md:col-span-1 h-full"><Interests /></div>
              <div className="md:col-span-1 h-full"><Projects /></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
