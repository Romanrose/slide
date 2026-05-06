import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useMemo } from 'react';
import dovePhoto from './assets/f3d24dde-b44c-490e-aa62-7133b3c4873d.png';
import testFootage from './assets/test-footage.mp4';

export const design: DesignSystem = {
  palette: {
    bg: '#f5efe4',
    text: '#1a1714',
    accent: '#b34a2a',
  },
  fonts: {
    display: '"Iowan Old Style", "Times New Roman", Georgia, serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  typeScale: {
    hero: 176,
    body: 30,
  },
  radius: 12,
};

const palette = {
  bg: '#f5efe4',
  surface: '#fbf7ee',
  text: '#1a1714',
  muted: '#756d63',
  faint: '#b2a89b',
  rule: '#211d19',
  line: '#d8cebd',
  accent: '#b34a2a',
  accentSoft: 'rgba(179, 74, 42, 0.1)',
  blue: '#2a4d6e',
  green: '#596a4a',
};

const fonts = {
  serif: '"Iowan Old Style", "Times New Roman", Georgia, serif',
  sans: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, monospace',
};

const PAD_X = 128;
const PAD_Y = 104;
const TOTAL = 13;

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-body)',
} as const;

const Grain = () => (
  <svg
    width="100%"
    height="100%"
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: 0.32,
      mixBlendMode: 'multiply',
    }}
    aria-hidden="true"
    role="presentation"
  >
    <title>paper grain</title>
    <defs>
      <filter id="dreamPaperGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="11" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.42
                  0 0 0 0 0.36
                  0 0 0 0 0.28
                  0 0 0 0.11 0"
        />
      </filter>
    </defs>
    <rect width="100%" height="100%" filter="url(#dreamPaperGrain)" />
  </svg>
);

const DoveMark = ({ size = 128, color = palette.accent }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" role="presentation">
    <path
      d="M18 66c20-2 33-13 43-31 7 15 18 28 41 34-18 7-34 8-50 1-10 11-21 17-34 19 9-7 15-14 18-22-7 1-13 0-18-1Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="5"
    />
    <path
      d="M61 35c-2 20 1 36 12 49"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="5"
    />
  </svg>
);

const Eyebrow = ({ children, color = palette.accent }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);

const Footer = ({ page, section }: { page: number; section: string }) => (
  <div
    style={{
      position: 'absolute',
      left: PAD_X,
      right: PAD_X,
      bottom: 58,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontSize: 17,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: palette.muted,
      borderTop: `1px dashed ${palette.rule}`,
      paddingTop: 16,
      zIndex: 2,
    }}
  >
    <span>Dream White Dove · {section}</span>
    <span>
      p. {String(page).padStart(2, '0')} / {TOTAL}
    </span>
  </div>
);

const PageShell = ({
  page,
  section,
  children,
  accent = palette.accent,
}: {
  page: number;
  section: string;
  children: React.ReactNode;
  accent?: string;
}) => (
  <div style={{ ...fill, padding: `${PAD_Y}px ${PAD_X}px` }}>
    <Grain />
    <div
      style={{
        position: 'absolute',
        top: 58,
        right: PAD_X,
        fontFamily: fonts.mono,
        fontSize: 18,
        color: palette.faint,
        letterSpacing: '0.08em',
        zIndex: 2,
      }}
    >
      FILE / MIDTERM / {String(page).padStart(2, '0')}
    </div>
    <div style={{ position: 'absolute', right: 108, bottom: 106, opacity: 0.12 }}>
      <DoveMark size={360} color={accent} />
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    <Footer page={page} section={section} />
  </div>
);

const Title = ({ children, size = 96 }: { children: React.ReactNode; size?: number }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 400,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '28px 0 0',
    }}
  >
    {children}
  </h2>
);

const Rule = ({ width = 360 }: { width?: number }) => (
  <div style={{ width, height: 1, background: palette.rule, margin: '42px 0' }} />
);

const Body = ({ children, width = 1180 }: { children: React.ReactNode; width?: number }) => (
  <p style={{ fontSize: 31, lineHeight: 1.55, maxWidth: width, margin: 0 }}>{children}</p>
);

