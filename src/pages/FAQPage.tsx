import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowLeft } from 'lucide-react';

const faqs = [
  {
    question: 'Miten varaan ajan?',
    answer: 'Ajan varaat helposti netissä Timman ajanvarauksen kautta milloin tahansa. Voit myös soittaa tai laittaa viestiä numeroon 045 783 773 37.',
  },
  {
    question: 'Missä hoitola sijaitsee?',
    answer: 'Kauneushuone Vilia sijaitsee Porin keskustassa osoitteessa Yrjönkatu 7, 28100 Pori.',
  },
  {
    question: 'Mitä palveluita teillä on?',
    answer: 'Palveluihin kuuluvat kasvohoidot, hieronnat, käsi- ja jalkahoidot, ripsien ja kulmien hoidot sekä hemmotteluun sopivat hoitopaketit. Valikoimassa on myös miesten hoidot.',
  },
  {
    question: 'Mitä hoidot maksavat?',
    answer: 'Koko hinnasto näkyy Timman ajanvarauksessa. Esimerkiksi kasvohoidot alkavat 28 eurosta, klassinen hieronta 35 eurosta, ripsien värjäys 15 eurosta ja jalkahoito 45 eurosta.',
  },
  {
    question: 'Mitä jos joudun perumaan aikani?',
    answer: 'Peruathan aikasi viimeistään 12 tuntia ennen varattua aikaa. Jos asiakas ei saavu paikalle tai peruuttaa ajan alle 12 tuntia ennen varattua aikaa, veloitetaan varauksen hinta kokonaisuudessaan.',
  },
  {
    question: 'Sopiiko hoitola myös miehille?',
    answer: 'Kyllä. Valikoimassa on oma miesten hoitojen kokonaisuus, jossa muun muassa head spa, miesten kasvohoito, niska-hartia-alueen hieronta ja jalkahoito.',
  },
  {
    question: 'Onko teillä hoitopaketteja?',
    answer: 'Kyllä. Valikoimassa on muun muassa Vilia Signature Spa (head spa ja kasvohoito, 79 €), Vilia Luxury Spa (head spa, kasvohoito ja kuumakivihieronta, 99 €) sekä hyvän olon paketti (100 €). Paketit sopivat hyvin myös lahjaksi.',
  },
  {
    question: 'Miten ripsipidennysten huolto toimii?',
    answer: 'Volyymi-, hybridi- ja megavolyymipidennyksille on saatavilla huollot ja pikahuollot. Suositeltava huoltoväli riippuu omien ripsiesi kasvusta, yleensä noin 2-4 viikkoa.',
  },
  {
    question: 'Voiko hoidon varata samalle päivälle?',
    answer: 'Jos vapaita aikoja on, onnistuu myös saman päivän varaus. Näet ajantasaiset vapaat ajat suoraan Timman ajanvarauksesta.',
  },
  {
    question: 'Miten maksu tapahtuu?',
    answer: 'Voit maksaa hoidon varauksen yhteydessä Timmassa tai paikan päällä hoidon jälkeen.',
  },
];

export function FAQPage() {
  return (
    <div className="bg-white min-h-[100dvh]">
      <div className="h-[60px] md:h-[68px]" />

      <section className="pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#7A5C6A] hover:text-[#33222A] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              Takaisin etusivulle
            </Link>
            <p className="font-inter text-[10px] font-medium uppercase tracking-[4px] text-[#33222A]/60 mb-5">
              USEIN KYSYTTYÄ
            </p>
            <h1 className="font-cormorant text-[26px] md:text-[32px] text-[#33222A] leading-[1.25] mb-5">
              Vastauksia yleisimpiin kysymyksiin
            </h1>
            <p className="font-inter text-[14px] text-[#33222A] leading-[1.7] mb-12 max-w-[440px]">
              Jos et löydä vastausta kysymykseesi, soita 045 783 773 37 tai varaa aika suoraan netissä.
            </p>
          </ScrollReveal>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border-t border-[#3A2830]/[0.06] py-6">
                  <h3 className="font-inter text-[16px] font-medium text-[#33222A] leading-[1.5] mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-inter text-[14px] text-[#7A5C6A] leading-[1.7]">
                    {faq.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-[#3A2830]/[0.06]" />
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="font-inter text-[14px] text-[#33222A] mb-5">
                Etkö löytänyt vastausta?
              </p>
              <a
                href="tel:+3584578377337"
                className="inline-flex items-center justify-center px-10 py-[14px] rounded font-inter text-[14px] font-semibold bg-[#33222A] text-white hover:bg-[#7A5C6A] transition-colors duration-300"
              >
                Soita 045 783 773 37
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
