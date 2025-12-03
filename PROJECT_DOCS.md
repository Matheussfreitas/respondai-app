# Documentação do Projeto RespondAI

Este documento detalha a estrutura, tecnologias e decisões de implementação do aplicativo **RespondAI**.

## 📂 Estrutura de Pastas e Arquivos

### `lib/` (Código Fonte)
A pasta raiz do código Dart.

*   **`main.dart`**: Ponto de entrada da aplicação. Configura o `MaterialApp`, temas e rotas.
    *   *Função*: Inicializa o app e define a navegação principal.

#### `lib/components/` (Widgets Reutilizáveis)
Componentes de UI usados em várias telas para manter consistência.

*   **`custom_widgets.dart`**:
    *   `CustomButton`: Botão padrão estilizado (Elevated ou Outlined).
    *   `CustomTextField`: Campo de texto com bordas arredondadas e suporte a senha.
    *   `ProgressBar`: Barra de progresso linear usada no Quiz.

#### `lib/data/` (Gerenciamento de Dados)
Camada responsável por buscar e salvar dados.

*   **`database_helper.dart`**:
    *   Gerencia o banco de dados **SQLite** (`sqflite`).
    *   Cria a tabela `quiz_results`.
    *   Métodos: `insertQuizResult` (salvar), `getQuizResults` (listar), `getCompletedTopicIds` (verificar concluídos).
*   **`mock_service.dart`**:
    *   Simula uma API externa.
    *   Fornece a lista estática de **Temas** e **Perguntas**.
    *   *Atualização*: Agora suporta quantidades variáveis de perguntas por tema (ex: Flutter Basics tem 3, Web Dev tem 5).

#### `lib/models/` (Modelos de Dados)
Classes que representam as entidades do sistema.

*   **`quiz_models.dart`**:
    *   `Topic`: Representa um tema (ID, Título, Descrição, Dificuldade).
    *   `Question`: Uma pergunta com opções e índice da resposta correta.
    *   `QuizResult`: Resultado de um quiz para ser salvo no banco.

#### `lib/screens/` (Telas)
As páginas visuais do aplicativo.

*   **`login_screen.dart`**: Tela inicial com autenticação (simulada).
*   **`home_screen.dart`**: Tela principal que gerencia a navegação inferior (BottomNavigationBar).
*   **`quiz_screen.dart`**: Tela interativa onde o usuário responde as perguntas.
*   **`result_screen.dart`**: Exibe a pontuação final e salva no banco.
*   **`tabs/`**: Abas exibidas dentro da `HomeScreen`.
    *   `topics_tab.dart`: Grid de temas disponíveis. Mostra quais já foram concluídos.
    *   `create_quiz_tab.dart`: Formulário para sugerir novos quizzes.
    *   `profile_tab.dart`: Perfil do usuário com estatísticas e **Seleção de Foto**.

#### `lib/utils/` (Utilitários)
Configurações globais e ferramentas auxiliares.

*   **`app_theme.dart`**: Define as cores e estilos do app (Tema Claro e Escuro).
*   **`app_logger.dart`**: Instância do pacote `logger` para logs coloridos e formatados.

---

## 🛠 Bibliotecas Utilizadas (`pubspec.yaml`)

1.  **`flutter`**: O framework principal.
2.  **`cupertino_icons`**: Ícones estilo iOS.
3.  **`sqflite`**: Banco de dados SQL local para persistência.
4.  **`path`**: Auxiliar para encontrar o caminho do banco de dados no dispositivo.
5.  **`image_picker`**: Acesso nativo à Câmera e Galeria para foto de perfil.
6.  **`logger`**: Logs profissionais para depuração.
7.  **`google_fonts`**: Fontes modernas para melhorar a tipografia.

---

## 💡 Decisões de Implementação

*   **Estado**: Utilizamos `setState` e `StatefulWidget` para gerenciamento de estado, mantendo a simplicidade e facilidade de entendimento, conforme solicitado.
*   **Navegação**: Uso de rotas nomeadas (`/home`, `/quiz`) para facilitar o fluxo.
*   **Responsividade**: Uso extensivo de `SingleChildScrollView` e `Expanded` para garantir que o app funcione bem em modo paisagem (horizontal) e em telas pequenas, evitando erros de "overflow".
*   **Acessibilidade**: Cores de alto contraste (Laranja/Branco) e suporte a modo noturno.