const Mono = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <span
    style={{
      fontFamily: fonts.mono,
      fontSize: '0.82em',
      color: accent ? palette.accent : palette.text,
      background: accent ? palette.accentSoft : 'transparent',
      padding: accent ? '3px 10px' : 0,
      borderRadius: accent ? 4 : 0,
    }}
  >
    {children}
  </span>
);

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <div style={{ display: 'grid', gap: 18, maxWidth: 1180 }}>
    {items.map((item, index) => (
      <div
        key={String(index)}
        style={{
          display: 'grid',
          gridTemplateColumns: '46px 1fr',
          alignItems: 'baseline',
          fontSize: 29,
          lineHeight: 1.35,
        }}
      >
        <span style={{ fontFamily: fonts.mono, color: palette.accent, fontSize: 20 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const Card = ({ children, tone = 'paper' }: { children: React.ReactNode; tone?: 'paper' | 'ink' }) => (
  <div
    style={{
      background: tone === 'ink' ? palette.text : palette.surface,
      color: tone === 'ink' ? palette.bg : palette.text,
      border: tone === 'ink' ? 'none' : `1px solid ${palette.line}`,
      borderRadius: 8,
      padding: '34px 38px',
      boxShadow: tone === 'ink' ? 'none' : '0 18px 50px rgba(42, 35, 28, 0.08)',
    }}
  >
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 18,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: palette.muted,
      marginBottom: 16,
    }}
  >
    {children}
  </div>
);

const pretextLayouts = new Map<string, ReturnType<typeof layoutWithLines>>();

function usePretextLines(text: string, font: string, width: number, lineHeight: number) {
  return useMemo(() => {
    const cacheKey = `${font}|${width}|${lineHeight}|${text}`;
    const cached = pretextLayouts.get(cacheKey);
    if (cached) return cached.lines;

    const prepared = prepareWithSegments(text, font, {
      whiteSpace: 'pre-wrap',
      wordBreak: 'keep-all',
    });
    const laidOut = layoutWithLines(prepared, width, lineHeight);
    pretextLayouts.set(cacheKey, laidOut);
    return laidOut.lines;
  }, [font, lineHeight, text, width]);
}

const PretextBlock = ({
  text,
  width,
  font,
  lineHeight,
  color = palette.text,
  paper = true,
  centered = false,
  padding = '14px 18px',
}: {
  text: string;
  width: number;
  font: string;
  lineHeight: number;
  color?: string;
  paper?: boolean;
  centered?: boolean;
  padding?: string;
}) => {
  const lines = usePretextLines(text, font, width, lineHeight);

  return (
    <div
      style={{
        width,
        padding: paper ? padding : 0,
        background: paper ? 'rgba(251, 247, 238, 0.86)' : 'transparent',
        border: paper ? `1px solid ${palette.line}` : 'none',
        color,
        boxShadow: paper ? '0 14px 34px rgba(28, 23, 18, 0.08)' : 'none',
      }}
    >
      {lines.map((line, index) => (
        <div
          key={`${line.text}-${index}`}
          style={{
            minHeight: lineHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: centered ? 'center' : 'flex-start',
            font,
            lineHeight: `${lineHeight}px`,
            letterSpacing: '0',
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
};

const DialogueBeat = ({
  name,
  line,
  width = 560,
}: {
  name: string;
  line: string;
  width?: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '72px 1fr',
      gap: 16,
      alignItems: 'start',
      padding: '9px 0',
      borderTop: `1px solid ${palette.line}`,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 22,
        lineHeight: '34px',
        fontWeight: 500,
        color: palette.accent,
        letterSpacing: '0.08em',
        paddingTop: 9,
      }}
    >
      {name}
    </div>
    <PretextBlock
      text={line}
      width={width}
      font={`27px ${fonts.serif}`}
      lineHeight={34}
      color={palette.text}
      centered={false}
      padding="8px 14px"
    />
  </div>
);

const IllustratedDove = () => (
  <svg width="470" height="390" viewBox="0 0 420 360" aria-hidden="true" role="presentation">
    <defs>
      <filter id="inkWobble">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="18" />
        <feDisplacementMap in="SourceGraphic" scale="2.4" />
      </filter>
      <linearGradient id="dovePaper" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#fbf7ee" />
        <stop offset="100%" stopColor="#e9dfcd" />
      </linearGradient>
    </defs>
    <g filter="url(#inkWobble)">
      <path
        d="M142 186c-47-22-77-54-93-96 55 7 103 35 145 91"
        fill="none"
        stroke={palette.green}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M95 224c48-5 82-22 112-53 24-25 47-35 75-26 24 8 42 25 61 48-39 16-76 19-113 9-27 28-60 48-103 61 20-18 34-34 43-49-26 7-51 10-75 10Z"
        fill="url(#dovePaper)"
        stroke={palette.text}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
      <path
        d="M202 171c21 19 49 30 84 34"
        fill="none"
        stroke={palette.faint}
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M221 165c-4 41 8 76 34 105"
        fill="none"
        stroke={palette.text}
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M232 156c36-42 80-65 132-70-17 45-50 82-99 111"
        fill="none"
        stroke={palette.accent}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M245 166c42-25 81-34 116-28"
        fill="none"
        stroke={palette.accent}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M301 171c25-7 43-3 58 13-24 9-48 9-71 0"
        fill="url(#dovePaper)"
        stroke={palette.text}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <circle cx="323" cy="169" r="5" fill={palette.text} />
      <path d="M350 177l28 8-29 12" fill="none" stroke={palette.accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
      <path
        d="M134 218c-21 15-44 28-72 38 31 6 67 2 107-12"
        fill="none"
        stroke={palette.text}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M137 226c-18 23-35 43-54 58 29-5 59-19 90-42"
        fill="none"
        stroke={palette.faint}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M110 299c68 23 143 29 224-4"
        fill="none"
        stroke={palette.faint}
        strokeLinecap="round"
        strokeWidth="3"
        strokeDasharray="2 14"
      />
    </g>
  </svg>
);

const ManuscriptFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      height: 620,
      padding: '30px 38px 36px',
      background: 'rgba(251, 247, 238, 0.82)',
      border: `2px solid ${palette.rule}`,
      boxShadow: 'inset 0 0 0 8px rgba(179, 74, 42, 0.08), 0 24px 70px rgba(34, 28, 22, 0.12)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 16,
        border: `1px dashed ${palette.accent}`,
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: 30,
        fontFamily: fonts.serif,
        fontSize: 68,
        lineHeight: 0.84,
        color: palette.accent,
      }}
    >
      3
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
  </div>
);

const TwoColumn = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.95fr', gap: 54, alignItems: 'start' }}>
    {left}
    {right}
  </div>
);

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      display: 'grid',
      gridTemplateColumns: '1.08fr 0.92fr',
      minHeight: '100%',
    }}
  >
    <Grain />
    <div
      style={{
        padding: `${PAD_Y}px ${PAD_X}px`,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Eyebrow>A field guide · midterm report</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 190,
          fontWeight: 400,
          lineHeight: 0.98,
          letterSpacing: '-0.035em',
          margin: '34px 0 0',
        }}
      >
        梦白鸽
      </h1>
      <Rule width={560} />
      <p
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 43,
          lineHeight: 1.38,
          fontStyle: 'italic',
          maxWidth: 960,
          margin: 0,
        }}
      >
        一部关于战争创伤、记忆闪回与短暂和解的剧情短片。
      </p>
      <div
        style={{
          marginTop: 54,
          display: 'grid',
          gap: 12,
          fontFamily: fonts.mono,
          fontSize: 24,
          color: palette.muted,
        }}
      >
        <span>TYPE / 剧情 · 战争创伤 · 心理回忆</span>
        <span>RUNTIME / 约 5 分钟</span>
        <span>TEAM / 胡天悦 · 李进元 · 李若冰</span>
      </div>
    </div>
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden' }}>
      <video
        src={testFootage}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.2) contrast(1.05)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 23, 20, 0.25)' }} />
      <div style={{ position: 'absolute', right: 74, bottom: 68 }}>
        <DoveMark size={154} color={palette.bg} />
      </div>
    </div>
  </div>
);

