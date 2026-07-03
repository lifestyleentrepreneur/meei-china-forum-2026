import type {
  NavItem,
  SummitHighlight,
  ImpactFact,
  WhyAttendItem,
  Speaker,
  TicketPackage,
  AttendeeType,
  FAQ,
  ContactDetails,
  PartnerPlaceholder,
  MediaConfig,
  AgendaDay,
} from "@/types";

export const siteConfig = {
  siteName: "MEEI Program",
  siteUrl: "https://www.meeiconference.org",
  organizer: "MEEI Program",
  organizerTagline: "Bridging the Gap, Creating Success",
  eventName: "China–Africa Business & Investment Summit 2026",
  eventNameShort: "MEEI 2026",
  theme: "From Dependency to Prosperity",
  themeDescription:
    "Building Sustainable Africa–China Trade, Investment and Industrial Partnerships",
  dates: "17–20 October 2026",
  dateStart: "2026-10-17",
  dateEnd: "2026-10-20",
  registrationCloses: "31 August 2026",
  venue: "Vienna International Hotel",
  venueAddress: "No. 603, Sanyuanli Avenue, Yuexiu, Guangzhou, Guangdong, China",
  venueCity: "Guangzhou, China",
  closingMessages: [
    { text: "STRONGER TOGETHER", color: "green" },
    { text: "PROSPEROUS TOGETHER", color: "gold" },
    { text: "SUSTAINABLE TOGETHER", color: "ivory" },
  ],
  metaTitle:
    "China–Africa Business & Investment Summit 2026 | MEEI Program",
  metaDescription:
    "Join the China–Africa Business & Investment Summit 2026 in Guangzhou, China, from 17–20 October 2026. Explore trade, investment, manufacturing, market access, business matchmaking, and sustainable industrial partnerships.",
  canonicalUrl: "https://www.meeiconference.org",
  themeColor: "#050806",
};

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Highlights", href: "/#highlights" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Registration", href: "/#registration" },
  { label: "Venue", href: "/#venue" },
  { label: "Contact", href: "/#contact" },
];

