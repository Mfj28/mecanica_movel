import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BookingScheduler from '@/components/BookingScheduler';
import { Wrench, Battery, Zap, MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';

/**
 * Design System: Industrial Moderno com Toque Tecnológico
 * - Tipografia: Space Mono (títulos), Roboto (corpo)
 * - Cores: Azul elétrico (#55 0.25 264), Laranja-queimado (#65 0.18 30), Cinza profundo
 * - Layout: Assimétrico com blocos dinâmicos
 * - Animações: Transições suaves, efeitos de hover
 */

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'hybrid',
      icon: Battery,
      title: 'CARROS HÍBRIDOS',
      description: 'Diagnóstico e manutenção especializada em sistemas de bateria, motor elétrico e gestão de energia.',
      features: ['Diagnóstico de bateria', 'Manutenção de motor elétrico', 'Reparo de inversor', 'Calibração de sistemas'],
    },
    {
      id: 'conventional',
      icon: Wrench,
      title: 'CARROS CONVENCIONAIS',
      description: 'Serviços completos de manutenção preventiva e reparo de motores a combustão.',
      features: ['Troca de óleo e filtros', 'Reparo de motor', 'Transmissão', 'Sistema de freios'],
    },
    {
      id: 'mobile',
      icon: Zap,
      title: 'SERVIÇO MÓVEL',
      description: 'Atendimento em sua residência ou local de trabalho com equipamento completo.',
      features: ['Diagnóstico no local', 'Reparos emergenciais', 'Manutenção preventiva', 'Disponível 24/7'],
    },
  ];

  const stats = [
    { number: '500+', label: 'Clientes Satisfeitos' },
    { number: '5 ANOS', label: 'De Experiência' },
    { number: '24/7', label: 'Disponibilidade' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663393170235/JbsSsLrPDN4fvoyzbTqJv2/hero-banner-9uzZpFau5xMgs3np87M39g.webp"
            alt="Workshop moderno"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative z-10 py-20 md:py-32 flex flex-col justify-center min-h-[600px]">
          <div className="max-w-2xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/20 border border-accent rounded-sm">
              <p className="font-mono text-sm font-bold text-accent">EXPERTISE AUTOMOTIVA</p>
            </div>
            <h1 className="text-white font-mono font-bold text-5xl md:text-6xl mb-6 tracking-wider">
              MECÂNICA<br />
              <span className="text-accent">MÓVEL</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 font-light max-w-xl">
              Serviços especializados em carros híbridos e convencionais. Diagnóstico preciso, reparo confiável, atendimento móvel.
            </p>
            <div className="flex gap-4">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-mono font-bold px-8">
                AGENDAR AGORA
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-mono font-bold px-8">
                SAIBA MAIS
              </Button>
            </div>
          </div>
        </div>

        {/* Diagonal Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-background" style={{
          clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
        }}></div>
      </section>

      {/* Stats Section */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-mono font-bold text-4xl md:text-5xl text-primary mb-2">{stat.number}</p>
              <p className="font-mono text-sm text-muted-foreground tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-secondary/5 py-20 md:py-32">
        <div className="container">
          <div className="mb-16">
            <p className="font-mono text-sm text-accent font-bold tracking-widest mb-4">NOSSOS SERVIÇOS</p>
            <h2 className="font-mono font-bold text-4xl md:text-5xl mb-6">
              SOLUÇÕES COMPLETAS<br />
              <span className="text-primary">PARA SEU VEÍCULO</span>
            </h2>
            <div className="w-16 h-1 bg-accent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;

              return (
                <Card
                  key={service.id}
                  className={`tech-card p-8 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedService(isSelected ? null : service.id)}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-sm flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-mono font-bold text-xl mb-3">{service.title}</h3>
                  </div>

                  <p className="text-foreground/80 mb-6 leading-relaxed">{service.description}</p>

                  {isSelected && (
                    <div className="space-y-2 pt-4 border-t border-border animate-in fade-in duration-300">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-accent" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-sm text-accent font-bold tracking-widest mb-4">SOBRE NÓS</p>
            <h2 className="font-mono font-bold text-4xl md:text-5xl mb-6">
              EXPERTISE QUE<br />
              <span className="text-primary">VOCÊ CONFIA</span>
            </h2>
            <div className="w-16 h-1 bg-accent mb-8"></div>

            <p className="text-foreground/80 mb-6 leading-relaxed">
              Com mais de 15 anos de experiência no mercado automotivo, nossa equipe especializada domina tanto os sistemas tradicionais quanto as tecnologias híbridas mais avançadas.
            </p>

            <p className="text-foreground/80 mb-8 leading-relaxed">
              Utilizamos equipamentos de diagnóstico de última geração e peças originais para garantir a qualidade e durabilidade dos nossos serviços.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-accent-foreground font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="font-mono font-bold mb-1">Certificação Profissional</p>
                  <p className="text-foreground/70 text-sm">Equipe certificada e atualizada</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-accent-foreground font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="font-mono font-bold mb-1">Garantia de Serviço</p>
                  <p className="text-foreground/70 text-sm">Todos os reparos com garantia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-accent-foreground font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="font-mono font-bold mb-1">Atendimento 24/7</p>
                  <p className="text-foreground/70 text-sm">Disponível para emergências</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663393170235/JbsSsLrPDN4fvoyzbTqJv2/hybrid-service-HfmVyvehsaKZig7FFHiyUm.webp"
              alt="Serviço híbrido"
              className="rounded-sm shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-sm -z-10"></div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 md:py-32">
        <div className="container">
          <div className="mb-16">
            <p className="font-mono text-sm text-accent font-bold tracking-widest mb-4">AGENDAMENTO ONLINE</p>
            <h2 className="font-mono font-bold text-4xl md:text-5xl mb-6">
              RESERVE SEU<br />
              <span className="text-primary">HORÁRIO AGORA</span>
            </h2>
            <div className="w-16 h-1 bg-accent"></div>
            <p className="text-foreground/80 mt-6 max-w-2xl">
              Escolha a data e horário que melhor se adequam à sua agenda. Seu agendamento será sincronizado automaticamente com nosso Google Calendar.
            </p>
          </div>

          <Card className="tech-card p-8 md:p-12 max-w-3xl">
            <BookingScheduler />
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-secondary/5 py-20 md:py-32">
        <div className="container">
          <div className="mb-16">
            <p className="font-mono text-sm text-accent font-bold tracking-widest mb-4">ENTRE EM CONTATO</p>
            <h2 className="font-mono font-bold text-4xl md:text-5xl mb-6">
              AGENDE SEU<br />
              <span className="text-primary">ATENDIMENTO</span>
            </h2>
            <div className="w-16 h-1 bg-accent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="tech-card p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold mb-2">TELEFONE</h3>
              <p className="text-foreground/80 mb-4">(11) 98765-4321</p>
              <p className="text-sm text-muted-foreground">Atendimento 24 horas</p>
            </Card>

            <Card className="tech-card p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold mb-2">EMAIL</h3>
              <p className="text-foreground/80 mb-4">contato@mecanicamovel.com.br</p>
              <p className="text-sm text-muted-foreground">Resposta em até 2 horas</p>
            </Card>

            <Card className="tech-card p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold mb-2">HORÁRIO</h3>
              <p className="text-foreground/80 mb-4">Seg-Dom: 07:00 - 22:00</p>
              <p className="text-sm text-muted-foreground">Emergências: 24/7</p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="tech-card p-8 max-w-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-sm font-bold mb-2">NOME</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block font-mono text-sm font-bold mb-2">TELEFONE</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(11) 98765-4321"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-sm font-bold mb-2">EMAIL</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block font-mono text-sm font-bold mb-2">TIPO DE VEÍCULO</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Selecione o tipo</option>
                  <option>Carro Híbrido</option>
                  <option>Carro Convencional</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-sm font-bold mb-2">MENSAGEM</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Descreva seu problema..."
                ></textarea>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-secondary font-mono font-bold py-3">
                ENVIAR SOLICITAÇÃO
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-mono font-bold">MECÂNICA MÓVEL</span>
              </div>
              <p className="text-sm text-secondary-foreground/70">
                Serviços automotivos especializados em híbridos e convencionais.
              </p>
            </div>

            <div>
              <h4 className="font-mono font-bold mb-4">SERVIÇOS</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li><a href="#services" className="hover:text-accent transition-colors">Carros Híbridos</a></li>
                <li><a href="#services" className="hover:text-accent transition-colors">Carros Convencionais</a></li>
                <li><a href="#services" className="hover:text-accent transition-colors">Serviço Móvel</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono font-bold mb-4">CONTATO</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (11) 98765-4321
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contato@mecanicamovel.com.br
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  São Paulo, SP
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono font-bold mb-4">HORÁRIO</h4>
              <p className="text-sm text-secondary-foreground/70 mb-2">
                <strong>Seg-Dom:</strong> 07:00 - 22:00
              </p>
              <p className="text-sm text-secondary-foreground/70">
                <strong>Emergências:</strong> 24/7
              </p>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 pt-8">
            <p className="text-center text-sm text-secondary-foreground/70">
              © 2026 Mecânica Móvel. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
