"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dict, type Lang } from "./content";

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  /** true depois que o idioma salvo/detectado foi aplicado no navegador */
  ready: boolean;
};

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "gsilvatech:lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  // Inglês é o padrão (HTML do servidor). No navegador, usamos a escolha salva
  // ou o idioma do dispositivo (português → PT).
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let next: Lang = "en";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "pt") next = saved;
      else if (navigator.language?.toLowerCase().startsWith("pt")) next = "pt";
    } catch {
      /* storage indisponível: segue em inglês */
    }
    // Sincroniza com APIs do navegador só depois da hidratação (evita divergência de HTML).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(next);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: dictionaries[lang], ready }),
    [lang, setLang, ready],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