const Theme: Page = () => (
  <PageShell page={2} section="Theme">
    <Eyebrow>Theme keywords</Eyebrow>
    <Title>
      战争结束后，
      <br />
      创伤仍会继续回响。
    </Title>
    <Rule />
    <TwoColumn
      left={
        <BulletList
          items={[
            '战争创伤',
            '幸存者愧疚',
            '记忆闪回',
            '友谊与告别',
            '白鸽：和平、牵挂与心理救赎',
          ]}
        />
      }
      right={
        <Card tone="ink">
          <Label>Core statement</Label>
          <p style={{ fontFamily: fonts.serif, fontSize: 48, lineHeight: 1.28, margin: 0 }}>
            退伍士兵乔在现实与回忆之间反复被拉回，最终通过白鸽和旧打火机重新面对失去的战友。
          </p>
        </Card>
      }
    />
  </PageShell>
);

const Synopsis: Page = () => (
  <PageShell page={3} section="Synopsis">
    <Eyebrow>Story map</Eyebrow>
    <Title>现实、战场、树下回忆交叉推进。</Title>
    <Rule />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
      {[
        ['01', '客厅夜晚', '乔独自坐在电视前，战争新闻与炮火声触发他的惊醒。'],
        ['02', '战场废墟', '约翰救助受伤的乔，却被流弹击中牺牲。'],
        ['03', '树下短暂安宁', '两人在休息时开玩笑，看见白鸽飞过。'],
        ['04', '回到现实', '乔再次拿起打火机，在白鸽意象中获得短暂平静。'],
      ].map(([num, title, text]) => (
        <Card key={num}>
          <div style={{ fontFamily: fonts.mono, color: palette.accent, fontSize: 22 }}>{num}</div>
          <h3 style={{ fontFamily: fonts.serif, fontSize: 42, fontWeight: 400, margin: '20px 0 16px' }}>
            {title}
          </h3>
          <p style={{ fontSize: 25, lineHeight: 1.45, margin: 0, color: palette.muted }}>{text}</p>
        </Card>
      ))}
    </div>
  </PageShell>
);

