import { About_content } from "@/app/components/about/about_content";
import Footer from "@/app/components/ui/footer";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-full">
      <About_content />
      <Footer />
    </div>
  );
}