export const summitHighlights: SummitHighlight[] = [
  {
    id: "investment",
    icon: "investment",
    heroImage: "/images/CRO00278.jpg",
    title: "Investment Opportunities",
    description:
      "Explore potential investment sectors, emerging markets, and cross-border business opportunities.",
    tagline: "Discover Africa's fastest-growing investment frontiers",
    body: [
      "Africa represents one of the world's most dynamic investment frontiers, with rapidly growing economies, a young and expanding middle class, and untapped resource and infrastructure potential. MEEI 2026 connects capital with opportunity, directly and efficiently.",
      "Delegates will engage in curated investment presentations, sector-specific panels, and one-on-one meetings with government and private sector representatives from across the continent. Whether your focus is infrastructure, energy, agribusiness, technology, or consumer markets, the summit provides a structured environment to explore real investment opportunities.",
    ],
    keyBenefits: [
      "Connect directly with African government and private-sector investment representatives",
      "Gain first-hand insight into sector-specific return profiles and risk environments",
      "Explore infrastructure, energy, agribusiness, fintech, and manufacturing opportunities",
      "Understand regulatory frameworks, incentive structures, and risk mitigation strategies",
    ],
    whoFor: [
      "Institutional investors and asset managers",
      "Family offices and high-net-worth individuals",
      "Venture capital and private equity firms",
      "Development finance institutions and impact investors",
    ],
  },
  {
    id: "manufacturing",
    icon: "manufacturing",
    heroImage: "/images/DSC_1067.JPG",
    title: "Manufacturing Partnerships",
    description:
      "Connect with manufacturers, industrial operators, suppliers, and potential production partners.",
    tagline: "Connect with China's industrial ecosystem",
    body: [
      "China's manufacturing ecosystem is among the most advanced and diversified in the world. MEEI 2026 creates a direct bridge between African businesses seeking production partners and Chinese manufacturers ready to expand their footprint across the continent.",
      "From electronics and textiles to agricultural processing, construction materials, and industrial machinery, the summit provides a platform to explore contract manufacturing, joint ventures, technology transfer, and supply chain integration. Participants leave with actionable relationships and a clearer roadmap to industrial partnership.",
    ],
    keyBenefits: [
      "Access China's advanced manufacturing capabilities, technology, and supply chains",
      "Identify contract manufacturing, OEM, and joint venture opportunities",
      "Explore established industrial zones and special economic areas",
      "Build long-term supplier, production, and technology transfer relationships",
    ],
    whoFor: [
      "African manufacturers seeking Chinese technology and production partners",
      "Chinese manufacturers planning Africa market entry or expansion",
      "Supply chain and logistics specialists",
      "Industrial zone developers and SEZ administrators",
    ],
  },
  {
    id: "trade",
    icon: "export",
    heroImage: "/images/DSC_0235.JPG",
    title: "Trade & Export Development",
    description:
      "Gain practical insight into expanding trade, improving export readiness, and accessing new markets.",
    tagline: "Navigate Africa–China trade pathways with confidence",
    body: [
      "Bilateral trade between Africa and China has grown significantly over the past two decades, yet the full potential of this relationship remains largely untapped. MEEI 2026 focuses on identifying the practical pathways, logistical, financial, regulatory, and relational, that unlock that potential.",
      "Sessions on trade facilitation, export readiness, customs and compliance, trade finance, and market intelligence are designed to give delegates a clear, actionable picture of how to grow cross-border trade. Participants will meet buyers, distributors, freight forwarders, and trade support organizations from both regions.",
    ],
    keyBenefits: [
      "Learn export readiness best practices tailored to both African and Chinese markets",
      "Engage with trade finance, insurance, and logistics specialists",
      "Understand tariff structures, trade agreements, and compliance requirements",
      "Meet buyers, distributors, and trade facilitation partners from both continents",
    ],
    whoFor: [
      "Exporters and importers across all sectors",
      "Trade finance and insurance professionals",
      "Logistics, freight, and shipping companies",
      "Chamber of commerce and trade association representatives",
    ],
  },
  {
    id: "matchmaking",
    icon: "b2b",
    heroImage: "/images/DSC_0802.JPG",
    title: "B2B Matchmaking Sessions",
    description:
      "Participate in focused networking opportunities designed to encourage relevant business connections.",
    tagline: "Structured one-on-one meetings with the right business partners",
    body: [
      "Random networking rarely produces the results that structured business matchmaking does. The MEEI 2026 B2B Matchmaking Programme pre-schedules targeted meetings between delegates based on declared business objectives, sector, and geographic focus, maximising the value of every hour at the summit.",
      "Each matchmaking participant completes a business profile before the event, enabling our coordination team to arrange meetings with the most relevant counterparts. Dedicated matchmaking zones and coordinators ensure sessions run smoothly and that follow-up opportunities are captured and supported.",
    ],
    keyBenefits: [
      "Pre-scheduled meetings with vetted, qualified, and relevant businesses",
      "Profile-based matching aligned to your sector and business objectives",
      "Dedicated matchmaking coordinators present throughout the summit",
      "Follow-up facilitation and post-summit relationship support",
    ],
    whoFor: [
      "Business development and partnership professionals",
      "CEOs and founders actively seeking distribution or investment partners",
      "Procurement and sourcing managers",
      "Investment scouts and business development representatives",
    ],
  },
  {
    id: "dialogue",
    icon: "parliament",
    heroImage: "/images/CRO00023.jpg",
    title: "Government & Private Sector Dialogue",
    description:
      "Engage in conversations around policy, investment, industry, and sustainable economic cooperation.",
    tagline: "Where policy and commerce converge",
    body: [
      "Sustainable economic growth between Africa and China depends not only on business deals but on the policy environments that enable them. MEEI 2026 brings government representatives, regulators, multilateral institutions, and senior business leaders into the same room, creating a rare and productive dialogue.",
      "Roundtables and panel sessions explore investment facilitation, trade policy, industrial cooperation frameworks, and the future of bilateral agreements. These conversations are designed to produce tangible outcomes: shared declarations, new frameworks, and the relationships that make future cooperation possible.",
    ],
    keyBenefits: [
      "Engage with ministers, regulators, and senior officials from both regions",
      "Understand the policy landscape shaping Africa–China economic cooperation",
      "Participate in roundtables on investment facilitation and trade policy reform",
      "Contribute to declarations and frameworks shaping future bilateral agreements",
    ],
    whoFor: [
      "Government representatives, ministers, and diplomats",
      "Policy advisors, think-tank leaders, and academics",
      "Senior corporate executives engaging in government relations",
      "Multilateral development organization representatives",
    ],
  },
  {
    id: "factory",
    icon: "factory",
    heroImage: "/images/DSC_1005.JPG",
    title: "Factory Visits & Business Tours",
    description:
      "Discover selected business and industrial environments through organized professional visits.",
    tagline: "See China's industrial capabilities first-hand",
    body: [
      "No presentation or pitch deck replaces the experience of seeing a production facility operating at scale. MEEI 2026 organizes curated visits to selected Guangzhou industrial facilities, giving delegates direct, unmediated access to the manufacturing capabilities, technologies, and processes that define China's industrial ecosystem.",
      "Each visit is professionally organized and accompanied by briefings from facility management and technical teams. Delegates leave with a concrete understanding of production capacity, quality standards, lead times, and the practical requirements of establishing a manufacturing relationship.",
    ],
    keyBenefits: [
      "Curated visits to Guangzhou's leading industrial facilities and business parks",
      "Direct engagement with factory management and technical operations teams",
      "First-hand understanding of production capacity, technology, and quality standards",
      "Identify real-time sourcing, manufacturing, and partnership opportunities on-site",
    ],
    whoFor: [
      "African entrepreneurs and businesses exploring Chinese manufacturing",
      "Procurement and sourcing specialists",
      "Investors assessing manufacturing or industrial assets",
      "Engineers, product managers, and supply chain strategists",
    ],
  },
  {
    id: "market-access",
    icon: "map",
    heroImage: "/images/DSC_0235.JPG",
    title: "Africa–China Market Access Strategies",
    description:
      "Learn about practical approaches to entering, navigating, and developing Africa–China markets.",
    tagline: "Practical frameworks for entering and navigating new markets",
    body: [
      "Entering a new market, whether in Africa or in China, requires more than ambition. It requires market intelligence, regulatory knowledge, distribution networks, and trusted local relationships. MEEI 2026 addresses all of these through dedicated market access sessions led by practitioners with real on-the-ground experience.",
      "Content covers consumer trends, distribution infrastructure, regulatory pathways, digital commerce, and go-to-market strategy, both for African businesses entering China and for Chinese businesses expanding across the continent. Delegates gain frameworks, contacts, and clarity.",
    ],
    keyBenefits: [
      "Understand market entry strategies, distribution networks, and regulatory pathways",
      "Learn from businesses that have successfully entered African and Chinese markets",
      "Access market intelligence on consumer trends, demand sectors, and competitive dynamics",
      "Develop go-to-market strategies with advisors who know both markets",
    ],
    whoFor: [
      "Businesses planning African or Chinese market entry",
      "Marketing, distribution, and e-commerce strategists",
      "Retail, consumer goods, and FMCG sector players",
      "Consultants and advisors specializing in Africa–China trade",
    ],
  },
];

