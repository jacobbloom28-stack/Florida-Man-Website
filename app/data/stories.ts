export const RUBRIC = [
  {
    category: "Absurdity",
    points: 25,
    weight: "25%",
    color: "#FF6B35",
    measures: "How ridiculous or irrational the situation is",
  },
  {
    category: "Humor",
    points: 25,
    weight: "25%",
    color: "#FFC93C",
    measures: "How genuinely funny the incident is",
  },
  {
    category: "Florida Factor",
    points: 20,
    weight: "20%",
    color: "#00B8A9",
    measures: "How uniquely Florida the story feels",
  },
  {
    category: "Unexpectedness",
    points: 15,
    weight: "15%",
    color: "#7B2FF7",
    measures: "How surprising or bizarre the incident or outcome is",
  },
  {
    category: "Headline Quality",
    points: 10,
    weight: "10%",
    color: "#FF3E7F",
    measures: "How strong and entertaining the headline is",
  },
  {
    category: "Source Quality",
    points: 5,
    weight: "5%",
    color: "#0F9B6E",
    measures: "How well documented and reliable the source is",
  },
] as const;

export type Rubric = {
  absurdity: number;
  humor: number;
  floridaFactor: number;
  unexpectedness: number;
  headlineQuality: number;
  sourceQuality: number;
};

export type Story = {
  id: string;
  date: string;
  year: string;
  month: string;
  day: string;
  city: string;
  // Always the literal sum of `rubric`'s six category scores (0-100).
  score: number;
  rubric: Rubric;
  title: string;
  description: string;
  fullStory: string;
  source: string;
  sourceUrl: string;
  // Set only for stories involving real injury, animal harm, or a serious
  // crime with no comedic angle — shown as a visible warning on the story
  // page rather than silently blending into the "funny" archive.
  contentNote?: string;
};

const RUBRIC_KEY_BY_CATEGORY: Record<string, keyof Rubric> = {
  Absurdity: "absurdity",
  Humor: "humor",
  "Florida Factor": "floridaFactor",
  Unexpectedness: "unexpectedness",
  "Headline Quality": "headlineQuality",
  "Source Quality": "sourceQuality",
};

