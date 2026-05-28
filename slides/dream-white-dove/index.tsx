import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

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
    hero: 150,
    body: 29,
  },
  radius: 10,
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
const PAD_Y = 102;
const TOTAL = 14;

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
    <defs>
      <filter id="paperGrain">
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
    <rect width="100%" height="100%" filter="url(#paperGrain)" />
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
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '0.24em',
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
    <span>Anti-Diaspora Local Practice · {section}</span>
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
      FILE / CH04 / {String(page).padStart(2, '0')}
    </div>
    <div style={{ position: 'absolute', right: 108, bottom: 104, opacity: 0.1 }}>
      <DoveMark size={340} color={accent} />
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    <Footer page={page} section={section} />
  </div>
);

const Title = ({ children, size = 92 }: { children: React.ReactNode; size?: number }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 400,
      lineHeight: 1.08,
      letterSpacing: 0,
      margin: '26px 0 0',
    }}
  >
    {children}
  </h2>
);

const Rule = ({ width = 360 }: { width?: number }) => (
  <div style={{ width, height: 1, background: palette.rule, margin: '36px 0' }} />
);

const Body = ({ children, width = 1180 }: { children: React.ReactNode; width?: number }) => (
  <p style={{ fontSize: 35, lineHeight: 1.54, maxWidth: width, margin: 0 }}>{children}</p>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 21,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: palette.muted,
      marginBottom: 16,
    }}
  >
    {children}
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

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <div style={{ display: 'grid', gap: 18, maxWidth: 1180 }}>
    {items.map((item, index) => (
      <div
        key={String(index)}
        style={{
          display: 'grid',
          gridTemplateColumns: '46px 1fr',
          alignItems: 'baseline',
          fontSize: 33,
          lineHeight: 1.34,
        }}
      >
        <span style={{ fontFamily: fonts.mono, color: palette.accent, fontSize: 23 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const TwoColumn = ({ left, right, ratio = '1fr 1fr' }: { left: React.ReactNode; right: React.ReactNode; ratio?: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: ratio, gap: 32, alignItems: 'start' }}>
    {left}
    {right}
  </div>
);

const HighlightBand = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      marginTop: 28,
      padding: '20px 24px',
      background: palette.accentSoft,
      borderLeft: `5px solid ${palette.accent}`,
      fontSize: 32,
      lineHeight: 1.42,
      maxWidth: 1180,
    }}
  >
    {children}
  </div>
);

const SmallCapsule = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 14px',
      border: `1px solid ${palette.line}`,
      background: palette.surface,
      borderRadius: 999,
      fontFamily: fonts.mono,
      fontSize: 20,
      letterSpacing: '0.08em',
    }}
  >
    {children}
  </span>
);

const FilmRefGrid = ({ items }: { items: string[] }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 24 }}>
    {items.map((item) => (
      <SmallCapsule key={item}>{item}</SmallCapsule>
    ))}
  </div>
);

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
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
      <Eyebrow>Film studies · chapter report</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 130,
          fontWeight: 400,
          lineHeight: 1.12,
          letterSpacing: 0,
          margin: '30px 0 0',
        }}
      >
        反离散的在地实践
        <span style={{ display: 'block', fontSize: 58, lineHeight: 1.22, marginTop: 18 }}>
          以陈翠梅和刘城达的大荒电影为中心
        </span>
      </h1>
      <Rule width={560} />
      <p
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 38,
          lineHeight: 1.38,
          fontStyle: 'italic',
          maxWidth: 820,
          margin: 0,
        }}
      >
        许维贤《华语电影在后马来西亚：土腔风格、华夷风与作者论》第四章汇报
      </p>
      <div
        style={{
          marginTop: 44,
          display: 'grid',
          gap: 12,
          fontFamily: fonts.mono,
          fontSize: 24,
          color: palette.muted,
        }}
      >
        <span>TOPIC / 后马来西亚 · 华语语系 · 电影研究</span>
        <span>DURATION / 20 分钟</span>
        <span>FORMAT / 14 页章节汇报</span>
      </div>
    </div>
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: palette.text }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(230, 221, 205, 0.08)' }} />
      <div
        style={{
          position: 'absolute',
          inset: 54,
          border: '1px solid rgba(245, 239, 228, 0.18)',
          display: 'grid',
          alignContent: 'space-between',
          padding: '48px 42px',
        }}
      >
        <div>
          <div style={{ fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.16em', color: '#d5cbc0' }}>
            KEYWORDS
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'grid',
              gap: 14,
              color: palette.bg,
              fontSize: 28,
              lineHeight: 1.26,
            }}
          >
            <span>地方经验</span>
            <span>多语生产</span>
            <span>阶级政治</span>
            <span>华巫越界</span>
            <span>反国家神话</span>
          </div>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <DoveMark size={154} color={palette.bg} />
        </div>
      </div>
    </div>
  </div>
);