export const impactFacts: ImpactFact[] = [
  {
    value: "4",
    label: "Days",
    description: "Summit Duration",
  },
  {
    value: "7",
    label: "Focus Areas",
    description: "Business and Investment Priorities",
  },
  {
    value: "GZ",
    label: "Guangzhou",
    description: "Host City",
  },
  {
    value: "2026",
    label: "Edition",
    description: "Summit Edition",
  },
];

export const whyAttendItems: WhyAttendItem[] = [
  { text: "Explore Africa–China trade and investment opportunities" },
  { text: "Build strategic relationships with business stakeholders" },
  { text: "Gain insight into industrial and market-access strategies" },
  { text: "Participate in focused business matchmaking" },
  {
    text: "Engage with conversations shaping sustainable partnerships",
  },
];

export const speakerPlaceholders: Speaker[] = [
  {
    id: "speaker-daniel",
    name: "Dr Daniel",
    role: "Founder & Convener",
    organization: "MEEI Program",
    country: null,
    image: "/images/speakers/daniel.jpg",
    bio: "Founder of the MEEI Program and a leading voice in Africa–China economic cooperation, Dr Daniel has spent his career building practical bridges for trade, investment, and industrial partnership between the two regions.",
    featured: true,
  },
  {
    id: "speaker-farel",
    name: "Farel Honvoh",
    role: "Co-organizer",
    organization: "MEEI Program",
    country: null,
    image: "/images/speakers/farel.jpg",
    bio: "Entrepreneur and speaker focused on connecting African and Chinese markets, Farel helps businesses navigate cross-border trade, market access, and investment to turn opportunity into lasting partnership.",
    featured: true,
  },
];

