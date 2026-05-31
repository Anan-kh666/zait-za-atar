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
        <MenuHighlights dict={dict.menu} />
        <About dict={dict.about} />
        <Gallery dict={dict.gallery} />
        <Location lang={lang} dict={dict.location} />
      </main>
      <Footer lang={lang} nav={dict.nav} dict={dict.footer} />
      <ChatWidget lang={lang} />
    </>
  );
}