const Thesis: Page = () => (
  <PageShell page={2} section="Thesis">
    <Eyebrow>Core question</Eyebrow>
    <Title>本章核心问题</Title>
    <Rule />
    <BulletList
      items={[
        '如果马华电影不再只被理解为“离散华人电影”，它还能如何讲述身份？',
        '“反离散”是否等于回到马来西亚国家认同？',
        '大荒电影如何通过语言、阶级和华巫关系实践本土化？',
      ]}
    />
  </PageShell>
);

const Agenda: Page = () => (
  <PageShell page={3} section="Agenda" accent={palette.blue}>
    <Eyebrow color={palette.blue}>Argument map</Eyebrow>
    <Title>章节结构与论证路线</Title>
    <Rule />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, marginTop: 14 }}>
      {[
        '大荒电影：土腔电影模式',
        '哀悼马共和再现底层：阶级面向',
        '刘城达：华巫关系的越界',
        '陈翠梅：反离散与后马来西亚',
        '华语语系作为电影书信的连接',
      ].map((item, index) => (
        <Card key={item}>
          <div style={{ fontFamily: fonts.mono, fontSize: 19, color: palette.accent, marginBottom: 18 }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 31, lineHeight: 1.36 }}>{item}</div>
        </Card>
      ))}
    </div>
    <HighlightBand>生产模式 → 阶级政治 → 华巫越界 → 地方经验 → 电影书信</HighlightBand>
  </PageShell>
);

const Compare: Page = () => (
  <PageShell page={4} section="Shift">
    <Eyebrow>Conceptual shift</Eyebrow>
    <Title>从“离散”到“反离散”</Title>
    <Rule />
    <TwoColumn
      left={
        <Card>
          <Label>离散论述常强调</Label>
          <BulletList items={['原乡想象', '漂泊与失根', '中国/华人文化中心', '跨国移动中的身份焦虑']} />
        </Card>
      }
      right={
        <Card tone="ink">
          <Label>反离散的在地实践强调</Label>
          <BulletList items={['本土化过程', '地方政治主体', '多语和边缘经验', '对中心与国家的双重反思']} />
        </Card>
      }
    />
  </PageShell>
);

const Profile: Page = () => (
  <PageShell page={5} section="Collective" accent={palette.green}>
    <Eyebrow color={palette.green}>Collective profile</Eyebrow>
    <Title>为什么是大荒电影？</Title>
    <Rule />
    <BulletList
      items={[
        '2005 年成立于吉隆坡',
        '创办成员包括陈翠梅、刘城达、李添兴、阿謬',
        '成员跨族群、跨语言、跨教育背景',
        '不是纯粹的“华人电影公司”',
        '更像独立电影社群和资源平台',
      ]}
    />
    <HighlightBand>大荒电影本身就挑战了“华人电影”的边界。</HighlightBand>
  </PageShell>
);

const Concept: Page = () => (
  <PageShell page={6} section="Dialect mode">
    <Eyebrow>Concept</Eyebrow>
    <Title>“土腔电影模式”不只是口音</Title>
    <Rule />
    <BulletList
      items={[
        '多语文本：华语、马来语、英语、方言并置',
        '手工式生产：导演常兼演员、剪辑、摄影、制片',
        '低成本运作：依靠影展、版权、DVD 和跨国网络',
        '社群合作：共享器材、信息、影展资源',
      ]}
    />
    <HighlightBand>“土腔”既是语言风格，也是生产条件、流通方式和美学形式。</HighlightBand>
  </PageShell>
);

