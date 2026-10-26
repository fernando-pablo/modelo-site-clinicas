import { demo, whatsappLink } from "./site";

export const EVENTO_SIMULACAO = "simular-whatsapp";

// Envia uma mensagem "para a clínica".
// Na demonstração, nada sai do site: a mensagem aparece numa simulação de conversa na tela.
// Assim, visitantes testando o modelo não enviam pedidos falsos para o WhatsApp de ninguém.
// Num site de cliente (demo.ativa = false), abre o WhatsApp da clínica com a mensagem pronta.
export function abrirWhatsAppClinica(texto: string) {
  if (demo.ativa) {
    window.dispatchEvent(new CustomEvent(EVENTO_SIMULACAO, { detail: texto }));
    return;
  }
  window.open(whatsappLink(texto), "_blank", "noopener,noreferrer");
}
