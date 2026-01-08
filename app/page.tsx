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
  Tools,
  Interests,
  TechStack,
  Learning,
  LocalTime,
} from './components/widget';

export default function Home() {
  return (
    <div className="min-h-screen pb-28">
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-8 lg:pt-6">
        <div className="flex flex-col min-[1304px]:flex-row gap-6 items-stretch">
          <div className="w-full min-[1304px]:w-[400px] flex-shrink-0 widget-animate stagger-1">
            <About />
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 min-[1304px]:grid-rows-[minmax(120px,auto)_minmax(120px,auto)_minmax(140px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)_minmax(160px,auto)]">
            <div className="col-span-1 widget-animate stagger-2"><Status /></div>
            <div className="col-span-2 min-h-[220px] md:min-h-0 md:row-span-2 order-3 md:order-none widget-animate stagger-3"><Location /></div>
            <div className="col-span-1 md:row-span-2 widget-animate stagger-4"><GitHubGraph /></div>
            <div className="col-span-2 md:col-span-1 order-4 md:order-none grid grid-cols-2 gap-2 md:gap-3">
              <div className="widget-animate stagger-5"><LocalTime /></div>
              <div className="widget-animate stagger-5"><Weather /></div>
            </div>
            <div className="col-span-2 widget-animate stagger-6"><TechStack /></div>
            <div className="col-span-2 widget-animate stagger-7"><Learning /></div>
            <div className="col-span-2 md:col-span-1 md:row-span-2 widget-animate stagger-8"><Skills /></div>
            <div className="col-span-2 min-h-[320px] md:min-h-0 md:row-span-2 widget-animate stagger-9"><Blog /></div>
            <div className="col-span-2 md:col-span-1 md:row-span-2 widget-animate stagger-10"><Playing /></div>
            <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 md:h-[160px]">
              <div className="col-span-2 h-full widget-animate stagger-11"><Tools /></div>
              <div className="col-span-1 h-full widget-animate stagger-12"><Interests /></div>
              <div className="col-span-1 min-h-[150px] md:min-h-0 h-full widget-animate stagger-12"><Projects /></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
