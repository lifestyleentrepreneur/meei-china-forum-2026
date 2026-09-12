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
  siteUrl: "https://chinasummit.meeihub.com",
  organizer: "MEEI Program",
  organizerTagline: "Bridging the Gap, Creating Success",
  eventName: "China–Africa Business & Investment Summit 2026",
  eventNameShort: "MEEI 2026",
  theme: "From Dependency to Prosperity",
  themeDescription:
    "Building Sustainable Africa–China Trade, Investment and Industrial Partnerships",
  dates: "17–21 October 2026",
  dateStart: "2026-10-17",
  dateEnd: "2026-10-21",
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
    "Join the China–Africa Business & Investment Summit 2026 in Guangzhou, China, on 17–21 October 2026. Explore trade, investment, manufacturing, market access, business matchmaking, and sustainable industrial partnerships.",
  canonicalUrl: "https://chinasummit.meeihub.com",
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
    value: "5",
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
    bio: "Entrepreneur and AI engineer building technological solutions for businesses. Farel bridges African and Chinese markets, helping companies apply technology and cross-border partnerships to enter, scale, and operate across both regions.",
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
    id: "dates",
    question: "When does the summit take place?",
    answer:
      "The China–Africa Business & Investment Summit is a five-day programme held on 17–21 October 2026 in Guangzhou, China, alongside the Canton Fair. It includes arrival and a welcome dinner (17 Oct), a full day at the Canton Fair (18 Oct), the flagship Summit day (19 Oct), a Guangzhou city tour and factory visit (20 Oct), and departure (21 Oct).",
  },
  {
    id: "venue",
    question: "Where will the summit take place?",
    answer:
      "The summit will take place at Vienna International Hotel, No. 603, Sanyuanli Avenue, Yuexiu, Guangzhou, Guangdong, China.",
  },
  {
    id: "who",
    question: "Who should attend?",
    answer:
      "The summit is designed for investors, entrepreneurs, manufacturers, exporters and importers, government representatives, trade and investment agencies, business associations, corporate leaders, industrial operators, and professional service providers engaged in Africa–China trade, investment, and industrial partnerships.",
  },
  {
    id: "pricing",
    question: "How much does it cost, and what is included?",
    answer:
      "The all-inclusive delegate pass is $1,100 USD per person. It includes visa facilitation, three nights' hotel accommodation, airport transfers (both ways), full conference attendance, and a guided factory tour. It does not include international flights, daily meals and personal expenses, or optional extra activities.",
  },
  {
    id: "visa",
    question: "Do you help with visas?",
    answer:
      "Yes. Visa facilitation is included in your delegate pass — we handle the visa procedure for confirmed delegates. For specific enquiries, contact info@meeiprogram.org.",
  },
  {
    id: "registration",
    question: "How do I register and pay?",
    answer:
      "Registration has two steps. First, complete the registration form to submit your details and reserve your interest. To confirm your place, pay the delegate fee by bank transfer using the account details shown at checkout, then upload your proof of payment or send it to us via WhatsApp. Your place is confirmed once payment is verified.",
  },
  {
    id: "contact",
    question: "How can I contact the organizers?",
    answer:
      "You can reach the organizing team by email at info@meeiprogram.org, by phone at +86 130 2203 1801, +234 806 361 8106, or +90 531 965 7443, or through the contact section on this website.",
  },
];