const Argument: Page = () => (
  <PageShell page={7} section="Class turn" accent={palette.blue}>
    <Eyebrow color={palette.blue}>Key turn</Eyebrow>
    <Title>本章最关键的转向</Title>
    <Rule />
    <Card tone="ink">
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 74, lineHeight: 1.08 }}>从族群问题到阶级问题</div>
    </Card>
    <div style={{ marginTop: 28 }}>
      <BulletList
        items={[
          '土著/非土著制度表面是族群划分',
          '实际牵涉资源分配、阶级利益和国家治理',
          '如果只讲“华人受压迫”，容易固化华巫二元对立',
          '大荒电影把问题提升到“公民的阶级问题”',
        ]}
      />
    </div>
  </PageShell>
);

const CaseOne: Page = () => (
  <PageShell page={8} section="Case study I">
    <Eyebrow>Case study</Eyebrow>
    <Title>案例一：马共记忆与底层历史</Title>
    <Rule />
    <BulletList
      items={[
        '阿謬的马共纪录片重新召回华巫共同参与阶级斗争的历史',
        '重点不是神圣化马共，而是恢复被遮蔽的历史维度',
        '华巫关系因此不再被理解为天然对立',
        '《你的心可能硬如磐石》则把马共记忆与底层爱情故事并置',
      ]}
    />
    <FilmRefGrid items={['The Last Communist', 'Village People Radio Show', "It’s Possible Your Heart Cannot Be Broken"]} />
  </PageShell>
);

const CaseTwo: Page = () => (
  <PageShell page={9} section="Case study II" accent={palette.accent}>
    <Eyebrow>Case study</Eyebrow>
    <Title>案例二：《追逐猫和车》</Title>
    <Body width={980}>副标题：身体缺席，阶级显影</Body>
    <Rule />
    <BulletList
      items={[
        '华裔工人与巫裔司机发生车祸',
        '医院场景中，伤者常以声音、断脚、局部身体出现',
        '华裔/巫裔身份被弱化',
        '底层公民的脆弱处境成为核心',
        '影片批判医院体制冷漠和公共服务失灵',
      ]}
    />
  </PageShell>
);

const CaseThree: Page = () => (
  <PageShell page={10} section="Case study III" accent={palette.green}>
    <Eyebrow color={palette.green}>Case study</Eyebrow>
    <Title>案例三：《口袋里的花》</Title>
    <Body width={980}>副标题：华巫关系的越界</Body>
    <Rule />
    <BulletList
      items={[
        '华裔小兄弟与巫裔女孩阿鱼的友谊',
        '学校、语言、家庭、食物构成华巫边界',
        '儿童视角呈现边界如何被制造，也如何被越过',
        '影片打破“巫裔贫穷、华裔富裕”的刻板印象',
        '饭桌和食物成为资源分配的隐喻',
      ]}
    />
  </PageShell>
);

const CaseFour: Page = () => (
  <PageShell page={11} section="Case study IV" accent={palette.blue}>
    <Eyebrow color={palette.blue}>Case study</Eyebrow>
    <Title>案例四：陈翠梅的地方经验</Title>
    <Rule />
    <BulletList
      items={[
        '《用爱征服一切》：华人角色主动进入马来甘榜',
        '穆斯林问候语象征族群/宗教边界的越界',
        '《无夏之年》：华裔导演拍摄全马来语故乡电影',
        '蛇河村经验说明“在地”不是抽象国家，而是具体地方关系',
      ]}
    />
  </PageShell>
);

const Critique: Page = () => (
  <PageShell page={12} section="Critique">
    <Eyebrow>Critique</Eyebrow>
    <Title>反离散不等于国家主义</Title>
    <Rule />
    <BulletList
      items={[
        '《辐射村求生手册》《黎群的爱》：反莱纳斯稀土厂',
        '地方、环境、跨族群公共行动被连接起来',
        '《一个未来》讽刺“一個马来西亚”的国族乌托邦',
        '完美国家叙事背后是禁止说话、惩罚异议',
      ]}
    />
  </PageShell>
);

