import { getDictionary } from "@/i18n/get-dictionary";
import { type Locale } from "@/i18n/config";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MenuHighlights } from "@/components/menu-highlights";
import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Location } from "@/components/location";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main>
        <Hero lang={lang} dict={dict.hero} />
        <div className="reveal"><MenuHighlights dict={dict.menu} /></div>
        <div className="reveal"><About dict={dict.about} /></div>
        <div className="reveal"><Gallery dict={dict.gallery} /></div>
        <div className="reveal"><Location lang={lang} dict={dict.location} /></div>
      </main>
      <Footer lang={lang} nav={dict.nav} dict={dict.footer} />
      <ChatWidget lang={lang} />
      <ScrollReveal />
    </>
  );
}