// The rubric bar chart on the story page reads straight from the story's
// own authored numbers — no derivation, no guessing, so the displayed
// total is always exactly what these bars add up to.
export function getCategoryBreakdown(story: Story): Record<string, number> {
  return Object.fromEntries(
    Object.entries(RUBRIC_KEY_BY_CATEGORY).map(([category, key]) => [
      category,
      story.rubric[key],
    ])
  );
}
export const stories: Story[] = [

    {
      id: "flock-camera-decoy",
      date: "August 20, 2026",
      year: "2026",
      month: "August",
      day: "20",
      city: "Oviedo",
      score: 86,
      rubric: { absurdity: 22, humor: 21, floridaFactor: 17, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Smashes Fake Police Camera, Only to Discover It Was a Decoy",
      description:
        "A Florida man allegedly tried to destroy a police surveillance camera, only to discover it was a 3D-printed decoy.",
      fullStory:
        "Shortly before 1 a.m. on August 20, police say a man approached a Flock license-plate camera in Oviedo wearing dark clothing, gloves, and a face covering, then used pruning shears to cut it from its pole and smash it. The camera was actually a 3D-printed replica installed by Oviedo police as bait after several real Flock cameras had been stolen.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/man-arrested-oviedo-smashing-fake-police-flock-camera/DGVJZWV5QNAVDDLGAIFBPUXNGY/",
    },
    {
      id: "taco-bell-roof",
      date: "August 25, 2026",
      year: "2026",
      month: "August",
      day: "25",
      city: "Hialeah",
      score: 77,
      rubric: { absurdity: 20, humor: 19, floridaFactor: 14, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Smashes Taco Bell Ordering Kiosks, Then Flees to a Roof",
      description:
        "Florida Man allegedly destroys Taco Bell ordering equipment before fleeing to a roof.",
      fullStory:
        "A Hialeah man allegedly smashed two Taco Bell ordering kiosks and a television menu before fleeing onto a nearby roof. He later surrendered with the help of first responders.",
      source: "Local 10",
      sourceUrl:
        "https://www.local10.com/news/local/2026/08/26/man-accused-of-smashing-taco-bell-kiosks-tv-menu-in-hialeah/",
    },
    {
      id: "alex-boom-bomb-threat",
      date: "August 19, 2026",
      year: "2026",
      month: "August",
      day: "19",
      city: "Hialeah",
      score: 76,
      rubric: { absurdity: 18, humor: 20, floridaFactor: 13, unexpectedness: 12, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Man Calls in Bomb Threat Using Phone Registered as 'Alex Boom'",
      description:
        "Florida Man allegedly makes a bomb threat using a phone registered under the name Alex Boom.",
      fullStory:
        "Authorities say a Hialeah man allegedly called the Salvation Army and claimed a bomb was inside. The building was evacuated and searched before investigators traced the call to a phone registered under the name Alex Boom.",
      source: "Local 10",
      sourceUrl:
        "https://www.local10.com/news/local/2026/08/20/man-with-phone-registered-under-name-alex-boom-calls-in-bomb-threat-to-salvation-army-cops-say/",
    },
    {
      id: "junk-man-carjacker",
      date: "August 17, 2026",
      year: "2026",
      month: "August",
      day: "17",
      city: "Longwood",
      score: 83,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 15, unexpectedness: 13, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Calls 911 to Claim He Is Being Carjacked by the Officer Pulling Him Over",
      description:
        "Florida Man allegedly calls 911 on the police officer who pulled him over.",
      fullStory:
        "A Longwood man nicknamed 'The Junk Man' allegedly ran a stop sign, could not provide a driver's license, and then called 911 claiming the deputy who stopped him was an armed carjacker.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/man-nicknamed-junk-man-arrested-after-misuse-911-longwood/STX44MVE3RACBMHZBIJE7AZN3M/",
    },
    {
      id: "lawn-mower-meth",
      date: "August 19, 2026",
      year: "2026",
      month: "August",
      day: "19",
      city: "Old Town",
      score: 84,
      rubric: { absurdity: 22, humor: 20, floridaFactor: 17, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Pulled Over While Driving a Riding Lawn Mower Has Meth and Other Drugs in a Bag",
      description:
        "Florida Man is pulled over while driving a riding lawn mower and allegedly has drugs in a bag.",
      fullStory:
        "A deputy stopped a man after spotting him driving a red riding lawn mower on a public road in Old Town. Deputies said a gray bag between his feet contained marijuana, clonazepam, drug paraphernalia, and suspected methamphetamine.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/florida-man-pulled-over-lawn-mower-busted-meth-weed.amp",
    },
    {
      id: "i-eat-ass-sticker",
      date: "2019",
      year: "2019",
      month: "",
      day: "",
      city: "Lake City",
      score: 80,
      rubric: { absurdity: 20, humor: 23, floridaFactor: 14, unexpectedness: 11, headlineQuality: 9, sourceQuality: 3 },
      title: "Florida Man Arrested for Refusing to Remove an 'I Eat Ass' Sticker From His Truck",
      description:
        "Florida Man refuses to remove a vulgar sticker from his truck after being stopped by police.",
      fullStory:
        "A Columbia County man was arrested after refusing to remove a vulgar sticker from his truck. He argued that removing it would violate his First Amendment rights; the charges were later dropped.",
      source: "The Smoking Gun",
      sourceUrl:
        "https://www.thesmokinggun.com/buster/florida-man/ieatass-sticker-bust-285903",
    },
    {
      id: "easter-bunny-fight",
      date: "April 21, 2019",
      year: "2019",
      month: "April",
      day: "21",
      city: "Orlando",
      score: 91,
      rubric: { absurdity: 23, humor: 24, floridaFactor: 16, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Gets Beat Up by the Easter Bunny",
      description:
        "A downtown Orlando street fight takes an absurd turn when the Easter Bunny jumps in.",
      fullStory:
        "A person dressed as the Easter Bunny joined a street fight on Orange Avenue in downtown Orlando on April 21, 2019, repeatedly punching one of the men involved before a bike officer helped break up the fight.",
      source: "Miami Herald",
      sourceUrl: "https://www.miamiherald.com/news/state/florida/article229534964.html",
    },
    {
      id: "tutu-farmers-market",
      date: "November 1, 2016",
      year: "2016",
      month: "November",
      day: "1",
      city: "Tampa",
      score: 81,
      rubric: { absurdity: 21, humor: 21, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Tutu-Wearing Florida Man Breaks Into Farmers Market, Eats Fruit and Drinks Soda",
      description:
        "A tutu-wearing Florida Man breaks into a Tampa farmers market and stops for snacks.",
      fullStory:
        "Two men broke into a Tampa farmers market around 1 a.m. on November 1, 2016. Deputies said one wore a tutu and wig; surveillance showed the men covering a camera with a cardboard box before eating fruit and drinking soda.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/strange-florida/2016/11/02/tutu-wearing-florida-man-breaks-into-farmers-market/",
    },
    {
      id: "26-cars-jail-parking",
      date: "July 1, 2019",
      year: "2019",
      month: "July",
      day: "1",
      city: "Land O' Lakes",
      score: 84,
      rubric: { absurdity: 22, humor: 21, floridaFactor: 15, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Tries to Steal 26 Cars From Jail Parking Lot Right After Being Released",
      description:
        "Florida Man allegedly tries to steal 26 cars from a jail parking lot immediately after being released.",
      fullStory:
        "Dennis Libonati was released from the Land O' Lakes jail on the night of July 1, 2019. Deputies said surveillance later showed him trying door handles on 26 vehicles, along with attempts involving sheriff's vehicles and an ATV.",
      source: "Tampa Bay Times",
      sourceUrl:
        "https://www.tampabay.com/florida/2019/07/04/deputies-man-tries-to-steal-26-cars-from-pasco-jail-parking-lot-just-after-being-released/",
    },
    {
      id: "naked-basketball-skills",
      date: "May 12, 2019",
      year: "2019",
      month: "May",
      day: "12",
      city: "Longwood",
      score: 80,
      rubric: { absurdity: 20, humor: 23, floridaFactor: 15, unexpectedness: 11, headlineQuality: 8, sourceQuality: 3 },
      title: "Florida Man Plays Basketball Naked at Public Park and Says He Was Working on His Skills",
      description:
        "A naked Florida Man tells police he was only working on his basketball skills.",
      fullStory:
        "A Longwood police officer responded to Candy Land Park around 7:30 p.m. on May 12, 2019, after reports of a naked man. Officers identified the suspect, who allegedly said he was working on his basketball skills.",
      source: "FOX 51 Gainesville",
      sourceUrl:
        "https://www.wogx.com/news/florida-man-accused-of-playing-basketball-in-the-nude",
    },
    {
      id: "75-pool-floats",
      date: "June 13, 2019",
      year: "2019",
      month: "June",
      day: "13",
      city: "Palm Bay",
      score: 82,
      rubric: { absurdity: 21, humor: 21, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Steals 75 Pool Floats to Use for Himself Instead of Committing a Worse Crime",
      description:
        "Florida Man is arrested after admitting to a months-long spree of pool-float thefts across Palm Bay.",
      fullStory:
        "Palm Bay police stopped a 35-year-old man on a bicycle carrying a bag of deflated pool floats around 1:25 a.m. on June 13, 2019. He led officers to a vacant home where roughly 75 stolen inflatables were stashed, capping a seven-month string of more than a dozen backyard burglaries in the city. He was charged with burglary, criminal mischief, and petit theft.",
      source: "CBS Miami / Florida Today",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/florida-man-pool-floats-sex-instead-raping-women-police",
    },
    {
      id: "33000-coinstar-coins",
      date: "February 1, 2019",
      year: "2019",
      month: "February",
      day: "1",
      city: "North Palm Beach",
      score: 86,
      rubric: { absurdity: 24, humor: 23, floridaFactor: 11, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Trades $33,000 in Rare Coins for About $30 at a Coinstar Machine",
      description:
        "Florida Man allegedly steals a friend's rare coin collection, then cashes it in for a fraction of a percent of its value.",
      fullStory:
        "A 40-year-old Riviera Beach man was charged with grand theft after investigators said he stole a friend's collection of commemorative presidential dollar coins, worth roughly $33,000, along with other items totaling $350,000. He reportedly sold some coins to a pawn shop for a few thousand dollars, then ran the rest through Coinstar change machines at grocery stores, which paid out only face value — leaving him with about $30.",
      source: "WFTV / CBS Miami (AP)",
      sourceUrl:
        "https://www.wftv.com/news/trending-now/florida-man-steals-33000-in-rare-coins-uses-them-in-change-machines/924780854/",
    },
    {
      id: "atlantic-hamster-wheel",
      date: "August 26, 2023",
      year: "2023",
      month: "August",
      day: "26",
      city: "Atlantic Ocean (Florida resident)",
      score: 95,
      rubric: { absurdity: 25, humor: 23, floridaFactor: 18, unexpectedness: 15, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Arrested Trying to Cross the Atlantic Ocean in a Giant Hamster Wheel",
      description:
        "A Florida marathon runner is intercepted by the Coast Guard while attempting to 'run' to London in a homemade floating hamster wheel.",
      fullStory:
        "The U.S. Coast Guard found a 44-year-old Florida man about 70 nautical miles off Tybee Island, Georgia, inside a homemade 'hydro-pod' built from wiring and buoys, as Hurricane Franklin approached. He told officers he was trying to run all the way to London. During a three-day standoff he claimed to be armed and threatened to detonate a bomb, which he later admitted did not exist. It was not his first attempt to cross open water in a human-powered vessel — he tried a similar trip toward New York in 2021.",
      source: "NBC News / NPR / Coast Guard",
      sourceUrl:
        "https://www.nbcnews.com/news/us-news/florida-man-arrested-attempting-cross-atlantic-human-powered-hamster-w-rcna103873",
    },
    {
      id: "kindness-machete",
      date: "January 2019",
      year: "2019",
      month: "January",
      day: "",
      city: "Milton",
      score: 88,
      rubric: { absurdity: 23, humor: 23, floridaFactor: 15, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Threatens to 'Kill 'Em With Kindness' — the Name of His Machete",
      description:
        "A Florida man takes the phrase 'kill them with kindness' literally, deputies say.",
      fullStory:
        "A 30-year-old Milton man was arrested after neighbors said he threatened to 'kill 'em with kindness' during a loud dispute, then emerged from his home with a machete-style knife that had the word 'kindness' etched into the blade. One neighbor sustained a cut trying to block the attack. He was charged with aggravated assault and aggravated battery with a deadly weapon.",
      source: "Fox News / Pensacola News Journal",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-threatens-to-kill-neighbor-with-kindness-thats-the-name-of-his-machete",
    },
    {
        id: "horse-blames-break-in",
        date: "July 25, 2019",
        year: "2019",
        month: "July",
        day: "25",
        city: "Pasco County",
        score: 86,
      rubric: { absurdity: 22, humor: 22, floridaFactor: 16, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
        title: "Florida Man Breaks Into Home and Blames the Horse",
        description:
        "A homeowner catches a man breaking into his vacant house — with a horse in tow.",
        fullStory:
        "Homeowner Steve Ferguson got a security alert showing a man wandering his Pasco County property with a horse beside him. When confronted, 52-year-old Lonnie Maddox, known locally as 'Rooster,' said the horse had broken into the yard and he'd followed it in to retrieve it. Surveillance video told a different story: Maddox tried the padlocked front door before breaking a back window to get inside. He didn't own the horse — it had been borrowed and was later returned to its actual owner. Maddox was charged with burglary of a dwelling.",
        source: "Local10 / Bay News 9",
        sourceUrl:
        "https://www.local10.com/news/florida/florida-man-blames-horse-for-breaking-into-home",
    },
    {
        id: "spiderman-liquor-heist",
        date: "January 2019",
        year: "2019",
        month: "January",
        day: "",
        city: "Casselberry",
        score: 77,
      rubric: { absurdity: 19, humor: 21, floridaFactor: 13, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
        title: "Florida Man Robs Store Dressed as Spider-Man",
        description:
        "A man shows up unmasked to a liquor store, leaves, then comes back wearing a Spider-Man mask to finish the job.",
        fullStory:
        "Deputies said a man walked into a Winn-Dixie Wine & Spirits store in Casselberry unmasked on January 2, left, and then returned wearing a Spider-Man mask. He made off with roughly $150 in liquor and $420 worth of Newport cigarettes. He was identified as Edward Wilburn and arrested later that month.",
        source: "ABC affiliates (ABC13/ABC7)",
        sourceUrl: "https://abc13.com/florida-man-robs-store-as-spiderman/5194105/",
    },
    {
        id: "gator-convenience-store-beer",
        date: "July 29, 2018",
        year: "2018",
        month: "July",
        day: "29",
        city: "Jacksonville",
        score: 94,
      rubric: { absurdity: 24, humor: 23, floridaFactor: 19, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
        title: "Florida Man Brings Live Alligator into Convenience Store While Buying Beer",
        description:
        "A man walks into a store with a live gator under his arm, then chases a fellow customer with it over the last case of beer.",
        fullStory:
        "Video posted to Facebook showed a man, identified as Robby Stratton, walking into a Jacksonville convenience store holding a live alligator with its jaws taped shut, asking, 'Y'all ain't out of beer, are you?' When he spotted another customer heading for the beer cooler, he charged at him with the gator while onlookers laughed. Stratton later said it was 'all fun and games' and that he didn't remember the incident because he'd been drinking heavily. The Florida Fish and Wildlife Conservation Commission investigated, since capturing an alligator without a permit is a felony.",
        source: "First Coast News / Fox News",
        sourceUrl:
        "https://www.foxnews.com/science/florida-man-wielding-live-gator-chases-people-in-convenience-store-video-shows",
    },
    {
        id: "scooter-screwdriver-cop",
        date: "June 12, 2019",
        year: "2019",
        month: "June",
        day: "12",
        city: "Clearwater Beach",
        score: 83,
      rubric: { absurdity: 21, humor: 23, floridaFactor: 14, unexpectedness: 13, headlineQuality: 8, sourceQuality: 4 },
        title: "Florida Man Asks Cop to Help Him Start the Scooter He Was Stealing",
        description:
        "A man caught pushing a scooter he doesn't own asks the responding officer for a screwdriver so he can hot-wire it.",
        fullStory:
        "A witness spotted 30-year-old Raymond Millwater pushing a scooter down Coronado Drive in Clearwater Beach around 5:30 a.m. When an officer approached, Millwater said the scooter belonged to his friend 'Chad' and asked to borrow a screwdriver since he didn't have the key. The scooter's actual owner had never heard of a 'Chad.' Millwater was arrested on a felony grand theft motor vehicle charge.",
        source: "Tampa Bay Times / RideApart",
        sourceUrl: "https://www.rideapart.com/news/355174/florida-man-asks-cops-for-theft-help/",
    },
    {
        id: "anti-christ-helicopter-theft",
        date: "June 19, 2026",
        year: "2026",
        month: "June",
        day: "19",
        city: "Brooksville",
        score: 86,
      rubric: { absurdity: 23, humor: 20, floridaFactor: 15, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
        title: "Florida Man Who Says He Saw the Anti-Christ Tries to Steal a Medical Helicopter",
        description:
        "After crashing his truck, a man runs past first responders and attempts to steal the medevac helicopter that landed for the crash victims.",
        fullStory:
        "Just after midnight on I-75 in Hernando County, 28-year-old Riley Johnson Ferrer lost control of his pickup truck, struck another vehicle, and flipped into the woods, seriously injuring the two people inside the other car. As a medical helicopter landed to airlift the victims, Ferrer ran past fire rescue crews and attempted to steal it, telling troopers he had seen 'the anti-Christ' moments before the crash. He was taken into custody and later resisted deputies at the hospital and detention center. He was charged with burglary of an occupied conveyance and three counts of resisting an officer without violence.",
        source: "FOX 13 Tampa Bay / WFLA / News4JAX",
        sourceUrl:
        "https://www.fox13news.com/news/florida-man-tries-steal-medical-helicopter-waiting-transport-patients-after-i-75-crash-fhp",
    },
    {
        id: "prosthetic-breasts-gun",
        date: "December 14, 2025",
        year: "2025",
        month: "December",
        day: "14",
        city: "Polk County",
        score: 93,
      rubric: { absurdity: 24, humor: 24, floridaFactor: 17, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
        title: "Florida Man Hides Gun Under Prosthetic Silicone Breasts at Construction Site",
        description:
        "Deputies find a man trespassing in lingerie with a loaded handgun concealed beneath silicone breast forms.",
        fullStory:
        "Around 1 a.m., Polk County deputies approached 39-year-old Matthew Zaccarino, who was standing beside his car at a construction site putting on a red lace bra, silicone breast forms, and a G-string. When ordered to stop, he removed the items instead, revealing a loaded 9mm handgun hidden beneath the prosthetics. He told deputies he was on his way to a costume party but couldn't say where. Sheriff Grady Judd later described the scene in a briefing: 'A lace bra, a G-string, and a hidden gun. Folks, you cannot make this up.' Zaccarino was charged with armed trespassing with a firearm, loitering or prowling, and resisting an officer without violence.",
        source: "FOX 13 Tampa Bay / CBS Miami",
        sourceUrl:
        "https://www.fox13news.com/news/florida-man-dressed-red-lace-bra-accused-hiding-gun-under-prosthetic-silicone-breasts-it-was-ugly",
    },
    {
        id: "110mph-cheating-girlfriend",
        date: "August 1, 2026",
        year: "2026",
        month: "August",
        day: "1",
        city: "DeSoto County",
        score: 75,
      rubric: { absurdity: 18, humor: 22, floridaFactor: 12, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
        title: "Florida Man Clocked at 110 MPH Says He Was Racing to Catch His Cheating Girlfriend",
        description:
        "A deputy pulls a man over for driving nearly double the speed limit — and gets an unusually honest excuse.",
        fullStory:
        "A DeSoto County Sheriff's Office deputy clocked Gavin Ames driving 110 mph in a 60 mph zone around 1 a.m. When asked why he was speeding, Ames didn't make an excuse — he told the deputy he was racing to catch his girlfriend cheating. He was arrested under Florida's 'super speeder' law.",
        source: "Fox News / FOX 13 Tampa Bay",
        sourceUrl:
        "https://www.foxnews.com/outkick-culture/florida-man-arrested-110-mph-tells-deputy-racing-catch-cheating-girlfriend",
    },
    {
      id: "cadillac-sunroof",
      date: "May 7, 2019",
      year: "2019",
      month: "May",
      day: "7",
      city: "Bartow",
      score: 81,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 13, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title:
        "Florida Man Drives Cadillac While Standing Through the Sunroof and Says He Would Rather Go to Jail Than Go Home",
      description:
        "Florida Man drives a Cadillac standing through the sunroof and tells police he would rather go to jail.",
      fullStory:
        "Leonard Olsen Jr., 70, of Lakeland, was recorded by an off-duty deputy standing through his Cadillac's sunroof, arms outstretched, while hitting speeds over 100 mph on I-4/US-98 on May 7, 2019. When troopers stopped him, Olsen said he wanted to turn himself in because his wife treats him like a servant, telling them he'd rather go to jail than go back home. He was charged with misdemeanor reckless driving.",
      source: "NBC 6 South Florida",
      sourceUrl:
        "https://nbcmiami.com/news/local/Florida-Man-Stands-Through-Sunroof-While-Driving-on-Highway-509857101.html",
    },
    {
      id: "salt-walmart-evil-spirits",
      date: "June 2, 2019",
      year: "2019",
      month: "June",
      day: "2",
      city: "Hudson",
      score: 72,
      rubric: { absurdity: 19, humor: 18, floridaFactor: 12, unexpectedness: 11, headlineQuality: 7, sourceQuality: 5 },
      title: "Florida Man Pours Salt on Walmart Floor to Get Rid of Evil Spirits",
      description:
        "Florida Man allegedly covers a Walmart floor with salt to drive away evil spirits.",
      fullStory:
        "Dameon Dean Cantrell, 38, entered a Hudson Walmart on June 2, 2019, pouring salt across the floor and on his own feet to ward off evil spirits, according to Pasco deputies. A manager said Cantrell then walked out into a small wooded area on the property, where deputies found him lying under some trees. He was arrested for trespassing, having previously been barred from the store.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/pasco-county/hudson-man-pours-salt-on-feet-to-ward-off-evil-spirits-at-walmart/2050229439/",
    },
    {
      id: "poops-couch",
      date: "June 11, 2018",
      year: "2018",
      month: "June",
      day: "11",
      city: "St. Petersburg",
      score: 81,
      rubric: { absurdity: 22, humor: 22, floridaFactor: 13, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title:
        "Florida Man Breaks Into Home, Steals Alcohol, Poops on Floor, Falls Asleep on Couch",
      description:
        "Florida Man allegedly breaks into a home, steals alcohol, poops on the floor and falls asleep.",
      fullStory:
        "A man identified as Houldin broke into a St. Petersburg home on June 11, 2018, stole and drank several bottles of alcohol, defecated throughout the house and back yard, and fell asleep on the couch. Officers found him half-dressed in the backyard still holding a stolen wine bottle. He admitted to entering the home and was charged with burglary of an occupied dwelling.",
      source: "WTXL / WRAL",
      sourceUrl:
        "https://www.wtxl.com/news/florida-man-breaks-into-home-steals-alcohol-falls-asleep-on/article_cf065d28-6e74-11e8-af5c-33f12860f523.html",
    },
    {
      id: "400-pounds-avocados",
      date: "December 22, 2025",
      year: "2025",
      month: "December",
      day: "22",
      city: "Redland",
      score: 76,
      rubric: { absurdity: 18, humor: 20, floridaFactor: 14, unexpectedness: 11, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Steals 400 Pounds of Avocados to Buy Christmas Presents for His Kids",
      description:
        "A father is caught stealing hundreds of pounds of avocados to fund his kids' Christmas presents.",
      fullStory:
        "Deputies spotted Edel Perez, 29, picking avocados inside a fenced, No Trespassing-posted grove in southwest Miami-Dade around 3:10 a.m. on December 22, 2025. His Mercedes trunk was packed with avocados, and deputies estimated he had taken about 400 pounds worth roughly $800. Perez, who said he was unemployed, told deputies he planned to sell the fruit to buy Christmas presents for his two children. He was charged with grand theft and trespassing on an agricultural site, with bond set at $5,000.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-allegedly-steals-400-pounds-avocados-buy-christmas-presents-children",
    },
    {
      id: "truck-dont-surf",
      date: "February 6, 2024",
      year: "2024",
      month: "February",
      day: "6",
      city: "New Smyrna Beach",
      score: 85,
      rubric: { absurdity: 20, humor: 22, floridaFactor: 17, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Drives Truck Into the Ocean, Blames the Truck",
      description:
        "Florida Man drives his pickup truck onto a closed beach and into the ocean, then blames the truck.",
      fullStory:
        "Jason Brzuszkiewicz, 49, drove his pickup truck around a 'Do Not Enter' gate onto New Smyrna Beach just before 9 a.m. on February 6, 2024, then steered straight into the surf and attempted doughnuts in the waves. As deputies described how he 'drove through the water,' Brzuszkiewicz shouted, 'It's not my fault the truck don't surf.' He was booked into the Volusia County jail on a $200 bond.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/florida/not-my-fault-the-truck-dont-surf-florida-man-arrested-after-driving-car-into-the-ocean/",
    },
    {
      id: "cell-tower-sunset",
      date: "February 24, 2024",
      year: "2024",
      month: "February",
      day: "24",
      city: "Hillsborough County",
      score: 70,
      rubric: { absurdity: 18, humor: 17, floridaFactor: 12, unexpectedness: 10, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Livestreams Himself Climbing a Cell Tower to Watch the Sunset",
      description:
        "Florida Man climbs a cell phone tower live on social media just to catch the sunset.",
      fullStory:
        "Hillsborough County deputies were called to the 13000 block of Rhodine Road around 7 p.m. on February 24, 2024, after reports of a man scaling a cellular tower. The 19-year-old was livestreaming the climb and later told reporters he just wanted to 'see the sunset.' He was taken into custody the moment he reached the ground.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/hillsborough-county/you-made-all-the-way-to-the-top-man-arrested-after-scaling-cellphone-tower-in-hillsborough-county/",
    },
    {
      id: "taylor-swift-security-impersonator",
      date: "October 18, 2024",
      year: "2024",
      month: "October",
      day: "18",
      city: "Miami Gardens",
      score: 79,
      rubric: { absurdity: 20, humor: 21, floridaFactor: 11, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title:
        "Florida Man Dresses as Security to Sneak Into Taylor Swift Concert, Gets Caught by His Own 'Clients'",
      description:
        "Florida Man dresses as a security guard to sneak into Taylor Swift's Eras Tour, then gets caught by his own 'clients.'",
      fullStory:
        "Ivan Mariotti, 44, of Key Biscayne, allegedly wore a blue suit with a gold badge around his neck to pose as security and slip into the Eras Tour show at Hard Rock Stadium on October 18, 2024. When an officer asked about the badge, Mariotti said he'd been hired to escort 'his four clients' to their seats — but those four women told police they'd only hired a driver, not a security guard. He was charged with falsely impersonating an officer and interference with a sporting or entertainment event.",
      source: "Local 10",
      sourceUrl:
        "https://www.local10.com/news/local/2024/10/21/man-impersonates-security-guard-to-get-into-taylor-swift-concert-police-say/",
    },
    {
      id: "walgreens-junk-food-binge",
      date: "July 15, 2024",
      year: "2024",
      month: "July",
      day: "15",
      city: "New Smyrna Beach",
      score: 84,
      rubric: { absurdity: 21, humor: 23, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Hides in Walgreens Bathroom for 5 Hours, Then Raids the Snack Aisle",
      description:
        "Florida Man hides in a Walgreens bathroom for five hours, then goes on an after-hours snack raid.",
      fullStory:
        "Christopher Morgan entered a New Smyrna Beach Walgreens around 9:40 p.m. on July 15, 2024, and locked himself in the restroom. Nearly five hours later, police say he emerged and roamed the closed store, helping himself to Tostitos spinach dip, Reese's and Ghirardelli chocolate, a Dr. Pepper, and a pack of Newport cigarettes. Officers arrived after an alarm company reported someone locked inside, and Morgan was arrested on burglary, theft, and battery-on-an-officer charges.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/florida-man-binges-junk-food-cigarettes-after-hiding-walgreens-bathroom-roam-store-after-hours",
    },
    {
      id: "manatee-riding",
      date: "September 20, 2016",
      year: "2016",
      month: "September",
      day: "20",
      city: "Islamorada",
      score: 93,
      rubric: { absurdity: 24, humor: 23, floridaFactor: 19, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Rides a Manatee, Demands to Be Taken to Jail",
      description:
        "Florida Man rides a manatee, tells witnesses he's riding it, then demands to be taken to jail.",
      fullStory:
        "James Massengale Jr., 47, was seen touching and lying on top of two manatees and a calf in the water behind the Islamorada library on September 20, 2016. When a witness told him it was illegal to ride manatees, Massengale replied, 'I'm riding it,' then turned combative with officials and began chanting, 'Take me to jail.' He was charged with molesting, harassing, or disturbing a manatee, a protected species under Florida law.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/manhandling-a-manatee-lands-man-in-jail/",
    },
    {
      id: "walmart-scooter-chase",
      date: "July 17, 2024",
      year: "2024",
      month: "July",
      day: "17",
      city: "Lakeland",
      score: 84,
      rubric: { absurdity: 20, humor: 23, floridaFactor: 15, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Leads Deputies on 2 MPH Chase on a Stolen Walmart Scooter",
      description:
        "Florida Man leads deputies on a low-speed chase atop a stolen Walmart electric scooter.",
      fullStory:
        "Troyson Raymond, 35, allegedly shoplifted jewelry and handheld games from a Lakeland Walmart on July 17, 2024, then grabbed one of the store's electric scooters as his getaway vehicle. Deputies pursued him along U.S. 98 as the chase topped out around 2 mph before he rolled to a stop in front of a Dunkin'. The Polk County Sheriff's Office said it 'avoided the temptation' to add a fleeing-to-elude charge given the speed involved; Raymond was booked on felony petit theft, grand theft, and unlawful possession of a shopping cart.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-allegedly-leads-deputies-2-mph-chase-stolen-electric-walmart-scooter",
    },
    {
      id: "ronald-mcdonald-clown-arrest",
      date: "March 24, 2025",
      year: "2025",
      month: "March",
      day: "24",
      city: "Palm Bay",
      score: 84,
      rubric: { absurdity: 21, humor: 23, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Dressed as Ronald McDonald Arrested, Tells Cops 'I Am a Clown, Stupid'",
      description:
        "Florida Man dressed as Ronald McDonald gets arrested for trespassing and has a message for the officer who called him a clown.",
      fullStory:
        "Christopher Wayne Marlowe, 40, was arrested at a Palm Bay shopping plaza on March 24, 2025, after police responded to complaints about a man in full clown makeup and a Ronald McDonald-style costume causing a disturbance. When an officer told him he looked like a clown, Marlowe shot back, 'I am a clown, stupid!' Deputies found a box full of clown noses and extra costume pieces in his bag. He was booked into the Brevard County Jail on trespassing and resisting-an-officer-with-violence charges.",
      source: "NBC 6 South Florida",
      sourceUrl:
        "https://www.nbcmiami.com/news/local/bodycam-shows-clown-tussling-with-officer-calling-him-stupid-in-palm-bay-arrest/3578100/",
    },
    {
      id: "lego-booster-target-theft",
      date: "September 23, 2019",
      year: "2019",
      month: "September",
      day: "23",
      city: "Port Orange",
      score: 74,
      rubric: { absurdity: 19, humor: 20, floridaFactor: 11, unexpectedness: 11, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Dubbed the 'Lego Booster' Arrested After Months-Long Target Shoplifting Spree",
      description:
        "Florida Man nicknamed the 'Lego Booster' is arrested after stealing over $1,000 in Lego sets from Target stores.",
      fullStory:
        "Sean Nicholas Dunlop, 30, was arrested at a Port Orange Target on September 23, 2019, after deputies connected him to a string of high-value Lego thefts that began at a Flagler County Target earlier that month. Investigators say Dunlop used the same vehicle and method to lift Lego sets worth more than $1,000 from multiple Target and Kohl's locations. He was charged with aggravated retail theft and grand theft.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/2019/12/03/lego-thief-charged-with-grand-theft-deputies-say/",
    },
    {
      id: "forklift-atm-joyride",
      date: "November 17, 2025",
      year: "2025",
      month: "November",
      day: "17",
      city: "Tallahassee",
      score: 88,
      rubric: { absurdity: 23, humor: 21, floridaFactor: 16, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Steals a Forklift, Uses It to Drag Away an ATM",
      description:
        "Florida Man allegedly steals a forklift from a school and uses it to make off with an ATM.",
      fullStory:
        "Joshua Hidalgo, 38, allegedly stole a forklift from a Tallahassee school and drove it to a nearby business, where he used it to rip an ATM from a parking lot and haul it through town on a joyride. Officers caught up to him and arrested him after he tried to flee. He was charged with grand theft, trespassing on school grounds, and possession of burglary tools.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/florida-man-took-forklift-steal-atm-police-say/IQULQRELMNFLHOTIRVVXUCUGOI/",
    },
    {
      id: "god-18th-birthday-arrest",
      date: "March 4, 2026",
      year: "2026",
      month: "March",
      day: "4",
      city: "Davenport",
      score: 90,
      rubric: { absurdity: 22, humor: 23, floridaFactor: 17, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Turns 18, Claims to Be God, Gets Arrested Minutes Later",
      description:
        "Florida Man allegedly steals cigarettes, declares himself God, then gets caught with meth in his sock.",
      fullStory:
        "Tyler Voisard, freshly 18, allegedly stole two packs of cigarettes worth $19.62 from a Davenport 7-Eleven on March 4, 2026. Confronted outside by deputies, he declared, 'I'm God, and I'm leaving here in two seconds,' before running off; he was caught shortly after. At the Polk County jail, deputies said they found methamphetamine hidden in his sock. He was charged with burglary of an occupied structure, resisting an officer, drug possession, and introducing contraband into a detention facility.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/trending/man-accused-stealing-cigarettes-gas-station-tells-deputies-he-is-god/NO63NIPYAJEJLA5UTEZAX35S6I/",
    },
    {
      id: "chuck-e-cheese-mascot-fraud",
      date: "July 23, 2025",
      year: "2025",
      month: "July",
      day: "23",
      city: "Tallahassee",
      score: 82,
      rubric: { absurdity: 20, humor: 22, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Arrested Mid-Shift While Dressed as Chuck E. Cheese",
      description:
        "Florida Man is handcuffed and led out of a Chuck E. Cheese in full mascot costume over a stolen credit card.",
      fullStory:
        "Jermell Jones, 41, was arrested just after 6:30 p.m. on July 23, 2025, while working inside the mouse costume at a Tallahassee Chuck E. Cheese. A parent who'd hosted a birthday party there noticed over $100 in fraudulent charges on their card, pulled store surveillance footage, and recognized the mascot performer as the culprit. Officers cuffed Jones and walked him out in full costume as parents and kids watched. He was charged with theft of a credit card, fraudulent use of a credit card, and criminal use of personal identification.",
      source: "WCTV",
      sourceUrl:
        "https://www.wctv.tv/2025/07/25/tallahassee-police-cuff-arrest-florida-man-dressed-chuck-e-cheese-while-kids-watch/",
    },
    {
      id: "hookah-caterpillar-liquor-store",
      date: "August 14, 2017",
      year: "2017",
      month: "August",
      day: "14",
      city: "Crestview",
      score: 87,
      rubric: { absurdity: 23, humor: 22, floridaFactor: 15, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Blames 'Hookah-Smoking Caterpillar' for $100,000 Liquor Store Rampage",
      description:
        "Florida Man causes six figures in damage with a stolen forklift, then blames a hookah-smoking caterpillar.",
      fullStory:
        "Matthew Horace Jones broke into a fenced construction site in Crestview and used a forklift to cause more than $100,000 in damage to a liquor store under construction, at one point aiming the forklift at responding officers before they stopped him at gunpoint. Identifying himself as 'Alice Wonderland,' Jones told police a hookah-smoking caterpillar was behind the rampage and that he had 'a problem with building a place to sell alcohol.' He was charged with felony grand theft and criminal mischief.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/2017/08/14/florida-man-blames-hookah-smoking-caterpillar-for-wrecking-liquor-store-police-say/",
    },
    {
      id: "gator-in-yoga-pants-traffic-stop",
      date: "August 15, 2019",
      year: "2019",
      month: "August",
      day: "15",
      city: "Punta Gorda",
      score: 86,
      rubric: { absurdity: 21, humor: 21, floridaFactor: 18, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Traffic Stop Turns Up 41 Turtles and a Baby Alligator Hidden in a Passenger's Pants",
      description:
        "A routine traffic stop uncovers dozens of stolen turtles — and a foot-long alligator tucked into a passenger's yoga pants.",
      fullStory:
        "A Charlotte County deputy pulled over a pickup truck driven by Michael Clemons, 22, after it ran a stop sign near Punta Gorda. A search turned up 41 three-striped turtles stuffed in a backpack; when asked if she had anything else, passenger Ariel Machan-Le Quire, 25, pulled a foot-long alligator out of her yoga pants. Machan-Le Quire pleaded guilty to four charges and was sentenced to probation.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/florida-woman-gator-pants-traffic-stop/",
    },
    {
      id: "mcdonalds-ice-cream-machine-gun",
      date: "August 13, 2017",
      year: "2017",
      month: "August",
      day: "13",
      city: "Delray Beach",
      score: 78,
      rubric: { absurdity: 19, humor: 21, floridaFactor: 13, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Pulls Fake Assault Rifle on McDonald's Drive-Thru Over Broken Ice Cream Machine",
      description:
        "Florida Man allegedly brandishes what looks like an AR-15 at a McDonald's drive-thru after being told the ice cream machine was broken.",
      fullStory:
        "Jerry Alexander Henry, 19, was a passenger in a car that pulled up to a Delray Beach McDonald's drive-thru just before midnight when he and the driver were told the ice cream machine was broken. Henry responded by pulling out what turned out to be an unmarked airsoft rifle styled like an AR-15. He was charged with improper exhibition of a dangerous weapon or firearm.",
      source: "NBC 6 South Florida",
      sourceUrl:
        "https://www.nbcmiami.com/news/local/florida-man-displayed-gun-after-learning-delray-beach-mcdonalds-had-broken-ice-cream-machine/21862/",
    },
    {
      id: "beers-always-gone-dui-shirt",
      date: "August 16, 2023",
      year: "2023",
      month: "August",
      day: "16",
      city: "Ocala",
      score: 75,
      rubric: { absurdity: 17, humor: 22, floridaFactor: 12, unexpectedness: 10, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Arrested for DUI While Wearing 'I'm the Reason the Beer's Always Gone' T-Shirt",
      description:
        "Florida Man is caught driving nearly three times the legal limit — in a shirt that gave the game away.",
      fullStory:
        "A Marion County deputy clocked James Rix Jr., 41, doing 89 mph in a 45 mph zone near Ocala, then watched him flee with his headlights off before catching up. Rix, wearing a shirt reading 'I'm the Reason the Beer's Always Gone,' failed field sobriety tests and blew a .204 and .200 — nearly three times the legal limit. He was charged with DUI, fleeing to elude, unlawful speed, and an open container violation.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/james-rix-jr-florida-man-arrested-for-dui-wearing-im-the-reason-the-beers-always-gone-t-shirt-marion-oaks-manor-ocala-marion-county-sheriffs-office-august-23-2023",
    },
    {
      id: "fake-flight-attendant-free-flights",
      date: "June 5, 2025",
      year: "2025",
      month: "June",
      day: "5",
      city: "Fort Lauderdale",
      score: 73,
      rubric: { absurdity: 18, humor: 19, floridaFactor: 9, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Convicted After Posing as a Flight Attendant for Over 120 Free Flights",
      description:
        "Florida Man impersonates flight attendants from seven different airlines to fly for free more than 100 times.",
      fullStory:
        "Tiron Alexander, 35, was convicted by a federal jury on June 5, 2025, of using an airline's internal booking system meant for working crew members to book more than 120 free flights between 2018 and 2024, flying on 34 of them without paying. He falsely claimed to work for seven different airlines, inventing badge numbers and hire dates, and was also convicted of entering the secure area of Fort Lauderdale-Hollywood International Airport under false pretenses. He faces up to 30 years in federal prison at sentencing.",
      source: "Local 10",
      sourceUrl:
        "https://www.local10.com/news/local/2025/06/11/south-florida-man-posed-as-flight-attendant-to-fly-free-120-times-feds-say/",
    },
    {
      id: "naked-cookie-grill-fire",
      date: "September 12, 2018",
      year: "2018",
      month: "September",
      day: "12",
      city: "Niceville",
      score: 83,
      rubric: { absurdity: 22, humor: 23, floridaFactor: 13, unexpectedness: 12, headlineQuality: 9, sourceQuality: 4 },
      title: "Naked Florida Man Starts House Fire Trying to Bake Cookies on a George Foreman Grill",
      description:
        "Florida Man tries baking cookies on an indoor grill after two liters of vodka, and the results are not great.",
      fullStory:
        "A Niceville man answered his door naked around midnight, said 'I'm sorry,' and closed it again as his smoke-filled home burned behind him. He'd been drinking two liters of vodka and smoking marijuana since 9 p.m. when he tried baking cookies on a George Foreman grill; when it caught fire, he tried smothering the flames with dry towels, which also caught fire. Officers removed him from the house after he showed no concern for his own safety.",
      source: "USA Today",
      sourceUrl:
        "https://www.usatoday.com/story/news/nation-now/2018/09/07/florida-man-drunk-and-naked-allegedly-set-house-fire/1228241002/",
    },
    {
      id: "batman-pajamas-burglary-bust",
      date: "August 27, 2025",
      year: "2025",
      month: "August",
      day: "27",
      city: "Cape Coral",
      score: 75,
      rubric: { absurdity: 18, humor: 20, floridaFactor: 12, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man in Batman Pajamas Catches Burglary Suspect Before Police Arrive",
      description:
        "Florida Man's home security alert sends him outside in Batman pajamas to catch a burglar in the act.",
      fullStory:
        "Kyle Myvett was in bed wearing Batman pajamas around 2 a.m. when his home security system alerted him that someone was breaking into his truck. He went outside, spotted the suspect rifling through his truck and then a neighbor's garage, and detained him before Cape Coral police arrived. Officers arrested Justin Schimpl, 20, on burglary charges. Myvett later said the costume 'gave me the confidence I needed.'",
      source: "ABC News",
      sourceUrl:
        "https://abcnews.com/US/florida-man-wearing-batman-pajamas-thwarts-burglary-detains/story?id=125059192",
    },
    {
      id: "roach-spray-nunchucks-noise-complaint",
      date: "August 12, 2019",
      year: "2019",
      month: "August",
      day: "12",
      city: "Daytona Beach",
      score: 79,
      rubric: { absurdity: 23, humor: 17, floridaFactor: 16, unexpectedness: 13, headlineQuality: 6, sourceQuality: 4 },
      title: "Florida Man Sprays Neighbors With Roach Spray, Then Breaks Out Nunchucks Over Loud Music",
      description:
        "Florida Man sprays neighbors with roach spray, then pulls out nunchucks during a noise complaint dispute.",
      fullStory:
        "Larry Darnell Adams, 61, got into an argument with a group of women celebrating a birthday over loud music outside his Daytona Beach home on August 12, 2019. He sprayed roach pesticide directly at them, then produced a pair of nunchucks and swung them at the group, accidentally striking himself in the forehead before throwing the weapon at their car. He was charged with aggravated assault and aggravated battery with a deadly weapon.",
      contentNote:
        "Victims required medical attention during this incident, and deputies found a loaded firearm magazine in the suspect's apartment.",
      source: "WSOC-TV",
      sourceUrl:
        "https://www.wsoctv.com/news/deep-viral/police-florida-man-sprays-women-with-roach-spray-break-out-nunchucks-over-loud-music/976378849/",
    },
    {
      id: "mcdonalds-drive-thru-worker-punched",
      date: "July 30, 2019",
      year: "2019",
      month: "July",
      day: "30",
      city: "Leesburg",
      score: 59,
      rubric: { absurdity: 17, humor: 10, floridaFactor: 12, unexpectedness: 11, headlineQuality: 5, sourceQuality: 4 },
      title: "Florida Man Allegedly Punches McDonald's Drive-Thru Worker for Taking Too Long",
      description:
        "Florida Man allegedly strikes a McDonald's drive-thru worker after growing impatient with the line.",
      fullStory:
        "Sherman Lee Brown, 34, was a passenger in his girlfriend's car at a Leesburg McDonald's drive-thru around 3:20 a.m. on July 30, 2019, when he grew angry about the slow-moving line. He yelled at the employee to hurry up, and when she refused to serve him without more respectful language, he got out of the car, threatened her, and struck her in the face when she tried to close the window. He was charged with burglary and battery.",
      contentNote:
        "This incident involved a real assault — the worker suffered a cut lip and facial injuries.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/2019/08/22/florida-man-hits-mcdonalds-drive-thru-worker-for-taking-too-long-police-say/",
    },
    {
      id: "cat-shot-bb-gun-chickens",
      date: "August 16, 2026",
      year: "2026",
      month: "August",
      day: "16",
      city: "Fort Myers",
      score: 64,
      rubric: { absurdity: 17, humor: 9, floridaFactor: 12, unexpectedness: 15, headlineQuality: 8, sourceQuality: 3 },
      title: "Florida Man Allegedly Shoots Neighbor's Cat With BB Gun Over Killed Chickens",
      description:
        "Florida Man allegedly shoots a neighborhood cat with a BB gun after it killed his chickens.",
      fullStory:
        "Nicholas Laney allegedly shot a stray cat named Tubby with a BB gun in Lee County after the cat had been killing his chickens. A neighbor heard gunshots and the cat screeching, then found Tubby limping with a broken leg hours later. Tubby survived. Laney was arrested and charged with aggravated animal cruelty.",
      contentNote:
        "This incident involved real harm to an animal — the cat sustained a broken leg but survived.",
      source: "KSN Local 4",
      sourceUrl:
        "https://www.ksnblocal4.com/2026/08/19/man-accused-shooting-neighbors-cat-with-bb-gun-officials-say/",
    },
    {
      id: "dog-slam-headbutt-patrol-car",
      date: "August 30, 2025",
      year: "2025",
      month: "August",
      day: "30",
      city: "Brevard County",
      score: 62,
      rubric: { absurdity: 19, humor: 10, floridaFactor: 13, unexpectedness: 12, headlineQuality: 5, sourceQuality: 3 },
      title: "Florida Man Accused of Slamming Dog, Then Headbutting a Patrol Car",
      description:
        "Florida Man allegedly slams a small dog to the ground, then headbutts a patrol car while resisting arrest.",
      fullStory:
        "Christopher Stanley, 39, allegedly slammed a small dog to the ground outside a Brevard County tiki bar while intoxicated. When deputies responded, he resisted, made threats, and headbutted a patrol car during his arrest. He was already on probation for stalking at the time. Stanley was charged with animal cruelty, resisting with violence, threats to law enforcement, disorderly intoxication, and criminal mischief.",
      contentNote: "This incident involved real harm to an animal.",
      source: "KATV",
      sourceUrl:
        "https://katv.com/news/nation-world/bodycam-florida-man-accused-of-slamming-dog-headbutting-patrol-car-tiki-bar-brevard-county-sheriffs-office-jail-august-30-2025",
    },
    {
      id: "counterfeit-passport-check-fraud",
      date: "August 18, 2023",
      year: "2023",
      month: "August",
      day: "18",
      city: "Melbourne",
      score: 51,
      rubric: { absurdity: 14, humor: 7, floridaFactor: 9, unexpectedness: 11, headlineQuality: 5, sourceQuality: 5 },
      title: "Florida Man Sentenced for Counterfeit Passport Check-Cashing Scheme",
      description:
        "Florida Man sentenced to federal prison for a counterfeit passport check-cashing scheme using stolen identities.",
      fullStory:
        "Robert Allen Naber of Melbourne obtained counterfeit U.S. passport cards bearing stolen identities purchased on the dark web, then used them along with stolen bank information to cash forged checks across multiple states. He was sentenced to 48 months in federal prison, to run consecutively with two Iowa state sentences for similar conduct.",
      contentNote:
        "This is a serious identity-theft and fraud case involving real victims, not a lighthearted incident.",
      source: "U.S. Department of Justice",
      sourceUrl: "https://www.justice.gov/usao-wdmi/pr/2023_0818_Naber",
    },
    {
      id: "fentanyl-drone-federal-prisons",
      date: "August 29, 2025",
      year: "2025",
      month: "August",
      day: "29",
      city: "Eustis",
      score: 64,
      rubric: { absurdity: 20, humor: 9, floridaFactor: 11, unexpectedness: 13, headlineQuality: 6, sourceQuality: 5 },
      title: "Florida Man Indicted for Flying Fentanyl Into Federal Prisons by Drone",
      description:
        "Florida Man indicted for conspiring with inmates to smuggle fentanyl into federal prisons using a drone.",
      fullStory:
        "James Key III, 45, of Eustis, was indicted on a federal charge of conspiracy to distribute fentanyl after prosecutors said he conspired with Federal Bureau of Prisons inmates between December 2024 and August 2025 to smuggle fentanyl and contraband cellphones into prisons in California, Florida, and South Carolina. Key and his co-conspirators applied fentanyl to paper, wrapped it in synthetic grass, and delivered it by drone. He faces up to 20 years in federal prison if convicted.",
      contentNote:
        "This is a serious federal drug-trafficking case, not a lighthearted incident.",
      source: "U.S. Department of Justice",
      sourceUrl:
        "https://www.justice.gov/usao-edca/pr/florida-man-indicted-conspiring-distribute-fentanyl-federal-prisons-drone",
    },
    {
      id: "sprinklers-disabled-children-bus-stop",
      date: "August 17, 2025",
      year: "2025",
      month: "August",
      day: "17",
      city: "Ocala",
      score: 54,
      rubric: { absurdity: 17, humor: 6, floridaFactor: 11, unexpectedness: 11, headlineQuality: 5, sourceQuality: 4 },
      title: "Florida Man Rigs Sprinklers to Spray Disabled Children at School Bus Stop",
      description:
        "Florida Man allegedly rigs his sprinklers to spray disabled children waiting for their school bus.",
      fullStory:
        "Antonio Roman, 61, allegedly used surveillance cameras to track when a school bus picked up disabled children in his Ocala neighborhood, then remotely triggered his sprinkler system to spray them twice a day for months, upset that the bus stop used part of his driveway for a wheelchair ramp. A parent began dressing the children in swimsuits for protection before deputies caught him in the act. He was charged with stalking and battery on a disabled person.",
      contentNote:
        "This incident involved deliberate targeting of disabled children, not just eccentric behavior.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2025/08/19/florida-man-arrested-after-using-sprinklers-to-spray-disabled-children-deputies-say/",
    },
    {
      id: "walmart-tiktok-dog-bed",
      date: "January 13, 2026",
      year: "2026",
      month: "January",
      day: "13",
      city: "Englewood",
      score: 82,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 14, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title:
        "Florida Man Tries to Spend the Night in a Closed Walmart for a TikTok Challenge, Found Hiding in the Dog Bed Section",
      description:
        "Florida Man allegedly tries to stay overnight inside a closed Walmart for a TikTok challenge and gets caught hiding in the dog bed aisle.",
      fullStory:
        "Charlotte County deputies responded to a reported burglary at a Walmart on McCall Road in Englewood just after 11 p.m. on January 13, 2026, after a caller reported a man livestreaming from inside the closed store. Deputies found 18-year-old Isaac Hurley in the dog bed section; he said he'd entered around 10:15 p.m. planning to stay overnight to complete a TikTok challenge and earn money from the views. Deputies also noted he'd unwrapped an iPhone charger while inside. Hurley was arrested on charges of burglary of an occupied structure and petit theft and bonded out for $1,500.",
      source: "Charlotte County Sheriff's Office / FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/tiktok-challenge-lands-florida-man-jail-trying-spend-night-walmart-after-closed-ccso",
    },
    {
      id: "prison-costume-dui-halloween",
      date: "October 31, 2025",
      year: "2025",
      month: "October",
      day: "31",
      city: "Port St. Lucie",
      score: 82,
      rubric: { absurdity: 20, humor: 23, floridaFactor: 12, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Arrested for DUI on Halloween While Dressed as a Prison Inmate",
      description:
        "Florida Man leaving a Halloween party dressed as a prison inmate gets arrested for DUI, already dressed the part.",
      fullStory:
        "Port St. Lucie police pulled over 18-year-old Jimmie Glover in the early hours of October 31, 2025, as he drove home from a Halloween party still wearing his costume: a black-and-white striped prison inmate outfit. Glover failed field sobriety tests and was arrested for DUI. The department posted the bodycam footage on social media with the caption, 'Locked up inmate Halloween costume was already dressed for arrest!'",
      source: "Port St. Lucie Police Department / WFLA",
      sourceUrl:
        "https://www.wfla.com/news/florida/florida-man-wearing-inmate-halloween-costume-charged-with-dui/",
    },
    {
      id: "greased-up-naked-debary-burglar",
      date: "April 7, 2023",
      year: "2023",
      month: "April",
      day: "7",
      city: "DeBary",
      score: 90,
      rubric: { absurdity: 24, humor: 22, floridaFactor: 16, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Naked, Grease-Covered Florida Man Evades Deputies via Pool and Trampoline",
      description:
        "A naked Florida man covered in wheel-bearing grease and peppermint oil breaks into two homes, then tries to escape deputies by jumping in a pool and onto a trampoline.",
      fullStory:
        "Volusia County deputies responded to a burglary in progress on Highbanks Road in DeBary around 2 a.m. on April 7, 2023, and found that 34-year-old Blake Tokman had smashed a window to break into one home before breaking into a second. Bodycam video showed Tokman, naked and covered in wheel-bearing grease, peppermint oil, and his own blood, running from deputies, diving into a backyard pool, then climbing out and jumping onto a trampoline before he was taken into custody. He was charged with two counts of burglary of an occupied dwelling, battery on a law enforcement officer, resisting arrest with violence, and criminal mischief.",
      contentNote:
        "During the struggle to arrest Tokman, one deputy sustained a laceration to his arm.",
      source: "WFTV / Volusia County Sheriff's Office",
      sourceUrl:
        "https://www.wftv.com/news/local/man-covered-grease-blood-peppermint-oil-breaks-into-homes-jumps-into-pool-onto-trampoline/E2DIP5F45NESHDHBG3G3RWEPEA/",
    },
    {
      id: "wet-willy-battery-charge",
      date: "August 31, 2018",
      year: "2018",
      month: "August",
      day: "31",
      city: "St. Lucie County",
      score: 68,
      rubric: { absurdity: 19, humor: 11, floridaFactor: 11, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Arrested for Giving Girlfriend a 'Wet Willy'",
      description:
        "Florida Man is charged with battery after allegedly forcing a 'wet willy' on his girlfriend during an argument.",
      fullStory:
        "Joseph Sireci, 47, was arrested in St. Lucie County in August 2018 after his girlfriend told a deputy he had been drinking and grew belligerent during an outing with her and her daughter. On the way home, she said, Sireci grabbed her arm and stuck his wet finger in her ear, giving her a 'wet willy.' Her daughter corroborated the account. Sireci, who denied being intoxicated and declined to give a statement, was charged with second-degree battery and released on a $2,500 bond.",
      contentNote:
        "This involved a real domestic battery charge — the act was forced on his girlfriend during an argument, not a lighthearted or consensual encounter.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-arrested-after-he-allegedly-gave-girlfriend-a-wet-willy-affidavit-says",
    },
    {
      id: "covid-relief-lamborghini",
      date: "January 12, 2022",
      year: "2022",
      month: "January",
      day: "12",
      city: "Fort Lauderdale",
      score: 76,
      rubric: { absurdity: 20, humor: 18, floridaFactor: 13, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Uses $4 Million in COVID Relief to Buy Lamborghini",
      description:
        "Florida Man allegedly spends millions in fraudulently obtained COVID relief funds on a Lamborghini, Rolex watches, and designer clothes.",
      fullStory:
        "Valesky Barosy, 27, of Fort Lauderdale, was charged with wire fraud, money laundering, and aggravated identity theft after federal prosecutors said he submitted fraudulent Paycheck Protection Program loan applications seeking more than $4.2 million during the COVID-19 pandemic. Barosy received roughly $2.1 million in relief funds and spent it on a Lamborghini Huracán EVO, Rolex and Hublot watches, and designer clothing from Louis Vuitton, Gucci, and Chanel. He faced up to 132 years in prison if convicted on all counts.",
      source: "U.S. Secret Service",
      sourceUrl:
        "https://www.secretservice.gov/newsroom/releases/2022/01/south-florida-man-charged-covid-19-relief-fraud-buying-lamborghini-rolex",
    },
    {
      id: "bra-hat-car-burglar",
      date: "July 14, 2019",
      year: "2019",
      month: "July",
      day: "14",
      city: "New Port Richey",
      score: 74,
      rubric: { absurdity: 20, humor: 18, floridaFactor: 13, unexpectedness: 12, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Man Wearing Nothing but Bra and Hat Burglarizes Cars",
      description:
        "Surveillance video shows a naked man wearing only a bra, sneakers, and a baseball cap burglarizing cars in a fenced parking lot.",
      fullStory:
        "Pasco County deputies said a man wearing nothing but a black sports bra, sneakers, and a baseball cap was caught on surveillance video climbing into a fenced parking lot and burglarizing several company vehicles at U.S. Water Services Corporation in New Port Richey. The man left drug paraphernalia at the scene and remained unidentified; deputies released the surveillance images publicly in hopes someone would recognize him.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/pasco-county/naked-florida-man-wearing-bra-burglarizes-several-cars-in-new-port-richey-parking-lot/",
    },
    {
      id: "carjacker-cant-drive-stick",
      date: "July 16, 2019",
      year: "2019",
      month: "July",
      day: "16",
      city: "Orlando",
      score: 82,
      rubric: { absurdity: 21, humor: 20, floridaFactor: 14, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Carjacker Arrested Because He Couldn't Drive Stick",
      description:
        "A carjacking attempt on an elderly man falls apart after the suspect realizes he can't operate a manual transmission.",
      fullStory:
        "Deputies said 25-year-old Jaelyn Alexander tried to carjack an elderly man at the intersection of East Colonial Drive and Dean Road in Orange County just before noon. Once inside, Alexander couldn't get the manual-transmission car moving and jumped out, then stole a second vehicle instead. He was arrested a short time later and charged with carjacking, grand theft, and battery on a victim over 65. The elderly victim told deputies he believed the stall was because Alexander didn't know how to drive a stick shift.",
      source: "CNN",
      sourceUrl:
        "https://www.cnn.com/2019/07/18/us/florida-man-arrested-carjacking-stick-shift-trnd",
    },
    {
      id: "dog-was-driving",
      date: "October 7, 2015",
      year: "2015",
      month: "October",
      day: "7",
      city: "Bradenton",
      score: 78,
      rubric: { absurdity: 20, humor: 19, floridaFactor: 14, unexpectedness: 13, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Pulled Over During Traffic Stop Claims Dog Was Driving",
      description:
        "A DUI suspect tells deputies his dog, not him, was actually behind the wheel of the car.",
      fullStory:
        "Manatee County deputies chased down 26-year-old Reliford Cooper III after clocking him speeding around 7:45 p.m. As he was being handcuffed on suspicion of DUI with damage to a person or property, Cooper told deputies, 'I wasn't driving that car.' Pressed for an explanation, he elaborated: 'My dog was driving that car.' There was no dog in the vehicle.",
      source: "HuffPost",
      sourceUrl:
        "https://www.huffingtonpost.com/entry/reliford-cooper-dog-driving-car_us_561bbe80e4b0e66ad4c87505",
    },
    {
      id: "forklift-tired-of-walking",
      date: "June 25, 2017",
      year: "2017",
      month: "June",
      day: "25",
      city: "Port Orange",
      score: 76,
      rubric: { absurdity: 19, humor: 20, floridaFactor: 13, unexpectedness: 11, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Man Steals Forklift Because He Was Tired of Walking",
      description:
        "Florida Man caught driving a stolen forklift says he took it because he was tired of walking — and it wasn't his first time.",
      fullStory:
        "Port Orange police approached 43-year-old Bradley Barefoot — who was, fittingly, barefoot — after spotting him driving a stolen forklift worth roughly $38,000. He initially claimed he thought it was equipment stolen from his boss in Alabama, then admitted he took it because he noticed the keys left in the ignition and was tired of walking. He was found parked in a handicap spot with a mattress loaded on the forklift. It was Barefoot's second forklift theft with the same excuse — he'd taken one from behind a Daytona Beach Best Buy the year before. He was charged with grand theft.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/strange-florida/2017/06/29/florida-man-tired-of-walking-steals-forklift-police-say/",
    },
    {
      id: "naked-school-vandal-24hrs",
      date: "May 25, 2020",
      year: "2020",
      month: "May",
      day: "25",
      city: "Miramar",
      score: 79,
      rubric: { absurdity: 22, humor: 19, floridaFactor: 12, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Naked Florida Man Spends 24 Hours Vandalizing School",
      description:
        "A man breaks into a high school and spends nearly a full day smashing computers and flooding hallways while completely nude.",
      fullStory:
        "Miramar police said 21-year-old Matthew Crandall broke into Miramar High School around 7 a.m. and spent the next 24 hours inside, naked, smashing computers, destroying classrooms, and flooding hallways. The rampage caused more than $100,000 in damage before Crandall, of North Fort Myers, was arrested and charged with burglary and criminal mischief.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/trending/naked-florida-man-spent-24-hours-vandalizing-school-police-say/O22V4K6C7VDLBJZFQ6YCROB5GY/",
    },
    {
      id: "diaper-monkey-car-theft",
      date: "June 8, 2018",
      year: "2018",
      month: "June",
      day: "8",
      city: "Holiday",
      score: 88,
      rubric: { absurdity: 23, humor: 22, floridaFactor: 15, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Drives Stolen Car into Ditch with Diaper-Wearing Monkey Attached to Him",
      description:
        "A man is arrested for driving a stolen car into a ditch — with a diaper-wearing pet monkey clinging to his shirt the whole time.",
      fullStory:
        "Pasco County deputies arrested 24-year-old Cody Blake Hesson in Holiday after he drove a stolen vehicle into a ditch and tried to run. When deputies caught up to him, his pet capuchin monkey, named Monk and wearing a diaper, was still clinging to his shirt. Hesson had no permit for the animal and faced additional charges on top of auto theft; deputies had to separate him from Monk, who was confiscated, before the two shared a goodbye hug.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/monkey-in-diaper-found-clinging-to-florida-man-in-stolen-car-police-say/765770525/",
    },
    {
      id: "wears-womans-clothes-asks-drink",
      date: "May 29, 2019",
      year: "2019",
      month: "May",
      day: "29",
      city: "Jacksonville",
      score: 72,
      rubric: { absurdity: 19, humor: 17, floridaFactor: 12, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Breaks into Woman's Home, Wears Her Clothes, Asks Her for a Drink",
      description:
        "A man fleeing police breaks into a 77-year-old woman's home, changes into her clothes to hide from officers, then casually asks for a drink.",
      fullStory:
        "Jacksonville Sheriff's Office investigators said 37-year-old Kristopher Patterson, being chased by an officer over a robbery, broke into a 77-year-old woman's home and changed into her clothing to avoid being identified. When the homeowner found him, Patterson told her he was hiding from police and asked if he could have a drink from her fridge. He then took her purse and car keys and fled in her Cadillac, which he was later found slumped over the wheel of in a Walmart parking lot on Philips Highway. He was charged with burglary of an occupied dwelling, carjacking, petit theft, and resisting an officer without violence.",
      source: "News4Jax",
      sourceUrl:
        "https://www.news4jax.com/news/2019/05/29/police-burglar-dressed-as-woman-took-her-cadillac-drove-to-walmart/",
    },
    {
      id: "mcdonalds-railing-dance",
      date: "June 11, 2019",
      year: "2019",
      month: "June",
      day: "11",
      city: "Naples",
      score: 77,
      rubric: { absurdity: 21, humor: 20, floridaFactor: 12, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Naked Florida Man Dances at McDonald's, Tries to Have Sex with Railing",
      description:
        "A man strips naked in a Naples McDonald's, performs a 'strange dance,' and appears to try to have relations with a railing.",
      fullStory:
        "Collier County deputies responded to a Naples McDonald's on Tamiami Trail East after witnesses reported a man taking off his clothes and dancing strangely, appearing to try to have sexual contact with a railing. The man was identified as 62-year-old John Francis Morgan, who had been warned the night before to stay away from the restaurant after a prior trespass warning. He was arrested and charged with trespass on property other than a structure.",
      source: "Newsweek",
      sourceUrl:
        "https://www.newsweek.com/florida-man-naked-strange-dance-mcdonalds-sex-railing-1443522",
    },
    {
      id: "dunkin-donuts-restaurant-chairs",
      date: "June 8, 2019",
      year: "2019",
      month: "June",
      day: "8",
      city: "Naples",
      score: 66,
      rubric: { absurdity: 16, humor: 17, floridaFactor: 10, unexpectedness: 10, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Man Goes to Restaurant, Stands on Chairs, Flips Off Customers, Tells Cops to Go to Dunkin' Donuts",
      description:
        "A disorderly man standing on chairs and cursing at diners tells the deputies who arrive to instead go get Dunkin' Donuts.",
      fullStory:
        "The manager of Latino America Restaurant in Naples told Collier County deputies that 55-year-old John Toddy slammed the outdoor menu sign, then went inside, stood on chairs, and stuck his middle finger up at patrons while shouting and cursing. When deputies arrived, Toddy — described as having bloodshot, watery eyes and slurred speech — told them to 'get back in your car and go to Dunkin' Donuts.' He was charged with disorderly intoxication.",
      source: "WINK News",
      sourceUrl:
        "https://www.winknews.com/2019/06/09/florida-man-disrupts-restaurant-tells-officers-go-to-dunkin-donuts/",
    },
    {
      id: "cocaine-on-nose",
      date: "June 9, 2019",
      year: "2019",
      month: "June",
      day: "9",
      city: "Hillsborough County",
      score: 66,
      rubric: { absurdity: 15, humor: 18, floridaFactor: 10, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man with Cocaine on His Nose Tells Cops It's Not His",
      description:
        "A passenger with visible white powder around his nose insists to deputies that the cocaine isn't his.",
      fullStory:
        "A Hillsborough County deputy pulled over a car around 4:30 a.m. and noticed a white powdery substance around the nose of 20-year-old passenger Fabricio Tueros Jimenez, which field-tested positive for cocaine. A search also turned up 250 grams of marijuana and 13 Xanax pills in a backpack. Despite the powder on his face, Jimenez told deputies the cocaine was not his.",
      source: "Newsweek",
      sourceUrl:
        "https://www.newsweek.com/florida-man-tells-deputies-cocaine-his-nose-not-his-police-say-1443272",
    },
    {
      id: "excavator-walmart-crash",
      date: "September 11, 2023",
      year: "2023",
      month: "September",
      day: "11",
      city: "Gainesville",
      score: 83,
      rubric: { absurdity: 23, humor: 19, floridaFactor: 14, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Steals Excavator, Goes for Joyride, Crashes into Walmart",
      description:
        "A man hot-wires a construction excavator, plows it through several buildings, and finally crashes it into a Walmart loading dock.",
      fullStory:
        "Gainesville police said 47-year-old Jesse Charles Smith hot-wired an excavator from a worksite on Southwest 47th Street and went on a rampage, smashing into buildings at a nearby storage facility before driving the machine into the loading dock wall of a Walmart at Butler Plaza. He then climbed out of the cab and entered the store carrying a machete. The damage was estimated at more than $2 million. Smith, who admitted to being on drugs, was later sentenced to 10 years in prison followed by 10 years of probation.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/suspect-plows-through-florida-walmart-with-stolen-excavator-police",
    },
    {
      id: "street-sweeper-theft",
      date: "September 27, 2023",
      year: "2023",
      month: "September",
      day: "27",
      city: "Ocala",
      score: 74,
      rubric: { absurdity: 19, humor: 19, floridaFactor: 12, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Steals Employer's Street Sweeper to Clean Streets for Another Company",
      description:
        "A former lawn-care employee, denied use of his old boss's street sweeper, steals it anyway to do a job for a competitor.",
      fullStory:
        "A Marion County lawn-care business owner reported his street sweeper stolen from a shop on Northeast 150th Avenue. Deputies identified the suspect as 29-year-old Kevin Rodriguez Aponte, a former employee who had left the company about six months earlier after a dispute over him taking contracts to start his own business. Aponte had called the day before asking to borrow the street sweeper and was refused. In a post-Miranda interview, he admitted he didn't have permission but needed it for a job in Ocala and planned to return it. He was charged with grand theft of a motor vehicle.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-arrested-for-borrowing-ex-employers-street-sweeper-to-do-a-job-with-competing-company-deputies",
    },
    {
      id: "trump-trillion-dollars",
      date: "September 9, 2019",
      year: "2019",
      month: "September",
      day: "9",
      city: "Fort Walton Beach",
      score: 80,
      rubric: { absurdity: 21, humor: 19, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Smashes 20 Car Windows, Says Trump Owes Him 1 Trillion Dollars",
      description:
        "A homeless man goes on a window-smashing spree through a hotel parking lot and offers an extraordinary explanation.",
      fullStory:
        "Okaloosa County deputies arrested 30-year-old Justin James Wilson after he used rocks and a belt buckle to smash the windows of at least 20 cars parked at a Holiday Inn Resort on Okaloosa Island, causing roughly $30,000 in damage. When confronted, Wilson admitted to breaking the windows, telling deputies: 'Take me to jail. I did it because Donald Trump owes me one trillion dollars and these vehicles belong to the mafia.' He faced 14 felony and six misdemeanor counts of criminal mischief.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-smashed-windows-trump-trillion-dollars",
    },
    {
      id: "breakfast-break-in",
      date: "September 3, 2019",
      year: "2019",
      month: "September",
      day: "3",
      city: "Safety Harbor",
      score: 79,
      rubric: { absurdity: 20, humor: 20, floridaFactor: 12, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Breaks into Home, Cooks Breakfast, Tells Owner to 'Go Back to Sleep'",
      description:
        "A homeowner wakes up before dawn to find a stranger cooking himself breakfast in the kitchen, who calmly tells him to go back to bed.",
      fullStory:
        "A Safety Harbor resident told Pinellas County deputies he woke up after 4 a.m. to find 19-year-old Gavin Crim, a Marine, cooking and eating a meal in his kitchen after entering through an unlocked rear door. When the homeowner confronted him, Crim told him to 'go back to sleep.' Crim fled into a wooded, swampy area when the resident called 911 but was tracked down by deputies nearby. He was charged with burglary of an occupied dwelling and released on a $1,000 bond.",
      source: "Tampa Bay Times",
      sourceUrl:
        "https://www.tampabay.com/news/florida/2019/09/09/florida-man-breaks-into-home-cooks-meal-tells-owner-go-back-to-sleep/",
    },
    {
      id: "booty-patrol-truck",
      date: "October 29, 2023",
      year: "2023",
      month: "October",
      day: "29",
      city: "DeSoto County",
      score: 79,
      rubric: { absurdity: 20, humor: 19, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Gets Citation for 'Booty Patrol' Truck",
      description:
        "A driver is cited after deputies determine his 'Booty Patrol' truck, complete with flashing red and blue lights, too closely resembles a Border Patrol vehicle.",
      fullStory:
        "DeSoto County deputies spotted a white Chevy Silverado with a green stripe, the words 'Booty Patrol' on the back, and red and blue flashing lights on the grille at the Mosaic Arena. When a deputy approached, the driver, later identified as Gabriel Luviano-Renteria, turned off the lights and drove away. He was cited under a law banning vehicles from displaying lights that too closely resemble law enforcement lights, and additional charges of impersonating law enforcement and obstructing police followed weeks later.",
      source: "NBC News",
      sourceUrl:
        "https://www.nbcnews.com/news/us-news/driver-booty-patrol-truck-resembled-border-patrol-cited-florida-rcna123262",
    },
    {
      id: "rental-car-uber",
      date: "October 24, 2023",
      year: "2023",
      month: "October",
      day: "24",
      city: "Polk County",
      score: 71,
      rubric: { absurdity: 17, humor: 18, floridaFactor: 11, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Stops Paying for Rental Car, Uses It to Give Uber Rides",
      description:
        "An Uber driver keeps a stolen rental car running nonstop for three weeks straight to dodge the remote shutoff device after he stopped making payments.",
      fullStory:
        "Polk County deputies stopped 27-year-old Elijah Mills, of Maitland, on U.S. 27 in Davenport while he was giving an Uber ride to a couple visiting from the United Kingdom for their upcoming wedding. Deputies said Mills had rented the Chevrolet Equinox, stopped making payments, and then kept the vehicle running nonstop for three weeks to avoid a remote shutoff device the rental company could trigger. Mills acknowledged the company had been calling him daily. He was booked on charges of grand theft motor vehicle and driving with a suspended license.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2023/10/26/florida-uber-driver-kept-stolen-rental-car-running-for-3-weeks-to-avoid-payments-deputies-say/",
    },
    {
      id: "naked-asleep-punches-cop",
      date: "October 24, 2023",
      year: "2023",
      month: "October",
      day: "24",
      city: "Delray Beach",
      score: 57,
      rubric: { absurdity: 17, humor: 8, floridaFactor: 10, unexpectedness: 11, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Man Found Drunk, Naked and Asleep Outside, Punches Cop Who Wakes Him",
      description:
        "A naked man passed out face-down in an intersection wakes up and immediately punches the officer trying to help him.",
      fullStory:
        "Delray Beach police found 28-year-old Edward Tuttle lying naked and unconscious, face-down in the grass of an intersection. As an officer shook him awake, Tuttle stood up and, without warning, punched the officer in the nose. He was tased and taken into custody, still naked, and later admitted he had been drunk.",
      contentNote:
        "This incident involved a real injury — a police officer was punched in the face.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/edward-tuttle-naked-drunk-man-punched-cop-intoxicated-lying-face-down-battery-delray-beach-police-department-officer-florida-october-24-2023",
    },
    {
      id: "hatchet-spilled-beer",
      date: "October 23, 2023",
      year: "2023",
      month: "October",
      day: "23",
      city: "Escambia County",
      score: 52,
      rubric: { absurdity: 16, humor: 6, floridaFactor: 10, unexpectedness: 10, headlineQuality: 6, sourceQuality: 4 },
      title: "Florida Man Hits Other Florida Man in Head with Hatchet Over Spilled Beer",
      description:
        "A dispute over a spilled beer inside a tent leads a man to grab a hatchet and swing it at the person he blamed.",
      fullStory:
        "Escambia County deputies responded to a report of an armed disturbance near tents by a La Quinta Inn on North Davis Highway. Deputies said 56-year-old Danny Tharp accused another man of spilling his beer inside Tharp's tent, then grabbed a hatchet and swung it wildly at him, striking him several times. The victim escaped bleeding from his eye and mouth and found deputies nearby. Tharp was arrested and charged with attempted homicide.",
      contentNote:
        "This incident involved a real injury — the victim was struck in the head with a hatchet and left bleeding.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/florida/florida-man-hits-another-in-the-face-with-a-hatchet-over-spilled-beer-deputies/",
    },
    {
      id: "bucs-jersey-police-impersonator",
      date: "October 22, 2023",
      year: "2023",
      month: "October",
      day: "22",
      city: "Sumter County",
      score: 79,
      rubric: { absurdity: 20, humor: 19, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man in Bucs Jersey Tries Pulling Over Cars, Arrested for Impersonating Police",
      description:
        "A man wearing a Buccaneers jersey rigs his truck with red and blue lights and tries to pull over other drivers on I-75.",
      fullStory:
        "A Florida Highway Patrol trooper was alerted to a red GMC Sierra pickup trying to pull over other vehicles using flashing red and blue lights on I-75 near Bushnell. A witness said the truck aggressively motioned him to pull over before speeding off. The trooper stopped the truck and identified the driver as 62-year-old Earl Mitchell Cesario, wearing a Rob Gronkowski Buccaneers jersey. A search turned up dashboard-mounted red and blue lights wired to the cigarette lighter. Cesario was charged with false personation of officials.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/tampa-sumter-county-police-officer-impersonator-buccaneers-jersey-interstate",
    },
    {
      id: "dolphin-headbutt-window",
      date: "October 15, 2023",
      year: "2023",
      month: "October",
      day: "15",
      city: "Marion County",
      score: 79,
      rubric: { absurdity: 21, humor: 20, floridaFactor: 12, unexpectedness: 13, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Man Headbutts Car Window, Flops Out Like a Dolphin, Says He's 'High as F--k'",
      description:
        "A man fleeing deputies at high speed crashes through a fence, headbutts his own car window open, and flops out onto the ground.",
      fullStory:
        "The Marion County Sheriff's Office said 24-year-old Tyler Fayconsolo led deputies on a chase reaching speeds up to 100 mph after leaving a Circle K, until spike strips deflated his tires and a concrete fence stopped the car. Dashcam video showed Fayconsolo headbutt the passenger window open and come 'flying out like a dolphin' before running from a K-9 officer, who caught him. At the hospital, Fayconsolo told deputies he was 'high as f—' before being booked on charges including DUI and aggravated fleeing.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/high-as-f-dash-cam-video-shows-florida-man-head-butt-car-window-flop-out-of-car-during-high-speed-chase",
    },
    {
      id: "all-gas-no-brakes-tattoo",
      date: "November 13, 2023",
      year: "2023",
      month: "November",
      day: "13",
      city: "Polk County",
      score: 76,
      rubric: { absurdity: 19, humor: 19, floridaFactor: 13, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man with 'ALL GAS No Brakes' Neck Tattoo Crashes While Fleeing Police",
      description:
        "A man with a neck tattoo reading 'All gas, no brakes' lives up to it, crashing at high speed while fleeing a string of car burglaries.",
      fullStory:
        "Polk County deputies responded to a report of car burglaries in the Preservation Pointe neighborhood around 3:30 a.m. and spotted 37-year-old Timothy Allen Hogue and 31-year-old Rebecca Kozub in a white Cadillac. When a deputy tried to stop them, Hogue sped off and later crashed into a parked car at high speed. Sheriff Grady Judd noted Hogue has a neck tattoo reading 'All gas, no brakes.' Hogue was treated at a hospital and later admitted to the burglaries, blaming the idea on Kozub. He was charged with multiple counts of burglary, fleeing to elude, conspiracy, and drug possession.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/video-florida-man-with-all-gas-no-brakes-neck-tattoo-crashes-after-fleeing-polk-county-crime-scene",
    },
    {
      id: "fbi-haunted-house-bb-gun",
      date: "October 31, 2023",
      year: "2023",
      month: "October",
      day: "31",
      city: "Seminole",
      score: 58,
      rubric: { absurdity: 18, humor: 7, floridaFactor: 10, unexpectedness: 12, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Man Dressed as FBI Pistol-Whips Haunted House Host with BB Gun",
      description:
        "A man dressed as an FBI agent visiting a free haunted house strikes the host in the face with an airsoft handgun, then says he thought he was a statue.",
      fullStory:
        "Deputies said 20-year-old Ingus Schusser, wearing an FBI jacket and body armor and carrying an airsoft handgun resembling a Glock, visited a free haunted house at a Seminole home on Halloween night. Rounding a corner, he struck the 47-year-old host — who was in costume but not actively performing — in the face with the gun's handle, causing significant injury. Schusser reportedly laughed afterward and was unapologetic. He was arrested and charged with aggravated battery and possession of body armor during commission of a felony.",
      contentNote:
        "This incident involved a real injury — the victim was struck in the face and sustained significant injury.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-hits-haunted-house-host-in-eye-with-toy-gun-after-mistaken-them-for-statue-deputies",
    },
    {
      id: "dollar-general-voices",
      date: "November 13, 2023",
      year: "2023",
      month: "November",
      day: "13",
      city: "Ocala",
      score: 63,
      rubric: { absurdity: 16, humor: 15, floridaFactor: 10, unexpectedness: 11, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Man Robs Same Dollar General Twice, Blames Voices in His Head",
      description:
        "A man robs the same Dollar General store on back-to-back days and, when caught, blames voices in his head.",
      fullStory:
        "Marion County deputies said a Dollar General employee on West Highway 26 in Ocala recognized a man who returned to the store a day after allegedly robbing it, and tried to call 911. The man, identified as Matthew Pringle, allegedly grabbed the employee, took the phone from his hand, and knocked him to the ground before fleeing again. Pringle was arrested and told deputies he was 'hearing voices' that directed him to commit the robberies. He was charged with two counts of robbery and resisting an officer without violence.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-claims-voices-made-him-rob-dollar-general-twice-2-days-deputies",
    },
    {
      id: "27-tires-secret-government",
      date: "November 2, 2023",
      year: "2023",
      month: "November",
      day: "2",
      city: "Miami-Dade County",
      score: 74,
      rubric: { absurdity: 20, humor: 18, floridaFactor: 12, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Slashes 27 Tires, Claims He Was Sabotaged by Secret Government Exposure",
      description:
        "A man is caught on home security cameras slashing tires throughout a neighborhood, then claims in court he was targeted by the government.",
      fullStory:
        "Home security cameras captured 41-year-old Juan Pablo Ramos-Nieto walking through the Villas Del Campos community in southwest Miami-Dade County with a knife around 5 a.m., slashing tires on 17 vehicles — including a marked Homestead police cruiser — for a total of 27 slashed tires and about $6,000 in damage. In bond court, Ramos-Nieto claimed he had been exposed to 'secret government information' and was being 'demonized' by the CIA. He was charged with 27 counts of criminal mischief.",
      source: "NBC 6 South Florida",
      sourceUrl:
        "https://www.nbcmiami.com/news/local/florida-man-charged-with-27-counts-for-slashing-tires-claims-hes-being-demonized-and-was-exposed-to-government-info/3151606/",
    },
    {
      id: "mclovin-motorcycle",
      date: "November 5, 2023",
      year: "2023",
      month: "November",
      day: "5",
      city: "Plant City",
      score: 78,
      rubric: { absurdity: 19, humor: 19, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man in Police Chase on Motorcycle with Fake MCLOVIN License Plate",
      description:
        "A motorcyclist with a fake Hawaiian 'MCLOVIN' plate — a reference to Superbad — leads troopers on a 110 mph chase across the Gandy Bridge.",
      fullStory:
        "A Florida Highway Patrol trooper spotted 30-year-old Jessie Rivera, of Plant City, swerving between vehicles at high speed on a motorcycle displaying a fake Hawaiian tag reading 'MCLOVIN.' Rivera hit 110 mph in a posted 45 mph zone and fled from the trooper, a St. Petersburg police officer, and a Pinellas deputy before getting onto the Gandy Bridge. The chase ended when the trooper pulled Rivera off the bike, which fell on both of them and broke Rivera's foot. He was booked on a charge of fleeing law enforcement at high speed.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/hillsborough-county/plant-city-motorcyclist-with-mclovin-plate-flees-from-officers-at-over-110-mph-fhp/",
    },
    {
      id: "school-feces-frosting",
      date: "August 25, 2019",
      year: "2019",
      month: "August",
      day: "25",
      city: "Apopka",
      score: 67,
      rubric: { absurdity: 20, humor: 12, floridaFactor: 11, unexpectedness: 12, headlineQuality: 7, sourceQuality: 5 },
      title: "Nearly Naked Florida Man Breaks into School, Smears Feces and Cake Frosting Everywhere",
      description:
        "A half-naked man breaks into an elementary school and smears feces and stolen cake frosting across classrooms and hallways.",
      fullStory:
        "Seminole County deputies said 25-year-old Christian Dominic Shay broke into Bear Lake Elementary School in Apopka while half-naked and spread cake frosting and human feces across a classroom, leaving frosting and bare footprints on the floor, handprints on a window ledge, a stapler in a toilet, and a feces-covered TV remote. Detectives identified Shay through surveillance footage months later; he told them he believed he committed the offenses after smoking a marijuana blunt he suspected had been laced with an unknown substance. He was charged with petit theft, criminal mischief, exposure of sexual organs, and creating a nuisance injurious to health.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/2019/11/25/mostly-naked-florida-man-accused-of-spreading-feces-during-school-break-in/",
    },
    {
      id: "walmart-ceiling-nurse",
      date: "November 19, 2019",
      year: "2019",
      month: "November",
      day: "19",
      city: "New Port Richey",
      score: 56,
      rubric: { absurdity: 18, humor: 6, floridaFactor: 10, unexpectedness: 11, headlineQuality: 7, sourceQuality: 4 },
      title: "Wal-Mart Evacuated After Florida Man Found Crawling Through Ceiling",
      description:
        "A Walmart is evacuated after a man barricades himself in a crawl space above the ceiling, and he later attacks a nurse at the hospital.",
      fullStory:
        "Pasco County deputies said William L. Harrell Jr., 47, entered a New Port Richey Walmart and asked an employee for a phone, claiming his wife was trying to kill him. He then went behind the service desk, threw a stool, barricaded himself in a communications closet, and climbed into the ceiling crawl space, prompting the store's evacuation. Deputies used a stun gun, bean bag gun, and pepper spray to get him down. At the hospital for medical clearance, Harrell punched a nurse in the face, knocked him down, and continued beating him. He was charged with aggravated assault on a law enforcement officer, business burglary, criminal mischief, disorderly conduct, resisting arrest, and battery on a nurse.",
      contentNote:
        "This incident involved a real injury — a nurse was punched, knocked down, and beaten while treating the suspect.",
      source: "Newsweek",
      sourceUrl:
        "https://www.newsweek.com/florida-man-tased-out-ceiling-walmart-1472865",
    },
    {
      id: "meth-belly-button",
      date: "November 16, 2019",
      year: "2019",
      month: "November",
      day: "16",
      city: "Clearwater",
      score: 72,
      rubric: { absurdity: 18, humor: 18, floridaFactor: 11, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "380-Pound Florida Man Hides Meth in Belly Button",
      description:
        "A jail intake search turns up a bag of methamphetamine wedged deep inside a 380-pound man's belly button.",
      fullStory:
        "Clearwater police responded to a McDonald's after a report of a suspicious person and arrested 41-year-old Martin Skelly, of St. Petersburg, who was found with a hypodermic needle containing methamphetamine. During intake at the Pinellas County Jail, a deputy discovered a small bag of crystal powder wedged deep within the belly button cavity of Skelly, who weighed 380 pounds. He told an investigator he 'was just being dumb and not thinking.' Skelly faced two additional felony charges for introducing contraband into a correctional facility and narcotics possession.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/strange-florida/2019/11/27/florida-man-stashes-meth-deep-in-belly-button-police-say/",
    },
    {
      id: "fake-cop-pulls-over-undercover-deputy",
      date: "June 24, 2026",
      year: "2026",
      month: "June",
      day: "24",
      city: "Thonotosassa",
      score: 86,
      rubric: { absurdity: 22, humor: 21, floridaFactor: 15, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Impersonating Police Tries to Pull Over an Undercover Sheriff's Deputy",
      description:
        "A man flashing red and blue lights from his SUV tries to pull over an unmarked car on the highway — which turns out to be an undercover deputy.",
      fullStory:
        "Hillsborough County deputies said 46-year-old Nadi Jabari activated red and blue emergency lights on his black Chevrolet Suburban while following an undercover HCSO vehicle on U.S. Highway 301 North in Thonotosassa, appearing to try to pull it over. The undercover deputy alerted other units, who quickly stopped Jabari's SUV. A search turned up the active light setup, a spare light bar, and a handgun. Jabari was charged with false personation, unlawful use of a blue light, and possession of a firearm during the commission of a felony.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/fake-law-enforcement-officer-pulls-over-undercover-hillsborough-county-deputy-hcso",
    },
    {
      id: "key-west-conch-train-birthday-joyride",
      date: "July 4, 2025",
      year: "2025",
      month: "July",
      day: "4",
      city: "Key West",
      score: 90,
      rubric: { absurdity: 23, humor: 22, floridaFactor: 17, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Marks His Birthday by Doing Meth and Stealing a Tourist Train",
      description:
        "A man celebrates his 57th birthday by sneaking onto a parked sightseeing trolley, driving off with it, and picking up random passengers downtown.",
      fullStory:
        "Key West police said 57-year-old Jonathan Patrick Winslow told a Conch Tour Train employee he used to work for the company and asked for a tour, then climbed aboard a trolley parked inside a depot building and drove off in it. Employees tracked the trolley down and told officers Winslow had picked up two random passengers downtown along the way. He was found near the Southernmost Buoy and told police he doesn't steal, he 'borrowed' the trolley, and that it was his birthday. A search after his arrest turned up a glass pipe containing methamphetamine in his swim trunks. He was charged with burglary, grand theft auto, and possession of drug paraphernalia.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/florida-man-accused-taking-key-west-conch-tour-train-joyride-having-meth",
    },
    {
      id: "vodka-spritzer-police-chase",
      date: "April 19, 2025",
      year: "2025",
      month: "April",
      day: "19",
      city: "Sebring",
      score: 80,
      rubric: { absurdity: 20, humor: 20, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Offers Deputies a Vodka Spritzer Mid-Chase, Asks If They 'Had Fun'",
      description:
        "A man leading deputies on a multi-mile chase holds a stolen can of vodka spritzer out the window and offers them a drink.",
      fullStory:
        "Highlands County deputies said 39-year-old Richard Christopher Smith stole alcohol and other items from the Spring Lake Market in Sebring, then led deputies on a chase that ended in a parking lot at the Sebring Airport. Bodycam video showed Smith holding a can of Ketel One vodka spritzer out his window as he drove past a deputy, saying, 'I was just going to give you a drink, that's it.' Smith allegedly tried to ram two patrol vehicles before his tires were flattened by spike strips; he then got out smoking a cigarette and was tased. Afterward, he asked deputies, 'You guys had fun, though, right?' He faced charges including aggravated assault on law enforcement, battery on law enforcement, resisting arrest, and DUI.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-steals-alcohol-offers-deputies-vodka-spritzer-during-police-chase-officials",
    },
  ];
