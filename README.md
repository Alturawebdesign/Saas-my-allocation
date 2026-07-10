# CFGP Allocataire

**Plateforme SaaS d'allocation d'actifs, sélection de fonds et gouvernance réglementaire pour cabinet de gestion de patrimoine.**

Application web interne, **mono-cabinet**, **IA-native** et à **traçabilité réglementaire native** — reproduction fidèle et interactive de l'ensemble des maquettes fournies (EOS Allocation · META CGP · La Vigie des Fonds · Fundesys · BNPP Allocation Designer), synthétisées dans l'architecture cible « CFGP Allocataire ».

---

## Concept

Là où un CGP jongle entre un fichier Excel Morningstar, des PDF de préconisations et un outil d'allocation figé, CFGP Allocataire réunit **6 modules métier + 2 couches transverses + 1 tableau de bord** autour d'une base de connaissance « vivante », nourrie en continu par des agents IA et des analystes humains.

La promesse différenciante : *« ce que les grandes maisons font à 5 personnes + Morningstar Direct, nous le faisons avec l'IA — sourcé, filtré par contrat, et opposable ».*

## Architecture des modules

| Famille | Module | Rôle |
| --- | --- | --- |
| **Production** | **Convictions** | Référentiel fonds (équivalent Vigie EOS) — base filtrable, fiche 6 onglets, short list, statuts A/C/V versionnés |
| **Production** | **Allocations** | Profils par contrat (équivalent META CGP) — fiche profil complète, comparateur, simulateur (Allocation Designer) |
| **Production** | **Clients** | Mapping client ↔ profil ↔ contrat, ordres en attente → O2S, suivi de campagne |
| **Gouvernance** | **Comités** | Calendrier, préparation, PV signés, décisions A/C/V, suivi post-comité |
| **Gouvernance** | **Conformité** | Traçabilité réglementaire — registre des décisions, alertes, export ACPR/AMF |
| **Pivot IA** | **Sources** | Nourrisseurs — boîte mail unique, file d'attente IA, validation humaine, base horodatée |
| **Transverse** | **Chat IA** | Interface de production omniprésente — génère l'allocation cible en 4 couches (allocation · justification fonds · contexte macro · contrainte contrat) |
| **Transverse** | **Traçabilité** | 5 piliers appliqués à toute action : horodatage · sourçage · versioning · validation 4 yeux · consignation |

## Écrans reproduits

- **Tableau de bord** — 4 KPI temps réel, activité récente horodatée, performances profils, actions à mener, raccourcis
- **Convictions** — liste des fonds suivis (recherche + filtres), fiche fonds à 6 onglets (Analyse 9 blocs · Ethyk Score · Informations · Société de gestion · Fonds similaires · Parts), modal de filtrage par contrat d'assurance vie
- **Allocations** — « Mes profils » (filtres Défensif/Équilibré/Dynamique), fiche profil détaillée (performances vs indice, allocation donut, inventaire, arbitrages horodatés, commentaire structurel, aperçu PDF client brandé, inventaire VP), comparateur 2 profils, Allocation Designer (Analysis / Backtests)
- **Comités · Clients · Sources · Conformité · Administration**
- **Chat IA** — panneau coulissant avec templates pré-construits et sortie structurée en 4 couches, exportable en mémo PDF

## Stack technique

- **Vite 5** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** — design system dark « EOS » (tokens couleurs, typographies serif/mono, composants)
- **react-router-dom 6** — routage SPA
- **lucide-react** — icônes
- Graphiques **SVG maison** (courbes, donut, jauge SRI, barres d'écart, buckets) — zéro dépendance lourde
- Données de démonstration typées, fidèles aux maquettes (noms de fonds, ISIN, pondérations, contextes macro réels)

## Démarrage

```bash
npm install
npm run dev        # serveur de développement (http://localhost:5173)
npm run build      # vérification TypeScript + build de production
npm run preview    # sert le build de production (http://localhost:4173)
```

## Structure

```
src/
  components/
    charts.tsx            Graphiques SVG (LineChart, Donut, SriGauge, EcartBar, BucketBar…)
    ui.tsx                Primitives (Pill, Tabs, Modal, Badge, Button, Panel…)
    AllocationOutput.tsx  Sortie structurée 4 couches du Chat IA
    layout/               AppShell · TopNav · ChatPanel
  lib/
    types.ts              Modèle de domaine complet
    format.ts             Formatage FR (pourcentages, dates, couleurs sémantiques)
    chatStore.tsx         Contexte Chat IA (ouverture omniprésente + réponses)
    data/                 Données de démonstration par module
  pages/
    Dashboard · convictions/ · allocations/ · Committees
    Clients · Sources · Compliance · Admin · NotFound
```

---

*Application de démonstration — données fictives à des fins d'illustration des maquettes.*
