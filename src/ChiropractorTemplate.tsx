import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Train,
  Car,
  Instagram,
  Facebook,
  Plus,
  Minus,
  Star,
} from 'lucide-react';

const templateData = {
  business: {
    name: 'Kauneushuone Vilia',
    tagline: 'Kauneushoitola Porin keskustassa',
    fullTagline: 'KAUNEUSHUONE VILIA | KAUNEUSHOITOLA PORIN KESKUSTA',
    address: 'Yrjönkatu 7, 28100 Pori',
    phone: '045 783 773 37',
    phoneLink: 'tel:+3584578377337',
    email: 'kauneushuonevilia@gmail.com',
    emailLink: 'mailto:kauneushuonevilia@gmail.com',
    bookingUrl: 'https://varaa.timma.fi/kauneushuonevilia',
    googleReviewUrl: '',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yrj%C3%B6nkatu+7+28100+Pori',
    facebookUrl: 'https://www.facebook.com/p/Kauneushuone-vilia-61591310347021/',
    instagramUrl: 'https://www.instagram.com/kauneushuonevilia_pori/',
  },
  navigation: {
    logo: '/assets/vilia-logo-transparent.png',
    logoDark: '/assets/vilia-logo-transparent.png',
    backgroundColor: '#33222A',
    links: [
      { label: 'ETUSIVU', href: '#' },
      { label: 'Palvelut', href: '#palvelut' },
      { label: 'Hinnasto', href: '#hinnasto' },
      { label: 'Tekijät', href: '#asiantuntijat' },
      { label: 'Yhteystiedot', href: '#yhteystiedot' },
    ],
    extraLinks: [
      { label: 'Arvostelut', href: '#arvostelut' },
      { label: 'Usein kysyttyä', href: '/usein-kysyttya' },
    ],
    ctaButton: { label: 'Varaa aika', href: 'https://varaa.timma.fi/kauneushuonevilia' },
  },
  hero: {
    eyebrow: 'KAUNEUSHUONE VILIA',
    headlineLines: ['Kauneus- ja', 'hyvinvointipalveluja', 'Porin keskustassa'],
    subheadline: 'Kasvohoitoja, hierontaa sekä käsien, jalkojen, ripsien ja kulmien hoitoja rauhallisessa ja kodikkaassa ympäristössä Porissa.',
    ctaPrimary: { label: 'Varaa aika', href: 'https://varaa.timma.fi/kauneushuonevilia' },
    ctaSecondary: { label: 'Soita nyt', href: 'tel:+3584578377337' },
    trustItems: [
      { icon: 'stars', label: 'Timma arvosteluista (37)' },
      { icon: 'experience', label: 'Yli 10 vuoden kokemus' },
    ],
  },
  intro: {
    text: 'Tervetuloa ottamaan hetki itsellesi. Olipa tavoitteenasi rentoutua, hemmotella itseäsi tai piristää ilmettäsi.',
    backgroundColor: '#33222A',
  },
  services: {
    eyebrow: 'PALVELUT',
    headline: 'Kauneus- ja hyvinvointihoitoja ammattitaidolla',
    body: 'Valitse tarpeisiisi sopiva hoito. Jokainen hoito toteutetaan rauhallisesti ja yksilöllisesti, sinua kuunnellen.',
    reassurance: 'Etkö ole varma mikä palvelu sopii sinulle? Soita 045 783 773 37 ja kysy.',
    primaryServices: [
      {
        image: '/assets/vilia-salon.jpg',
        objectPosition: 'center 30%',
        title: 'Kädet ja kynnet',
        description: 'Perusmanikyyreistä kestolakkauksiin, geelilakkauksiin ja rakennekynsiin. Huolellisesti tehdyt käsi- ja kynsihoidot pitävät kädet siisteinä ja viimeisteltyinä viikko toisensa jälkeen.',
        linkText: 'Tutustu käsi- ja kynsihoitoihin',
        linkHref: '/palvelut/kadet-ja-kynnet',
      },
      {
        image: '/assets/vilia-gallery-3.jpg',
        objectPosition: 'center 35%',
        title: 'Ripsien- ja kulmien hoidot',
        description: 'Ripsienpidennykset klassisesta volyymiin ja hybridiin, kestotaivutukset sekä kulmien laminointi, värjäys ja muotoilu. Kauniit ripset ja huolitellut kulmat viimeistelevät ilmeesi.',
        linkText: 'Tutustu ripsi- ja kulmahoitoihin',
        linkHref: '/palvelut/ripset-ja-kulmat',
      },
    ],
    secondaryLabel: 'Myös saatavilla',
    secondaryServices: [
      { image: '/assets/vilia-gallery-5.jpg', objectPosition: 'center 40%', title: 'Kasvohoidot', linkHref: '/palvelut/kasvohoidot' },
      { image: '/assets/vilia-maarit.jpg', objectPosition: 'center 40%', title: 'Hieronnat', linkHref: '/palvelut/hieronnat' },
      { image: '/assets/vilia-gallery-4.jpg', objectPosition: 'center 40%', title: 'Hoitopaketit', linkHref: '/palvelut/hoitopaketit' },
    ],
  },
  pricing: {
    eyebrow: 'HINNASTO',
    headline: 'Selkeät hinnat, ei yllätyksiä',
    body: 'Esimerkkejä hinnastosta. Koko hinnasto ja vapaat ajat löydät Timman ajanvarauksesta.',
    tabs: [
      {
        key: 'kasvohoidot',
        label: 'Kasvohoidot',
        description: 'Kirkastavat, syväkosteuttavat ja rentouttavat kasvohoidot jokaiselle ihotyypille.',
        items: [
          { duration: 'Office Face Reset', price: '28' },
          { duration: 'Vilia Cucumber Glow', price: '32' },
          { duration: 'Kirkastava kasvohoito', price: '35' },
          { duration: 'Syväkosteuttava kasvohoito', price: '40' },
          { duration: 'Collagen Luxury -kasvohoito', price: '65' },
        ],
      },
      {
        key: 'kadet-ja-kynnet',
        label: 'Kädet ja kynnet',
        description: 'Huolelliset käsi- ja kynsihoidot siisteihin ja kestäviin lopputuloksiin.',
        items: [
          { duration: 'Pikamanikyyri', price: '15' },
          { duration: 'Perusmanikyyri', price: '20' },
          { duration: 'Kestolakkaus yksivärinen', price: '23' },
          { duration: 'Geelilakkaus uudet', price: '25' },
          { duration: 'Kestolakkaus ranskalainen', price: '28' },
        ],
      },
      {
        key: 'ripset-ja-kulmat',
        label: 'Ripset ja kulmat',
        description: 'Ripsien ja kulmien värjäykset, muotoilut ja kestokäsittelyt.',
        items: [
          { duration: 'Kulmien värjäys ja muotoilu', price: '10' },
          { duration: 'Ripsien värjäys', price: '15' },
          { duration: 'Ripsien kestotaivutus', price: '40' },
          { duration: 'Ripsienpidennys volyymi', price: '50' },
          { duration: 'Ripsienpidennys hybridi', price: '55' },
        ],
      },
      {
        key: 'hoitopaketit',
        label: 'Hoitopaketit',
        description: 'Valmiit hemmottelukokonaisuudet, kun haluat antaa itsellesi hieman enemmän.',
        items: [
          { duration: 'Äiti ja lapsi hemmottelupaketti', price: '69' },
          { duration: 'Vilia Signature Spa', price: '79' },
          { duration: 'Vilia Luxury Spa', price: '99' },
          { duration: 'Hyvän olon paketti', price: '100' },
        ],
      },
    ],
  },
  reviews: {
    eyebrow: 'ASIAKASKOKEMUKSIA',
    headline: 'Mitä asiakkaamme sanovat',
    items: [
      { name: 'Päivi J', text: 'Päiväkin muuttui ja hoito syvä kosteuttavaksi. Todella ammattitaitoista ja hyvää palvelua. Suosittelen kaikille.', service: 'Timman vahvistama' },
      { name: 'Janica V', text: 'Ihana tekijä ja täydelliset ripset ❤️', service: 'Timman vahvistama' },
      { name: 'Tuuli L', text: 'Mukavaa palvelua ja kivat kynnet tuli!', service: 'Timman vahvistama' },
      { name: 'Sanna P', text: 'Ihana ja rentouttava kokemus. Naama tuntuu kuin uudelta.', service: 'Timman vahvistama' },
      { name: 'Riikka S', text: 'Ihana hemmotteluhetki. Lisänä geelilakkaus. Kevyet jalat taas.', service: 'Timman vahvistama' },
      { name: 'Aino S', text: 'Kauniit kynnet ja mukava tekijä!', service: 'Timman vahvistama' },
    ],
  },
  team: {
    eyebrow: 'TUTUSTU TEKIJÖIHIN',
    headline: 'Ammattilaiset sinua varten',
    members: [
      {
        name: 'Maarit ja Ann-Catrin',
        firstName: 'Maaritilta',
        title: 'Kauneushuone Vilian tiimi',
        role: 'Kosmetologi',
        image: '/assets/anna-ja-katja-team.jpg',
        imagePosition: 'center 30%',
        avatar: '/assets/anna-ja-katja-team.jpg',
        ctaName: 'tekijöistä',
        bio: 'Kauneushuone Vilian takana on kaksi kauneuden ja hyvinvoinnin ammattilaista, Maarit ja Ann-Catrin. Ammattitaitoinen tiimi hoitaa niin kasvot, ripset ja kulmat kuin kädet ja jalatkin, ja rentouttavat hoidot kuuluvat vahvasti palveluihin.\n\nJokainen hoito toteutetaan rauhallisesti ja yksilöllisesti, asiakkaan toiveita kuunnellen. Tavoitteena on, että jokainen käynti tuntuu lämpimältä ja huolelliselta hetkeltä arjen keskellä, ja että hoidosta saa nauttia juuri sellaisena kuin on.',
      },
    ],
  },
  location: {
    eyebrow: 'HOITOLA',
    headline: 'Hoitola Porin keskustassa',
    body: 'Kauneushuone Vilia sijaitsee Yrjönkadulla aivan Porin keskustassa. Hoitolalle on helppo saapua niin jalan, julkisilla kuin autolla.',
    image: '/assets/google-earth.png',
    address: 'Yrjönkatu 7, 28100 Pori',
    points: [
      {
        icon: 'train',
        heading: 'Keskeinen sijainti',
        text: 'Hoitola sijaitsee Porin ydinkeskustassa, kaiken keskellä.',
      },
      {
        icon: 'car',
        heading: 'Helppo saapua myös autolla',
        text: 'Keskustan pysäköintipaikat ovat lyhyen kävelymatkan päässä.',
      },
    ],
    mapLinkLabel: 'Katso sijainti kartalla',
  },
  faq: {
    eyebrow: 'ENNEN ENSIMMÄISTÄ KÄYNTIÄ',
    headline: 'Usein kysyttyä',
    items: [
      {
        question: 'Miten varaan ajan?',
        answer: 'Ajan varaat helposti netissä Timman ajanvarauksen kautta milloin tahansa. Voit myös soittaa tai laittaa viestiä numeroon 045 783 773 37.',
        includePhone: true,
      },
      {
        question: 'Mitä hoidot maksavat?',
        answer: 'Hinnasto näkyy kokonaisuudessaan Timman ajanvarauksessa. Esimerkiksi kasvohoidot alkavat 28 eurosta, ripsien värjäys 15 eurosta ja perusmanikyyri 20 eurosta.',
        includePhone: false,
      },
      {
        question: 'Mitä jos joudun perumaan aikani?',
        answer: 'Peruathan aikasi viimeistään 12 tuntia ennen varattua aikaa. Jos aikaa ei peruuteta tai asiakas ei saavu paikalle, veloitetaan varauksen hinta kokonaisuudessaan.',
        includePhone: false,
      },
      {
        question: 'Sopiiko hoitola myös miehille?',
        answer: 'Kyllä. Valikoimassa on oma miesten hoitojen kokonaisuus, jossa muun muassa head spa, miesten kasvohoito, niska-hartiahieronta ja jalkahoito.',
        includePhone: false,
      },
    ],
  },
  finalCta: {
    backgroundImage: '/assets/vilia-maarit.jpg',
    eyebrow: 'VARAA AIKA',
    headline: 'Tule käymään, ansaitset hetken itsellesi',
    supportText: 'Varaa aika helposti netissä Timman kautta',
    ctaLabel: 'Varaa aika',
    phone: '045 783 773 37',
    trustItems: [
      { icon: 'star', label: '37 arvostelua Timmassa' },
      { icon: 'clock', label: 'Ajanvaraus netissä 24/7' },
      { icon: 'calendar', label: 'Yrjönkatu 7, Porin keskusta' },
    ],
  },
  footer: {
    columns: [
      {
        title: 'Palvelut',
        links: [
          { label: 'Kasvohoidot', href: '/palvelut/kasvohoidot' },
          { label: 'Ripsien- ja kulmien hoidot', href: '/palvelut/ripset-ja-kulmat' },
          { label: 'Kädet ja kynnet', href: '/palvelut/kadet-ja-kynnet' },
          { label: 'Hieronnat', href: '/palvelut/hieronnat' },
          { label: 'Hoitopaketit', href: '/palvelut/hoitopaketit' },
        ],
      },
      {
        title: 'Yritys',
        links: [
          { label: 'Tutustu tekijöihin', href: '#asiantuntijat' },
          { label: 'Asiakkaiden kokemuksia', href: '#arvostelut' },
          { label: 'Usein kysyttyä', href: '/usein-kysyttya' },
        ],
      },
      {
        title: 'Yhteystiedot',
        links: [
          { label: '045 783 773 37', href: 'tel:+3584578377337' },
          { label: 'kauneushuonevilia@gmail.com', href: 'mailto:kauneushuonevilia@gmail.com' },
          { label: 'Varaa aika Timmassa', href: 'https://varaa.timma.fi/kauneushuonevilia' },
          { label: 'Yrjönkatu 7, 28100 Pori', href: 'https://www.google.com/maps/search/?api=1&query=Yrj%C3%B6nkatu+7+28100+Pori' },
        ],
      },
    ],
    paymentMethods: 'Ajanvaraus netissä Timman kautta',
    copyright: 'Kauneushuone Vilia. Kaikki oikeudet pidätetään.',
  },
};

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const serviceDropdownItems = [
  { label: 'Kasvohoidot', href: '/palvelut/kasvohoidot' },
  { label: 'Ripsien- ja kulmien hoidot', href: '/palvelut/ripset-ja-kulmat' },
  { label: 'Kädet ja kynnet', href: '/palvelut/kadet-ja-kynnet' },
  { label: 'Hieronnat', href: '/palvelut/hieronnat' },
  { label: 'Hoitopaketit', href: '/palvelut/hoitopaketit' },
];

