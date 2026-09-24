import { useParams, Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  duration: string;
  image: string;
  eyebrow: string;
}

const services: ServiceDetail[] = [
  {
    slug: 'kasvohoidot',
    eyebrow: 'KASVOHOIDOT',
    title: 'Kasvohoidot',
    subtitle: 'Monipuoliset kasvohoidot jokaiselle ihotyypille',
    description: 'Valikoimasta löytyy kasvohoito jokaiseen ihontilanteeseen: kirkastavat ja syväkosteuttavat hoidot, epäpuhtaalle iholle suunnatut hoidot sekä rentouttavat rituaalihoidot. Tarjolla on myös mikroneulaus, mekaaninen ihonpuhdistus, LED-valohoito ja Ice Globe -kylmähoito. Jokainen hoito toteutetaan rauhallisesti ja yksilöllisesti.',
    benefits: ['Yksilöllisesti valittu hoito', 'Monta hoitovaihtoehtoa', 'Myös mikroneulaus ja LED-hoito', 'Rauhallinen ympäristö', 'Edulliset hinnat', 'Helppo varata netissä'],
    duration: 'Hoidon mukaan',
    image: '/assets/vilia-gallery-5.jpg',
  },
  {
    slug: 'ripset-ja-kulmat',
    eyebrow: 'RIPSET JA KULMAT',
    title: 'Ripsien- ja kulmien hoidot',
    subtitle: 'Kauniit ripset ja huolitellut kulmat viimeistelevät ilmeesi',
    description: 'Ripsienpidennyksiä klassisesta volyymiin, hybridiin ja megavolyymiin sekä ripsien kestotaivutus ja värjäys. Kulmille tarjolla laminointi, värjäys ja muotoilu. Huollot ja pikahuollot onnistuvat kätevästi säännöllisin väliajoin.',
    benefits: ['Klassiset, volyymi ja hybridi', 'Kestotaivutus ja värjäys', 'Kulmien laminointi', 'Huollot ja pikahuollot', 'Siisti ja huolellinen jälki', 'Varaa aika netissä'],
    duration: 'Hoidon mukaan',
    image: '/assets/vilia-gallery-3.jpg',
  },
  {
    slug: 'kadet-ja-kynnet',
    eyebrow: 'KÄDET JA KYNNET',
    title: 'Käsi- ja kynsihoidot',
    subtitle: 'Huolitellut kädet ja kestävät kynnet',
    description: 'Manikyyrit, geelilakkaukset, kestolakkaukset ja rakennekynnet sekä hellivät käsihoidot ja spa-käsihoidot. Myös geeli- ja rakennekynsien poistot onnistuvat ammattitaidolla.',
    benefits: ['Geelilakkaus ja kestolakkaus', 'Rakennekynnet', 'Manikyyri ja käsihoidot', 'Spa-käsihoito', 'Huollot ja poistot', 'Siisti lopputulos'],
    duration: 'Hoidon mukaan',
    image: '/assets/vilia-gallery-1.jpg',
  },
  {
    slug: 'hieronnat',
    eyebrow: 'HIERONNAT',
    title: 'Hieronnat',
    subtitle: 'Rentouttavat hoidot keholle ja mielelle',
    description: 'Klassinen hieronta, lämmin kuumakivihieronta, rentouttava niska-hartiahoito sekä intialainen päähieronta ja head spa -hoidot. Hieronta purkaa jännityksiä ja tarjoaa rauhallisen hetken arjen keskellä.',
    benefits: ['Klassinen hieronta', 'Kuumakivihieronta', 'Niska-hartiahoito', 'Intialainen päähieronta', 'Head spa -hoidot', 'Rauhallinen tunnelma'],
    duration: '30–120 min',
    image: '/assets/vilia-salon.jpg',
  },
  {
    slug: 'hoitopaketit',
    eyebrow: 'HOITOPAKETIT',
    title: 'Hoitopaketit',
    subtitle: 'Kokonaisia hemmotteluhetkiä yhdellä kerralla',
    description: 'Hoitopaketit yhdistävät useamman hoidon yhdeksi kokonaiseksi hemmotteluhetkeksi. Valikoimassa muun muassa Vilia Signature Spa (head spa ja kasvohoito), Vilia Luxury Spa (head spa, kasvohoito ja kuumakivihieronta) sekä hyvän olon paketti.',
    benefits: ['Useampi hoito kerralla', 'Vilia Signature Spa 79 €', 'Vilia Luxury Spa 99 €', 'Hyvän olon paketti 100 €', 'Sopii myös lahjaksi', 'Varaa netissä'],
    duration: 'Paketin mukaan',
    image: '/assets/vilia-gallery-4.jpg',
  },
];

export function ServicePageTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="bg-white pt-32 pb-20 px-6 text-center">
        <h1 className="font-cormorant text-2xl text-[#33222A] mb-4">Palvelua ei löytynyt</h1>
        <Link to="/" className="font-inter text-[13px] text-[#7A5C6A] hover:text-[#33222A]">
          Takaisin etusivulle
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[100dvh]">
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[3px] text-white/40 mb-4">
              {service.eyebrow}
            </p>
            <h1 className="font-cormorant text-[28px] md:text-[36px] text-white leading-[1.2] mb-4">
              {service.title}
            </h1>
            <p className="font-inter text-[14px] text-white/60 max-w-[400px] mx-auto">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#7A5C6A] hover:text-[#33222A] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              Takaisin etusivulle
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-cormorant text-[22px] md:text-[26px] text-[#33222A] leading-[1.3] mb-6">
              {service.subtitle}
            </h2>
            <p className="font-inter text-[15px] text-[#33222A] leading-[1.75] mb-10">
              {service.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h3 className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#7A5C6A] mb-5">
              Hoidon hyödyt
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#33222A]/50 shrink-0" />
                  <span className="font-inter text-[14px] text-[#33222A]">{b}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex items-center gap-4 mb-10 py-4 border-t border-b border-[#3A2830]/[0.05]">
              <span className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#7A5C6A]">
                Kesto
              </span>
              <span className="font-inter text-[15px] font-medium text-[#33222A]">
                {service.duration}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <a
              href="https://varaa.timma.fi/kauneushuonevilia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-14 py-[16px] rounded font-inter text-[14px] font-semibold tracking-wide bg-[#33222A] text-white hover:bg-[#7A5C6A] transition-colors duration-300 mb-4"
            >
              Varaa aika
            </a>
            <p className="font-inter text-[13px] text-[#7A5C6A]/60">
              Varaa netissä tai soita <a href="tel:+3584578377337" className="text-[#7A5C6A] hover:text-[#33222A]">045 783 773 37</a>
            </p>
          </ScrollReveal>

          {/* All services nav */}
          <ScrollReveal delay={0.25}>
            <div className="mt-14 pt-10 border-t border-[#3A2830]/[0.05]">
              <h3 className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#7A5C6A] mb-5">
                Kaikki palvelut
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/palvelut/${s.slug}`}
                    className={`font-inter text-[13px] py-2 transition-colors duration-300 flex items-center gap-1.5 ${
                      s.slug === service.slug
                        ? 'text-[#33222A] font-medium'
                        : 'text-[#33222A] hover:text-[#33222A]'
                    }`}
                  >
                    {s.title.split(' ')[0]}
                    {s.slug !== service.slug && <ArrowRight size={11} strokeWidth={1.5} />}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
