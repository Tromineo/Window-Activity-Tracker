# Window Activity Tracker

Uma ferramenta leve para monitorar as trocas entre aplicativos e janelas no computador.

O projeto captura as mudanças de janela ativa, registra cada troca em um arquivo CSV e utiliza Python para analisar os dados coletados.

A ideia é transformar o uso cotidiano do computador em dados mensuráveis e permitir a observação de padrões de uso e de troca de contexto.

## Como funciona

```text
┌─────────────────────┐
│  Aplicativo ativo   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Coletor de atividade│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│        CSV          │
│ horário             │
│ aplicativo anterior │
│ aplicativo atual    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Analisador em Python│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Estatísticas de uso │
└─────────────────────┘
```

Cada troca de janela é registrada como um evento individual. Esses dados podem ser utilizados para analisar a frequência com que os aplicativos são alternados e identificar padrões de uso ao longo do tempo.

## Funcionalidades

* Monitoramento do aplicativo ou janela ativa
* Registro do horário de cada troca
* Armazenamento do histórico em CSV
* Contagem de trocas entre aplicativos
* Resumos da atividade
* Configuração do intervalo de monitoramento e dos resumos
* Análise dos dados coletados anteriormente

## Exemplo

Um arquivo CSV gerado pelo programa pode ter o seguinte formato:

```csv
timestamp,previous_app,current_app
2026-09-29 18:42:13,Firefox,Visual Studio Code
2026-09-29 18:43:02,Visual Studio Code,Terminal
2026-09-29 18:44:17,Terminal,Firefox
```

A partir desses dados, é possível responder perguntas como:

* Quantas vezes troquei de aplicativo durante uma sessão?
* Quais aplicativos aparecem com mais frequência nas trocas?
* Com que frequência alterno entre ferramentas de desenvolvimento e outros aplicativos?
* Meu comportamento de troca muda ao longo do dia?

## Requisitos

* Python 3
* `psutil`

Instale as dependências com:

```bash
pip install psutil
```

## Utilização

Execute o monitor:

```bash
python contador_janelas.py
```

Por padrão, o programa registra as trocas de janela e exibe periodicamente um resumo da atividade.

Os parâmetros de monitoramento podem ser personalizados:

```bash
python contador_janelas.py --janela 30 --resumo 10
```

Pressione `Ctrl+C` para encerrar o programa.

## Estrutura do projeto

```text
.
├── contador_janelas.py
├── trocas.csv
├── extension/
│   └── ...
├── requirements.txt
└── README.md
```

> O arquivo CSV é gerado durante a execução e pode ser excluído do controle de versão caso contenha dados pessoais de atividade.

## Privacidade

O projeto registra informações sobre os aplicativos utilizados no computador.

Como esses dados podem revelar hábitos de trabalho e padrões de uso do computador, os arquivos CSV gerados **não devem ser enviados para um repositório público** quando contiverem dados pessoais.

Caso seja necessário demonstrar o formato dos dados, recomenda-se utilizar um arquivo de exemplo com informações fictícias ou anonimizadas.

## Motivação

A troca constante entre aplicativos é algo fácil de ignorar durante o uso cotidiano do computador.

Este projeto surgiu como um pequeno experimento para quantificar esse comportamento e explorar como dados simples coletados do sistema podem ser transformados em informações úteis por meio de programação e análise de dados.

## Tecnologias

* Python
* psutil
* CSV
* Interface de linha de comando (CLI)

## Possíveis melhorias

Algumas ideias para futuras versões:

* Dashboard interativo no terminal
* Relatórios diários e semanais
* Medição do tempo de utilização de cada aplicativo
* Análise da frequência de trocas ao longo do tempo
* Gráficos e visualizações
* Filtros por aplicativo
* Armazenamento em SQLite em vez de CSV
* Exportação para outros formatos

## Licença

Este projeto está disponível sob os termos da licença incluída neste repositório.