export function ChiropractorTemplate() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [teamTransitioning, setTeamTransitioning] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activePricingTab, setActivePricingTab] = useState(0);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  const getRecommendation = (answers: string[]) => {
    const [, symptom] = answers;
    if (symptom === 'urheiluvamma' || answers[3] === 'palautuminen') {
      return {
        title: 'Suosittelemme klassista hierontaa',
        description: 'Klassinen hieronta rentouttaa lihaksia ja auttaa kehoa palautumaan arjen kuormituksesta.',
        serviceLink: '/palvelut/hieronnat',
        bookingUrl: 'https://varaa.timma.fi/kauneushuonevilia',
      };
    }
    return {
      title: 'Suosittelemme kasvohoitoa',
      description: 'Kasvohoidot virkistävät ihoa ja tarjoavat rauhallisen hetken itsellesi. Valikoimasta löytyy sopiva hoito jokaiseen ihontilanteeseen.',
      serviceLink: '/palvelut/kasvohoidot',
      bookingUrl: 'https://varaa.timma.fi/kauneushuonevilia',
    };
  };

  const surveyQuestions = [
    {
      question: 'Missä oireesi sijaitsee?',
      options: [
        { label: 'Niska ja hartiat', value: 'niska' },
        { label: 'Selkä', value: 'selka' },
        { label: 'Leuka ja purenta', value: 'leuka' },
        { label: 'Käsi tai olkapää', value: 'kasi' },
        { label: 'Jalka tai lonkka', value: 'jalka' },
        { label: 'Useampi alue', value: 'useampi' },
      ],
    },
    {
      question: 'Mikä kuvaa tilannettasi parhaiten?',
      options: [
        { label: 'Lihaskireys', value: 'kireys' },
        { label: 'Kipu liikkuessa', value: 'kipu' },
        { label: 'Päänsärky tai migreeni', value: 'paansarky' },
        { label: 'Puutuminen tai säteilyoire', value: 'puutuminen' },
        { label: 'Urheiluvamma', value: 'urheiluvamma' },
        { label: 'Palautuminen harjoittelusta', value: 'palautuminen' },
      ],
    },
    {
      question: 'Kuinka kauan oire on jatkunut?',
      options: [
        { label: 'Alle viikon', value: 'viikko' },
        { label: '1–4 viikkoa', value: '4vko' },
        { label: '1–6 kuukautta', value: '6kk' },
        { label: 'Yli 6 kuukautta', value: 'yli6kk' },
        { label: 'Toistuu säännöllisesti', value: 'toistuu' },
      ],
    },
    {
      question: 'Mitä toivot hoidolta eniten?',
      options: [
        { label: 'Kivun lievitystä', value: 'kivunlievitys' },
        { label: 'Parempaa liikkuvuutta', value: 'liikkuvuus' },
        { label: 'Lihaskireyden helpotusta', value: 'kireydenhelpotus' },
        { label: 'Nopeampaa palautumista', value: 'palautuminen' },
        { label: 'Selvyyttä oireen syyhyn', value: 'selvyys' },
      ],
    },
  ];

  const handleTeamSelect = useCallback((index: number) => {
    if (index === activeTeamIndex || teamTransitioning) return;
    setTeamTransitioning(true);
    setTimeout(() => {
      setActiveTeamIndex(index);
      setTeamTransitioning(false);
    }, 350);
  }, [activeTeamIndex, teamTransitioning]);

  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const prevReview = () => setReviewIndex((i) => (i === 0 ? templateData.reviews.items.length - 1 : i - 1));
  const nextReview = () => setReviewIndex((i) => (i === templateData.reviews.items.length - 1 ? 0 : i + 1));

  const activeTeamMember = templateData.team.members[activeTeamIndex];
  const visibleReviews = [
    templateData.reviews.items[reviewIndex % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 1) % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 2) % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 3) % templateData.reviews.items.length],
  ];

  return (
    <div className="min-h-[100dvh] font-inter antialiased">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: headerScrolled ? 'rgba(51,34,42,0.82)' : 'transparent',
          backdropFilter: headerScrolled ? 'blur(13px)' : 'none',
          WebkitBackdropFilter: headerScrolled ? 'blur(13px)' : 'none',
          borderBottom: headerScrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          transition: 'background 400ms ease, backdrop-filter 400ms ease, -webkit-backdrop-filter 400ms ease, border-color 400ms ease',
        }}
      >
        <div className="max-w-[1160px] mx-auto px-5 md:px-10 h-[60px] md:h-[68px] flex items-center justify-between">
          <Link to="/" className="relative z-10 flex-shrink-0 mr-8 w-[72px] md:w-[88px] self-stretch">
            <img
              src={templateData.navigation.logo}
              alt={templateData.business.name}
              className={`absolute left-0 top-1/2 w-auto object-contain transition-all duration-500 ease-out ${
                headerScrolled
                  ? 'h-8 md:h-9 -translate-y-1/2'
                  : 'h-14 md:h-[84px] -translate-y-[32%]'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-7">
            {/* Etusivu */}
            <a
              href="#"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F7F1F4] transition-colors duration-300"
            >
              Etusivu
            </a>

            {/* Palvelut dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F7F1F4] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Palvelut
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-[240px] bg-[#412E37] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[#F4F4F4]/[0.06] py-2 overflow-hidden"
                >
                  {serviceDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2.5 font-inter text-[13px] text-[#FFFFFF]/80 hover:text-[#F7F1F4] hover:bg-[#F4F4F4]/[0.04] transition-colors duration-200"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#F4F4F4]/[0.06] mt-1 pt-1">
                    <a
                      href="#palvelut"
                      className="block px-4 py-2.5 font-inter text-[12px] font-semibold uppercase tracking-wider text-[#F7F1F4]/80 hover:text-[#F7F1F4] transition-colors duration-200"
                      onClick={() => setServicesOpen(false)}
                    >
                      Kaikki palvelut →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Hinnasto */}
            <a
              href="#hinnasto"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F7F1F4] transition-colors duration-300"
            >
              Hinnasto
            </a>

            {/* Tekijät */}
            <a
              href="#asiantuntijat"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F7F1F4] transition-colors duration-300"
            >
              Tekijät
            </a>

            {/* Yhteystiedot */}
            <a
              href="#yhteystiedot"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F7F1F4] transition-colors duration-300"
            >
              Yhteystiedot
            </a>

            {/* Extra links */}
            {templateData.navigation.extraLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F7F1F4] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F7F1F4] transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            )}

            {/* CTA Button */}
            <a
              href={templateData.navigation.ctaButton.href}
              className="inline-flex items-center justify-center px-7 py-3 rounded-md font-inter text-[13px] font-semibold tracking-[0.06em] whitespace-nowrap text-[#FFFFFF] hover:-translate-y-0.5 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.32)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
            >
              {templateData.navigation.ctaButton.label}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden relative z-10 text-[#FFFFFF] transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-[#33222A] border-t border-[#F4F4F4]/[0.06] px-5 py-6"
          >
            <a href="#" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Etusivu</a>

            {/* Mobile services dropdown */}
            <div className="border-b border-[#F4F4F4]/[0.06]">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-3 font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 bg-transparent border-none cursor-pointer"
              >
                <span>Palvelut</span>
                <ChevronDown size={16} strokeWidth={1.5} className={`text-[#FFFFFF]/50 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pb-3 pl-3">
                  {serviceDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block py-2 font-inter text-[13px] text-[#FFFFFF]/70 hover:text-[#F7F1F4] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a href="#palvelut" onClick={() => setMobileOpen(false)} className="block py-2 font-inter text-[12px] font-semibold uppercase tracking-wider text-[#CBA3B4]/70">Kaikki palvelut →</a>
                </div>
              )}
            </div>

            <a href="#hinnasto" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Hinnasto</a>
            <a href="#asiantuntijat" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Tekijät</a>
            <a href="#yhteystiedot" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Yhteystiedot</a>

            {templateData.navigation.extraLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-inter text-[14px] text-[#FFFFFF]/60 py-3 border-b border-[#F4F4F4]/[0.06] last:border-0"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-inter text-[14px] text-[#FFFFFF]/60 py-3 border-b border-[#F4F4F4]/[0.06] last:border-0"
                >
                  {link.label}
                </a>
              )
            )}

            <div className="mt-4 pt-4 border-t border-[#F4F4F4]/[0.06]">
              <a
                href={templateData.navigation.ctaButton.href}
                className="inline-flex items-center justify-center w-full px-5 py-3.5 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] bg-[#33222A] text-white hover:bg-[#7A5C6A] transition-colors duration-300"
              >
                {templateData.navigation.ctaButton.label}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(180deg, #FBF7F9 0%, #F7F1F4 55%, #F3E7EE 100%)' }}>
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/hero-photo.jpg)', backgroundPosition: 'center 25%', transform: 'scaleX(-1)' }}
        />
        <div className="absolute inset-0 bg-[#33222A]/25 md:bg-[#33222A]/0" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(51,34,42,0.78) 0%, rgba(51,34,42,0.52) 45%, rgba(51,34,42,0.22) 100%), radial-gradient(ellipse at 20% 85%, rgba(233,143,188,0.18) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6 md:px-10 flex flex-col items-start text-left pt-[60px]">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-inter text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.18em] text-[#CBA3B4] mb-4"
          >
            {templateData.hero.eyebrow}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-cormorant font-bold text-[29px] md:text-[38px] lg:text-[44px] text-[#FFFFFF] leading-[1.15] mb-5 max-w-[640px]"
          >
            {templateData.hero.headlineLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-[13px] md:text-[14px] text-[#F7F1F4]/75 leading-[1.7] mb-8 max-w-[480px]"
          >
            {templateData.hero.subheadline}
          </motion.p>

          {/* CTA pair */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 w-full max-w-[340px] sm:max-w-none sm:w-auto"
          >
            <a
              href={templateData.hero.ctaPrimary.href}
              className="inline-flex items-center justify-center px-9 py-[15px] rounded-md font-inter text-[13px] font-semibold tracking-[0.08em] text-[#FFFFFF] hover:-translate-y-1 transition-all duration-300"
              style={{
                background: 'rgba(46,31,38,0.62)',
                border: '1px solid rgba(255,255,255,0.30)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 18px rgba(51,34,42,0.16)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(46,31,38,0.78)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(46,31,38,0.62)'; }}
            >
              {templateData.hero.ctaPrimary.label}
            </a>
            <a
              href={templateData.hero.ctaSecondary.href}
              className="inline-flex items-center justify-center px-9 py-[15px] rounded-md font-inter text-[13px] font-semibold tracking-[0.06em] text-[#FFFFFF]/85 border border-[#FFFFFF]/30 hover:border-[#FFFFFF]/55 hover:text-[#FFFFFF] transition-all duration-300"
            >
              {templateData.hero.ctaSecondary.label}
            </a>
          </motion.div>

          {/* Minimal trust elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            {templateData.hero.trustItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2 font-inter text-[13px] font-medium text-[#FFFFFF]/90 tracking-[0.02em]">
                {i > 0 && <span className="text-[#CBA3B4]/70 mr-2.5">&bull;</span>}
                {item.icon === 'stars' && (
                  <span className="flex items-center gap-[2px]">
                    {[0, 1, 2, 3].map((s) => (
                      <Star key={s} size={13} strokeWidth={0} fill="#E4B95B" style={{ color: '#E4B95B' }} />
                    ))}
                    <span className="relative inline-block" style={{ width: 13, height: 13 }}>
                      <Star size={13} strokeWidth={1.5} fill="none" className="absolute inset-0 text-[#E4B95B]/50" />
                      <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                        <Star size={13} strokeWidth={0} fill="#E4B95B" style={{ color: '#E4B95B' }} />
                      </span>
                    </span>
                  </span>
                )}
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Welcome / brand intro */}
      <section className="bg-[#F3E7EE] px-6 md:px-10 py-[88px] md:py-[130px]">
        <div className="max-w-[1160px] mx-auto px-0 md:px-[56px] grid grid-cols-1 md:grid-cols-[44%_40%] gap-10 md:gap-0 md:justify-between items-start">
          <ScrollReveal>
            <div>
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A]/70 mb-7">Tervetuloa Kauneushuone Viliaan</p>
              <h2 className="font-cormorant font-bold text-[30px] md:text-[39px] text-[#33222A] leading-[1.18] max-w-[460px]">Hetki rentoutumiselle, hemmottelulle ja omalle hyvinvoinnille.</h2>
              <div className="mt-10 md:mt-12 flex items-center gap-2.5 md:gap-4">
                <div className="inline-flex shrink-0 items-center bg-[#FFFFFF] border border-[#33222A]/[0.08] rounded-md px-3 py-2 md:px-4 md:py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <img src={templateData.navigation.logo} alt="Kauneushuone Vilia" className="block h-8 md:h-9 w-auto" />
                </div>
                <div
                  className="inline-flex items-center gap-2 md:gap-3 rounded-md px-3.5 py-2.5 md:px-5 md:py-3 min-w-0"
                  style={{
                    background: 'rgba(51,34,42,0.88)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 14px rgba(0,0,0,0.10)',
                  }}
                >
                  <Star size={13} strokeWidth={0} fill="#E4B95B" className="shrink-0" style={{ color: '#E4B95B' }} />
                  <span className="font-inter text-[12px] md:text-[13px] font-semibold text-[#FFFFFF] whitespace-nowrap">37 arvostelua Timmassa</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="md:pt-36 max-w-[380px]">
              <div className="w-10 border-t border-[#33222A]/[0.18] mb-6 md:mb-7" />
              <p className="font-inter text-[16px] md:text-[16.5px] text-[#7A5C6A] leading-[1.75] md:leading-[1.8]">Kauneushuone Vilia tarjoaa kauneus- ja hyvinvointipalveluita rauhallisessa ja kodikkaassa ympäristössä Porin keskustassa. Kasvohoidot, hieronnat sekä käsien, jalkojen, ripsien ja kulmien hoidot toteutetaan yksilöllisesti ja huolellisesti. Lämpimästi tervetuloa rentoutumaan ja kaunistautumaan.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section id="palvelut" className="bg-[#FFFFFF] pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-18">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A] mb-5">{templateData.services.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#33222A] leading-[1.35] mb-6">{templateData.services.headline}</h2>
              <p className="font-inter text-[14px] text-[#33222A] leading-[1.75] max-w-[440px] mx-auto">{templateData.services.body}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {templateData.services.primaryServices.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <Link to={service.linkHref} className="group block rounded-[12px] overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]" style={{ background: 'rgba(247,241,244,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(51,34,42,0.12)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>
                  <div className="relative overflow-hidden">
                    <img src={service.image} alt={service.title} loading="lazy" style={{ objectPosition: service.objectPosition }} className="w-full aspect-[16/10.5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(122,92,106,0.018) 0%, transparent 40%, rgba(233,143,188,0.12) 100%)', mixBlendMode: 'multiply' }} />
                  </div>
                  <div className="px-8 pt-7 pb-9 md:px-10 md:pt-8 md:pb-10">
                    <h3 className="font-cormorant font-bold text-[26px] md:text-[28px] text-[#33222A] mb-4">{service.title}</h3>
                    <p className="font-inter text-[14px] text-[#7A5C6A] leading-[1.75] mb-8 max-w-[340px]">{service.description}</p>
                    <span className="inline-flex items-center gap-1.5 font-inter text-[13px] text-[#33222A]/45 group-hover:text-[#7A5C6A] transition-colors duration-300">
                      {service.linkText}
                      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-18 md:mt-22 pt-12 border-t border-[#33222A]/[0.04]">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A]/70 text-center mb-10">{templateData.services.secondaryLabel}</p>
              <div className="grid grid-cols-3 gap-4 md:gap-5">
                {templateData.services.secondaryServices.map((service, i) => (
                  <Link key={i} to={service.linkHref} className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]" style={{ border: '1px solid rgba(51,34,42,0.12)' }}>
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img src={service.image} alt={service.title} loading="lazy" style={{ objectPosition: service.objectPosition }} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(43,43,43,0.3) 100%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <p className="font-cormorant font-bold text-[15px] md:text-[17px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">{service.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Symptom Survey — hidden for now */}
              {false && (
              <div className="mt-14 md:mt-18 max-w-[520px] mx-auto">
                {surveyStep === 0 ? (
                  /* Intro view */
                  <div className="text-center">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A] mb-4">ETKÖ OLE VARMA?</p>
                    <h3 className="font-cormorant text-[22px] md:text-[26px] text-[#33222A] leading-[1.35] mb-3">Selvitä mikä hoito sopii tilanteeseesi</h3>
                    <p className="font-inter text-[14px] text-[#7A5C6A] leading-[1.7] mb-6">Vastaa muutamaan kysymykseen ja saat suosituksen oireidesi perusteella.</p>
                    <button
                      onClick={() => { setSurveyStep(1); setSurveyAnswers([]); }}
                      className="inline-flex items-center justify-center px-10 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] bg-[#33222A] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:bg-[#7A5C6A] transition-all duration-300 cursor-pointer"
                    >
                      Aloita oirekysely
                    </button>
                    <p className="font-inter text-[12px] text-[#7A5C6A]/50 mt-3">Kestää noin 30 sekuntia</p>
                  </div>
                ) : surveyStep <= 4 ? (
                  /* Question views */
                  <div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mb-8">
                      <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A5C6A]">Vaihe {surveyStep} / 4</span>
                      <div className="flex-1 h-[2px] bg-[#33222A]/[0.08] rounded-full overflow-hidden">
                        <div className="h-full bg-[#33222A] rounded-full transition-all duration-500" style={{ width: `${(surveyStep / 4) * 100}%` }} />
                      </div>
                    </div>
                    {/* Question */}
                    <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#33222A] leading-[1.35] mb-6">{surveyQuestions[surveyStep - 1].question}</h3>
                    {/* Options grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {surveyQuestions[surveyStep - 1].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            const newAnswers = [...surveyAnswers];
                            newAnswers[surveyStep - 1] = opt.value;
                            setSurveyAnswers(newAnswers);
                            if (surveyStep < 4) {
                              setSurveyStep(surveyStep + 1);
                            } else {
                              setSurveyStep(5);
                            }
                          }}
                          className="text-left px-5 py-4 rounded-xl bg-white/[0.5] border border-[#CBA3B4]/60 hover:bg-white hover:border-[#33222A]/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer"
                        >
                          <span className="font-inter text-[14px] text-[#33222A]">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                    {/* Back button */}
                    {surveyStep > 1 && (
                      <button
                        onClick={() => { setSurveyStep(surveyStep - 1); }}
                        className="font-inter text-[13px] text-[#7A5C6A] hover:text-[#33222A] transition-colors cursor-pointer"
                      >
                        ← Takaisin
                      </button>
                    )}
                  </div>
                ) : (
                  /* Result view */
                  (() => {
                    const rec = getRecommendation(surveyAnswers);
                    return (
                      <div className="text-center">
                        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A] mb-4">SUOSITUKSEMME</p>
                        <h3 className="font-cormorant text-[24px] md:text-[28px] text-[#33222A] leading-[1.3] mb-4">{rec.title}</h3>
                        <p className="font-inter text-[14px] text-[#7A5C6A] leading-[1.75] mb-8">{rec.description}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                          <a
                            href={rec.bookingUrl}
                            className="inline-flex items-center justify-center px-10 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] bg-[#33222A] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:bg-[#7A5C6A] transition-all duration-300"
                          >
                            Varaa aika
                          </a>
                          <Link
                            to={rec.serviceLink}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-md font-inter text-[14px] font-medium tracking-wide text-[#33222A] border border-[#33222A]/20 hover:border-[#33222A]/40 hover:bg-[#33222A]/[0.04] transition-all duration-300"
                          >
                            Tutustu hoitomuotoon
                          </Link>
                        </div>
                        <button
                          onClick={() => { setSurveyStep(0); setSurveyAnswers([]); }}
                          className="font-inter text-[13px] text-[#7A5C6A] hover:text-[#33222A] transition-colors mt-6 cursor-pointer"
                        >
                          Tee kysely uudelleen
                        </button>
                      </div>
                    );
                  })()
                )}
              </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="hinnasto" className="bg-[#F7F1F4] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-10">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A] mb-5">{templateData.pricing.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[30px] text-[#33222A] leading-[1.35] mb-4">{templateData.pricing.headline}</h2>
              <p className="font-inter text-[14px] text-[#33222A]/80 leading-[1.75] max-w-[400px] mx-auto">{templateData.pricing.body}</p>
            </div>
          </ScrollReveal>

          {/* Tab selector */}
          <ScrollReveal delay={0.1}>
            <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {templateData.pricing.tabs.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActivePricingTab(i)}
                  className={`shrink-0 px-4 py-2.5 rounded-lg font-inter text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer border ${
                    i === activePricingTab
                      ? 'bg-[#33222A] text-white border-[#33222A] shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                      : 'bg-transparent text-[#33222A] border-[#CBA3B4] hover:bg-[#33222A]/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active tab content */}
          <ScrollReveal delay={0.15}>
            <div className="mb-8">
              <p className="font-inter text-[13px] text-[#7A5C6A] mb-4">{templateData.pricing.tabs[activePricingTab].description}</p>
              <div className="border-t border-[#33222A]/[0.1]">
                {templateData.pricing.tabs[activePricingTab].items.map((item, ii) => (
                  <div
                    key={ii}
                    className={`flex justify-between items-baseline py-4 ${
                      ii < templateData.pricing.tabs[activePricingTab].items.length - 1 ? 'border-b border-[#33222A]/[0.08]' : ''
                    }`}
                  >
                    <span className="font-inter text-[15px] font-medium text-[#33222A]">{item.duration}</span>
                    <span className="flex items-baseline gap-1">
                      <span className="font-cormorant text-[22px] text-[#33222A]">{item.price}</span>
                      <span className="font-inter text-[13px] text-[#7A5C6A]/60">&euro;</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={templateData.business.bookingUrl}
                className="inline-flex items-center justify-center px-10 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] text-[#FFFFFF] hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'rgba(94,64,78,0.86)',
                  border: '1px solid rgba(51,34,42,0.45)',
                  backdropFilter: 'blur(16px) saturate(1.1)',
                  WebkitBackdropFilter: 'blur(16px) saturate(1.1)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.24), 0 0 0 1px rgba(255,255,255,0.06), 0 6px 18px rgba(0,0,0,0.10)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(80,54,67,0.92)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(94,64,78,0.86)'; }}
              >
                Varaa aika
              </a>
              <a
                href={templateData.business.phoneLink}
                className="inline-flex items-center justify-center px-8 py-4 rounded-md font-inter text-[14px] font-medium tracking-wide text-[#33222A] border border-[#33222A]/20 hover:border-[#33222A]/40 hover:bg-[#33222A]/[0.04] transition-all duration-300"
              >
                Kysy sopiva hoito
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews */}
      <section id="arvostelut" className="bg-[#33222A] pt-20 md:pt-28 pb-14 md:pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(233,143,188,0.08) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.02 }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-8">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#CBA3B4]/70 mb-4">{templateData.reviews.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#FFFFFF] leading-[1.35] mb-3">{templateData.reviews.headline}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="text-center mb-8 md:mb-10">
              <div className="flex items-center justify-center gap-2.5">
                <Star size={15} strokeWidth={1.5} className="text-[#E4B95B]" />
                <span className="font-inter text-[13px] md:text-[14px] font-semibold text-[#FFFFFF]/90">37 asiakasarviota Timmassa</span>
                <span className="font-inter text-[13px] md:text-[14px] text-[#CBA3B4]/50">&bull;</span>
                <span className="font-inter text-[13px] md:text-[14px] text-[#C9A0B1]/70">Timman vahvistamia arvosteluja</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative">
              <div className="flex justify-center gap-5 md:gap-6 pb-4">
                {visibleReviews.slice(0, 3).map((review, i) => (
                  <div key={`${reviewIndex}-${i}`} className="flex-shrink-0 w-[280px] md:w-[310px]">
                    <div className="rounded-xl p-8 md:p-10 h-full flex flex-col border border-[#FFFFFF]/[0.20]" style={{ background: 'rgba(46,31,38,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                      <p className="font-inter text-[14px] text-[#FFFFFF]/90 leading-[1.75] italic flex-1">&ldquo;{review.text}&rdquo;</p>
                      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#FFFFFF]/[0.06]">
                        <div className="w-10 h-10 rounded-full bg-[#45333C] border border-[#FFFFFF]/[0.06] flex items-center justify-center">
                          <span className="font-cormorant text-[15px] text-[#FFFFFF]/60">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-inter text-[14px] font-semibold text-[#FFFFFF]">{review.name}</p>
                          <p className="font-inter text-[11px] text-[#F7F1F4]/50">{review.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={prevReview} aria-label="Edelliset arvostelut" className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#F4F4F4]/10 items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button onClick={nextReview} aria-label="Seuraavat arvostelut" className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#F4F4F4]/10 items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
              <div className="flex md:hidden justify-center gap-3 mt-6">
                <button onClick={prevReview} aria-label="Edelliset arvostelut" className="w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button onClick={nextReview} aria-label="Seuraavat arvostelut" className="w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex justify-center mt-8 md:mt-10">
                <a href="https://timma.fi/yritys/kauneushuone-vilia/ratings?numberOfRatings=37" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-[#F4F4F4]/15 px-6 py-2.5 font-inter text-[13px] font-medium text-[#F7F1F4]/80 hover:text-[#FFFFFF] hover:border-[#F4F4F4]/30 transition-colors">
                  Katso kaikki arvostelut
                  <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section id="asiantuntijat" className="relative bg-[#33222A] pt-20 md:pt-28 pb-8 md:pb-10 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(233,143,188,0.08) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="relative max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F1F4]/70 mb-5">{templateData.team.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#FFFFFF] leading-[1.2]">{templateData.team.headline}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-8 md:gap-14 items-start">
            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <div className="relative overflow-hidden rounded-lg mx-auto md:mx-0 max-w-[320px] md:max-w-none">
                <img src={activeTeamMember.image} alt={activeTeamMember.name} loading="lazy" style={{ objectPosition: activeTeamMember.imagePosition }} className="w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(43,43,43,0.45) 100%)' }} />
              </div>
            </div>

            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <p className="font-cormorant font-bold text-[22px] md:text-[24px] text-[#FFFFFF] mb-2">{activeTeamMember.name}</p>
              <p className="font-inter text-[12px] font-medium text-[#F7F1F4]/60 tracking-[0.12em] uppercase mb-8">{activeTeamMember.title}</p>
              <div className="font-inter text-[14px] text-[#F7F1F4]/85 leading-[1.8] mb-7 max-w-[420px] space-y-4">
                {activeTeamMember.bio.split('\n\n').map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </div>

              {/* Profile selector (only when multiple experts) */}
              {templateData.team.members.length > 1 && (
              <div className="flex gap-7 md:gap-8">
                {templateData.team.members.map((t, i) => (
                  <button key={i} onClick={() => handleTeamSelect(i)} className="group flex flex-col items-center text-center cursor-pointer bg-transparent border-none p-0">
                    <div className={`rounded-full overflow-hidden mb-2 transition-all duration-300 ${i === activeTeamIndex ? 'w-12 h-12 md:w-14 md:h-14 border-2 border-[#CBA3B4] opacity-100 scale-105' : 'w-10 h-10 md:w-11 md:h-11 border border-[#7A5C6A]/20 opacity-60 group-hover:opacity-85 scale-100'}`}>
                      <img src={t.avatar} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <p className={`font-inter text-[11px] mb-px transition-colors duration-300 ${i === activeTeamIndex ? 'text-[#FFFFFF]/80' : 'text-[#FFFFFF]/25 group-hover:text-[#FFFFFF]/50'}`}>{t.name.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
              )}

              <a href="#asiantuntijat" className="group inline-flex items-center gap-2 mt-6 font-inter text-[13px] font-medium text-[#F7F1F4]/75 hover:text-[#FFFFFF] transition-colors">
                <span className="underline underline-offset-4 decoration-[#F7F1F4]/25 group-hover:decoration-[#F7F1F4]/70 transition-colors">Lue lisää {activeTeamMember.ctaName}</span>
                <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vastaanotto */}
      <section className="bg-[#F7F1F4] pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_55%] gap-10 md:gap-14 items-center">
            {/* Location content */}
            <ScrollReveal delay={0.1}>
              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A] mb-4">{templateData.location.eyebrow}</p>
                <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#33222A] leading-[1.2] mb-4">{templateData.location.headline}</h2>
                <p className="font-inter text-[14px] md:text-[15px] text-[#7A5C6A] leading-[1.7] mb-6 max-w-[420px]">{templateData.location.body}</p>

                <div>
                  {templateData.location.points.map((point, i) => (
                    <div key={i} className={`flex items-start gap-4 py-3 ${i > 0 ? 'border-t border-[#33222A]/[0.06]' : ''}`}>
                      <span className="shrink-0 mt-[2px] text-[#33222A]/60">
                        {point.icon === 'train' && <Train size={17} strokeWidth={1.5} />}
                        {point.icon === 'car' && <Car size={17} strokeWidth={1.5} />}
                      </span>
                      <div>
                        <p className="font-inter text-[14px] font-semibold text-[#33222A] leading-[1.4] mb-1">{point.heading}</p>
                        <p className="font-inter text-[13px] text-[#7A5C6A] leading-[1.6]">{point.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {templateData.business.googleMapsUrl && (
                  <a
                    href={templateData.business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 font-inter text-[13px] font-medium text-[#33222A]/70 tracking-[0.04em] no-underline hover:text-[#33222A] hover:underline underline-offset-4 decoration-[#33222A]/20 transition-colors duration-300"
                  >
                    {templateData.location.mapLinkLabel}
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </ScrollReveal>

            {/* Exterior image with address overlay */}
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-lg border border-[#33222A]/[0.08]">
                <img
                  src={templateData.location.image}
                  alt="Kauneushuone Vilian sijainti Porin keskustassa kartalla"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg px-4 py-2.5 border border-[#FFFFFF]/15" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                  <MapPin size={14} strokeWidth={1.5} className="text-[#FFFFFF]/80 shrink-0" />
                  <span className="font-inter text-[12px] md:text-[13px] font-medium tracking-[0.04em] text-[#FFFFFF]/90 whitespace-nowrap">{templateData.location.address}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#EFDFE8] pt-16 md:pt-20 pb-6 md:pb-8 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A5C6A]/70 mb-5">{templateData.faq.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#33222A] leading-[1.25]">{templateData.faq.headline}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12 md:mb-14">
              {templateData.faq.items.map((faq, i) => (
                <div key={i} className="border-t border-[#33222A]/[0.06]">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="group w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left bg-transparent border-none cursor-pointer">
                    <span className="font-inter text-[15px] md:text-[16px] font-semibold text-[#33222A] leading-[1.5]">{faq.question}</span>
                    <span className="shrink-0 mt-[2px] text-[#7A5C6A]/50 group-hover:text-[#7A5C6A]/70 transition-colors duration-300">
                      {openFaqIndex === i ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-[400ms] ease-out" style={{ maxHeight: openFaqIndex === i ? '220px' : '0px', opacity: openFaqIndex === i ? 1 : 0 }}>
                    <div className="font-inter text-[14px] text-[#7A5C6A] leading-[1.75] pb-5 md:pb-6 max-w-[540px]">
                      {faq.answer}
                      {faq.includePhone && (
                        <a href={templateData.business.phoneLink} className="block mt-3 font-inter text-[14px] text-[#33222A]/70 tracking-wider no-underline hover:text-[#33222A] hover:underline underline-offset-4 decoration-[#6B4F5C]/20 transition-colors duration-300">
                          📞 {templateData.business.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#33222A]/[0.06]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.finalCta.backgroundImage})` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 48%, rgba(40,27,34,0.38) 0%, rgba(40,27,34,0.68) 55%, rgba(40,27,34,0.92) 100%), linear-gradient(180deg, rgba(40,27,34,0.72) 0%, rgba(40,27,34,0.15) 35%, rgba(40,27,34,0.32) 65%, rgba(40,27,34,0.88) 100%)' }} />
        <div className="relative z-10 w-full max-w-[480px] mx-auto px-6 pt-[2vh]">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A0B1] mb-4">{templateData.finalCta.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{templateData.finalCta.headline}</h2>
              <p className="font-inter text-[15px] text-[#EDD9E3] leading-[1.6] mb-10 max-w-[340px] mx-auto">{templateData.finalCta.supportText}</p>

              <div className="flex flex-col items-center gap-3 mb-8">
                <a href={templateData.business.bookingUrl} className="inline-flex items-center justify-center px-14 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] text-[#FFFFFF] hover:-translate-y-0.5 transition-all duration-300 w-full max-w-[280px]"
                  style={{
                    background: 'rgba(46,31,38,0.55)',
                    border: '1px solid rgba(255,255,255,0.30)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(46,31,38,0.72)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(46,31,38,0.55)'; }}
                >
                  {templateData.finalCta.ctaLabel}
                </a>
                <a href={templateData.business.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-[#EDD9E3] tracking-wide no-underline hover:text-[#FFFFFF] transition-colors duration-300 py-2">
                  <Phone size={15} strokeWidth={1.5} />
                  {templateData.finalCta.phone}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="font-inter text-[12px] text-[#E8D3DD] tracking-wide">★ 37 arvostelua Timmassa &bull; Yrjönkatu 7 &bull; Pori</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="yhteystiedot" className="bg-[#33222A] pt-14 md:pt-16 pb-10 md:pb-12 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10">
            <div>
              <h3 className="font-cormorant text-[18px] text-[#FFFFFF] mb-1">{templateData.business.name}</h3>
              <p className="font-inter text-[13px] text-[#B08CA0]/80 mb-4">{templateData.business.tagline}</p>
              <ul className="space-y-2">
                <li className="font-inter text-[14px] text-[#B08CA0] flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" /> {templateData.business.address}
                </li>
                <li>
                  <a href={templateData.business.phoneLink} className="font-inter text-[14px] text-[#B08CA0] hover:text-[#FFFFFF] transition-colors flex items-center gap-2 no-underline">
                    <Phone size={14} className="shrink-0" /> {templateData.business.phone}
                  </a>
                </li>
                <li>
                  <a href={templateData.business.emailLink} className="font-inter text-[14px] text-[#B08CA0] hover:text-[#FFFFFF] transition-colors flex items-center gap-2 no-underline">
                    <Mail size={14} className="shrink-0" /> {templateData.business.email}
                  </a>
                </li>
              </ul>
            </div>
            {templateData.footer.columns.map((col, i) => (
              <div key={i}>
                <h4 className="font-inter text-[13px] font-semibold uppercase tracking-wider text-[#FFFFFF] mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="font-inter text-[14px] text-[#B08CA0] hover:text-[#FFFFFF] transition-colors no-underline">{link.label}</Link>
                      ) : (
                        <a href={link.href} className="font-inter text-[14px] text-[#B08CA0] hover:text-[#FFFFFF] transition-colors no-underline">{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#F4F4F4]/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-inter text-[12px] text-[#A18193]/70">{templateData.footer.copyright}</p>
            <p className="font-inter text-[12px] text-[#A18193]/60">{templateData.footer.paymentMethods}</p>
            <div className="flex gap-4">
              <a href={templateData.business.instagramUrl} className="text-[#A18193]/70 hover:text-[#FFFFFF]/80 transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.facebookUrl} className="text-[#A18193]/70 hover:text-[#FFFFFF]/80 transition-colors"><Facebook size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.phoneLink} className="text-[#A18193]/70 hover:text-[#FFFFFF]/80 transition-colors"><Phone size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
