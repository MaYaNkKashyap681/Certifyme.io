import { Button } from "@/components/ui/button"
import Link from "next/link"


const Hero = () => {
  return (
    <section className='h-screen w-screen relative'>
      <div className="w-[10rem] h-[10rem] bg-red-300 blur-[8rem] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      {/* <div className="w-[10rem] h-[6rem] bg-green-300 blur-[8rem] rounded-full absolute top-0 left-0"></div> */}
      <div className=' h-screen container mx-auto flex items-center justify-center flex-col'>
        <div className="relative inline-flex  before:inset-0 ">
          <span className="relative px-3 py-1 text-sm font-medium inline-flex items-center justify-center border border-transparent rounded-full  text-zinc-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.primary.900),_theme(colors.primary.900))_padding-box,_conic-gradient(theme(colors.primary.400),_theme(colors.primary.700)_25%,_theme(colors.primary.700)_75%,_theme(colors.primary.400)_100%)_border-box] before:absolute before:inset-0 before:bg-zinc-800/30 before:rounded-full before:pointer-events-none cursor-pointer">
            Certificate Generation Becomes Easier Now{" "}
            <span className="tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              -&gt;
            </span>
          </span>
        </div>
        <h1
          className="pb-4 mt-[1rem] text-center font-extrabold tracking-tight text-transparent text-5xl lg:text-7xl  bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60"

        >
          Empowering <span className=" italic text-primary">Achievements,</span> Crafting Certificates.
        </h1>
        <Link href="/certificate">
          <div className="mt-[2rem]">
            <Button className="" variant={'default'}>
              Generate <span className="tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </Button>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Hero