import { Articles_content } from "@/app/components/articles_content";
import { Articles_sidebar } from "@/app/components/articles_sidebar";

export default function Articles() {
  return (
    <div className="flex justify-start">
      <Articles_sidebar />
      <Articles_content />
    </div>
  );
}
