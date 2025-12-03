# RespondAI

RespondAI é um aplicativo Flutter modular para realização de questionários (quizzes), desenvolvido como parte da disciplina de Dispositivos Móveis.

## 📱 Funcionalidades

*   **Login**: Acesso seguro (simulado) ao aplicativo.
*   **Temas**: Seleção de diferentes categorias de questionários.
*   **Perfil**: Personalização de foto de perfil usando a **Câmera/Galeria** (Recurso Nativo).
*   **Quiz**: Interface interativa para responder perguntas com barra de progresso.
*   **Resultados**: Exibição de pontuação e persistência de dados local.
*   **Modo Noturno**: Suporte automático a temas claro e escuro.

## 🛠 Tecnologias e Requisitos Atendidos

*   **Modularização**: Código organizado em `screens`, `components`, `models`, `data`.
*   **Persistência**: Uso do **SQLite** (`sqflite`) para salvar histórico de resultados.
*   **Recurso Nativo**: Uso do `image_picker` para acesso à galeria de fotos.
*   **Acessibilidade**: Paleta de cores com contraste > 4.5:1 (WCAG).
*   **Logging**: Sistema de logs implementado com o pacote `logger`.
*   **Layout**: Responsivo (uso de `Expanded`, `GridView`) e adaptável a orientação.

## 📂 Estrutura do Projeto

```
lib/
├── components/      # Widgets reutilizáveis (Botões, Inputs, Cards)
├── data/            # Camada de dados (MockService, DatabaseHelper)
├── models/          # Modelos de dados (Topic, Question, QuizResult)
├── screens/         # Telas do aplicativo (Login, Topics, Quiz, Result)
├── utils/           # Utilitários (Tema, Logger)
└── main.dart        # Ponto de entrada e rotas
```

## 🚀 Como Rodar

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    flutter pub get
    ```
3.  Execute o aplicativo:
    ```bash
    flutter run
    ```

## 🧪 Testes

Para rodar os testes automatizados:
```bash
flutter test
```
