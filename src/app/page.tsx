import Hero from './components/Hero'
import Image from "next/image";
import image1 from "./../assets/img1.png";
import image2 from "./../assets/img2.png";


export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <div className="p-16 bg-red-500 text-white">
      <h2 className="text-4xl font-bold mb-8">Our Features</h2>
      <div className="flex flex-col gap-16">
        <div className="flex items-center justify-center gap-4">
          <Image src={image1} alt="Feature 1" width={600} height={200} />
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Add Desired Number of People</h3>
            <p>
              Easily customize your certificates by adding the names of the individuals you want to recognize.
              Whether it's for a team, group, or event, you can include as many people as needed on each certificate.
            </p>
          </div>
        </div>

        
        <div className="flex items-center justify-center flex-row-reverse gap-4">
          <Image src={image2} alt="Feature 2" width={600} height={200} />
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Get the Preview of All Certificates</h3>
            <p>
              Ensure your certificates look perfect before finalizing. Preview all the certificates at once
              to make sure names and details are accurate. No surprises—just professional, error-free certificates.
            </p>
          </div>
        </div>
      </div>
    </div>
    </main>
  )
}
