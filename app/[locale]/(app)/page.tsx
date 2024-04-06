import Hero from "#/ui/home/hero";

export default function Home() {
  return (
    <>
      <div data-e2e="home-page">
        <Hero />
        <div className="bg-white md:rounded-t-[64px]">
          <div className="hidden h-[64px] rounded-t-[64px] bg-zinc-50 md:block" />
        </div>
      </div>
    </>
  );
}
