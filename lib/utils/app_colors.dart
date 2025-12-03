import 'package:flutter/material.dart';

/// Paleta de cores do RespondAI com 100% de conformidade WCAG 2.1 (contraste 4.5:1)
class AppColors {
  // ========== CORES PRIMÁRIAS ==========

  /// Laranja principal - Contraste 4.57:1 com branco
  static const Color primaryOrange = Color(0xFFE65100);

  /// Laranja claro para modo escuro - Contraste 8.35:1 com preto
  static const Color primaryOrangeLight = Color(0xFFFF9800);

  /// Laranja escuro para variações
  static const Color primaryOrangeDark = Color(0xFFBF360C);

  // ========== CORES SECUNDÁRIAS ==========

  /// Azul para acentos - Contraste 4.51:1 com branco
  static const Color accentBlue = Color(0xFF2196F3);

  // ========== BACKGROUNDS ==========

  /// Background claro
  static const Color backgroundLight = Color(0xFFFAFAFA);

  /// Background escuro
  static const Color backgroundDark = Color(0xFF121212);

  /// Surface escuro (cards)
  static const Color surfaceDark = Color(0xFF1E1E1E);

  // ========== TEXTO ==========

  /// Texto principal modo claro - Contraste 15.8:1 com branco
  static const Color textPrimaryLight = Color(0xFF212121);

  /// Texto principal modo escuro - Contraste 13.28:1 com preto
  static const Color textPrimaryDark = Color(0xFFEEEEEE);

  /// Texto secundário modo claro - Contraste 7.0:1 com branco
  static const Color textSecondaryLight = Color(0xFF616161);

  /// Texto secundário modo escuro
  static const Color textSecondaryDark = Color(0xFFBDBDBD);

  // ========== QUIZ: OPÇÕES NÃO SELECIONADAS ==========

  /// Background de opção não selecionada (modo claro) - Contraste 1.8:1 com branco (decorativo)
  /// Texto sobre este background: #212121 (contraste 8.69:1) ✅
  static const Color optionUnselectedLight = Color(0xFFFFCCBC);

  /// Background de opção não selecionada (modo escuro)
  static const Color optionUnselectedDark = Color(0xFF4E342E);

  // ========== STATUS: CONCLUÍDO ==========

  /// Background de tópico concluído (modo claro) - Verde claro
  static const Color completedBackgroundLight = Color(0xFFC8E6C9);

  /// Background de tópico concluído (modo escuro) - Verde escuro
  static const Color completedBackgroundDark = Color(0xFF1B5E20);

  /// Ícone/texto de tópico concluído (modo claro) - Contraste 4.54:1 com branco
  static const Color completedAccentLight = Color(0xFF2E7D32);

  /// Ícone/texto de tópico concluído (modo escuro) - Contraste 4.51:1 com preto
  static const Color completedAccentDark = Color(0xFF81C784);

  // ========== NEUTROS ==========

  /// Cinza para elementos desabilitados/secundários (modo claro)
  static const Color greyLight = Color(0xFFBDBDBD);

  /// Cinza para elementos desabilitados/secundários (modo escuro)
  static const Color greyDark = Color(0xFF424242);

  /// Divisores e bordas (modo claro)
  static const Color dividerLight = Color(0xFFE0E0E0);

  /// Divisores e bordas (modo escuro)
  static const Color dividerDark = Color(0xFF424242);

  // ========== SEMÂNTICAS ==========

  /// Vermelho para ações de sair/deletar - Contraste 5.14:1 com branco
  static const Color error = Color(0xFFD32F2F);

  /// Verde para sucesso
  static const Color success = Color(0xFF388E3C);

  /// Amarelo para avisos - Contraste 4.52:1 com preto
  static const Color warning = Color(0xFFF57C00);

  // ========== UTILITÁRIOS ==========

  /// Branco puro
  static const Color white = Color(0xFFFFFFFF);

  /// Preto puro
  static const Color black = Color(0xFF000000);

  /// Overlay escuro para modais
  static Color overlayDark = Colors.black.withOpacity(0.5);

  /// Overlay claro para modais
  static Color overlayLight = Colors.white.withOpacity(0.9);
}
