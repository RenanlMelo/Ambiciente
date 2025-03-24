import Articles_all from "@/app/components/articles/articles_all";
import Footer from "@/app/components/footer";

export default function Articles() {
  return (
    <div className=" flex-col justify-start">
      <Articles_all />
      <Footer />
    </div>
  );
}