export const contactDetails: ContactDetails = {
  email: "info@meeiprogram.org",
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
  website: "https://chinasummit.meeihub.com",
  websiteDisplay: "chinasummit.meeihub.com",
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
    weekday: "Saturday",
    label: "Day 1",
    theme: "Arrival",
    sessions: [
      { time: "11:00", title: "Meet & Greet", description: "Guangzhou Baiyun International Airport." },
      { time: "13:00", title: "Airport Transfer", description: "Shuttle to Vienna International Hotel." },
      { time: "15:00", title: "Hotel Check-In", description: "Delegate pack: badge, programme booklet, welcome kit." },
      { time: "19:00", title: "Welcome Dinner", description: "Informal welcome & networking." },
    ],
  },
  {
    id: "day-2",
    date: "18 Oct",
    weekday: "Sunday",
    label: "Day 2",
    theme: "Full-Day Canton Fair Visit",
    sessions: [
      { time: "08:00", title: "Breakfast", description: "" },
      { time: "09:00", title: "Depart for the Canton Fair", description: "China Import & Export Fair." },
      { time: "All Day", title: "Full-Day Exhibition Visit", description: "Guided halls · sourcing meetings · exhibitor walk-throughs · B2B on the floor." },
      { time: "13:00", title: "Lunch", description: "At / near the Fair." },
      { time: "14:30", title: "Continued Sourcing & Meetings", description: "" },
      { time: "18:00", title: "Return to Hotel", description: "" },
    ],
  },
  {
    id: "day-3",
    date: "19 Oct",
    weekday: "Monday",
    label: "Day 3",
    theme: "The Summit",
    flagship: true,
    sessions: [
      { time: "09:30", title: "Registration & Networking", description: "Guest arrival, accreditation and introductions." },
      { time: "10:00", title: "Opening Ceremony & Welcome Remarks", description: "Welcome, summit objectives and introduction of special guests." },
      { time: "10:10", title: "Keynote Address", tag: "Keynote", description: "“From Dependency to Prosperity: Building Sustainable Africa–China Trade, Investment & Industrial Partnerships”" },
      { time: "10:30", title: "High-Level Panel I", tag: "Panel", description: "Infrastructure, Agriculture & Industrial Opportunities Between Africa and China." },
      { time: "11:15", title: "Q&A / Audience Engagement", description: "Practical questions and insights from delegates." },
      { time: "11:30", title: "Curated B2B Matchmaking & Networking", description: "Buyers, suppliers, investors and entrepreneurs meet around identified opportunities." },
      { time: "12:30", title: "Networking Lunch", description: "Lunch and relationship building." },
      { time: "13:15", title: "High-Level Panel II", tag: "Panel", description: "Trade, Finance, Investment & Market Access Between Africa and China." },
      { time: "14:00", title: "Q&A / Action Points", description: "Convert discussion into practical takeaways." },
      { time: "14:15", title: "Partnership & Recognition Session", description: "Recognition of strategic partners and announcement / signing of business collaborations." },
      { time: "14:35", title: "Closing Networking Session", description: "Final introductions, exchange of contacts and follow-up commitments." },
      { time: "14:50", title: "Closing Remarks & Group Photograph", description: "Official conclusion." },
      { time: "Free Time", title: "Rest & Private Meetings", description: "Delegates are free until the evening networking dinner." },
      { time: "18:30", title: "China–Africa Business Networking Dinner", description: "An informal evening of relationship building with delegates, speakers, Chinese business leaders and invited guests (18:30–20:30)." },
    ],
  },
  {
    id: "day-4",
    date: "20 Oct",
    weekday: "Tuesday",
    label: "Day 4",
    theme: "City Tour & Factory Visit",
    sessions: [
      { time: "07:00", title: "Breakfast", description: "" },
      { time: "08:00", title: "Depart Hotel", description: "Full-day Guangzhou City Tour & Factory Visit." },
      { time: "All Day", title: "City & Industrial Highlights", description: "Pearl River waterfront · Canton Tower · local factory / industrial tour." },
      { time: "13:00", title: "Lunch", description: "Local restaurant en route." },
      { time: "14:30", title: "Tour Continues", description: "" },
      { time: "18:00", title: "Return to Hotel", description: "Evening at leisure." },
    ],
  },
  {
    id: "day-5",
    date: "21 Oct",
    weekday: "Wednesday",
    label: "Day 5",
    theme: "Check-Out & Departure",
    sessions: [
      { time: "07:00", title: "Breakfast", description: "" },
      { time: "09:00", title: "Check-Out", description: "" },
      { time: "10:00", title: "Airport Transfers", description: "Transfers to Guangzhou Baiyun International Airport for departure." },
    ],
  },
];

export const pricing = {
  amount: "$1,100",
  currency: "USD",
  note: "per delegate",
  includes: [
    "Visa facilitation — we handle your visa procedure",
    "3 nights' hotel accommodation",
    "Airport transfers (airport ↔ hotel, both ways)",
    "Full conference attendance",
    "Guided factory tour",
  ],
  excludes: [
    "International flight ticket",
    "Daily expenses and meals outside the programme",
    "Optional extra activities",
  ],
};

export const paymentConfig = {
  total: "$1,100 USD",
  // Stripe hosted payment link (card). Charges the full delegate pass.
  stripeUrl: "https://buy.stripe.com/28EdR8fFD6mdcbm241afS0s",
  // WhatsApp contacts (used for "send proof" and "questions"). Number = digits only.
  whatsapp: [
    { label: "Nigeria (WhatsApp Business)", number: "2348063618106", display: "+234 806 361 8106" },
    { label: "Turkey", number: "905319657443", display: "+90 531 965 7443" },
  ],
  // Bank accounts. Pay the amount shown for the account you use.
  accounts: [
    {
      id: "usd",
      currency: "US Dollar",
      amount: "$1,100",
      accountName: "Daniel Deji Ayodele",
      bank: "Türkiye Finans Katılım Bankası",
      iban: "TR680020600176042925910101",
      swift: "AFKBTRIS",
    },
    {
      id: "ngn",
      currency: "Nigerian Naira",
      amount: "₦1,380,000",
      accountName: "Ajoyo Global Touch",
      bank: "Fidelity Bank",
      accountNumber: "5600675013",
    },
    {
      id: "try",
      currency: "Turkish Lira",
      amount: "₺52,000",
      accountName: "Daniel Deji Ayodele",
      bank: "Türkiye Finans Katılım Bankası",
      iban: "TR520020600176042925910001",
      swift: "AFKBTRIS",
    },
  ],
};

export const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Côte d'Ivoire", "Croatia",
  "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe",
];

export const mediaConfig: MediaConfig = {
  heroImage: null,
  heroImageAlt:
    "Hero media: Africa–China business partnership, Guangzhou skyline, trade and industry",
  trailerVideoUrl: process.env.NEXT_PUBLIC_SUMMIT_VIDEO_URL ?? null,
  trailerPoster: null,
  aboutVideoUrl: "https://youtu.be/YewDkNMUWzI",
  aboutPoster: null,
  venueImage: null,
  factoryVisitImage: null,
  matchmakingImage: null,
};
