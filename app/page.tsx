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
} from './components/widget';

export default function Home() {
  return (
    <div className="min-h-screen pb-24 page-transition">
      <Dock />
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[360px] flex-shrink-0 space-y-4 self-start">
            <About />
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5" style={{ gridAutoRows: 'minmax(140px, auto)' }}>
            <div className="col-span-1"><Status /></div>
            <div className="col-span-2 row-span-2"><Location /></div>
            <div className="col-span-1"><GitHubGraph /></div>
            <div className="col-span-1"><Weather /></div>
            <div className="col-span-1"><LocalTime /></div>
            <div className="col-span-1 row-span-2"><Skills /></div>
            <div className="col-span-2 row-span-2"><Blog /></div>
            <div className="col-span-1 row-span-2"><Playing /></div>
            <div className="col-span-4 grid grid-cols-3 gap-4 md:gap-5">
              <Tools />
              <Interests />
              <Projects />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