export const ticketPackages: TicketPackage[] = [
  {
    id: "delegate",
    name: "Delegate Pass",
    priceLabel: "Price to be announced",
    description:
      "Access to all plenary sessions, panel discussions, and summit networking events.",
    features: [
      "Full summit access",
      "Networking events",
      "Summit materials",
      "Certificate of attendance",
    ],
    highlighted: false,
    badge: null,
    passSlug: "delegate",
  },
  {
    id: "business",
    name: "Business Matchmaking Pass",
    priceLabel: "Price to be announced",
    description:
      "Includes delegate access plus participation in the structured B2B matchmaking programme.",
    features: [
      "Everything in Delegate Pass",
      "B2B matchmaking sessions",
      "Business directory listing",
      "Priority networking access",
    ],
    highlighted: true,
    badge: null,
    passSlug: "business",
  },
  {
    id: "vip",
    name: "VIP Delegation Pass",
    priceLabel: "Price to be announced",
    description:
      "Premium access with enhanced privileges and dedicated support throughout the summit.",
    features: [
      "Everything in Business Matchmaking Pass",
      "VIP networking reception",
      "Dedicated liaison support",
      "Factory visits & business tours",
    ],
    highlighted: false,
    badge: "PREMIUM",
    passSlug: "vip",
  },
];

export const attendeeTypes: AttendeeType[] = [
  {
    id: "investors",
    icon: "TrendingUp",
    title: "Investors",
    description:
      "Individuals and institutions exploring cross-border investment in Africa and China.",
  },
  {
    id: "entrepreneurs",
    icon: "Lightbulb",
    title: "Entrepreneurs",
    description:
      "Business founders seeking international expansion, partnerships, or market entry.",
  },
  {
    id: "manufacturers",
    icon: "Factory",
    title: "Manufacturers",
    description:
      "Industrial operators interested in production partnerships and supply-chain development.",
  },
  {
    id: "trade",
    icon: "Package",
    title: "Exporters and Importers",
    description:
      "Trade professionals seeking new markets, routes, and business relationships.",
  },
  {
    id: "government",
    icon: "Landmark",
    title: "Government Representatives",
    description:
      "Officials engaged in trade, investment, and economic development policy.",
  },
  {
    id: "agencies",
    icon: "Globe",
    title: "Trade and Investment Agencies",
    description:
      "Bodies that promote international trade, foreign direct investment, and economic cooperation.",
  },
  {
    id: "associations",
    icon: "Users",
    title: "Business Associations",
    description:
      "Industry groups and chambers of commerce representing member interests across sectors.",
  },
  {
    id: "corporate",
    icon: "Building",
    title: "Corporate Leaders",
    description:
      "Executives and decision-makers from companies active in African or Chinese markets.",
  },
  {
    id: "industrial",
    icon: "Wrench",
    title: "Industrial Operators",
    description:
      "Companies involved in manufacturing, processing, logistics, and industrial development.",
  },
  {
    id: "services",
    icon: "Briefcase",
    title: "Professional Service Providers",
    description:
      "Legal, financial, consulting, and advisory professionals supporting international business.",
  },
];

export const faqs: FAQ[] = [
  {
    id: "pricing",
    question: "When will ticket prices be announced?",
    answer:
      "Official ticket prices and package details will be published by MEEI Program. Register your interest today to be notified as soon as pricing is available.",
  },
  {
    id: "venue",
    question: "Where will the summit take place?",
    answer:
      "The summit will take place at Vienna International Hotel, No. 603, Sanyuanli Avenue, Yuexiu, Guangzhou, Guangdong, China.",
  },
  {
    id: "dates",
    question: "What are the summit dates?",
    answer:
      "The summit is scheduled for 17–20 October 2026.",
  },
  {
    id: "who",
    question: "Who can attend?",
    answer:
      "The summit is intended for professionals and organizations interested in Africa–China trade, investment, manufacturing, market access, and industrial partnerships.",
  },
  {
    id: "visa",
    question: "Will visa-related information be provided?",
    answer:
      "Visa-support and invitation-letter procedures will be communicated through the official summit channels when available. Please contact info@meeiconference.org for enquiries.",
  },
  {
    id: "contact",
    question: "How can I contact the organizers?",
    answer:
      "You can reach the organizing team by email at info@meeiconference.org, by phone at +86 130 2203 1801, +234 806 361 8106, or +90 531 965 7443, or through the contact section on this website.",
  },
];

