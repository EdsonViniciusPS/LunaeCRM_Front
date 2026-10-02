# Lunae SaaS — Especificação de Design e UX Copy

CRM + agenda + WhatsApp para negócios de atendimento (clínicas, salões, estúdios, consultórios). Prioridade: **operar no celular com uma mão** e **resolver tarefas em poucos toques**. Stack sugerida: Next.js + Tailwind (web), tokens espelhados em Flutter (app).

---

## 1. Fundamentos globais

### Princípios

1. **Agenda e WhatsApp são o centro**: acessíveis em 1 toque de qualquer tela.
2. **Ação primeiro**: cada tela tem uma ação primária clara.
3. **Mobile-first**: o usuário atende cliente em pé; alvos de toque ≥ 44px.
4. **Nada de jargão**: "Cliente", "Atendimento", "Lembrete" (não "entidade", "slot", "trigger").

### Design tokens

| Token | Valor | Uso |
| --- | --- | --- |
| `color-primary` | #5B4BDB | CTAs, links, item ativo |
| `color-primary-hover` | #4A3BC4 | Hover/pressed |
| `color-accent` | #14B8A6 | Sucesso, confirmado, WhatsApp-ok |
| `color-warning` | #F59E0B | Pendente, aviso |
| `color-danger` | #DC2626 | Erro, cancelado, atrasado |
| `color-bg` / `color-surface` | #F7F7FB / #FFFFFF | Fundo / cards |
| `color-text` / `color-text-muted` | #1B1B2F / #6B6B80 | Texto / secundário |
| `color-border` | #E4E4EE | Divisores, inputs |
| `spacing-xs/sm/md/lg/xl` | 4/8/16/24/32px | Escala (base 4) |
| `radius-md` / `radius-lg` | 8 / 16px | Inputs, botões / cards, modais |
| `shadow-card` | 0 1px 3px rgba(27,27,47,.08) | Cards |
| `font-family` | Inter, system-ui | Todo o produto |
| `font-heading-lg` | 24/32 semibold | Título de página |
| `font-heading-md` | 18/26 semibold | Seção/card |
| `font-body` | 14/22 regular | Texto base (16 em mobile em inputs) |
| `font-caption` | 12/16 medium | Rótulos, badges |