const CurrentBase: Page = () => (
  <PageShell page={4} section="Current base">
    <Eyebrow>Work in hand</Eyebrow>
    <Title>已有雏形：文本、分镜、影像测试。</Title>
    <Rule />
    <TwoColumn
      left={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['剧本', '4 场'],
            ['分镜', '4 个场次'],
            ['片段', '约 1分15秒'],
          ].map(([label, value]) => (
            <Card key={label}>
              <Label>{label}</Label>
              <div style={{ fontFamily: fonts.serif, fontSize: 62, color: palette.accent }}>{value}</div>
            </Card>
          ))}
        </div>
      }
      right={
        <Card>
          <Label>Existing structure</Label>
          <BulletList items={['客厅惊醒', '战场创伤回忆', '树下温暖回忆', '回到现实，白鸽出现']} />
        </Card>
      }
    />
  </PageShell>
);

const FiveMinutes: Page = () => (
  <PageShell page={5} section="Expansion">
    <Eyebrow>Five-minute cut</Eyebrow>
    <Title>情绪层次设计</Title>
    <Rule />
    <div style={{ display: 'grid', gap: 14 }}>
      {[
        ['现实引入', '客厅环境、乔的疲惫状态、战争新闻触发', '45 秒', 15],
        ['战场回忆', '乔受伤、约翰救助、约翰中弹', '90 秒', 30],
        ['遗物与崩溃', '乔拿到打火机，情绪爆发', '45 秒', 15],
        ['温暖回忆', '树下休息、两人初识、白鸽飞过', '90 秒', 30],
        ['现实收束', '乔点烟、白鸽出现、情绪平复', '60 秒', 20],
      ].map(([segment, content, time, width]) => (
        <div
          key={segment}
          style={{
            display: 'grid',
            gridTemplateColumns: '210px 1fr 120px',
            alignItems: 'center',
            gap: 28,
            borderBottom: `1px solid ${palette.line}`,
            padding: '16px 0',
          }}
        >
          <div style={{ fontFamily: fonts.serif, fontSize: 38 }}>{segment}</div>
          <div>
            <div style={{ fontSize: 25, color: palette.muted, marginBottom: 10 }}>{content}</div>
            <div style={{ height: 10, background: palette.line }}>
              <div style={{ width: `${width}%`, height: '100%', background: palette.accent }} />
            </div>
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 24, color: palette.accent }}>{time}</div>
        </div>
      ))}
    </div>
  </PageShell>
);