export const contactDetails: ContactDetails = {
  email: "info@meeiconference.org",
  phones: [
    { label: "China", number: "+8613022031801", display: "+86 130 2203 1801" },
    {
      label: "Nigeria",
      number: "+2348063618106",
      display: "+234 806 361 8106",
    },
    {
      label: "Turkey",
      number: "+905319657443",
      display: "+90 531 965 7443",
    },
  ],
  website: "https://www.meeiconference.org",
  websiteDisplay: "www.meeiconference.org",
  venueShort: "Vienna International Hotel, Guangzhou, China",
  venueFull:
    "Vienna International Hotel, No. 603, Sanyuanli Avenue, Yuexiu, Guangzhou, Guangdong, China",
};

export const partnerPlaceholders: PartnerPlaceholder[] = [
  { id: "partner-1", label: "Partner logo", image: null },
  { id: "partner-2", label: "Partner logo", image: null },
  { id: "partner-3", label: "Partner logo", image: null },
  { id: "partner-4", label: "Partner logo", image: null },
  { id: "partner-5", label: "Partner logo", image: null },
  { id: "partner-6", label: "Partner logo", image: null },
];

export const agendaDays: AgendaDay[] = [
  {
    id: "day-1",
    date: "17 Oct",
    label: "Day 1",
    theme: "Arrival & Opening",
    sessions: [
      { time: "09:00", title: "Registration & Welcome", description: "Delegate check-in and networking welcome reception." },
      { time: "14:00", title: "Opening Ceremony", description: "Official opening address and keynote session." },
      { time: "17:00", title: "Keynote Panel", description: "Africa–China economic ties: opportunities and priorities." },
      { time: "19:00", title: "Networking Dinner", description: "Hosted welcome dinner for all delegates." },
    ],
  },
  {
    id: "day-2",
    date: "18 Oct",
    label: "Day 2",
    theme: "Trade & Investment",
    sessions: [
      { time: "09:00", title: "Plenary: Trade Landscape", description: "Overview of Africa–China trade flows and emerging sectors." },
      { time: "11:00", title: "Investment Showcase", description: "Country and sector-level investment opportunity presentations." },
      { time: "14:00", title: "Breakout Sessions", description: "Sector-specific deep dives: manufacturing, agri, energy, logistics." },
      { time: "17:00", title: "B2B Matchmaking, Session 1", description: "Structured one-on-one business meetings." },
    ],
  },
  {
    id: "day-3",
    date: "19 Oct",
    label: "Day 3",
    theme: "Industry & Matchmaking",
    sessions: [
      { time: "09:00", title: "Factory & Industrial Visits", description: "Organized visits to selected Guangzhou industrial facilities." },
      { time: "14:00", title: "Manufacturing Partnerships Forum", description: "Panel and Q&A on production and supply-chain collaboration." },
      { time: "16:00", title: "B2B Matchmaking, Session 2", description: "Continued structured one-on-one meetings." },
      { time: "19:00", title: "Cultural Exchange Evening", description: "Informal networking and cultural programme." },
    ],
  },
  {
    id: "day-4",
    date: "20 Oct",
    label: "Day 4",
    theme: "Policy & Closing",
    sessions: [
      { time: "09:00", title: "Government & Policy Dialogue", description: "Roundtable with government representatives on trade facilitation." },
      { time: "11:00", title: "Market Access Strategies Panel", description: "Practical pathways for entering African and Chinese markets." },
      { time: "14:00", title: "Summit Declarations", description: "Presentation of summit outcomes and partnership commitments." },
      { time: "15:30", title: "Closing Ceremony & Reception", description: "Formal closing address and farewell networking reception." },
    ],
  },
];

export const mediaConfig: MediaConfig = {
  heroImage: null,
  heroImageAlt:
    "Hero media: Africa–China business partnership, Guangzhou skyline, trade and industry",
  trailerVideoUrl: process.env.NEXT_PUBLIC_SUMMIT_VIDEO_URL ?? null,
  trailerPoster: null,
  aboutVideoUrl: null,
  aboutPoster: null,
  venueImage: null,
  factoryVisitImage: null,
  matchmakingImage: null,
};