Modo escuro: redefinir tokens de cor (`color-bg` #0F0F1A, `color-surface` #1A1A2E, `color-text` #ECECF5), mantendo contraste AA.

### Layout e breakpoints

| Breakpoint | Layout |
| --- | --- |
| Desktop (>1024px) | Sidebar fixa 240px + conteúdo (máx 1280px), grid 12 colunas, gutter `spacing-lg` |
| Tablet (768–1024px) | Sidebar recolhida em ícones (72px), grid 8 colunas |
| Mobile (\<768px) | Barra inferior com 5 itens (Início, Agenda, WhatsApp, Clientes, Mais); demais módulos em "Mais"; tabelas viram listas de cards; modais viram bottom sheets |

### Navegação (sidebar)

Início · Agenda · WhatsApp · Clientes · Funil · Financeiro · Campanhas · Fidelização · Relatórios · Automações · Integrações · Configurações (Usuários e Permissões). Itens ocultos conforme permissão do usuário.

### Componentes base

| Componente | Variantes | Notas |
| --- | --- | --- |
| Button | primary, secondary, ghost, danger | Estados: default, hover, focus (anel 2px `color-primary`), disabled (40% opacidade), loading (spinner, largura fixa) |
| Input / Select / Date | default, erro, desabilitado | Rótulo sempre visível; erro abaixo em `color-danger` com ícone |
| Badge de status | success, warning, danger, neutral | Sempre ícone + texto (nunca só cor) |
| Card | padrão, clicável, métrica | Clicável: hover eleva sombra |
| Tabela | densa, confortável | Cabeçalho fixo, ordenação, seleção em lote; \<768px vira lista de cards |
| Modal / Bottom sheet | confirmação, formulário | Foco preso, ESC fecha, ação destrutiva exige texto específico |
| Toast | sucesso, erro, info | 4s, canto inferior, `aria-live="polite"`, com "Desfazer" quando aplicável |
| Empty state | — | Ilustração leve + título + 1 linha + CTA |
| Skeleton | linha, card, tabela | Substitui spinner em listas e dashboards |

### Estados obrigatórios em toda tela

Carregando (skeleton) · Vazio · Erro de carga ("Não conseguimos carregar. Tentar de novo") · Sem permissão · Offline (faixa fixa "Você está offline. Alterações serão enviadas quando a conexão voltar").

### Motion

| Elemento | Gatilho | Animação | Duração | Easing |
| --- | --- | --- | --- | --- |
| Modal / bottom sheet | Abrir | Fade + subida 16px | 200ms | ease-out |
| Toast | Aparecer/sair | Slide + fade | 150ms | ease-out |
| Card/hover | Hover | Sombra | 120ms | ease-in-out |
| Drag no funil/agenda | Soltar | Encaixe suave | 180ms | ease-out |
| Respeitar `prefers-reduced-motion`: remover deslocamentos, manter fade. |  |  |  |  |

### Acessibilidade (global)

- Contraste AA (4.5:1 texto, 3:1 UI). Foco visível sempre.
- Ordem de foco = ordem visual. Todos os fluxos operáveis por teclado.
- Ícones sem texto têm `aria-label`. Status anunciados via `aria-live`.
- Drag-and-drop sempre com alternativa por menu ("Mover para…").

### Voz e tom

Profissional e acolhedor, em português do Brasil, tratamento "você". Sucesso: breve e positivo. Erro: empático + o que fazer. Aviso: claro e acionável. Termos fixos: **Cliente** (não "contato" após virar cliente), **Lead** (antes de agendar), **Atendimento**, **Lembrete**, **Automação**.

**Padrões de copy**

- Erro: *O que houve + por quê + como resolver.*
- Vazio: *O que é + por que está vazio + como começar.*
- Confirmação destrutiva: título com a ação e o objeto; consequência; botões com verbos ("Excluir cliente" / "Manter cliente").
- Strings em arquivo de i18n; reservar +30% de largura para outros idiomas.

---

## 2. Módulos

### 2.1 Cadastro de clientes

**Objetivo**: ficha única do cliente. **Telas**: lista (busca + filtros), ficha, formulário. **Layout**: lista em tabela (desktop) / cards (mobile). Ficha em 2 colunas: dados à esquerda, abas à direita (Resumo, Histórico, Financeiro, Documentos). **Campos**: nome\*, telefone\* (máscara BR, WhatsApp marcado por padrão), e-mail, CPF/CNPJ (máscara, validação), aniversário, endereço, tags, origem, observações, documentos (upload PDF/JPG, máx 10 MB). **Estados**: telefone duplicado → aviso com link para o cliente existente; documento enviando (barra de progresso); falha de upload (tentar de novo). **Truncamento**: nome em 1 linha com reticências, 60 caracteres máx. **Copy**

- CTA: **Novo cliente** · **Salvar cliente**
- Vazio: "Nenhum cliente ainda. Cadastre o primeiro ou importe uma planilha para começar."
- Erro: "Esse telefone já está cadastrado para Ana Souza. Abrir cadastro existente?"
- Exclusão: "Excluir Ana Souza? O histórico e os documentos serão removidos e não poderão ser recuperados." → **Excluir cliente** / **Manter cliente**
- Importação: **Importar planilha** · "Encontramos 120 clientes. 3 linhas têm erros."
- Privacidade (LGPD): "Registre o consentimento do cliente para receber mensagens."

### 2.2 WhatsApp

**Objetivo**: caixa de entrada compartilhada. **Layout**: 3 colunas no desktop (conversas · chat · ficha do cliente); mobile navega em pilha (lista → chat). **Componentes**: item de conversa (avatar, última msg, hora, badge não lidas, responsável), bolha de mensagem (enviada, recebida, status ✓ ✓✓ lida), compositor (texto, anexo, áudio, modelos de mensagem), filtros (Minhas, Não atribuídas, Não lidas). **Estados**: conectado / desconectado (faixa de aviso com **Reconectar**) / enviando / falha (ícone vermelho + **Reenviar**). Janela de 24h expirada: compositor muda para "Enviar modelo aprovado". **Atalhos**: `/` abre modelos; `Enter` envia, `Shift+Enter` quebra linha. **Copy**

- Vazio: "Nenhuma conversa ainda. Quando um cliente enviar mensagem, ela aparece aqui."
- Desconectado: "WhatsApp desconectado. Você não recebe nem envia mensagens até reconectar." → **Reconectar WhatsApp**
- Janela 24h: "Passaram mais de 24h desde a última mensagem do cliente. Envie um modelo aprovado para retomar."
- Falha: "Mensagem não enviada. Verifique a conexão e tente de novo." → **Reenviar**
- Atribuição: "Conversa atribuída a Marina."

### 2.3 Agenda

**Objetivo**: agendar, confirmar, cancelar, reagendar. **Visões**: dia, semana, mês, por profissional (colunas). Mobile: dia/lista por padrão. **Componentes**: grade com blocos coloridos por status, bloco de atendimento (cliente, serviço, horário), painel lateral de detalhes, seletor de profissional. **Status**: Agendado (neutro) · Confirmado (accent) · Concluído · Cancelado (danger) · Faltou (warning). **Interações**: clique em horário vazio abre novo agendamento; arrastar bloco reagenda (com confirmação de notificar cliente); conflito de horário bloqueia com mensagem. **Responsivo**: \<768px sem drag; usar menu **Reagendar**. **Copy**

- CTA: **Novo agendamento** · **Confirmar** · **Reagendar** · **Cancelar atendimento**
- Vazio (dia): "Nenhum atendimento neste dia. Toque em um horário para agendar."
- Conflito: "Marina já tem um atendimento às 14h. Escolha outro horário ou outro profissional."
- Cancelar: "Cancelar o atendimento de Ana às 14h? Você pode avisar a cliente pelo WhatsApp." → **Cancelar e avisar** / **Cancelar sem avisar** / **Voltar**
- Sucesso: "Atendimento reagendado para sex, 10h. Ana foi avisada."

### 2.4 Lembretes automáticos

**Objetivo**: reduzir faltas. **Tela**: lista de regras + editor. **Campos**: canal (WhatsApp, SMS, e-mail, com ordem de fallback), quando (ex.: 24h e 2h antes), modelo de mensagem com variáveis `{nome}`, `{data}`, `{hora}`, `{profissional}`, botões de resposta (Confirmar / Reagendar). **Componentes**: linha do tempo visual das mensagens, pré-visualização como bolha de WhatsApp, contador de caracteres (SMS 160). **Estados**: ativo/pausado (switch), falha de envio no log com motivo. **Copy**

- Modelo padrão: "Olá, {nome}! Lembrete do seu atendimento amanhã, {data}, às {hora}. Responda 1 para confirmar ou 2 para reagendar."
- Vazio: "Nenhum lembrete configurado. Crie um para avisar seus clientes antes do atendimento e reduzir faltas."
- Aviso: "Este modelo usa uma variável que não existe: {nomee}. Corrija antes de ativar."

### 2.5 Financeiro

**Objetivo**: cobrar e acompanhar. **Abas**: Recebimentos, Pendências, Recorrências, Histórico. **Componentes**: cartões de resumo (Recebido, A receber, Atrasado), tabela com status (Pago, Pendente, Atrasado, Reembolsado), formulário de cobrança (valor, vencimento, forma: Pix, cartão, boleto, link), gerador de link de pagamento enviável por WhatsApp. **Regras visuais**: valores alinhados à direita, `R$ 1.234,56`; atrasado em `color-danger` com ícone. **Estados**: pagamento processando; recusado (motivo + tentar outro meio). **Copy**

- CTA: **Nova cobrança** · **Enviar link de pagamento** · **Marcar como pago**
- Vazio: "Nenhum pagamento registrado. Crie uma cobrança ou conecte seu meio de pagamento."
- Atrasado: "3 cobranças atrasadas somam R$ 450,00. Enviar lembrete de pagamento?"
- Recusado: "Pagamento recusado pelo banco. Peça ao cliente para tentar outro cartão ou pagar por Pix."
- Estorno: "Reembolsar R$ 120,00 para Ana? Essa ação não pode ser desfeita." → **Reembolsar** / **Voltar**

### 2.6 Dashboard

**Objetivo**: visão do dia e do mês em 5 segundos. **Layout**: linha de métricas (Faturamento, Atendimentos, Novos clientes, Taxa de comparecimento, Conversão) + gráfico de faturamento + próximos atendimentos + tarefas/pendências. **Componentes**: card de métrica (valor, variação ▲▼ vs período anterior, mini-gráfico), seletor de período (Hoje, 7 dias, 30 dias, Personalizado), gráficos de linha/barra com tooltip e tabela alternativa para leitores de tela. **Estados**: skeleton por card; sem dados no período ("Sem dados neste período"); erro isolado por card (os outros continuam). **Mobile**: métricas em carrossel horizontal, gráficos em coluna única. **Copy**

- Saudação: "Bom dia, Edson. Você tem 8 atendimentos hoje."
- Vazio: "Ainda não há dados para mostrar. Assim que você agendar e receber, seus números aparecem aqui."
- Variação: "+12% em relação aos 30 dias anteriores"

### 2.7 Funil de vendas

**Objetivo**: acompanhar leads até virarem clientes. **Layout**: kanban com colunas **Lead → Contato → Agendamento → Cliente** (+ "Perdido" recolhida). **Componentes**: card de lead (nome, origem, valor estimado, último contato, responsável), cabeçalho de coluna com contagem e total, filtros por responsável/origem. **Interações**: arrastar entre colunas; mover para "Perdido" pede motivo; mover para "Agendamento" abre agendar; "Cliente" converte e cria ficha. Alternativa por teclado: menu **Mover para…**. **Edge cases**: coluna com 100+ cards → rolagem virtual + "Carregar mais"; lead parado >7 dias recebe selo "Sem contato". **Copy**

- Vazio: "Nenhum lead no funil. Adicione um lead ou conecte seus formulários e anúncios."
- Perdido: "Por que este lead foi perdido?" (Sem resposta, Preço, Foi para concorrente, Outro)
- Conversão: "Maria virou cliente. Quer agendar o primeiro atendimento?"

### 2.8 Histórico

**Objetivo**: linha do tempo do cliente. **Layout**: aba na ficha, lista cronológica reversa, agrupada por dia. **Eventos**: atendimento, mensagem, pagamento, nota interna, mudança de etapa, automação disparada. Cada um com ícone, autor, data/hora. **Componentes**: filtros por tipo, campo **Adicionar nota**, notas internas com selo "Interna" (nunca vão ao cliente). **Estados**: paginação infinita; evento de sistema não editável. **Copy**

- Vazio: "Sem registros ainda. Atendimentos, mensagens e pagamentos deste cliente aparecem aqui."
- Nota: placeholder "Escreva uma nota visível só para a equipe" · **Salvar nota**

### 2.9 Relatórios

**Objetivo**: analisar e exportar. **Relatórios**: Faturamento, Clientes (novos/ativos), Retenção, Conversão do funil, Atendimentos por profissional, Faltas. **Layout**: filtros no topo (período, profissional, serviço) + gráfico + tabela detalhada. **Exportar** em CSV e PDF. **Estados**: gerando exportação (toast com progresso; link por e-mail se >30s); sem resultados com filtros ativos → **Limpar filtros**. **Copy**

- Vazio: "Nenhum resultado para esses filtros. Tente ampliar o período."
- Exportação: "Preparando seu relatório…" → "Relatório pronto. Baixar arquivo."

### 2.10 Usuários

**Objetivo**: gerenciar equipe. **Tela**: tabela (nome, e-mail, função, status, último acesso) + convite. **Fluxo de convite**: e-mail + função → envio → status "Convite pendente" (**Reenviar** / **Cancelar convite**). **Estados**: ativo, inativo, convite pendente. Não permitir remover o último administrador. **Copy**

- CTA: **Convidar usuário**
- Sucesso: "Convite enviado para [marina@email.com](mailto:marina@email.com)."
- Desativar: "Desativar Marina? Ela perde o acesso agora, mas o histórico dela é mantido." → **Desativar** / **Manter ativa**
- Bloqueio: "Você precisa de pelo menos um administrador. Defina outro antes de remover este."

### 2.11 Permissões

**Objetivo**: controle por função. **Funções padrão**: Administrador, Gerente, Atendente, Financeiro, Somente leitura (+ personalizadas). **Layout**: matriz módulo × ação (Ver, Criar, Editar, Excluir, Exportar) com checkboxes; atalho "Marcar coluna". Dados sensíveis (Financeiro, Exportar) destacados com ícone de cadeado. **Regras**: alterações valem no próximo carregamento; função em uso não pode ser excluída. Tela sem permissão mostra estado dedicado, não erro genérico. **Copy**

- Sem acesso: "Você não tem acesso a esta área. Peça ao administrador para liberar." → **Solicitar acesso**
- Salvar: "Permissões de Atendente atualizadas. 4 usuários afetados."
- Exclusão: "Excluir a função Estagiário? Mova os 2 usuários para outra função primeiro."

### 2.12 Automação

**Objetivo**: mensagens e tarefas sem esforço manual. **Modelo**: **Quando** (gatilho) → **Se** (condição, opcional) → **Então** (ação). **Gatilhos**: novo lead, agendamento criado, atendimento concluído, cliente inativo por X dias, aniversário, pagamento atrasado. **Ações**: enviar WhatsApp/e-mail/SMS, criar tarefa, mover no funil, adicionar tag. **Layout**: lista de automações com switch + editor em passos verticais (cards conectados). Teste: **Simular com um cliente**. **Estados**: rascunho, ativa, pausada, com erro (log com motivo). Alerta de limite: máx. 1 mensagem automática por cliente a cada 24h (configurável). **Copy**

- Vazio: "Nenhuma automação ainda. Comece por um modelo pronto, como 'Pedir avaliação após o atendimento'."
- Ativar: "Ativar esta automação? Ela passará a enviar mensagens a clientes reais." → **Ativar** / **Voltar**
- Erro: "A automação parou: o WhatsApp está desconectado. Reconecte para retomar."

### 2.13 Campanhas

**Objetivo**: divulgar para clientes e leads. **Fluxo em 4 passos**: Público → Mensagem → Agendar envio → Revisar. **Componentes**: seletor de segmento (tags, funil, inatividade, aniversariantes) com contagem ao vivo, editor de mensagem com variáveis e pré-visualização, calendário de envio, resumo antes de enviar. Relatório pós-envio: enviadas, entregues, lidas, respostas, agendamentos gerados. **Regras**: só envia a quem deu consentimento; cliente com opt-out excluído automaticamente e informado na contagem. **Copy**

- Vazio: "Nenhuma campanha ainda. Crie a primeira para trazer clientes de volta."
- Revisar: "Enviar para 238 pessoas em 12/10 às 9h. 14 foram excluídas por optarem por não receber mensagens." → **Agendar campanha** / **Voltar e editar**
- Rodapé de opt-out sugerido: "Para não receber mais mensagens, responda SAIR."

### 2.14 Fidelização

**Objetivo**: recompensar retorno. **Tipos**: cupons, pontos, benefícios, níveis. **Telas**: Programa (regras: "1 ponto a cada R$ 10"), Recompensas (catálogo), Cupons (código, validade, limite de uso), Saldo na ficha do cliente. **Componentes**: cartão de saldo com barra de progresso até a próxima recompensa, resgate com confirmação, histórico de pontos. **Regras**: cupom expirado/esgotado com estado visual próprio; resgate não pode ser desfeito sem permissão de gerente. **Copy**

- Vazio: "Você ainda não tem um programa de fidelidade. Crie um para estimular a volta dos clientes."
- Progresso: "Faltam 20 pontos para o próximo benefício."
- Resgate: "Resgatar 100 pontos de Ana por 'Corte grátis'?" → **Resgatar** / **Voltar**
- Cupom inválido: "Este cupom expirou em 30/09. Gere um novo ou prorrogue a validade."

### 2.15 Integrações

**Objetivo**: conectar ferramentas. **Layout**: grade de cards (logo, nome, descrição, status Conectado/Desconectado/Erro, botão). **Itens**: WhatsApp, Google Calendar, meios de pagamento (Pix/cartão), e-mail/SMS, Webhooks/API. **Fluxo**: **Conectar** → OAuth/QR code → teste de conexão → sucesso. Mostrar permissões solicitadas antes de autorizar. **Estados**: conectando, conectado (último sync), erro com ação (**Reconectar**), desconectar com confirmação. **Copy**

- Google Calendar: "Sincronize sua agenda. Novos atendimentos aparecem no Google Calendar e vice-versa."
- Sucesso: "Google Calendar conectado. Última sincronização agora."
- Erro: "Perdemos a conexão com o Google Calendar. Reconecte para continuar sincronizando."
- Desconectar: "Desconectar WhatsApp? Você deixa de enviar e receber mensagens e as automações serão pausadas." → **Desconectar** / **Manter conectado**

---

## 3. Fluxos transversais

- **Onboarding (5 passos, pulável)**: dados do negócio → equipe → serviços e horários → conectar WhatsApp → primeiro agendamento. Barra de progresso e checklist no Dashboard até concluir.
- **Busca global** (`Ctrl/Cmd+K`): clientes, conversas, agendamentos, ações rápidas.
- **Notificações in-app**: sino com não lidas, agrupadas (Agenda, WhatsApp, Financeiro).
- **Desfazer**: exclusões leves com toast "Desfazer" por 10s antes de efetivar.

## 4. Notas de localização

- Datas `dd/mm/aaaa`, moeda `R$`, telefone `(81) 99999-9999`, fuso configurável por empresa.
- Evitar gírias e metáforas; reservar +30% de largura para tradução.
- Textos de erro nunca culpam o usuário ("Não conseguimos…" em vez de "Você errou…").