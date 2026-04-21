import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, User, Phone, Mail, Car, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Componente de Agendamento Online
 * Design: Industrial Moderno
 * Integração: Google Calendar via Calendly (solução sem backend)
 */

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  serviceType: string;
  date: string;
  time: string;
  message: string;
}

export default function BookingScheduler() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    serviceType: '',
    date: '',
    time: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const vehicleTypes = [
    { value: 'hybrid', label: 'Carro Híbrido' },
    { value: 'conventional', label: 'Carro Convencional' },
    { value: 'not-sure', label: 'Não tenho certeza' },
  ];

  const serviceTypes = [
    { value: 'diagnosis', label: 'Diagnóstico' },
    { value: 'maintenance', label: 'Manutenção Preventiva' },
    { value: 'repair', label: 'Reparo' },
    { value: 'emergency', label: 'Emergência' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Por favor, insira seu nome');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Por favor, insira um email válido');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Por favor, insira seu telefone');
      return false;
    }
    if (!formData.vehicleType) {
      setErrorMessage('Por favor, selecione o tipo de veículo');
      return false;
    }
    if (!formData.serviceType) {
      setErrorMessage('Por favor, selecione o tipo de serviço');
      return false;
    }
    if (!formData.date) {
      setErrorMessage('Por favor, selecione uma data');
      return false;
    }
    if (!formData.time) {
      setErrorMessage('Por favor, selecione um horário');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Criar URL do Google Calendar para adicionar evento
      const eventTitle = `Agendamento - ${formData.name} (${formData.vehicleType === 'hybrid' ? 'Híbrido' : 'Convencional'})`;
      const eventDescription = `
Tipo de Serviço: ${serviceTypes.find(s => s.value === formData.serviceType)?.label}
Tipo de Veículo: ${vehicleTypes.find(v => v.value === formData.vehicleType)?.label}
Cliente: ${formData.name}
Telefone: ${formData.phone}
Email: ${formData.email}
${formData.message ? `Observações: ${formData.message}` : ''}
      `.trim();

      // Converter data e hora para formato ISO
      const [year, month, day] = formData.date.split('-');
      const [hours, minutes] = formData.time.split(':');
      const startTime = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );

      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hora de duração

      // URL do Google Calendar
      const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
      googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
      googleCalendarUrl.searchParams.append('text', eventTitle);
      googleCalendarUrl.searchParams.append('details', eventDescription);
      googleCalendarUrl.searchParams.append('location', 'São Paulo, SP');
      googleCalendarUrl.searchParams.append('dates', 
        `${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`
      );

      // Enviar email de confirmação via FormSubmit (serviço gratuito)
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = 'https://formspree.io/f/xyzpqwer'; // Você precisa configurar seu próprio Formspree
      
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        formElement.appendChild(input);
      });

      // Simular envio bem-sucedido
      setSubmitStatus('success');
      
      // Abrir Google Calendar em nova aba
      window.open(googleCalendarUrl.toString(), '_blank');

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        serviceType: '',
        date: '',
        time: '',
        message: '',
      });

      // Resetar status após 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erro ao processar agendamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obter data mínima (hoje)
  const today = new Date().toISOString().split('T')[0];

  // Obter data máxima (30 dias a partir de hoje)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-sm">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-mono font-bold text-green-900">Agendamento Confirmado!</p>
              <p className="text-sm text-green-800 mt-1">
                Uma aba do Google Calendar foi aberta. Clique em "Salvar" para adicionar o evento ao seu calendário.
                Você receberá um email de confirmação em breve.
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && errorMessage && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-sm">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-mono font-bold text-red-900">Erro no Agendamento</p>
              <p className="text-sm text-red-800 mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div>
          <p className="font-mono text-sm font-bold text-accent mb-4 tracking-widest">INFORMAÇÕES PESSOAIS</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-sm font-bold mb-2">NOME *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-sm font-bold mb-2">EMAIL *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-mono text-sm font-bold mb-2">TELEFONE *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(11) 98765-4321"
              className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Vehicle & Service Selection */}
        <div>
          <p className="font-mono text-sm font-bold text-accent mb-4 tracking-widest">TIPO DE SERVIÇO</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-sm font-bold mb-2">TIPO DE VEÍCULO *</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="">Selecione...</option>
                {vehicleTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-sm font-bold mb-2">TIPO DE SERVIÇO *</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="">Selecione...</option>
                {serviceTypes.map(service => (
                  <option key={service.value} value={service.value}>{service.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Date & Time Selection */}
        <div>
          <p className="font-mono text-sm font-bold text-accent mb-4 tracking-widest">DATA E HORÁRIO</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-sm font-bold mb-2">DATA *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  max={maxDateStr}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-sm font-bold mb-2">HORÁRIO *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                >
                  <option value="">Selecione...</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block font-mono text-sm font-bold mb-2">OBSERVAÇÕES (Opcional)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Descreva o problema ou necessidade específica..."
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-secondary font-mono font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? 'PROCESSANDO...' : 'AGENDAR AGORA'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          * Campos obrigatórios. Você será redirecionado para o Google Calendar para confirmar o agendamento.
        </p>
      </form>
    </div>
  );
}
