import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import linkedin from "@/assets/linkedin.png.asset.json";
import frutaRecortada from "@/assets/fruta-recortada.png.asset.json";
import aberturaMenor from "@/assets/abertura-menor.png";
import atuacaoPainel from "@/assets/atuacao-painel.png.asset.json";
import pessoasPainel from "@/assets/pessoas-painel.png.asset.json";
import pitangas from "@/assets/pitangas.jpg.asset.json";
import logo from "@/assets/logo.png.asset.json";
import fruta from "@/assets/fruta.png.asset.json";
import ju from "@/assets/ju.png.asset.json";
import vitor from "@/assets/vitor.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estúdio Pitangueria — Design, estratégia e malemolência criativa" },
      {
        name: "description",
        content:
          "Estúdio criativo que une estratégia, cultura e repertório: identidade de marca, experiências digitais e projetos editoriais.",
      },
      { property: "og:title", content: "Estúdio Pitangueria" },
      { property: "og:description", content: "Design, estratégia e malemolência criativa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Logo() {
  return (
    <a href="#topo" className="flex items-center" aria-label="Pitangueria">
      <img src={logo.url} alt="Pitangueria" className="h-11 w-auto object-contain" />
    </a>
  );
}

const cards = [
  {
    n: "01",
    title: ["Estratégia, design", "e experiências de marca"],
    lead: "Projetamos identidades, mas também pensamos em tudo o que acontece com uma marca depois que ela ganha o mundo.",
    body: "Não criamos manuais escritos em pedra. Desenvolvemos sistemas visuais vivos, capazes de manter a consistência sem limitar a evolução da marca.",
    back: "Sistema visual de marca • criação de logotipo • design tipográfico • iconografia • ecossistema visual (design system) • acompanhamento e direção criativa em produção de fotos e vídeos (shootings) • construção de conceito e storytelling para produtos.",
    tone: "bg-primary",
  },
  {
    n: "02",
    title: ["Experiências", "digitais"],
    lead: "Construímos conceitos considerando as marcas como nativas digitais.",
    body: "Storytelling e narrativa visual para criar experiências intuitivas e memoráveis e fortalecer sua presença digital",
    back: "Design de sites e interfaces • apresentações e materiais institucionais • planejamento de presença digital e roadmaps de conteúdo • criação de sistema de templates para redes sociais.",
    tone: "bg-brand-dark",
  },
  {
    n: "03",
    title: ["Projetos", "editorias"],
    lead: "Projetos editoriais orientados para o negócio, unindo conteúdo, design editorial e narrativas visuais.",
    body: "Da concepção do projeto gráfico e briefings criativos (conceito, moodboards e shootlist) à diagramação e direção criativa em produções de fotos e vídeos.",
    back: "Revistas customizadas • publicações institucionais • relatórios anuais e ESG.",
    tone: "bg-primary",
  },
];

