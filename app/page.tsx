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
        <div className="flex flex-col min-[1304px]:flex-row gap-6 items-stretch">
          <div className="w-full min-[1304px]:w-[360px] flex-shrink-0">
            <About />
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 min-[1304px]:max-h-[calc(100vh-10rem)] min-[1304px]:grid-rows-[repeat(6,1fr)]">
            <div className="col-span-1"><Status /></div>
            <div className="col-span-1"><Weather /></div>
            <div className="col-span-2 min-h-[200px] md:min-h-0 md:row-span-2 order-3 md:order-none"><Location /></div>
            <div className="col-span-1"><GitHubGraph /></div>
            <div className="col-span-1"><LocalTime /></div>
            <div className="col-span-2"><TechStack /></div>
            <div className="col-span-2"><Learning /></div>
            <div className="col-span-2 md:col-span-1 md:row-span-2"><Skills /></div>
            <div className="col-span-2 min-h-[300px] md:min-h-0 md:row-span-2"><Blog /></div>
            <div className="col-span-2 md:col-span-1 md:row-span-2"><Playing /></div>
            <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:h-[148px]">
              <div className="col-span-2 h-full"><Tools /></div>
              <div className="col-span-1 h-full"><Interests /></div>
              <div className="col-span-1 min-h-[140px] md:min-h-0 h-full"><Projects /></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