const LetterCinema: Page = () => (
  <PageShell page={13} section="Letter cinema" accent={palette.green}>
    <Eyebrow color={palette.green}>Translocal connection</Eyebrow>
    <Title>《南方来信》与电影书信</Title>
    <Rule />
    <BulletList
      items={[
        '六部东南亚短片合集',
        '主题是“原乡与离散”',
        '以书信体连接不同地方、语言和记忆',
        '观众成为“第一收信人”',
        '陈翠梅《马六甲夜话》在结尾解构原乡神话',
      ]}
    />
  </PageShell>
);

const Summary: Page = () => (
  <PageShell page={14} section="Summary" accent={palette.accent}>
    <Eyebrow>Summary</Eyebrow>
    <Title>总结</Title>
    <Rule />
    <div style={{ display: 'grid', gap: 18 }}>
      {[
        '把马华电影从“离散华人”推进到“在地公民政治”',
        '把华巫关系从族群对立推进到阶级、制度和公共生活问题',
        '把华语语系理解为连接方式，而不是中国中心的文化标签',
      ].map((point, index) => (
        <Card key={point}>
      <div style={{ display: 'grid', gridTemplateColumns: '58px 1fr', gap: 18, alignItems: 'start' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 25, color: palette.accent }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.44 }}>{point}</div>
          </div>
        </Card>
      ))}
    </div>
  </PageShell>
);

export const notes = [
  '这一章主要讨论马华电影如何从“离散华人”的身份框架中转出来，进入马来西亚本地的语言、阶级、族群和地方政治。核心对象是大荒电影。',
  '这里的“反离散”不是反对离散经验，也不是回到单一国家认同，而是把身份问题放回马来西亚本地的现实结构中。',
  '整章的推进逻辑很清楚，不是平铺案例，而是从生产模式一步步进入身份政治和地方经验。',
  '离散关心“我从哪里来”，反离散更关心“我如何在这里生活”。许维贤在这个意义上使用“反离散”。',
  '大荒电影同时有华裔和巫裔成员，影片里也混杂华语、马来语、英语和方言，天然适合讨论华语语系和本土化。',
  '“土腔”定义比较宽泛，它不是单纯的语言口音，而是一整套边缘化、低成本、跨语、跨境的电影生产方式。',
  '作者并不是否认族群矛盾，而是认为单纯的族群视角会被国家种族主义框架限制；大荒电影试图看到不同族群底层共享的制度困境。',
  '这里的重点是历史记忆。马共作为一个接口，让华巫关系不只剩下对立，也出现共同的阶级历史。',
  '这部短片很适合说明作者如何把族群问题转成阶级问题。真正被凸显的不是谁撞了谁，而是底层身体在制度面前如何被忽视。',
  '《口袋里的花》非常重要，因为它用儿童视角讲边界问题。影片里的华巫关系不是宏大政治口号，而是体现在学校、家庭和吃饭这些日常场景中。',
  '陈翠梅最有意思的地方是，她把“在地”建立在自己的生活经验上，所以她拍马来语故乡电影并不是身份背离，反而是最自然的地方实践。',
  '这一点很关键。反离散并不意味着拥抱国家主义，陈翠梅的电影始终对国家机器保持怀疑。',
  '《南方来信》把华语语系变成一种连接方式，而不是回到中国中心。它让不同地方的影像彼此通信。',
  '最后可以把整章压缩成一句话：大荒电影让“马华身份”从离散叙事中松动出来，变成一个不断在本地现实中重新协商的位置。',
];

export const meta: SlideMeta = { title: '反离散的在地实践：以陈翠梅和刘城达的大荒电影为中心' };

export default [
  Cover,
  Thesis,
  Agenda,
  Compare,
  Profile,
  Concept,
  Argument,
  CaseOne,
  CaseTwo,
  CaseThree,
  CaseFour,
  Critique,
  LetterCinema,
  Summary,
] satisfies Page[];
