import {
  BookOpenIcon,
  BrainIcon,
  CheckCircleIcon,
  CodeIcon,
  CubeIcon,
  FileCssIcon,
  GearSixIcon,
  MagicWandIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from '@phosphor-icons/react';
import { CDSCard } from '@ciscodesignsystems/cds-react-card';
import { CDSFlex } from '@ciscodesignsystems/cds-react-flex';
import { CDSFooter } from '@ciscodesignsystems/cds-react-footer';
import { CDSHeading } from '@ciscodesignsystems/cds-react-heading';
import { CDSLink } from '@ciscodesignsystems/cds-react-link';
import { CDSTag } from '@ciscodesignsystems/cds-react-tag';
import { CDSText } from '@ciscodesignsystems/cds-react-text';

const APP_FEATURES = [
  {
    icon: <CubeIcon size={28} weight="duotone" />,
    title: 'Magnetic CDS Components',
    description: 'Pre-installed CDS packages for header, nav, card, table, charts, and more — ready to use immediately.',
  },
  {
    icon: <FileCssIcon size={28} weight="duotone" />,
    title: 'CSS & Theme System',
    description: 'Token CSS imported for Magnetic and Blue brands. Switch between Light, Dark, Classic Light, and Classic Dark at runtime via the settings menu.',
  },
  {
    icon: <GearSixIcon size={28} weight="duotone" />,
    title: 'Vite Configured',
    description: 'React deduplication enabled to prevent conflicts with nested nivo dependencies inside cds-react-line-chart.',
  },
  {
    icon: <PaintBrushIcon size={28} weight="duotone" />,
    title: 'App Shell Layout',
    description: 'Full Magnetic UI shell: CDSHeader, collapsible CDSNav, and CDSFooter wired up following the CSS Grid layout pattern.',
  },
  {
    icon: <BookOpenIcon size={28} weight="duotone" />,
    title: 'Component Reference Docs',
    description: '60+ component docs with props, usage examples, and DO/DON\'T rules live in llm-docs/ — readable by both humans and AI.',
  },
  {
    icon: <ShieldCheckIcon size={28} weight="duotone" />,
    title: 'Artifactory Auth',
    description: 'npm configured to pull @ciscodesignsystems packages from the Magnetic Artifactory registry via your .npmrc identity token.',
  },
];

const AI_STEPS = [
  {
    step: '1',
    title: 'Install Claude Code',
    description: 'Install the Claude Code extension in VS Code, or use it as a CLI from this project directory.',
    code: 'npm install -g @anthropic-ai/claude-code',
  },
  {
    step: '2',
    title: 'Open this project',
    description: 'Claude Code will automatically read CLAUDE.md on startup, loading all the Magnetic rules and component references into context.',
    code: 'claude  # from the project root',
  },
  {
    step: '3',
    title: 'Describe the feature you want',
    description: 'Claude reads the component docs in llm-docs/ before writing code, so it knows the correct import paths, prop names, and layout patterns.',
    code: 'Build a settings page with a form for editing user preferences',
  },
  {
    step: '4',
    title: 'Install any new packages',
    description: 'If Claude uses a new CDS component, it will install the package and add the index.css import to src/index.css automatically.',
    code: 'npm install @ciscodesignsystems/cds-react-<name>',
  },
];

const WHAT_CLAUDE_KNOWS = [
  'Each CDS component imports from its own scoped package',
  'Never use import React — automatic JSX transform is enabled',
  'All color values must use CSS custom properties (design tokens)',
  'CDSFlex replaces div with flex styles',
  'CDSText / CDSHeading replace p, span, h1–h6 for visible text',
  'App shell uses CSS Grid (min-content 1fr) — not flexbox',
  'CDSNav must be position: sticky, never fixed',
  'Every new package needs its index.css added to src/index.css',
  'react and react-dom must be deduplicated in vite.config.ts',
  'CDSMenu for header dropdowns imports from cds-react-header, not cds-react-menu',
];

export const HomePage = () => {
  return (
    <CDSFlex direction="vertical" gap={40} margin={24} style={{ maxWidth: 1100 }}>

      {/* Hero */}
      <CDSFlex direction="vertical" gap={12}>
        <CDSFlex gap={8} align="center">
          <CDSTag size="sm" status="info">Starter App</CDSTag>
          <CDSTag size="sm" status="positive">AI-Ready</CDSTag>
        </CDSFlex>
        <CDSHeading size="primary">Magnetic Design System App</CDSHeading>
        <CDSText style={{ maxWidth: 640 }}>
          A fully configured React + Vite starter built on the Cisco Magnetic Common Design System.
          All the scaffolding is done — install CDS packages, configure CSS, set up the app shell,
          and wire it for AI-assisted development with Claude Code.
        </CDSText>
      </CDSFlex>

      {/* What's configured */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSHeading size="section">What's already set up</CDSHeading>
        <CDSFlex gap={16} wrap>
          {APP_FEATURES.map((f) => (
            <CDSCard key={f.title} style={{ flex: '1 1 280px' }}>
              <CDSFlex direction="vertical" gap={12}>
                <CDSFlex
                  align="center"
                  justify="center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--interact-bg-weak-default)',
                    color: 'var(--interact-icon-default)',
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </CDSFlex>
                <CDSHeading size="sub-section">{f.title}</CDSHeading>
                <CDSText size="p3" color="light">{f.description}</CDSText>
              </CDSFlex>
            </CDSCard>
          ))}
        </CDSFlex>
      </CDSFlex>

      {/* AI development */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSFlex direction="vertical" gap={8}>
          <CDSFlex gap={8} align="center">
            <BrainIcon size={20} style={{ color: 'var(--interact-icon-default)' }} />
            <CDSHeading size="section">Building with Claude Code</CDSHeading>
          </CDSFlex>
          <CDSText style={{ maxWidth: 640 }}>
            This project is pre-wired for agentic development. A{' '}
            <CDSLink href="https://docs.anthropic.com/en/docs/claude-code" target="_blank">CLAUDE.md</CDSLink>{' '}
            file at the project root loads automatically when you open Claude Code, giving the AI
            instant knowledge of Magnetic's component API, import rules, CSS setup, and layout patterns.
          </CDSText>
        </CDSFlex>

        <CDSFlex gap={16} wrap>
          {AI_STEPS.map((s) => (
            <CDSCard key={s.step} style={{ flex: '1 1 240px' }}>
              <CDSFlex direction="vertical" gap={12}>
                <CDSFlex gap={12} align="center">
                  <CDSFlex
                    align="center"
                    justify="center"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--interact-bg-default)',
                      color: 'var(--interact-text-inverse-default)',
                      flexShrink: 0,
                    }}
                  >
                    <CDSText weight="semi-bold" style={{ color: 'var(--interact-text-inverse-default)' }}>
                      {s.step}
                    </CDSText>
                  </CDSFlex>
                  <CDSHeading size="sub-section">{s.title}</CDSHeading>
                </CDSFlex>
                <CDSText size="p3" color="light">{s.description}</CDSText>
                <CDSFlex
                  style={{
                    background: 'var(--base-bg-default)',
                    borderRadius: 6,
                    padding: '8px 12px',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  <CDSText size="p4" style={{ fontFamily: 'inherit', color: 'var(--interact-text-default)' }}>
                    {s.code}
                  </CDSText>
                </CDSFlex>
              </CDSFlex>
            </CDSCard>
          ))}
        </CDSFlex>
      </CDSFlex>

      {/* What Claude knows */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSFlex direction="vertical" gap={8}>
          <CDSFlex gap={8} align="center">
            <MagicWandIcon size={20} style={{ color: 'var(--interact-icon-default)' }} />
            <CDSHeading size="section">What Claude knows about this project</CDSHeading>
          </CDSFlex>
          <CDSText size="p3" color="light">
            CLAUDE.md and llm-docs/ teach the AI these Magnetic-specific rules automatically:
          </CDSText>
        </CDSFlex>
        <CDSCard>
          <CDSFlex direction="vertical" gap={10}>
            {WHAT_CLAUDE_KNOWS.map((rule) => (
              <CDSFlex key={rule} gap={10} align="flex-start">
                <CheckCircleIcon
                  size={16}
                  weight="fill"
                  style={{ color: 'var(--positive-icon-default)', flexShrink: 0, marginTop: 2 }}
                />
                <CDSText size="p3">{rule}</CDSText>
              </CDSFlex>
            ))}
          </CDSFlex>
        </CDSCard>
      </CDSFlex>

      {/* llm-docs reference */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSFlex direction="vertical" gap={8}>
          <CDSFlex gap={8} align="center">
            <BookOpenIcon size={20} style={{ color: 'var(--interact-icon-default)' }} />
            <CDSHeading size="section">Component reference docs</CDSHeading>
          </CDSFlex>
          <CDSText size="p3" color="light">
            The <CDSText weight="semi-bold" size="p3" style={{ fontFamily: 'ui-monospace, monospace' }}>llm-docs/</CDSText>{' '}
            directory contains markdown docs for every CDS component, layout pattern, and guideline.
            Claude reads these before generating code to get props, constraints, and examples right the first time.
          </CDSText>
        </CDSFlex>
        <CDSFlex gap={16} wrap>
          {[
            { icon: <CubeIcon size={20} />, label: '60+ component docs', sub: 'llm-docs/components/' },
            { icon: <RocketLaunchIcon size={20} />, label: 'Layout patterns', sub: 'llm-docs/patterns/' },
            { icon: <CodeIcon size={20} />, label: 'General guidelines', sub: 'llm-docs/guidelines/general.md' },
            { icon: <TerminalIcon size={20} />, label: 'Icon reference', sub: 'llm-docs/guidelines/icons.md' },
          ].map((item) => (
            <CDSFlex
              key={item.label}
              gap={12}
              align="center"
              style={{
                flex: '1 1 220px',
                background: 'var(--base-bg-weak-default)',
                border: '1px solid var(--base-border-weak-default)',
                borderRadius: 8,
                padding: '14px 16px',
              }}
            >
              <CDSFlex style={{ color: 'var(--interact-icon-default)' }}>{item.icon}</CDSFlex>
              <CDSFlex direction="vertical" gap={2}>
                <CDSText weight="semi-bold" size="p3">{item.label}</CDSText>
                <CDSText size="p4" color="light" style={{ fontFamily: 'ui-monospace, monospace' }}>{item.sub}</CDSText>
              </CDSFlex>
            </CDSFlex>
          ))}
        </CDSFlex>
      </CDSFlex>

      <CDSFooter brandName="Cisco Systems, Inc." />
    </CDSFlex>
  );
};