const Revisions: Page = () => (
  <PageShell page={6} section="Revisions">
    <Eyebrow>Add and align</Eyebrow>
    <Title>细节设计</Title>
    <Rule />
    <TwoColumn
      left={
        <BulletList
          items={[
            '乔失眠、饮酒、反复看新闻的现实细节',
            '电视炮火声与战场炮火声的声音转场',
            '约翰救助乔之前的呼喊与接近过程',
            '乔拿到打火机后的情绪停顿',
            '树下段落增加轻松对白',
            '结尾增加关掉电视、面对白鸽的静默镜头',
          ]}
        />
      }
      right={
        <Card>
          <Label>Continuity fixes</Label>
          <div style={{ display: 'grid', gap: 24, fontSize: 30, lineHeight: 1.35 }}>
            <div>
              <Mono accent>打火机标记</Mono>
              <div style={{ marginTop: 12 }}>统一为“白鸽刻痕”或“J”中的一种。</div>
            </div>
            <div>
              <Mono accent>受伤位置</Mono>
              <div style={{ marginTop: 12 }}>统一乔左臂或右臂的设定。</div>
            </div>
          </div>
        </Card>
      }
    />
  </PageShell>
);

const Camera: Page = () => (
  <PageShell page={7} section="Camera">
    <Eyebrow>Visual grammar</Eyebrow>
    <Title>三种风格场景</Title>
    <Rule />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {[
        ['现实', '固定镜头、低照度、电视蓝光；用近景和特写突出疤痕、眼睛、打火机。', palette.blue],
        ['战场', '手持感、低角度、快速剪辑；烟雾、灰尘、枪炮声制造压迫。', palette.accent],
        ['树下', '稳定构图、自然光、较暖色调；用中近景表现人物互动。', palette.green],
        ['结尾', '节奏放慢；白鸽与打火机形成视觉呼应。', palette.text],
      ].map(([title, text, color]) => (
        <Card key={title}>
          <div style={{ width: 46, height: 6, background: color, marginBottom: 28 }} />
          <h3 style={{ fontFamily: fonts.serif, fontSize: 54, fontWeight: 400, margin: 0 }}>{title}</h3>
          <p style={{ fontSize: 26, lineHeight: 1.45, margin: '24px 0 0', color: palette.muted }}>{text}</p>
        </Card>
      ))}
    </div>
  </PageShell>
);

const Sound: Page = () => (
  <PageShell page={8} section="Sound">
    <Eyebrow>Sound as memory trigger</Eyebrow>
    <Title>声音设计</Title>
    <Rule />
    <TwoColumn
      left={
        <Card>
          <Label>Sound design</Label>
          <BulletList
            items={[
              '电视新闻声作为现实背景',
              '炮火声作为闪回触发点',
              '呼吸声、衣料摩擦声、打火机声强化细节',
              '白鸽叫声作为结尾情绪提示',
            ]}
          />
        </Card>
      }
      right={
        <Card>
          <Label>Music design</Label>
          <BulletList
            items={[
              '战场与闪回段落使用紧张、低沉的氛围音乐',
              '树下回忆减少音乐压迫，保留环境声',
              '结尾音乐逐渐减弱，留下安静空间',
            ]}
          />
        </Card>
      }
    />
  </PageShell>
);

const Technical: Page = () => (
  <PageShell page={9} section="AIGC pipeline">
    <Eyebrow>Production method</Eyebrow>
    <Title>创作流程</Title>
    <Rule />
    <TwoColumn
      left={
        <Card tone="ink">
          <Label>Generation</Label>
          <BulletList
            items={[
              '使用 AIGC 进行影片画面生成',
              '根据剧本和分镜表拆分镜头提示词',
              '分别生成客厅现实、战场废墟、树下回忆、白鸽结尾',
              '统一人物设定、场景风格和色彩基调',
            ]}
          />
        </Card>
      }
      right={
        <Card>
          <Label>Post-production</Label>
          <BulletList
            items={[
              '筛选、排序和剪辑生成片段',
              '调色区分现实、战场、回忆三种时空',
              '加入环境音、对白、音效和背景音乐',
              '通过字幕、片名和节奏调整提升完整度',
            ]}
          />
        </Card>
      }
    />
  </PageShell>
);

