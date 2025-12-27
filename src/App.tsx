import { TopNav } from "./components/TopNav";
import { Hero } from "./components/Hero";
import { EquipmentSection } from "./components/EquipmentSection";
import { ContactsSection } from "./components/ContactsSection";
import { PackagesSection } from "./components/PackagesSection";

export default function App() {
  return (
    <div className="min-h-screen bg-base-950 animated-content">
      <TopNav />
      <Hero />
      <PackagesSection />
      <EquipmentSection />
      <ContactsSection />

      <footer className="border-t border-gray-800 dark:bg-gray-950/60 backdrop-blur-sm shadow border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500 flex justify-between gap-2">
          <span>© {new Date().getFullYear()} backline.com.ua</span>
          <span>Backline • Live Sound • IEM</span>
        </div>
      </footer>
    </div>
  );
}
