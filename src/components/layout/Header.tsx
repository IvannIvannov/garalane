import Brand from "./Brand";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />

        <nav aria-label="Основна навигация" className="nav-links">
          <a href="#garage">Моят гараж</a>
          <a href="#services">Услуги</a>
          <a href="#vision">За Garalane</a>
        </nav>

        <a href="#garage" className="nav-cta">
          Разгледай
          <ArrowIcon diagonal />
        </a>
      </div>
    </header>
  );
}
