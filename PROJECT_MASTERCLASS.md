# 🎓 RespondAI: Masterclass de Flutter & Dart

Olá! Este documento foi preparado para ser o seu guia definitivo sobre o projeto **RespondAI**. Aqui, não vamos apenas ver *o que* foi feito, mas **por que** e **como**, focando nos fundamentos do Flutter e Dart.

Imagine que este é o resumo da sua aula de desenvolvimento mobile. 📱

---

## 1. O Que Construímos?
O **RespondAI** é um aplicativo de Quiz completo. Ele tem:
1.  **Autenticação**: Login (simulado) com validação.
2.  **Navegação**: Abas para Temas, Criação e Perfil.
3.  **Interatividade**: Resolução de questões com feedback visual.
4.  **Persistência**: Salva seus resultados no celular (banco de dados).
5.  **Nativo**: Usa a câmera/galeria do celular.

---

## 2. A Arquitetura (Como organizamos a casa)
Usamos uma estrutura modular para não misturar as coisas. No Flutter, organização é tudo!

*   **`lib/main.dart`**: É o **cérebro**. Ele liga o app, define o tema (cores) e as rotas (caminhos).
*   **`lib/screens/`**: São as **telas** (Login, Home, Quiz).
*   **`lib/components/`**: São os **blocos de lego** reutilizáveis (Botões, Inputs). Se você usa algo mais de uma vez, transforme em componente!
*   **`lib/models/`**: São os **moldes** dos dados. Ex: A classe `Question` define que toda pergunta tem um texto e opções.
*   **`lib/data/`**: É onde os dados vivem (Banco de Dados e Mock).

---

## 3. Fundamentos do Flutter Aplicados

### 🧩 Tudo é Widget
No Flutter, um botão é um widget, o texto é um widget, o espaçamento (`SizedBox`) é um widget.
*   **StatelessWidget**: Widgets "estáticos". Eles não mudam depois de desenhados. Ex: `TopicCard` (a informação vem pronta e só é exibida).
*   **StatefulWidget**: Widgets que têm "vida". Eles mudam quando algo acontece. Ex: `QuizScreen` (muda a pergunta atual, a cor do botão selecionado).
    *   *O segredo*: Quando chamamos `setState()`, o Flutter redesenha a tela com os novos dados.

### 🗺️ Navegação (O GPS do App)
Como vamos de uma tela para outra?
1.  **Rotas Nomeadas**: No `main.dart`, demos nomes às telas: `/home`, `/quiz`.
2.  **Navigator**: É o "motorista".
    *   `Navigator.pushNamed(context, '/quiz')`: Empilha a tela do Quiz em cima da atual.
    *   `Navigator.pop(context)`: Remove a tela atual e volta para a anterior (como um botão "Voltar").
    *   `Navigator.pushReplacementNamed(...)`: Troca a tela atual pela nova (usado no Login, para você não poder voltar para o login).

### 📑 Abas (Tabs)
Na `HomeScreen`, usamos um truque clássico:
*   Temos uma lista de telas: `[TopicsTab(), CreateQuizTab(), ProfileTab()]`.
*   Temos uma variável `_currentIndex` que guarda qual aba está aberta (0, 1 ou 2).
*   No `body` do Scaffold, mostramos apenas: `_tabs[_currentIndex]`.
*   Quando você clica na barra de baixo, atualizamos o índice com `setState`, e o Flutter troca a tela instantaneamente. Mágica! ✨

---

## 4. Persistência de Dados (SQLite) 💾
Aqui a coisa fica séria. Como salvar dados que sobrevivem se fechar o app?
Usamos a biblioteca **`sqflite`**.

1.  **O Banco**: É um arquivo `.db` dentro do celular.
2.  **Singleton**: A classe `DatabaseHelper` é criada de um jeito que só existe **uma** instância dela no app todo. Isso evita conflitos de abrir o banco várias vezes.
3.  **Async/Await**: Salvar dados demora (milissegundos, mas demora). Por isso, todas as funções de banco retornam um `Future` (uma promessa).
    *   Usamos `await` para dizer: "Flutter, espera o banco salvar antes de continuar".

---

## 5. Bibliotecas (Nossos Superpoderes) 🦸‍♂️
Não reinventamos a roda. Usamos pacotes do `pub.dev`:

*   **`google_fonts`**: Para deixar o texto bonito sem ter que baixar arquivos de fonte manualmente.
*   **`logger`**: Para ver logs coloridos no terminal (`logger.i("Info")`, `logger.e("Erro")`). Muito melhor que `print()`.
*   **`image_picker`**: A ponte para o mundo nativo. Ele fala com o Android/iOS e diz "Ei, abre a câmera aí".
*   **`sqflite` & `path`**: A dupla dinâmica para banco de dados SQL.

---

## 6. Pontos de Atenção & Dicas de Ouro ⚠️

### O Inimigo nº 1: Overflow 🚫
Sabe quando aparece aquela faixa amarela e preta de perigo? É o **Overflow**. Acontece quando o conteúdo é maior que a tela.
*   **Solução**: `SingleChildScrollView`.
*   **Onde usamos**: No Login e no Quiz.
*   **Por que**: Se você virar o celular (modo paisagem), a tela fica baixa. O teclado sobe. Sem scroll, o app quebra. Com scroll, o usuário desliza e tudo funciona.

### Mock vs Real
*   Usamos o `MockService` para fingir que temos um servidor. Ele retorna listas fixas.
*   No mundo real, você trocaria o `MockService` por chamadas `http.get(...)` para pegar dados da internet. A estrutura do app continuaria a mesma!

---

## 7. Comandos Essenciais 💻

No seu terminal, esses são os comandos que você precisa saber:

*   `flutter pub get`: "Baixar as bibliotecas". Rode sempre que mexer no `pubspec.yaml`.
*   `flutter run`: "Rodar o app".
*   `flutter clean`: "Faxina". Se algo der errado sem motivo, rode isso e tente de novo.

---

Espero que essa aula tenha ajudado a consolidar seu conhecimento! O código está todo comentado e pronto para você explorar. 🚀
