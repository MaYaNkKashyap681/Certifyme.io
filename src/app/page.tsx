import Image from 'next/image'
import Hero from './components/Hero'
import Features from './components/Features'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Features />
    </main>
  )
}