const Schedule: Page = () => (
  <PageShell page={10} section="Schedule">
    <Eyebrow>Progress and next steps</Eyebrow>
    <Title>片段扩展规划</Title>
    <Rule />
    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 44 }}>
      <Card>
        <Label>Done</Label>
        <BulletList items={['剧本初稿', '分镜头表', '部分影像测试 / 初版短片']} />
      </Card>
      <div style={{ display: 'grid', gap: 18 }}>
        {[
          ['第 1 阶段', '剧本与分镜修订'],
          ['第 2 阶段', '集中拍摄与补拍'],
          ['第 3 阶段', '剪辑、声音、调色'],
          ['第 4 阶段', '导出成片并准备最终说明 PPT'],
        ].map(([phase, task]) => (
          <div
            key={phase}
            style={{
              display: 'grid',
              gridTemplateColumns: '170px 1fr',
              gap: 24,
              alignItems: 'center',
              padding: '23px 28px',
              border: `1px solid ${palette.line}`,
              background: palette.surface,
              borderRadius: 8,
            }}
          >
            <span style={{ fontFamily: fonts.mono, color: palette.accent, fontSize: 22 }}>{phase}</span>
            <span style={{ fontSize: 31 }}>{task}</span>
          </div>
        ))}
      </div>
    </div>
  </PageShell>
);

const Expected: Page = () => (
  <PageShell page={11} section="Expected outcome">
    <Eyebrow>Final effect</Eyebrow>
    <Title>战争心理线设计</Title>
    <Rule />
    <TwoColumn
      left={
        <BulletList
          items={[
            '故事结构完整',
            '人物情感清晰',
            '现实与回忆转换自然',
            '白鸽、打火机、疤痕三个意象形成呼应',
            '五分钟内完成从创伤触发到短暂和解的情绪弧线',
          ]}
        />
      }
      right={
        <Card tone="ink">
          <Label>Title reading</Label>
          <p style={{ fontFamily: fonts.serif, fontSize: 50, lineHeight: 1.28, margin: 0 }}>
            “梦”代表回忆和幻觉，“白鸽”代表和平、友谊以及主人公仍然渴望抵达的内心平静。
          </p>
        </Card>
      }
    />
  </PageShell>
);

const ScriptExcerpt: Page = () => (
  <PageShell page={12} section="Script excerpt" accent={palette.green}>
    <Eyebrow>Selected script scene</Eyebrow>
    <Title>剧本片段：树下回忆</Title>
    <Rule />
    <ManuscriptFrame>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.08fr 0.92fr',
          gap: 34,
          alignItems: 'start',
          paddingLeft: 76,
          paddingRight: 10,
        }}
      >
        <div
          style={{
            height: 530,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              marginBottom: 16,
              fontFamily: fonts.mono,
              fontSize: 17,
              letterSpacing: '0.12em',
              color: palette.muted,
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: palette.accent }}>Scene 03</span>
            <span style={{ height: 1, width: 96, background: palette.rule }} />
            <span>Exterior · Olive Tree · Day</span>
          </div>

          <PretextBlock
            text="阳光透过茂密的树叶，在地面投下斑驳的光影。乔和约翰坐在草地上，背靠着橄榄树干。"
            width={650}
            font={`27px ${fonts.serif}`}
            lineHeight={34}
            color={palette.text}
            padding="10px 14px"
          />

          <div style={{ marginTop: 12, display: 'grid', gap: 0 }}>
            <DialogueBeat name="约翰" line="用我的吧。" />
            <DialogueBeat name="乔" line="J......你叫什么名字？" />
            <DialogueBeat name="约翰" line="我叫约翰。" />
            <DialogueBeat name="乔" line="我也是。J。那么这是我的打火机了。" />
          </div>

          <div style={{ marginTop: 12 }}>
            <PretextBlock
              text="乔抬着头，露出了久违的笑容，手指指向了天空。一群白鸽慢慢掠过两人的头顶。"
              width={650}
              font={`27px ${fonts.serif}`}
              lineHeight={34}
              color={palette.text}
              padding="10px 14px"
            />
          </div>
        </div>

        <div style={{ position: 'relative', height: 530 }}>
          <img
            src={dovePhoto}
            alt=""
            style={{ width: '100%', height: 530, objectFit: 'cover' }}
          />
        </div>
      </div>
    </ManuscriptFrame>
  </PageShell>
);