function FlipCard({ c }: { c: (typeof cards)[number] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setFlipped(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setFlipped(false);
      }}
      onBlur={() => setFlipped(false)}
      onClick={(event) => {
        if (event.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        setFlipped((f) => !f);
      }}
      aria-pressed={flipped}
      aria-label={`${c.n} ${c.title.join(" ")}`}
      className={`flip group block h-[330px] w-full whitespace-normal rounded-none p-0 text-left font-normal hover:bg-transparent ${flipped ? "is-flipped" : ""}`}
    >
      <div className="flip-inner relative h-full w-full">
        <div
          aria-hidden={flipped}
          className={`flip-face absolute inset-0 rounded-2xl ${c.tone} p-5 text-primary-foreground shadow-[0_6px_14px_-6px_rgba(0,0,0,0.35)] transition-transform group-hover:-translate-y-1`}
        >
          <p className="font-display text-3xl font-light">{c.n}</p>
          <h3 className="mt-2 font-display text-[15px] font-medium uppercase leading-tight">
            {c.title[0]}
            <br />
            {c.title[1]}
          </h3>
          <p className="mt-5 text-[12px] font-semibold leading-snug">{c.lead}</p>
          <p className="mt-3 text-[12px] font-light leading-snug opacity-90">{c.body}</p>
          <span className="absolute bottom-4 right-5 text-xl opacity-70 transition-transform group-hover:rotate-180">↻</span>
        </div>
        <div
          aria-hidden={!flipped}
          className={`flip-face flip-back absolute inset-0 flex flex-col rounded-2xl ${c.tone} p-5 text-primary-foreground shadow-[0_6px_14px_-6px_rgba(0,0,0,0.35)]`}
        >
          <p className="font-display text-4xl font-light">{c.n}</p>
          <p className="mt-4 font-display text-lg font-semibold uppercase">Serviços:</p>
          <p className="mt-3 text-[14px] font-light leading-snug">{c.back}</p>
          <span className="absolute bottom-4 right-5 text-xl opacity-70">↺</span>
        </div>
      </div>
    </Button>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  return (
    <main id="topo" className="[&_section]:scroll-mt-16 bg-brand-cream text-foreground">
      {/* HERO */}
      <header className={`fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/25 transition-colors duration-300 ${scrolled || menuOpen ? "bg-brand-red/95 backdrop-blur" : ""}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-24">
          <Logo />
          <nav className="hidden gap-14 font-display text-[13px] font-medium uppercase tracking-[0.3em] text-primary-foreground md:flex">
            <a href="#sobre" className="hover:opacity-70">Sobre</a>
            <a href="#o-que-fazemos" className="hover:opacity-70">O que fazemos</a>
            <a href="#pessoas" className="hover:opacity-70">Pessoas</a>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" aria-label="Menu principal" className="flex flex-col gap-5 border-t border-primary-foreground/25 px-6 py-6 font-display text-sm font-medium uppercase text-primary-foreground md:hidden">
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#o-que-fazemos" onClick={() => setMenuOpen(false)}>O que fazemos</a>
            <a href="#pessoas" onClick={() => setMenuOpen(false)}>Pessoas</a>
          </nav>
        )}
      </header>
      <section className="opening-panel relative w-full">
        <img src={aberturaMenor} alt="" className="opening-art" fetchPriority="high" />
        <h1 className="sr-only">Design, estratégia e malemolência criativa</h1>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="px-6 py-16 md:py-24">
        <div className="about-layout mx-auto max-w-[714px]">
          <img src={frutaRecortada.url} alt="Pitanga" className="about-fruit" />
          <div>
            <h2 className="font-display text-lg font-semibold uppercase text-brand-red">Pitangueria?...</h2>
            <p className="mt-5 text-[14px] leading-snug">
              No Pitangueria, design nunca é só design. Somos um estúdio criativo que une estratégia,
              cultura e repertório para transformar desafios de negócio em ideias relevantes,
              experiências desejáveis e sistemas visuais conectados à marca, ao público e ao contexto.
              Nosso trabalho nasce do encontro entre diferentes linguagens. Artes visuais, música,
              cinema, literatura e comportamento ampliam nosso olhar e alimentam nossa malemolência
              criativa: a capacidade de transitar entre referências, disciplinas e formatos sem perder a
              intenção. Com uma trajetória que passa pelo mercado editorial e por marcas de diferentes
              portes, de negócios regionais a grandes multinacionais, aprendemos a equilibrar
              sensibilidade e pragmatismo, liberdade criativa e estratégia.
            </p>
          </div>
        </div>
      </section>

      {/* ONDE ATUAMOS */}
      <section id="o-que-fazemos" className="relative grid md:grid-cols-2">
        <div className="service-panel flex items-center px-8 py-20 text-primary-foreground md:justify-center">
          <img src={atuacaoPainel.url} alt="" width={1595} height={1192} className="service-art" />
          <div className="relative z-10 max-w-sm">
            <h2 className="font-display text-lg uppercase">
              Onde <span className="font-bold">atuamos</span>
            </h2>
            <p className="mt-6 text-sm font-light leading-snug">
              Com expertise em projetos editoriais, institucionais e de marca, atuamos na construção de
              identidades visuais, narrativas e posicionamentos estratégicos. Acreditamos na presença
              consistente das marcas, do impresso ao digital e aos novos territórios que surgirem. Para
              isso, operamos com estruturas adaptáveis, reunindo os profissionais certos para cada
              projeto.
            </p>
          </div>
        </div>
        <div className="relative flex items-center bg-cover bg-center px-10 py-20" style={{ backgroundImage: `url(${pitangas.url})` }}>
          <div className="absolute inset-0 bg-primary/85" />
          <p className="relative max-w-md font-display text-2xl font-light leading-snug text-primary-foreground md:text-[28px]">
            Marcas precisam ser reconhecíveis, mas também adaptáveis. Elas mudam de contexto, de público
            e de linguagem o tempo todo.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="cards-section px-6">
        <div className="mx-auto grid max-w-[590px] gap-3 md:grid-cols-3">
          {cards.map((c) => (
            <FlipCard key={c.n} c={c} />
          ))}
        </div>
      </section>

      {/* PESSOAS */}
      <section id="pessoas" className="people-section relative bg-cover bg-center" style={{ backgroundImage: `url(${pitangas.url})` }}>
        <div className="absolute inset-0 bg-brand-red/80" />
        <div className="relative grid md:grid-cols-[31%_59%_10%]">
          <div className="relative flex items-center px-8 py-16 md:justify-end md:pr-[5vw]">
<h2 className="people-title font-display text-3xl uppercase leading-tight text-primary-foreground md:text-[2.6vw]">
              <span className="font-semibold">Quem</span> <br />
              <span className="font-semibold">cria</span> no <br />
              Pitangueria
            </h2>
          </div>
          <div className="people-panel relative space-y-14 px-8 py-16 text-primary-foreground md:px-12">
            <img src={pessoasPainel.url} alt="" width={1890} height={1800} className="people-art" />
            <article className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <img src={ju.url} alt="Ju Fioroto" className="h-28 w-28 shrink-0 rounded-full object-cover" />
              <div>
                <h3 className="font-display text-lg uppercase">
                  Ju <span className="font-bold">Fioroto</span>
                </h3>
                <p className="mt-4 text-[13px] font-light leading-snug">
                  Fundadora do Pitangueria, Ju Fioroto atua há mais de 20 anos com comunicação, marcas e
                  design. Pós-graduada em Gestão Estratégica do Design, alimenta seu repertório com
                  referências em arte, fotografia, moda, música, história e comportamento. É desse olhar
                  amplo e curioso que nasce a perspectiva não óbvia que orienta cada projeto. Ao longo da
                  carreira, trabalhou com marcas como Avon, Banco do Brasil, Bradesco, Itaú, Vivara,
                  Renner, C&amp;A, Carrefour, Minerva Foods e Fundação Bradesco, entre outras.
                </p>
              </div>
            </article>
            <article className="relative z-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center">
              <div className="vitor-copy">
                <h3 className="font-display text-lg uppercase">
                  Vitor <span className="font-bold">Balan</span>
                </h3>
                <p className="mt-4 text-[13px] font-light leading-snug">
                  Relações-públicas formado pela Cásper Líbero, com especialização em ESG pelo Senac,
                  formação no curso “Objetivos de Desenvolvimento Sustentável (ODS) e alterações
                  climáticas” da Fundação das Nações Unidas (ONU) e certificações da GRI e IFRS
                  Foundation. Atua há quase 15 anos em comunicação corporativa com ênfase em
                  sustentabilidade. Entre as marcas atendidas, destacam-se Raízen, Cosan, EDP Brasil,
                  Lojas Renner, Dexco, Movida, Fundação Bradesco, Embraer, Telefônica Vivo, Arteris,
                  Cargill e outras.
                </p>
              </div>
              <img src={vitor.url} alt="Vitor Balan" className="h-28 w-28 shrink-0 rounded-full object-cover grayscale" />
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="relative z-10 bg-brand-dark px-6 py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <img src={fruta.url} alt="Pitangueria" className="h-12 w-auto object-contain" />
            <p className="text-xs tracking-[0.15em] text-primary-foreground/80">
              <a href="mailto:contato@pitangueria.com.br" className="hover:text-primary-foreground">contato@pitangueria.com.br</a>
            </p>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/company/pitangueria"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn do Pitangueria"
              className="text-primary-foreground transition-opacity hover:opacity-70"
            >
              <img src={linkedin.url} alt="" className="h-[18.2px] w-[18.2px] object-contain" />
            </a>
            <p className="font-display text-[11px] font-light uppercase">
              <span>© 2026</span> Estúdio Pitangueria
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
