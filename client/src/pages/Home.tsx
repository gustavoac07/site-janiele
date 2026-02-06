import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Calendar, Leaf, Heart, Brain } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Design Philosophy: Minimalismo Botânico com Elegância Clínica
 * - Paleta: Verde Sage (#9CAF88), Branco, Bege quente (#F5F1E8)
 * - Espaçamento generoso, tipografia hierárquica
 * - Fotografia profissional como elemento central
 * - Transições suaves, hover effects elegantes
 */

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    // Validar telefone (formato brasileiro)
    const phoneRegex = /^(\d{10,11})$/;
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneRegex.test(phoneDigits)) {
      toast.error("Por favor, insira um telefone válido");
      return;
    }

    // Enviar para WhatsApp
    const message = `Olá Janiele! Gostaria de agendar uma consulta:\n\nNome: ${formData.name}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\nData: ${formData.date}\nHorário: ${formData.time}\n\nMensagem: ${formData.message || "Sem mensagem adicional"}`;
    const whatsappUrl = `https://wa.me/5511989217827?text=${encodeURIComponent(message)}`;
    
    // Enviar e-mail também (simulado com toast)
    toast.success("Solicitação enviada! Você será redirecionado para o WhatsApp");
    
    // Redirecionar para WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsBookingOpen(false);
      setFormData({ name: "", email: "", phone: "", date: "", time: "", message: "" });
    }, 1000);
  };

  const whatsappLink = "https://wa.me/5511989217827";
  const emailLink = "mailto:janieles9898@gmail.com";

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-accent" />
            <h1 className="font-display text-2xl text-foreground">Janiele Carvalho</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#sobre" className="font-heading text-sm hover:text-accent transition-all duration-300 ease-in-out">
              Sobre
            </a>
            <a href="#servicos" className="font-heading text-sm hover:text-accent transition-all duration-300 ease-in-out">
              Serviços
            </a>
            <a href="#contato" className="font-heading text-sm hover:text-accent transition-all duration-300 ease-in-out">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Conteúdo */}
            <div className="animate-slideInLeft space-y-6">
              <div>
                <p className="font-heading text-accent text-sm uppercase tracking-widest mb-2">
                  Nutricionista Profissional
                </p>
                <h2 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
                  Saúde através da Nutrição
                </h2>
              </div>
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-lg text-justify">
                Nutricionista com sólida formação em Nutrição Clínica, Hospitalar, Saúde Mental e Saúde Coletiva. 
                Atuo com foco em evidências científicas e cuidado integral ao paciente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="px-6 py-3 bg-accent text-accent-foreground hover:bg-opacity-90 hover:scale-105 transition-all duration-300 ease-in-out rounded-lg font-heading font-semibold">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Consulta
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Agende sua Consulta</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(11) 99999-9999"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Data *</Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Horário *</Label>
                          <Input
                            id="time"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message">Mensagem (opcional)</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Conte-nos sobre sua situação..."
                          rows={3}
                        />
                      </div>
                      <Button type="submit" className="btn-primary w-full">
                        Enviar para WhatsApp
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="px-6 py-3 bg-secondary text-secondary-foreground border-2 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out rounded-lg font-heading font-semibold" onClick={() => window.open(whatsappLink, "_blank")}>
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Imagem de Perfil */}
            <div className="animate-slideInRight flex justify-center">
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl border-8 border-secondary">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029665950/eKXrKEBApCOGRWuq.jpeg"
                  alt="Janiele Carvalho - Nutricionista"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fadeInUp">
              <p className="font-heading text-accent text-sm uppercase tracking-widest mb-2">Sobre Mim</p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground">Formação e Experiência</h2>
            </div>

            <div className="divider-sage mb-12"></div>

            <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed text-justify">
              <p>
                Sou nutricionista com sólida formação técnica e prática em <strong className="text-foreground">Nutrição Clínica, Hospitalar, Saúde Mental, Saúde Coletiva e Segurança Alimentar</strong>, atuando com foco em evidências científicas, ética profissional e cuidado integral ao paciente.
              </p>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Experiência Clínica Hospitalar
                </h3>
                <p className="text-justify">
                  Possuo experiência consolidada em Nutrição Clínica Hospitalar, com atuação no Hospital Municipal Dr. Moysés Deutsch (M'Boi Mirim), em parceria com o Hospital Israelita Albert Einstein. Realizei avaliações nutricionais completas (antropométricas, clínicas e laboratoriais), acompanhamento diário em leitos, proposição de condutas dietoterápicas individualizadas e registros em sistema Tasy, sempre alinhada às diretrizes institucionais.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent" />
                  Unidades de Alimentação e Nutrição
                </h3>
                <p className="text-justify">
                  Tenho experiência prática em Unidades de Alimentação e Nutrição (UAN) hospitalar, com atuação no controle de qualidade dos alimentos, aplicação de boas práticas de manipulação, segurança alimentar, adequação de dietas às diferentes condições clínicas e acompanhamento da produção de refeições para pacientes em diferentes níveis de complexidade.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  Saúde Mental e Bem-estar
                </h3>
                <p className="text-justify">
                  Atuei como Técnica em Nutrição e Dietética na área da Saúde Mental, desenvolvendo conhecimento específico sobre o cuidado nutricional de pacientes com transtornos mentais, abordagem humanizada, escuta qualificada e entendimento das interfaces entre nutrição, comportamento alimentar e uso de psicotrópicos.
                </p>
              </div>

              <p className="text-justify">
                Complementarmente, possuo vivência em Saúde Coletiva e Banco de Alimentos, com foco em segurança alimentar, combate ao desperdício e apoio a populações em situação de vulnerabilidade social.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <p className="font-heading text-accent text-sm uppercase tracking-widest mb-2">Serviços</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Áreas de Atuação</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Nutrição Clínica",
                description: "Avaliação e acompanhamento nutricional individualizado para diferentes condições de saúde.",
              },
              {
                icon: Brain,
                title: "Saúde Mental",
                description: "Abordagem humanizada do cuidado nutricional para pacientes com transtornos mentais.",
              },
              {
                icon: Leaf,
                title: "Saúde Coletiva",
                description: "Educação alimentar e nutricional, promoção da saúde e segurança alimentar.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border-border shadow-sm"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-secondary p-4 rounded-full">
                      <service.icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl text-foreground">{service.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <p className="font-heading text-accent text-sm uppercase tracking-widest mb-2">Contato</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Entre em Contato</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Informações de Contato */}
            <div className="space-y-8 animate-slideInLeft">
              <div>
                <h3 className="font-heading text-xl text-foreground mb-4">Formas de Contato</h3>
                <div className="space-y-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-secondary rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 group"
                  >
                    <div className="bg-accent p-3 rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-sm text-muted-foreground">WhatsApp</p>
                      <p className="font-heading text-foreground">(11) 98921-7827</p>
                    </div>
                  </a>

                  <a
                    href={emailLink}
                    className="flex items-center gap-4 p-4 bg-secondary rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 group"
                  >
                    <div className="bg-accent p-3 rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-sm text-muted-foreground">E-mail</p>
                      <p className="font-heading text-foreground">janieles9898@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-xl text-foreground mb-4">Localização</h3>
                <p className="font-body text-muted-foreground">
                  São Paulo, SP<br />
                  Brasil
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="animate-slideInRight flex flex-col justify-center space-y-6">
              <div className="bg-secondary p-8 rounded-xl">
                <h3 className="font-heading text-2xl text-foreground mb-4">Pronto para começar?</h3>
                <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                  Agende sua consulta agora mesmo e dê o primeiro passo para uma vida mais saudável com orientação profissional.
                </p>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="px-6 py-3 bg-accent text-accent-foreground hover:bg-opacity-90 hover:scale-105 transition-all duration-300 ease-in-out rounded-lg font-heading font-semibold w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Consulta
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              <p className="font-heading text-sm">© 2026 Janiele Carvalho - Nutricionista</p>
            </div>
            <div className="flex gap-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-all duration-300 ease-in-out">
                <Phone className="w-5 h-5" />
              </a>
              <a href={emailLink} className="hover:opacity-75 transition-all duration-300 ease-in-out">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