const Closing: Page = () => (
  <div
    style={{
      ...fill,
      padding: `${PAD_Y}px ${PAD_X}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <Grain />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <DoveMark size={180} />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 172,
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          margin: '36px 0 26px',
        }}
      >
        梦白鸽
      </h2>
      <div style={{ height: 1, width: 520, background: palette.rule, margin: '0 auto 34px' }} />
      <p style={{ fontSize: 38, color: palette.muted, margin: 0 }}>中期汇报完毕 · 谢谢观看</p>
    </div>
    <Footer page={13} section="Closing" />
  </div>
);

export const notes = [
  '大家好，我们的短片作品名为《梦白鸽》，由胡天悦、李进元、李若冰共同完成。这是一部以战争创伤和记忆闪回为核心的剧情短片。我们目前已经完成了基础剧本、分镜设计和部分影像测试，接下来计划在现有短片基础上扩展为约五分钟的完整作品。',
  '《梦白鸽》想表达的是战争结束后，创伤并不会立刻结束。主人公乔已经回到日常生活，但电视里的战争新闻、打火机、疤痕和白鸽都会触发他的回忆。白鸽在片中既是和平的象征，也是约翰留下的精神连接。',
  '故事采用现实和回忆交叉的结构。现实部分是乔在客厅里的夜晚，回忆部分分为战场牺牲和树下相识两段。我们希望通过冷暖对比，让观众感受到乔内心的撕裂：一边是战争带来的伤痛，一边是他和约翰之间真实存在过的温情。',
  '目前文件夹中的剧本和分镜已经形成了完整雏形，现有视频约一分多钟，主要呈现了核心情绪和视觉方向。中期之后，我们计划保留现有四场结构，但增加过渡、动作细节、人物关系铺垫和声音设计，让故事从片段式表达扩展成更完整的五分钟短片。',
  '扩展方案不是简单拉长镜头，而是补充叙事层次。我们会让现实段落更充分地建立乔的孤独状态；战场段落增加紧张感和动作过程；树下段落强化乔和约翰的关系，让约翰的牺牲更有情感重量。结尾部分则放慢节奏，让白鸽意象成为情绪落点。',
  '我们在整理剧本和分镜时发现，有些细节需要统一，比如打火机到底刻着字母 J 还是白鸽痕迹，乔受伤的是左臂还是右臂。后续会在正式拍摄前完成剧本和分镜修订，保证前后连续性。新增内容主要服务于人物关系和情绪递进。',
  '镜头语言上，我们会让三种时空形成差异。现实部分偏冷、静止、压抑；战场回忆偏晃动、紧张、破碎；树下回忆偏温暖、稳定。这样观众即使不依赖字幕，也能从影像风格上感受到乔在不同心理状态之间切换。',
  '这部短片的声音非常重要。我们希望通过声音完成现实和回忆之间的转场，比如电视里的炮火声逐渐变成真实战场声。打火机的“咔哒”声、乔的呼吸声和白鸽叫声都会成为关键声音符号，帮助观众进入人物心理。',
  '本片计划以 AIGC 生成影片为主要技术方案。我们会先根据剧本和分镜表，把每个镜头拆解成画面提示词，包括人物状态、景别、镜头角度、场景氛围和色彩风格。生成后再进行筛选和剪辑，并通过声音设计、调色和字幕包装，让不同 AI 片段之间形成连贯叙事。由于作业要求原创，我们会避免直接搬运网络素材，而是以自有剧本、分镜和提示词生成画面，再进行二次剪辑和后期处理。',
  '接下来的重点是把目前已有的一分多钟片段扩展成完整五分钟版本。我们会先统一文本设定，再根据扩展方案补拍关键镜头，最后通过剪辑、声音和调色提升完整度。',
  '我们希望最终成片不是简单展示战争场面，而是通过一个人的夜晚、一段回忆和一个象征物，表现战争创伤对人的长期影响。片名《梦白鸽》中的“梦”代表回忆和幻觉，“白鸽”代表和平、友谊以及主人公仍然渴望到达的内心平静。',
  '这里选取树下回忆中的一段剧本。它表面上是乔和约翰围绕打火机开玩笑，但实际上完成了三个功能：第一，建立两个人轻松自然的战友情；第二，让打火机从普通道具变成有情感来源的遗物；第三，让白鸽意象提前出现，为结尾乔重新面对创伤埋下伏笔。',
  '以上就是《梦白鸽》的中期汇报。我们后续会继续完善剧本、补拍镜头，并完成约五分钟的最终成片。谢谢大家。',
];

export const meta: SlideMeta = { title: '《梦白鸽》中期汇报 · A Field Guide' };
export default [
  Cover,
  Theme,
  Synopsis,
  CurrentBase,
  FiveMinutes,
  Revisions,
  Camera,
  Sound,
  Technical,
  Schedule,
  Expected,
  ScriptExcerpt,
  Closing,
] satisfies Page[];
