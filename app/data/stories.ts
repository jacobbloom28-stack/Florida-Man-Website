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
    color: "#2563EB",
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
  // A real photo tied to the incident (booking photo where available,
  // otherwise a news photo), pulled from the original source article and
  // stored under /public/photos. Omitted when no confident, rights-clear
  // photo could be found — those stories fall back to the illustrated card.
  photo?: {
    src: string;
    // Who took/released it — shown as a small credit line under the image,
    // linked back to sourceUrl.
    credit: string;
  };
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
      photo: { src: "/photos/flock-camera-decoy.jpg", credit: "WFTV" },
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
      photo: { src: "/photos/taco-bell-roof.jpg", credit: "Local 10" },
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
      photo: { src: "/photos/alex-boom-bomb-threat.jpg", credit: "Local 10" },
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
      photo: { src: "/photos/junk-man-carjacker.jpg", credit: "WFTV" },
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
      photo: { src: "/photos/i-eat-ass-sticker.jpg", credit: "The Smoking Gun" },
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
    photo: { src: "/photos/easter-bunny-fight.jpg", credit: "Miami Herald" },
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
      photo: { src: "/photos/tutu-farmers-market.jpg", credit: "ABC Action News" },
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
      photo: { src: "/photos/26-cars-jail-parking.jpg", credit: "Tampa Bay Times" },
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
      photo: { src: "/photos/naked-basketball-skills.jpg", credit: "FOX 51 Gainesville" },
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
      photo: { src: "/photos/75-pool-floats.jpg", credit: "CBS Miami" },
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
        "A 40-year-old Riviera Beach man was charged with grand theft after investigators said he stole a friend's collection of commemorative presidential dollar coins, worth roughly $33,000, along with other items totaling $350,000. He reportedly sold some coins to a pawn shop for a few thousand dollars, then ran the rest through Coinstar change machines at grocery stores, which paid out only face value, leaving him with about $30.",
      source: "WFTV / CBS Miami (AP)",
      sourceUrl:
        "https://www.wftv.com/news/trending-now/florida-man-steals-33000-in-rare-coins-uses-them-in-change-machines/924780854/",
      photo: { src: "/photos/33000-coinstar-coins.jpg", credit: "WFTV" },
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
        "The U.S. Coast Guard found a 44-year-old Florida man about 70 nautical miles off Tybee Island, Georgia, inside a homemade 'hydro-pod' built from wiring and buoys, as Hurricane Franklin approached. He told officers he was trying to run all the way to London. During a three-day standoff he claimed to be armed and threatened to detonate a bomb, which he later admitted did not exist. It was not his first attempt to cross open water in a human-powered vessel. He tried a similar trip toward New York in 2021.",
      source: "NBC News / NPR / Coast Guard",
      sourceUrl:
        "https://www.nbcnews.com/news/us-news/florida-man-arrested-attempting-cross-atlantic-human-powered-hamster-w-rcna103873",
      photo: { src: "/photos/atlantic-hamster-wheel.jpg", credit: "NBC News" },
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
      title: "Florida Man Threatens to 'Kill 'Em With Kindness,' the Name of His Machete",
      description:
        "A Florida man takes the phrase 'kill them with kindness' literally, deputies say.",
      fullStory:
        "A 30-year-old Milton man was arrested after neighbors said he threatened to 'kill 'em with kindness' during a loud dispute, then emerged from his home with a machete-style knife that had the word 'kindness' etched into the blade. One neighbor sustained a cut trying to block the attack. He was charged with aggravated assault and aggravated battery with a deadly weapon.",
      source: "Fox News / Pensacola News Journal",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-threatens-to-kill-neighbor-with-kindness-thats-the-name-of-his-machete",
      photo: { src: "/photos/kindness-machete.jpg", credit: "Fox News" },
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
        "A homeowner catches a man breaking into his vacant house, with a horse in tow.",
        fullStory:
        "Homeowner Steve Ferguson got a security alert showing a man wandering his Pasco County property with a horse beside him. When confronted, 52-year-old Lonnie Maddox, known locally as 'Rooster,' said the horse had broken into the yard and he'd followed it in to retrieve it. Surveillance video told a different story: Maddox tried the padlocked front door before breaking a back window to get inside. He didn't own the horse. It had been borrowed and was later returned to its actual owner. Maddox was charged with burglary of a dwelling.",
        source: "Local10 / Bay News 9",
        sourceUrl:
        "https://www.local10.com/news/florida/florida-man-blames-horse-for-breaking-into-home",
      photo: { src: "/photos/horse-blames-break-in.jpg", credit: "Pasco County Sheriff's Office" },
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
      photo: { src: "/photos/spiderman-liquor-heist.jpg", credit: "ABC13" },
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
      // No photo: the only available frame grab is a blurry crop of a store
      // sign with no gator, beer, or person in it — the illustrated card
      // (see StoryVisual.tsx) represents the story better than that photo did.
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
      photo: { src: "/photos/anti-christ-helicopter-theft.jpg", credit: "FOX 13 Tampa Bay" },
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
      photo: { src: "/photos/prosthetic-breasts-gun.jpg", credit: "FOX 13 Tampa Bay" },
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
        "A deputy pulls a man over for driving nearly double the speed limit, and gets an unusually honest excuse.",
        fullStory:
        "A DeSoto County Sheriff's Office deputy clocked Gavin Ames driving 110 mph in a 60 mph zone around 1 a.m. When asked why he was speeding, Ames didn't make an excuse. He told the deputy he was racing to catch his girlfriend cheating. He was arrested under Florida's 'super speeder' law.",
        source: "Fox News / FOX 13 Tampa Bay",
        sourceUrl:
        "https://www.foxnews.com/outkick-culture/florida-man-arrested-110-mph-tells-deputy-racing-catch-cheating-girlfriend",
      photo: { src: "/photos/110mph-cheating-girlfriend.jpg", credit: "Fox News" },
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
      photo: { src: "/photos/salt-walmart-evil-spirits.jpg", credit: "Patch" },
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
      photo: { src: "/photos/poops-couch.jpg", credit: "WTXL" },
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
      photo: { src: "/photos/400-pounds-avocados.jpg", credit: "Fox News" },
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
      photo: { src: "/photos/truck-dont-surf.jpg", credit: "WFLA" },
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
      photo: { src: "/photos/cell-tower-sunset.jpg", credit: "WFLA" },
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
        "Ivan Mariotti, 44, of Key Biscayne, allegedly wore a blue suit with a gold badge around his neck to pose as security and slip into the Eras Tour show at Hard Rock Stadium on October 18, 2024. When an officer asked about the badge, Mariotti said he'd been hired to escort 'his four clients' to their seats, but those four women told police they'd only hired a driver, not a security guard. He was charged with falsely impersonating an officer and interference with a sporting or entertainment event.",
      source: "Local 10",
      sourceUrl:
        "https://www.local10.com/news/local/2024/10/21/man-impersonates-security-guard-to-get-into-taylor-swift-concert-police-say/",
      photo: { src: "/photos/taylor-swift-security-impersonator.jpg", credit: "Local 10" },
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
      photo: { src: "/photos/walgreens-junk-food-binge.jpg", credit: "FOX 13 Tampa Bay" },
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
      photo: { src: "/photos/manatee-riding.jpg", credit: "WSVN" },
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
      photo: { src: "/photos/walmart-scooter-chase.jpg", credit: "FOX 35 Orlando" },
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
      photo: { src: "/photos/ronald-mcdonald-clown-arrest.jpg", credit: "NBC 6 South Florida" },
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
      photo: { src: "/photos/lego-booster-target-theft.jpg", credit: "FOX 35 Orlando" },
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
      photo: { src: "/photos/forklift-atm-joyride.jpg", credit: "WFTV" },
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
      photo: { src: "/photos/god-18th-birthday-arrest.jpg", credit: "WFTV" },
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
      photo: { src: "/photos/chuck-e-cheese-mascot-fraud.jpg", credit: "Fox News" },
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
        "A routine traffic stop uncovers dozens of stolen turtles, and a foot-long alligator tucked into a passenger's yoga pants.",
      fullStory:
        "A Charlotte County deputy pulled over a pickup truck driven by Michael Clemons, 22, after it ran a stop sign near Punta Gorda. A search turned up 41 three-striped turtles stuffed in a backpack; when asked if she had anything else, passenger Ariel Machan-Le Quire, 25, pulled a foot-long alligator out of her yoga pants. Machan-Le Quire pleaded guilty to four charges and was sentenced to probation.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/florida-woman-gator-pants-traffic-stop/",
      photo: { src: "/photos/gator-in-yoga-pants-traffic-stop.jpg", credit: "Charlotte County Sheriff's Office" },
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
      photo: { src: "/photos/mcdonalds-ice-cream-machine-gun.jpg", credit: "CBS12" },
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
        "Florida Man is caught driving nearly three times the legal limit, in a shirt that gave the game away.",
      fullStory:
        "A Marion County deputy clocked James Rix Jr., 41, doing 89 mph in a 45 mph zone near Ocala, then watched him flee with his headlights off before catching up. Rix, wearing a shirt reading 'I'm the Reason the Beer's Always Gone,' failed field sobriety tests and blew a .204 and .200, nearly three times the legal limit. He was charged with DUI, fleeing to elude, unlawful speed, and an open container violation.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/james-rix-jr-florida-man-arrested-for-dui-wearing-im-the-reason-the-beers-always-gone-t-shirt-marion-oaks-manor-ocala-marion-county-sheriffs-office-august-23-2023",
      photo: { src: "/photos/beers-always-gone-dui-shirt.jpg", credit: "CBS12" },
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
      photo: { src: "/photos/batman-pajamas-burglary-bust.jpg", credit: "ABC News" },
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
      photo: { src: "/photos/roach-spray-nunchucks-noise-complaint.jpg", credit: "WSOC-TV" },
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
        "This incident involved a real assault: the worker suffered a cut lip and facial injuries.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/2019/08/22/florida-man-hits-mcdonalds-drive-thru-worker-for-taking-too-long-police-say/",
      photo: { src: "/photos/mcdonalds-drive-thru-worker-punched.jpg", credit: "ClickOrlando" },
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
        "This incident involved real harm to an animal: the cat sustained a broken leg but survived.",
      source: "KSN Local 4",
      sourceUrl:
        "https://www.ksnblocal4.com/2026/08/19/man-accused-shooting-neighbors-cat-with-bb-gun-officials-say/",
      photo: { src: "/photos/cat-shot-bb-gun-chickens.jpg", credit: "Lee County Sheriff's Office" },
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
      photo: { src: "/photos/dog-slam-headbutt-patrol-car.jpg", credit: "KATV" },
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
      photo: { src: "/photos/sprinklers-disabled-children-bus-stop.jpg", credit: "Marion County Sheriff's Office" },
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
      photo: { src: "/photos/walmart-tiktok-dog-bed.jpg", credit: "FOX 13 Tampa Bay" },
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
      photo: { src: "/photos/prison-costume-dui-halloween.jpg", credit: "WFLA" },
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
      photo: { src: "/photos/greased-up-naked-debary-burglar.jpg", credit: "WFTV" },
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
        "This involved a real domestic battery charge: the act was forced on his girlfriend during an argument, not a lighthearted or consensual encounter.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-arrested-after-he-allegedly-gave-girlfriend-a-wet-willy-affidavit-says",
      photo: { src: "/photos/wet-willy-battery-charge.jpg", credit: "Fox News" },
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
      photo: { src: "/photos/covid-relief-lamborghini.jpg", credit: "Instagram" },
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
      photo: { src: "/photos/bra-hat-car-burglar.jpg", credit: "WFLA" },
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
      photo: { src: "/photos/carjacker-cant-drive-stick.jpg", credit: "CNN" },
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
      photo: { src: "/photos/dog-was-driving.jpg", credit: "Manatee County Sheriff's Office" },
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
        "Florida Man caught driving a stolen forklift says he took it because he was tired of walking, and it wasn't his first time.",
      fullStory:
        "Port Orange police approached 43-year-old Bradley Barefoot (who was, fittingly, barefoot) after spotting him driving a stolen forklift worth roughly $38,000. He initially claimed he thought it was equipment stolen from his boss in Alabama, then admitted he took it because he noticed the keys left in the ignition and was tired of walking. He was found parked in a handicap spot with a mattress loaded on the forklift. It was Barefoot's second forklift theft with the same excuse. He'd taken one from behind a Daytona Beach Best Buy the year before. He was charged with grand theft.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/strange-florida/2017/06/29/florida-man-tired-of-walking-steals-forklift-police-say/",
      photo: { src: "/photos/forklift-tired-of-walking.jpg", credit: "ClickOrlando" },
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
      photo: { src: "/photos/naked-school-vandal-24hrs.jpg", credit: "WFTV" },
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
        "A man is arrested for driving a stolen car into a ditch, with a diaper-wearing pet monkey clinging to his shirt the whole time.",
      fullStory:
        "Pasco County deputies arrested 24-year-old Cody Blake Hesson in Holiday after he drove a stolen vehicle into a ditch and tried to run. When deputies caught up to him, his pet capuchin monkey, named Monk and wearing a diaper, was still clinging to his shirt. Hesson had no permit for the animal and faced additional charges on top of auto theft; deputies had to separate him from Monk, who was confiscated, before the two shared a goodbye hug.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/monkey-in-diaper-found-clinging-to-florida-man-in-stolen-car-police-say/765770525/",
      photo: { src: "/photos/diaper-monkey-car-theft.jpg", credit: "WFTV" },
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
      photo: { src: "/photos/wears-womans-clothes-asks-drink.jpg", credit: "News4Jax" },
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
      photo: { src: "/photos/mcdonalds-railing-dance.jpg", credit: "Newsweek" },
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
        "The manager of Latino America Restaurant in Naples told Collier County deputies that 55-year-old John Toddy slammed the outdoor menu sign, then went inside, stood on chairs, and stuck his middle finger up at patrons while shouting and cursing. When deputies arrived, Toddy, described as having bloodshot, watery eyes and slurred speech, told them to 'get back in your car and go to Dunkin' Donuts.' He was charged with disorderly intoxication.",
      source: "WINK News",
      sourceUrl:
        "https://www.winknews.com/2019/06/09/florida-man-disrupts-restaurant-tells-officers-go-to-dunkin-donuts/",
      photo: { src: "/photos/dunkin-donuts-restaurant-chairs.jpg", credit: "WINK News" },
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
      photo: { src: "/photos/cocaine-on-nose.jpg", credit: "Newsweek" },
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
      photo: { src: "/photos/excavator-walmart-crash.jpg", credit: "FOX 35 Orlando" },
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
      photo: { src: "/photos/street-sweeper-theft.jpg", credit: "FOX 35 Orlando" },
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
      photo: { src: "/photos/trump-trillion-dollars.jpg", credit: "Fox News" },
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
      photo: { src: "/photos/breakfast-break-in.jpg", credit: "Tampa Bay Times" },
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
      photo: { src: "/photos/booty-patrol-truck.jpg", credit: "NBC News" },
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
      photo: { src: "/photos/rental-car-uber.jpg", credit: "ClickOrlando" },
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
        "This incident involved a real injury: a police officer was punched in the face.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/edward-tuttle-naked-drunk-man-punched-cop-intoxicated-lying-face-down-battery-delray-beach-police-department-officer-florida-october-24-2023",
      photo: { src: "/photos/naked-asleep-punches-cop.jpg", credit: "CBS12" },
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
        "This incident involved a real injury: the victim was struck in the head with a hatchet and left bleeding.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/florida/florida-man-hits-another-in-the-face-with-a-hatchet-over-spilled-beer-deputies/",
      photo: { src: "/photos/hatchet-spilled-beer.jpg", credit: "WFLA" },
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
      photo: { src: "/photos/bucs-jersey-police-impersonator.jpg", credit: "FOX 13 Tampa Bay" },
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
        "The Marion County Sheriff's Office said 24-year-old Tyler Fayconsolo led deputies on a chase reaching speeds up to 100 mph after leaving a Circle K, until spike strips deflated his tires and a concrete fence stopped the car. Dashcam video showed Fayconsolo headbutt the passenger window open and come 'flying out like a dolphin' before running from a K-9 officer, who caught him. At the hospital, Fayconsolo told deputies he was 'high as f***' before being booked on charges including DUI and aggravated fleeing.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/high-as-f-dash-cam-video-shows-florida-man-head-butt-car-window-flop-out-of-car-during-high-speed-chase",
      photo: { src: "/photos/dolphin-headbutt-window.jpg", credit: "FOX 35 Orlando" },
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
      photo: { src: "/photos/all-gas-no-brakes-tattoo.jpg", credit: "FOX 13 Tampa Bay" },
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
        "Deputies said 20-year-old Ingus Schusser, wearing an FBI jacket and body armor and carrying an airsoft handgun resembling a Glock, visited a free haunted house at a Seminole home on Halloween night. Rounding a corner, he struck the 47-year-old host (who was in costume but not actively performing) in the face with the gun's handle, causing significant injury. Schusser reportedly laughed afterward and was unapologetic. He was arrested and charged with aggravated battery and possession of body armor during commission of a felony.",
      contentNote:
        "This incident involved a real injury: the victim was struck in the face and sustained significant injury.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-hits-haunted-house-host-in-eye-with-toy-gun-after-mistaken-them-for-statue-deputies",
      photo: { src: "/photos/fbi-haunted-house-bb-gun.jpg", credit: "FOX 35 Orlando" },
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
      photo: { src: "/photos/dollar-general-voices.jpg", credit: "Fox News" },
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
        "Home security cameras captured 41-year-old Juan Pablo Ramos-Nieto walking through the Villas Del Campos community in southwest Miami-Dade County with a knife around 5 a.m., slashing tires on 17 vehicles (including a marked Homestead police cruiser) for a total of 27 slashed tires and about $6,000 in damage. In bond court, Ramos-Nieto claimed he had been exposed to 'secret government information' and was being 'demonized' by the CIA. He was charged with 27 counts of criminal mischief.",
      source: "NBC 6 South Florida",
      sourceUrl:
        "https://www.nbcmiami.com/news/local/florida-man-charged-with-27-counts-for-slashing-tires-claims-hes-being-demonized-and-was-exposed-to-government-info/3151606/",
      photo: { src: "/photos/27-tires-secret-government.jpg", credit: "NBC 6 South Florida" },
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
        "A motorcyclist with a fake Hawaiian 'MCLOVIN' plate, a reference to Superbad, leads troopers on a 110 mph chase across the Gandy Bridge.",
      fullStory:
        "A Florida Highway Patrol trooper spotted 30-year-old Jessie Rivera, of Plant City, swerving between vehicles at high speed on a motorcycle displaying a fake Hawaiian tag reading 'MCLOVIN.' Rivera hit 110 mph in a posted 45 mph zone and fled from the trooper, a St. Petersburg police officer, and a Pinellas deputy before getting onto the Gandy Bridge. The chase ended when the trooper pulled Rivera off the bike, which fell on both of them and broke Rivera's foot. He was booked on a charge of fleeing law enforcement at high speed.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/hillsborough-county/plant-city-motorcyclist-with-mclovin-plate-flees-from-officers-at-over-110-mph-fhp/",
      photo: { src: "/photos/mclovin-motorcycle.jpg", credit: "FOX 13 Tampa Bay" },
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
      photo: { src: "/photos/school-feces-frosting.jpg", credit: "FOX 35 Orlando" },
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
        "This incident involved a real injury: a nurse was punched, knocked down, and beaten while treating the suspect.",
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
      photo: { src: "/photos/meth-belly-button.jpg", credit: "FOX 35 Orlando" },
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
        "A man flashing red and blue lights from his SUV tries to pull over an unmarked car on the highway, which turns out to be an undercover deputy.",
      fullStory:
        "Hillsborough County deputies said 46-year-old Nadi Jabari activated red and blue emergency lights on his black Chevrolet Suburban while following an undercover HCSO vehicle on U.S. Highway 301 North in Thonotosassa, appearing to try to pull it over. The undercover deputy alerted other units, who quickly stopped Jabari's SUV. A search turned up the active light setup, a spare light bar, and a handgun. Jabari was charged with false personation, unlawful use of a blue light, and possession of a firearm during the commission of a felony.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/fake-law-enforcement-officer-pulls-over-undercover-hillsborough-county-deputy-hcso",
      photo: { src: "/photos/fake-cop-pulls-over-undercover-deputy.jpg", credit: "FOX 13 Tampa Bay" },
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
      photo: { src: "/photos/key-west-conch-train-birthday-joyride.jpg", credit: "FOX 13 Tampa Bay" },
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
      photo: { src: "/photos/vodka-spritzer-police-chase.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "peacocks-killed-cooked-spite",
      date: "September 23, 2025",
      year: "2025",
      month: "September",
      day: "23",
      city: "Hudson",
      score: 67,
      rubric: { absurdity: 19, humor: 8, floridaFactor: 14, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Kills and Cooks Neighbor's Peacocks to Spite Him for Feeding Them",
      description:
        "A man slits the throats of two pet peacocks and fries them up specifically to spite the neighbor who'd been feeding them.",
      fullStory:
        "Pasco County deputies arrested 61-year-old Craig Vogt of Hudson after he admitted to killing two pet peacocks by cutting their necks with a knife, bleeding them out, and cooking them in a frying pan. Vogt had been in an ongoing dispute with a neighbor over the neighbor feeding the birds, and left a letter in the neighbor's mailbox confessing to the killings and explaining he'd done it 'out of spite' to make his point. While being taken to jail, Vogt told deputies he planned to kill his remaining peacocks too, so no one else could take them. He was charged with aggravated animal cruelty, a third-degree felony.",
      contentNote:
        "This incident involved real harm to animals: two peacocks were killed.",
      source: "WFTV / NBC 6 South Florida / KCBY",
      sourceUrl:
        "https://www.wftv.com/news/local/florida-man-arrested-killing-pet-peacocks-neighbor-dispute-admits-cooking-them/KHOIIW3TCVBZTPXVNCPLBO2NBQ/",
      photo: { src: "/photos/peacocks-killed-cooked-spite.jpg", credit: "Fox News" },
    },
    {
      id: "spider-monkey-home-depot-attack",
      date: "July 16, 2018",
      year: "2018",
      month: "July",
      day: "16",
      city: "Okeechobee",
      score: 72,
      rubric: { absurdity: 19, humor: 14, floridaFactor: 14, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Woman Arrested After Pet Spider Monkey Attacks Home Depot Employees",
      description:
        "A woman's pet spider monkey named Spanky escapes her car and attacks two different Home Depot cashiers in separate incidents.",
      fullStory:
        "Tina Ballard, 56, kept a pet spider monkey named Spanky who twice got loose and attacked employees at a Home Depot in Okeechobee County. In May, the monkey jumped from a shopping cart and grabbed a cashier's shirt, leaving marks on her shoulder and back. The following month, Spanky attacked cashier Marilyn Howard, biting her arm, grabbing her hair, and scratching her face, leaving her bloodied. When Florida Fish and Wildlife Conservation Commission investigators went looking for Ballard, they learned she had fled to Linville Land Harbor, North Carolina, with Spanky in tow; she was arrested there and held for extradition. She faced charges including allowing a wild animal to escape, lacking required wildlife permits, failing to immunize the monkey, and felony tampering with evidence.",
      contentNote:
        "This incident involved real injury to a person: a Home Depot employee sustained bite wounds and scratches.",
      source: "Fox News / Inside Edition",
      sourceUrl:
        "https://www.foxnews.com/us/florida-woman-arrested-after-pet-spider-monkey-allegedly-attacks-home-depot-employees.amp",
      photo: { src: "/photos/spider-monkey-home-depot-attack.jpg", credit: "Fox News" },
    },
    {
      id: "bees-swarm-police-chase",
      date: "May 17, 2023",
      year: "2023",
      month: "May",
      day: "17",
      city: "Indian River County",
      score: 81,
      rubric: { absurdity: 20, humor: 20, floridaFactor: 15, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Police Chase Ends With Deputies and Suspects Swarmed by Bees",
      description:
        "A 20-mile interstate chase ends with deputies and suspects fighting through the woods together, only for both sides to get swarmed by wild bees.",
      fullStory:
        "A Florida Highway Patrol trooper tried to pull over a silver Acura in St. Lucie County; the car fled onto I-95 and into Indian River County, with a sheriff's helicopter and Sebastian police joining a roughly 20-mile pursuit. The three occupants (Joel N. Brown, 20, Markaveli J. Butler, 20, and a 15-year-old boy) abandoned the car and ran into the woods along State Road 60, where K-9 Mako and deputies found them hiding under palmetto bushes. As deputies moved in to make the arrests, a large swarm of bees descended on the area, stinging deputies, the K-9, and the suspects alike as everyone struggled back through chest-deep mud to the road. No one suffered serious injuries from the stings, and all three were booked on felony charges of fleeing and eluding and resisting arrest without violence; Butler also had an active felony warrant and an ICE detainer.",
      source: "WPTV",
      sourceUrl:
        "https://www.wptv.com/news/treasure-coast/region-indian-river-county/bees-attack-deputies-k-9s-3-suspects-during-pursuit",
      photo: { src: "/photos/bees-swarm-police-chase.jpg", credit: "WPTV" },
    },
    {
      id: "raccoon-in-backpack-bike-stop",
      date: "June 18, 2023",
      year: "2023",
      month: "June",
      day: "18",
      city: "Clearwater",
      score: 69,
      rubric: { absurdity: 16, humor: 17, floridaFactor: 13, unexpectedness: 12, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Woman Pulled Over on Bike Found With Baby Raccoon in Her Backpack",
      description:
        "A late-night bike stop over a missing headlight turns up a meth pipe and a week-old raccoon riding along in the woman's backpack.",
      fullStory:
        "Clearwater police stopped 43-year-old Lindsay Rodewald around midnight for riding her bicycle without a headlight. During the stop, officers found a broken glass pipe with methamphetamine residue in her backpack, along with a chittering baby raccoon, believed to be about a week old, tucked inside alongside it. Rodewald told officers she'd 'forgotten' the raccoon was in there. She was charged with possession of drug paraphernalia, while the raccoon was taken to a Tampa veterinary emergency clinic to be cared for alongside other orphaned raccoons before an eventual release into the wild.",
      source: "Fox News / WSVN",
      sourceUrl:
        "https://www.foxnews.com/us/florida-woman-arrested-police-allegedly-find-meth-baby-raccoon-backpack",
      photo: { src: "/photos/raccoon-in-backpack-bike-stop.jpg", credit: "Fox News" },
    },
    {
      id: "deer-run-over-tiktok-video",
      date: "December 31, 2023",
      year: "2023",
      month: "December",
      day: "31",
      city: "Geneva",
      score: 61,
      rubric: { absurdity: 17, humor: 6, floridaFactor: 13, unexpectedness: 13, headlineQuality: 7, sourceQuality: 5 },
      title: "Florida Man Arrested for Intentionally Running Over a Deer to Film a TikTok Video",
      description:
        "A man films himself trying to run down five deer with his SUV for a social media video, connecting with just one.",
      fullStory:
        "Seminole County deputies arrested 27-year-old Clay Kinney after a video surfaced showing him swerving his Chevy Tahoe at a group of deer and posting the footage to TikTok; he managed to strike one of the five deer he targeted. Detectives recognized the SUV from the viral clip and pulled Kinney over, at which point he also admitted to driving on a suspended license. Kinney had a prior wildlife run-in in 2021, when officers responding to a crash he was in found a fawn he'd been illegally keeping in a dog box in his truck. He was charged with five counts of animal torment, one count of animal torture, and a moving traffic violation.",
      contentNote:
        "This incident involved real, intentional harm to an animal.",
      source: "Fox News / Newsweek",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-arrested-deliberately-hitting-deer-filming-tiktok-police",
      photo: { src: "/photos/deer-run-over-tiktok-video.jpg", credit: "Fox News" },
    },
    {
      id: "emu-handcuffed-highway-chase",
      date: "January 9, 2026",
      year: "2026",
      month: "January",
      day: "9",
      city: "St. Johns County",
      score: 82,
      rubric: { absurdity: 19, humor: 21, floridaFactor: 16, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Deputy 'Handcuffs' a Runaway Emu After Wild Highway Chase",
      description:
        "A veteran deputy chases down an escaped pet emu running loose on a Florida road and cuffs its legs to keep it from kicking.",
      fullStory:
        "St. Johns County deputies responded to calls about a large bird running loose on County Road 13 on January 9, 2026, and found an emu that had wandered more than a mile from its owner's property. Corporal Tommy Keisler, a 25-year veteran of the sheriff's office, cornered the bird, which kicked at him repeatedly with its powerful talons and tried to flee before he lassoed it and cuffed its legs together to keep it under control. 'In my 25 years, I've never handcuffed an emu. This is definitely a new one,' Keisler said afterward, joking that all charges against the bird had been dropped. The emu was uninjured and reunited with its owners; bodycam footage of the chase went viral.",
      source: "CBS 12 / First Coast News",
      sourceUrl:
        "https://cbs12.com/news/local/never-handcuffed-an-emu-florida-deputies-chase-down-feathered-fugitive-bodycam-funny-bodycam-watch-st-johns-county-florida-news-video-january-14-2026",
      photo: { src: "/photos/emu-handcuffed-highway-chase.jpg", credit: "CBS12" },
    },
    {
      id: "poops-on-dead-possum-rush-hour",
      date: "November 17, 2023",
      year: "2023",
      month: "November",
      day: "17",
      city: "Clearwater",
      score: 69,
      rubric: { absurdity: 18, humor: 16, floridaFactor: 12, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Arrested for Defecating on a Dead Possum During Rush Hour",
      description:
        "A man is caught squatting over a dead possum in the middle of a busy intersection, in full view of rush-hour traffic.",
      fullStory:
        "A Clearwater police officer patrolling near Belcher Road and Willow Tree Trail around 5:20 p.m. on November 17, 2023, spotted 45-year-old Rudy Wilcox, who had no listed address, defecating on a dead possum with his pants down in full view of passing rush-hour traffic. When questioned after being read his Miranda rights, Wilcox denied it, telling the officer he 'doesn't see straight,' but police said physical evidence at the scene corroborated what they'd witnessed. Wilcox was arrested and booked into the Pinellas County Jail on a charge of exposure of sexual organs.",
      source: "FOX 35 Orlando / Law & Crime",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-arrested-for-pooping-on-dead-possum-on-street-during-rush-hour-police-say",
      photo: { src: "/photos/poops-on-dead-possum-rush-hour.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "kiss-refusal-shooting-granny",
      date: "March 21, 2011",
      year: "2011",
      month: "March",
      day: "21",
      city: "Fort McCoy",
      score: 87,
      rubric: { absurdity: 23, humor: 21, floridaFactor: 16, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "92-Year-Old Florida Woman Fires Gun at Neighbor's House After He Refuses to Kiss Her",
      description:
        "A 92-year-old woman opens fire on her neighbor's house after he won't give her a kiss.",
      fullStory:
        "Marion County deputies said 92-year-old Helen Staudinger showed up at neighbor Dwight Bettner's home in Fort McCoy on March 21, 2011, and refused to leave until he gave her a kiss. When the 53-year-old Bettner said no, Staudinger left angry, then returned with a semi-automatic pistol. She had intended to shoot Bettner's car, 'that he loved so much,' but missed and instead fired four shots at his house. One bullet came through a window while Bettner was on the phone with his father, showering him with glass but not striking him. Staudinger was arrested and charged with aggravated assault with a deadly weapon and shooting into a dwelling.",
      source: "Reuters / NBC News",
      sourceUrl:
        "https://www.nbcnews.com/id/wbna42221634",
    },
    {
      id: "mcnuggets-911-call",
      date: "February 28, 2009",
      year: "2009",
      month: "February",
      day: "28",
      city: "Fort Pierce",
      score: 82,
      rubric: { absurdity: 20, humor: 22, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Woman Calls 911 Three Times Over McDonald's Running Out of McNuggets",
      description:
        "A woman dials 911 three separate times after a McDonald's runs out of Chicken McNuggets and won't give her a refund.",
      fullStory:
        "Latreasa Goodman, 27, of Fort Pierce, called 911 three times on February 28, 2009, after a McDonald's on U.S. 1 told her they'd run out of Chicken McNuggets and refused to refund the $4.20 she'd already paid. 'This is an emergency,' she told the dispatcher on one call. 'If I would have known they didn't have McNuggets, I wouldn't have given my money, and now she wants to give me a McDouble, but I don't want one.' Police cited Goodman for misuse of the 911 system, a misdemeanor. A McDonald's spokesman later said she should have gotten her refund and sent her a gift card for a free meal.",
      source: "NBC News (AP)",
      sourceUrl:
        "https://www.nbcnews.com/id/wbna29498350",
      photo: { src: "/photos/mcnuggets-911-call.jpg", credit: "St. Lucie County Sheriff's Office" },
    },
    {
      id: "snakes-tortoises-in-underwear",
      date: "August 25, 2011",
      year: "2011",
      month: "August",
      day: "25",
      city: "Miami",
      score: 82,
      rubric: { absurdity: 22, humor: 20, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Man Caught Smuggling Baby Pythons and Tortoises in His Underwear at Miami Airport",
      description:
        "TSA officers at Miami International Airport find live baby snakes and tortoises hidden in a traveler's underwear.",
      fullStory:
        "Simon Turola Borges, a 30-year-old Brazilian national, was pulled aside by TSA officers at Miami International Airport on August 25, 2011, after a body scanner flagged him ahead of a flight home. Officers found two hatchling pythons wrapped in pantyhose in his cargo pants pockets, and when he pulled back the waistband of his underwear, more nylon-wrapped snakes and tortoises fell out. In total, agents recovered three ball pythons, three carpet pythons, one children's python, one Indian star tortoise, and two leopard tortoises, all several-week-old hatchlings protected under international wildlife trade law. Borges pleaded guilty to smuggling and was sentenced to time served, two years of supervised release, and a $400 fine paid to the Miami Science Museum.",
      source: "U.S. Department of Justice",
      sourceUrl:
        "https://www.justice.gov/archive/usao/fls/PressReleases/2011/110914-04.html",
    },
    {
      id: "whale-tail-for-soup",
      date: "September 2, 2010",
      year: "2010",
      month: "September",
      day: "2",
      city: "Delray Beach",
      score: 74,
      rubric: { absurdity: 19, humor: 18, floridaFactor: 14, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Cuts Tail Off Dead Whale on Beach, Planned to Eat It",
      description:
        "A man fishing at dawn finds a dead whale washed ashore and cuts off its tail to take home and cook.",
      fullStory:
        "Chris Hogan, 60, was fishing for blue crabs at dawn on September 2, 2010, when an 8-to-12-foot pygmy sperm whale washed ashore in Delray Beach. Hogan pulled out a knife and cut off the whale's tail, planning to take it home to broil or fry. A lifeguard told him that mutilating a dead whale (a federally protected marine mammal) is a crime even though the animal was already deceased, and Florida Fish and Wildlife agents took him in for questioning. 'I didn't know it was illegal,' Hogan said, adding, 'I apologize to the state of Florida.'",
      source: "WFLX / NBC Miami",
      sourceUrl:
        "https://www.wflx.com/story/13089170/whale-cut-in-half-after-washing-ashore-in-delray/",
      photo: { src: "/photos/whale-tail-for-soup.jpg", credit: "WFLX" },
    },
    {
      id: "dominos-burns-papa-johns",
      date: "October 20, 2011",
      year: "2011",
      month: "October",
      day: "20",
      city: "Lake City",
      score: 76,
      rubric: { absurdity: 20, humor: 18, floridaFactor: 12, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Domino's Managers Arrested for Burning Down Rival Papa John's",
      description:
        "Two Domino's Pizza managers are accused of torching a rival Papa John's to drum up business for their own store.",
      fullStory:
        "Lake City police said Bryan David Sullivan, 22, a general manager at a local Domino's Pizza, and Sean Everett Davidson, 23, set fire to a nearby Papa John's on October 20, 2011, causing roughly $500,000 in damage. Investigators said Sullivan was tired of watching Papa John's delivery cars drive past his store and believed that with the new competitor out of the way, business (and a bonus he stood to split with Davidson) would improve. Police said the pair built a homemade timed ignition device out of a clock, a nine-volt battery, and a golf-ball-sized amount of black powder. Both men were arrested and each charged with one count of arson.",
      source: "NBC News",
      sourceUrl:
        "https://www.nbcnews.com/id/wbna45091289",
      photo: { src: "/photos/dominos-burns-papa-johns.jpg", credit: "News4Jax" },
    },
    {
      id: "waffle-house-truck-through-wall",
      date: "August 15, 2011",
      year: "2011",
      month: "August",
      day: "15",
      city: "Panama City Beach",
      score: 62,
      rubric: { absurdity: 18, humor: 8, floridaFactor: 14, unexpectedness: 10, headlineQuality: 7, sourceQuality: 5 },
      title: "Florida Man Drives Truck Through Waffle House Trying to Run Over Wife",
      description:
        "A man calls ahead to threaten a Waffle House, then drives his truck through the building trying to hit his waitress wife.",
      fullStory:
        "Panama City Beach police said Charles Patrick O'Bryan called the Waffle House where his wife, Danielle Gibbons, worked on the evening of August 15, 2011, and told an employee he was going to 'run his truck through the building and kill everyone.' He then drove his pickup through the restaurant's wall, striking Gibbons, before getting out of the truck and brandishing a knife. A bystander subdued him using a broken piece of the building. Gibbons was hospitalized with injuries described as non-life-threatening. O'Bryan was charged with attempted murder and felony criminal mischief.",
      contentNote:
        "This incident involved a real injury and an attempted-murder charge: the man's wife was struck by his truck and hospitalized.",
      source: "HuffPost",
      sourceUrl:
        "https://www.huffpost.com/2011/08/16/charles-patrick-o-bryan-waffle-house_n_928310.html",
      photo: { src: "/photos/waffle-house-truck-through-wall.jpg", credit: "WFLX" },
    },
    {
      id: "nice-car-bro-punch",
      date: "September 1, 2024",
      year: "2024",
      month: "September",
      day: "1",
      city: "Winter Haven",
      score: 82,
      rubric: { absurdity: 21, humor: 21, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Punches Driver in the Face for Complimenting His Car",
      description:
        "A Florida man allegedly punched a stranger in the face after the man told him he liked his car.",
      fullStory:
        "Polk County deputies say John Sturgeon, 53, stopped his black Dodge Charger on Tindel Camp Road near Dundee on the evening of September 1, 2024, got out, and punched another driver in the face, after that driver had simply told him, 'Nice car, bro! I like your car!' Dashcam video of the unprovoked punch went viral locally. The Polk County Sheriff's Office issued a warrant for Sturgeon's arrest on a battery charge, and he turned himself in after the footage spread online.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/driver-allegedly-punched-in-face-after-complimenting-mans-car-black-dodge-charger-polk-county-sheriffs-office-florida-september-3-2024",
      photo: { src: "/photos/nice-car-bro-punch.jpg", credit: "CBS12" },
    },
    {
      id: "toddler-swallows-heroin-melbourne",
      date: "September 4, 2020",
      year: "2020",
      month: "September",
      day: "4",
      city: "Melbourne",
      score: 55,
      rubric: { absurdity: 15, humor: 5, floridaFactor: 13, unexpectedness: 10, headlineQuality: 7, sourceQuality: 5 },
      title: "Florida Man Charged After His Toddler Daughter Accidentally Swallows Heroin",
      description:
        "A Florida man brought his 16-month-old daughter to a fire station after she ingested heroin, then allegedly threatened the man he blamed for it.",
      fullStory:
        "Nathaniel Clay, 28, walked into a Melbourne Fire Department station on September 4, 2020, and told firefighters his 16-month-old daughter may have swallowed drugs. She was rushed to a hospital and given three doses of Narcan after a brown substance found on her clothing tested positive for heroin. Clay told investigators the girl had been exposed to the drug while visiting an acquaintance elsewhere in the city, then admitted he had pulled a gun on that person and threatened to shoot him if he told anyone what happened. Melbourne police arrested Clay and charged him with child neglect.",
      contentNote:
        "This incident involved a real child ingesting heroin and requiring emergency medical treatment: there is no comedic angle here.",
      source: "Action News Jax",
      sourceUrl:
        "https://www.actionnewsjax.com/news/trending/florida-man-charged-after-toddler-daughter-accidentally-swallows-heroin-police-say/SEHUYIKZYBB6NPJZH4VRZJM6VA/",
    },
    {
      id: "twerking-traffic-stop-rain",
      date: "September 7, 2021",
      year: "2021",
      month: "September",
      day: "7",
      city: "Inverness",
      score: 85,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 16, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Twerks for Deputies in the Rain During Traffic Stop, Gets Tased",
      description:
        "Pulled over for passing cars in a turn lane, a Florida man got out of his SUV and began twerking for deputies in a downpour.",
      fullStory:
        "Citrus County deputies pulled over Richard Wolfe, 57, of Crystal River, on State Road 44 in Inverness on September 7, 2021, after he was seen using a median and a turn lane to pass cars in the rain. Wolfe got out of his SUV, bent over, and began twerking for the deputy in the downpour, then pulled a knife from his waistband and threw it into the grass while continuing to taunt the officer for nearly 20 seconds. When he tried to walk away and then attempted to flee, deputies deployed a Taser to take him into custody. He was booked on charges of resisting an officer without violence, fleeing law enforcement, and reckless driving, and bystander video of the encounter went viral.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2021/09/10/florida-man-twerks-for-officers-during-traffic-stop-gets-tased-report-says/",
    },
    {
      id: "chihuahua-thrown-off-balcony",
      date: "September 8, 2024",
      year: "2024",
      month: "September",
      day: "8",
      city: "Fort Myers",
      score: 61,
      rubric: { absurdity: 18, humor: 8, floridaFactor: 12, unexpectedness: 11, headlineQuality: 7, sourceQuality: 5 },
      title: "Florida Man Accused of Throwing a Chihuahua Off a Balcony 'Like a Football'",
      description:
        "A Florida man allegedly hurled a friend's chihuahua off a balcony, leaving the dog with multiple broken bones.",
      fullStory:
        "A stranger brought a badly injured 3-year-old chihuahua named Raven to a Fort Myers animal hospital on Sunday, September 8, 2024, saying a friend had thrown the dog off a balcony 'like a football.' Lee County Sheriff's Office detectives worked overnight with help from the county's Real Time Intelligence Center to trace the dog back to her owner and identify Dalton Chad Sousa, 30, as the man accused of throwing her. Raven suffered a broken leg and a broken jaw but was expected to make a full recovery. Sousa was located and arrested the next day and charged with aggravated animal cruelty.",
      contentNote:
        "This incident involved real, serious harm to a dog, who suffered multiple broken bones.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-accused-animal-cruelty-after-throwing-chihuahua-off-balcony-like-football",
      photo: { src: "/photos/chihuahua-thrown-off-balcony.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "wendys-break-in-sandwich",
      date: "September 19, 2025",
      year: "2025",
      month: "September",
      day: "19",
      city: "Boynton Beach",
      score: 83,
      rubric: { absurdity: 22, humor: 21, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Breaks Into Wendy's, Makes Himself a Sandwich Before Police Arrive",
      description:
        "A Florida man allegedly smashed his way into a Wendy's with a sprinkler pipe, then stopped to make himself a sandwich and pocket some chicken nuggets.",
      fullStory:
        "Boynton Beach police say Devin Driver, 28, ripped a sprinkler pipe out of the ground near a Wendy's drive-thru on Woolbright Road on September 19, 2025, used it to smash windows, then hurled a rock through the drive-thru window and climbed inside. Once in the kitchen, Driver made himself a sandwich and pocketed some chicken nuggets before officers arrived. When police tried to arrest him, he swung at them and had to be subdued with a Taser, then spat on and struck an officer while resisting. He was charged with burglary, criminal mischief, throwing a deadly missile, resisting arrest with violence, and three counts of battery on a law enforcement officer.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/armed-burglar-shatters-wendys-window-makes-sandwich-before-arrest-woolbright-road-taser-boynton-beach-police-department-september-19-2025",
      photo: { src: "/photos/wendys-break-in-sandwich.jpg", credit: "CBS12" },
    },
    {
      id: "chimichanga-out-taco-bell-fish",
      date: "May 28, 2026",
      year: "2026",
      month: "May",
      day: "28",
      city: "Flagler County",
      score: 85,
      rubric: { absurdity: 21, humor: 23, floridaFactor: 15, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Caught With 'Chimichanga Out' at Taco Bell Had a Pet Fish in His Backpack",
      description:
        "Deputies say a man exposed himself outside a Taco Bell in the middle of the night, then turned out to have a live pet fish swimming in his backpack.",
      fullStory:
        "Flagler County deputies responded to a Taco Bell on State Road 100 just before 1 a.m. on May 28, 2026, after employees reported what the sheriff's office jokingly described as a man with his 'chimichanga out' near a side door. Deputies identified the suspect as Brandon Irizarry, 28, who had multiple pairs of pants pulled down and initially seemed unaware officers had arrived before attempting to cover himself. He was arrested on a charge of unlawful exposure of sexual organs and held on a $5,000 bond. While inventorying his belongings, deputies discovered a live betta fish swimming in a plastic container inside his backpack. They nicknamed the fish 'Baja Blast' and transferred it to the Flagler County Humane Society, where staff said it was doing great.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/his-chimichanga-out-man-arrested-after-lewd-incident-outside-central-florida-taco-bell/L5X6PVN7URG4BCERLUJ5RXC4N4/",
      photo: { src: "/photos/chimichanga-out-taco-bell-fish.jpg", credit: "CBS12" },
    },
    {
      id: "mar-a-lago-car-wash-checkpoint",
      date: "August 25, 2026",
      year: "2026",
      month: "August",
      day: "25",
      city: "Palm Beach",
      score: 80,
      rubric: { absurdity: 21, humor: 15, floridaFactor: 17, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Woman Arrested at Closed Mar-a-Lago Checkpoint, Says She's 'Here for the Car Wash'",
      description:
        "A Florida woman allegedly drove up to a closed Secret Service checkpoint near Mar-a-Lago, turned on a hose, and told officers she was there for a car wash.",
      fullStory:
        "Palm Beach police were stationed at a closed Secret Service security checkpoint near Mar-a-Lago around 6 p.m. on August 25, 2026, when an officer saw a woman exit a gray Hyundai SUV, walk to a hose and sprinkler system in the closed lot, and turn it on. When an agent approached and questioned her, the woman, identified as Alexa Rae Scharf, 29, of Loxahatchee, allegedly said, 'I'm here for the car wash.' Scharf then fled in her SUV, driving toward officers at the checkpoint, before becoming involved in a standoff several blocks away. During her arrest, police shot and killed her pit bull after it attacked and bit an officer. Scharf faces charges including two counts of aggravated assault with a vehicle, fleeing and eluding police, and resisting an officer without violence, and was held on $16,000 bond.",
      contentNote:
        "This incident ended with police shooting and killing the woman's dog after it bit an officer: there is a real animal death here.",
      source: "WPTV",
      sourceUrl:
        "https://www.wptv.com/news/region-c-palm-beach-county/palm-beach/here-for-the-car-wash-woman-arrested-after-high-speed-chase-near-mar-a-lago-security-checkpoint",
      photo: { src: "/photos/mar-a-lago-car-wash-checkpoint.jpg", credit: "CBS12" },
    },
    {
      id: "lobster-spot-air-supply-cutoff",
      date: "July 29, 2026",
      year: "2026",
      month: "July",
      day: "29",
      city: "Miami",
      score: 75,
      rubric: { absurdity: 21, humor: 10, floridaFactor: 17, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Charged With Attempted Murder After Cutting Off Rival Diver's Air Supply Over a Lobster Spot",
      description:
        "A dispute over a coveted lobster diving spot during Florida's mini season escalated when a man allegedly jumped in the water and shut off another diver's air supply.",
      fullStory:
        "About a half-mile east of Fisher Island shortly after 7 a.m. on July 29, 2026, during Florida's annual lobster mini season, a boat allegedly driven by Michael Joseph Simpson, 51, approached another vessel at a high rate of speed and circled it several times before anchoring about 10 feet away. An argument broke out over the diving spot, and Simpson allegedly threatened to turn off the surface-supplied air system feeding an 18-year-old diver below, then jumped into the water and did exactly that. The diver's boat owner jumped in and pulled him to the surface gasping for air and disoriented, though he was not physically injured. Simpson surrendered to the Turner Guilford Knight Correctional Center and was initially charged with attempted felony murder; a judge later agreed with his defense that the charge should be reduced to second-degree attempted murder.",
      contentNote:
        "This incident involved a real attempted-murder charge and put an 18-year-old diver's life in danger underwater: there is no comedic angle to the near-drowning itself.",
      source: "NBC 6 South Florida",
      sourceUrl:
        "https://www.nbcmiami.com/news/local/man-cut-off-divers-air-supply-after-dispute-over-lobster-fishing-spot-in-miami-report-says/3842234/",
      photo: { src: "/photos/lobster-spot-air-supply-cutoff.jpg", credit: "CBS12" },
    },
    {
      id: "dating-app-drugging-black-widow",
      date: "August 27, 2026",
      year: "2026",
      month: "August",
      day: "27",
      city: "Davenport",
      score: 63,
      rubric: { absurdity: 18, humor: 8, floridaFactor: 12, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Woman Accused of Drugging Dating App Match's Drink During Argument Over a Car",
      description:
        "A Florida woman using the pseudonym 'Nala' on a dating app allegedly laced her older match's drink with benzodiazepine after an argument over a car he'd bought her.",
      fullStory:
        "Samantha Adams, 39, of Orlando, met a 69-year-old man from Haines City on a dating app while using the pseudonym 'Nala,' authorities said. After the two got into an argument about a car he had apparently purchased for her, Adams allegedly intentionally laced his drink with benzodiazepine. The victim later passed out and was hospitalized, where medical staff determined he had nearly overdosed on benzodiazepine, a drug he had not been prescribed. Adams was arrested on August 27, 2026, at the Posner Park Shopping Center in Davenport and charged with second-degree attempted murder, tampering with evidence, and possession of oxycodone, hydrocodone, and alprazolam.",
      contentNote:
        "This incident involved a real near-fatal drug overdose: there is no comedic angle here.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/trending/florida-woman-accused-drugging-man-she-met-through-dating-app/TVYF2WY63BCJLA5T6GDNSJAFBQ/",
      photo: { src: "/photos/dating-app-drugging-black-widow.jpg", credit: "WFTV" },
    },
    {
      id: "foot-fetish-hotel-hit-and-run",
      date: "August 29, 2025",
      year: "2025",
      month: "August",
      day: "29",
      city: "Aventura",
      score: 69,
      rubric: { absurdity: 20, humor: 10, floridaFactor: 14, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Runs Over Woman With Car After She Refuses to Let Him Smell Her Feet",
      description:
        "A Florida man allegedly ran over a woman in a hotel parking garage after she, a professional foot model, quoted him her $1,000 rate instead of letting him smell her feet for free.",
      fullStory:
        "Elmoncy Sercle, 28, connected with a woman through Seeking.com and arranged to meet her at the Serena Hotel in Aventura on August 29, 2025. Once inside his room, Sercle asked to smell her feet and offered to buy her worn sneakers; she explained she was a professional foot model and quoted her standard rate of $1,000. When she stepped into the bathroom, Sercle fled the room, and believing he had taken something of hers, she chased him into the hotel's parking garage. Police said Sercle drove past her in a red Mercedes SUV before making a three-point turn and striking her with the vehicle, leaving her with bruises and abrasions across her chest, arms, and back that required immediate treatment. Sercle fled the scene but was arrested days later, on Thursday, August 29, when he returned to book another hotel room, and was charged with aggravated battery.",
      contentNote:
        "This incident involved the victim being struck by a car and suffering real injuries requiring treatment: there is no comedic angle to the assault itself.",
      source: "Complex",
      sourceUrl:
        "https://www.complex.com/life/a/bernadette-giacomazzo/florida-man-arrested-after-assaulting-a-woman-smell-feet",
      photo: { src: "/photos/foot-fetish-hotel-hit-and-run.jpg", credit: "Local 10" },
    },
    {
      id: "pelican-tackling-tourist-key-west",
      date: "March 3, 2019",
      year: "2019",
      month: "March",
      day: "3",
      city: "Key West",
      score: 80,
      rubric: { absurdity: 22, humor: 18, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Maryland Man Convicted After Viral Video Shows Him Tackling a Pelican in Key West",
      description:
        "A tourist used a fish to lure a wild pelican close on a Key West dock, then leaped directly on top of it and into the water in a video that went viral.",
      fullStory:
        "Video that went viral around March 3, 2019, showed a man on a dock at the Key West Historic Seaport luring a wild pelican closer with a fish, then leaping on top of the bird and into the water with it, surfacing with the pelican in both hands. The Florida Fish and Wildlife Conservation Commission identified the man as William Hunter Hardesty, 31, of Riva, Maryland, and issued a warrant charging him with animal cruelty and the intentional feeding of pelicans. Maryland State Police caught up with Hardesty after a tip that he was staying at a hotel in Ocean City, Maryland, and had been bragging to people there about being wanted for feeding and tackling a pelican in the Florida Keys. He was arrested at the hotel on March 15, 2019, and later found guilty in Monroe County Court on four charges, including two counts of violating the Migratory Bird Treaty Act and two counts of animal cruelty, and was sentenced to 90 days in the Monroe County Detention Center.",
      contentNote:
        "This incident involved real animal cruelty convictions for physically harming a wild pelican.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/man-jumping-on-pelican-florida-keys-arrested-maryland",
      photo: { src: "/photos/pelican-tackling-tourist-key-west.jpg", credit: "CBS News Miami" },
    },
    {
      id: "stolen-ambulance-drunken-joyride-beer",
      date: "March 15, 2025",
      year: "2025",
      month: "March",
      day: "15",
      city: "Tampa",
      score: 91,
      rubric: { absurdity: 23, humor: 23, floridaFactor: 17, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Steals Ambulance, Leads Police on Chase, Then Finishes His Beer Before Getting Out",
      description:
        "After a hospital wouldn't give him a ride home, a Florida man allegedly stole an ambulance, led troopers on a multi-mile chase, and calmly finished a beer once he finally stopped.",
      fullStory:
        "Michael J. Esquilin, 43, was refused a ride home by emergency personnel at HCA South Tampa Hospital on March 15, 2025, so he allegedly stole an ambulance from the hospital instead. Florida Highway Patrol troopers chased him for several miles through South Tampa as he ran stop signs, drove on the wrong side of the road, and nearly hit multiple vehicles. When the chase finally ended at South Hubert Avenue and West Empedrado Street, video showed Esquilin sitting in the ambulance drinking a beer before troopers pulled him out. He was charged with burglary and grand theft of an emergency vehicle, fleeing and eluding, driving with a suspended license, DUI, and resisting arrest; prosecutors noted he had four prior DUI convictions. A judge ordered GPS monitoring and a ban on alcohol while he awaits trial, and he was held on $33,000 bond.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/tampa-man-accused-taking-stolen-ambulance-drunken-joyride-makes-first-court-appearance",
      photo: { src: "/photos/stolen-ambulance-drunken-joyride-beer.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "just-take-me-away-golf-cart-dui",
      date: "December 22, 2023",
      year: "2023",
      month: "December",
      day: "22",
      city: "Lady Lake",
      score: 74,
      rubric: { absurdity: 18, humor: 20, floridaFactor: 14, unexpectedness: 10, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Pulled Over for Drunk Golf Cart Driving Tells Deputy 'Just Take Me Away'",
      description:
        "A 71-year-old Florida man failed to stop at a flashing red light in his golf cart, then skipped the small talk and told the deputy to just arrest him.",
      fullStory:
        "A Sumter County deputy in Lady Lake saw David Clifford Roach, 71, staggering before he climbed into a silver and white golf cart, which then blew through a flashing red signal and drifted across lane dividers multiple times. When the deputy stopped him, Roach had bloodshot, watery eyes and smelled of alcohol. Asked to perform field sobriety tests, Roach replied, 'Just take me away.' He went on to call the deputy a name and threatened that if he weren't in handcuffs he'd 'kick my a**,' before eventually conceding, 'I agree with ya.' He was charged with DUI and given a written warning for the flashing-light violation, and was released from jail in less than 12 hours.",
      source: "KMPH / NBC affiliate wire",
      sourceUrl:
        "https://kmph.com/news/nation-world/just-take-me-away-dui-stop-florida-driving-under-influence-david-roach-golf-cart-lady-lake-arrest-sumter-county-emergency-lights-sheriff-office-deputy",
      photo: { src: "/photos/just-take-me-away-golf-cart-dui.jpg", credit: "KMPH" },
    },
    {
      id: "flamingo-pinky-busch-gardens-slam",
      date: "August 3, 2016",
      year: "2016",
      month: "August",
      day: "3",
      city: "Tampa",
      score: 60,
      rubric: { absurdity: 18, humor: 5, floridaFactor: 14, unexpectedness: 10, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Reaches Into Pen at Busch Gardens, Slams a Flamingo Named Pinky to the Ground",
      description:
        "A Busch Gardens visitor reached into the Jambo Junction habitat, picked up a Chilean flamingo named Pinky, and slammed her into the ground in a rage.",
      fullStory:
        "Around 6:45 p.m. on August 3, 2016, Joseph Carrao, 45, was visiting Busch Gardens Tampa Bay's Jambo Junction animal viewing area with his family when witnesses say he reached into the pen, picked up a Chilean flamingo named Pinky, and slammed her into the ground in a rage. Pinky suffered severe injuries, and park veterinarians made the decision to humanely euthanize her because of the extent of the harm. Carrao was arrested and charged with felony animal cruelty.",
      contentNote:
        "This incident involved a real, fatal animal cruelty attack: the flamingo, named Pinky, did not survive her injuries.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/man-accused-of-attacking-flamingo-at-busch-gardens-tampa-bay/",
      photo: { src: "/photos/flamingo-pinky-busch-gardens-slam.jpg", credit: "Tampa Bay Times" },
    },
    {
      id: "key-largo-swatting-bomb-hostage-snapchat",
      date: "September 6, 2025",
      year: "2025",
      month: "September",
      day: "6",
      city: "Key Largo",
      score: 68,
      rubric: { absurdity: 19, humor: 12, floridaFactor: 11, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man's Fake 911 Call Claims Bomb, Hostages, and Suicidal Gunman: He Just Wanted to Prank a Stranger's House",
      description:
        "A hoax 911 caller tells Monroe County dispatchers he's suicidal, armed with a Glock, rigged to detonate a bomb, and holding family hostage in the basement of a Key Largo home, then brags about it on Snapchat.",
      fullStory:
        "The Monroe County Sheriff's Office swarmed a home on Third Road in Key Largo on September 6, 2025, after a 911 caller claimed to be inside, suicidal, and armed with a Glock. The caller escalated the hoax further, telling dispatchers that if anyone tried to open the door he would detonate a bomb, and that he had family members tied up in the basement. None of it was true. Deputies determined it was a 'swatting' call, a prank meant to draw a massive police response to an address with no real emergency. Detectives traced the call using online communications and digital evidence, eventually identifying 20-year-old Leonardo Javier Barrera of Ruskin as the culprit after he admitted to the stunt on Snapchat. Barrera was arrested in October 2025 and charged with unlawful use of a two-way communication device and giving false information concerning the commission of a felony.",
      contentNote:
        "This incident involved a hoax bomb and hostage threat that triggered a real emergency law enforcement response; no one was actually harmed.",
      source: "Keys Weekly / Keys News",
      sourceUrl:
        "https://keysweekly.com/42/florida-man-arrested-in-reported-swatting-incident-in-key-largo/",
      photo: { src: "/photos/key-largo-swatting-bomb-hostage-snapchat.jpg", credit: "Keys Weekly" },
    },
    {
      id: "smart-car-parked-in-kitchen-dorian",
      date: "September 3, 2019",
      year: "2019",
      month: "September",
      day: "3",
      city: "Jacksonville",
      score: 82,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 14, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Parks His Smart Car in the Kitchen So Hurricane Dorian Won't Blow It Away",
      description:
        "With the garage already full, a Jacksonville man drives his two-seat Smart car through the kitchen's double doors to keep it safe from Hurricane Dorian.",
      fullStory:
        "As Hurricane Dorian skirted Florida's coast in early September 2019, Jacksonville resident Patrick Eldridge decided he wasn't taking any chances with his tiny Smart car. With a sedan and a pickup truck already filling the family's two-car garage, Eldridge drove the Smart car through his kitchen's double doors and parked it next to the stove. His wife, Jessica Eldridge, posted photos of the car parked among the kitchen cabinets on Facebook that Tuesday, joking that he was 'afraid his car might blow away.' The post went viral, racking up tens of thousands of shares, before the couple moved the car back outside once the storm passed well clear of Jacksonville.",
      source: "Associated Press",
      sourceUrl:
        "https://calgary.citynews.ca/2019/09/04/florida-man-parks-smart-car-in-kitchen-so-it-wont-blow-away/",
      photo: { src: "/photos/smart-car-parked-in-kitchen-dorian.jpg", credit: "The Drive" },
    },
    {
      id: "sports-grill-dine-and-dash-blazer",
      date: "May 14, 2025",
      year: "2025",
      month: "May",
      day: "14",
      city: "Doral",
      score: 79,
      rubric: { absurdity: 20, humor: 21, floridaFactor: 13, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man in Blazer and Sunglasses Dines and Dashes at Five Sports Grill Locations",
      description:
        "Dressed to impress, a Miami-Dade man orders wings and top-shelf liquor at five different Sports Grill locations, then tells staff he's stepping out to deliver food to his wife and never comes back.",
      fullStory:
        "Doral police arrested 40-year-old Juan Carlos Rivera on the night of Wednesday, May 14, 2025, identifying him as a serial 'dine-and-dasher' who'd hit five different Sports Grill locations across Miami-Dade County over the previous two weeks, racking up roughly $650 in unpaid tabs. Surveillance video showed Rivera, dressed in a blazer and sunglasses, camped out at the bar for hours at each stop ordering the same order of Space Dust beer, grilled wings, mozzarella sticks, and Jameson, before telling staff he needed to step outside to bring food to his wife and simply never returning. At the chain's Doral location on May 10, he racked up a $260 tab before vanishing; at one location he left a declined credit card on the bar as a parting gesture. It wasn't Rivera's first alleged dine-and-dash. He was accused of pulling the same routine at an Outback Steakhouse in 2024. He was charged with organized scheme to defraud and defrauding an innkeeper and held without bond.",
      source: "Local 10 News (WPLG)",
      sourceUrl:
        "https://www.local10.com/news/local/2025/05/15/sharp-dressed-serial-dine-and-dasher-had-taste-for-sports-grill-wings-beer-staffers-say/",
      photo: { src: "/photos/sports-grill-dine-and-dash-blazer.jpg", credit: "Hoodline" },
    },
    {
      id: "publix-steak-heist-jealous-boyfriend",
      date: "January 5, 2026",
      year: "2026",
      month: "January",
      day: "5",
      city: "Palm Coast",
      score: 83,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title:
        "Florida Man Steals $4,000 in Steaks From Two Publix Stores, Then Dumps Them All After Catching Girlfriend Cooking With Another Man",
      description:
        "Florida Man allegedly steals thousands of dollars in steaks from two Publix stores, then throws the whole haul away after finding his girlfriend cooking with someone else.",
      fullStory:
        "Flagler County deputies say 30-year-old Heannys O. Alvarez Reyna hit two Palm Coast Publix stores within twenty minutes on the evening of January 5, 2026, filling his backpack with premium beef, lamb, and pork before walking out without paying. Surveillance video captured him lifting $1,574.86 in steaks and lamb from the Belle Terre Crossings Publix around 7:43 p.m., then $2,084 more in pork, top sirloin, brisket, and tenderloin from the Island Walk Publix minutes later. Deputies say he told them he'd planned to bring the meat to his girlfriend's house, but when he got there and found her cooking with another man, he dumped the whole haul instead. Alvarez Reyna was booked on felony retail theft charges and held on a $5,000 bond, plus an ICE detainer.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/florida-meat-thief-tosses-4k-stolen-steaks-after-catching-girlfriend-cooking-another-man-fcso",
      photo: { src: "/photos/publix-steak-heist-jealous-boyfriend.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "corvette-donuts-first-date",
      date: "January 10, 2026",
      year: "2026",
      month: "January",
      day: "10",
      city: "Englewood",
      score: 81,
      rubric: { absurdity: 20, humor: 22, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 4 },
      title:
        "Florida Man Does Donuts in Church Parking Lot to Impress First Date, Gets Arrested Instead",
      description:
        "A Florida man allegedly spins his Corvette in circles in a church parking lot to impress a first date, and ends the night in handcuffs instead.",
      fullStory:
        "Charlotte County deputies arrested 28-year-old Landon Morris on the night of Saturday, January 10, 2026, after witnesses reported a gray Corvette spinning donuts at the Kingdom Hall of Jehovah's Witnesses on Gulf Coast Boulevard in Englewood, sending up thick blue tire smoke and leaving heavy skid marks across the lot. Morris told deputies he'd driven from Orlando to meet a woman from Rotonda West for their first date, and his passenger admitted she'd asked him to do the donuts to impress her, apologizing to deputies for the stunt. Morris was arrested and charged with racing.",
      source: "Yahoo News",
      sourceUrl:
        "https://www.yahoo.com/news/articles/corvette-driver-does-donuts-church-210000836.html",
      photo: { src: "/photos/corvette-donuts-first-date.jpg", credit: "Gulf Coast News" },
    },
    {
      id: "dress-for-arrest-jail-uniform",
      date: "March 20, 2026",
      year: "2026",
      month: "March",
      day: "20",
      city: "Brevard County",
      score: 85,
      rubric: { absurdity: 23, humor: 22, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title:
        "Florida Man Trespassing at Hotel Gets Arrested While Wearing a Stolen Jail Uniform",
      description:
        "Florida Man allegedly refuses to leave his hotel room after his reservation ends, and deputies find him dressed head to toe in a stolen inmate uniform.",
      fullStory:
        "Brevard County deputies were called to a hotel on March 20, 2026, after staff reported that 53-year-old Farron Fullerton was refusing to leave his room after his reservation had ended. When deputies arrived, they found Fullerton wearing a full jail uniform, later identified as belonging to the Mitchell County Jail, which investigators determined he'd stolen after a previous jail stay rather than escaped from. Fullerton resisted being handcuffed and was arrested on misdemeanor charges of trespassing and resisting arrest without violence, held on a $1,000 bond. Sheriff Wayne Ivey summed up the scene: 'I've heard of dress for success, but never dress for arrest!'",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/brevard-county/man-arrested-trespassing-stolen-inmate-uniform/IHFBBFIZKVANTKWFWCKPSHJXKM/",
      photo: { src: "/photos/dress-for-arrest-jail-uniform.jpg", credit: "WFTV" },
    },
    {
      id: "ai-deepfake-deputy-prank",
      date: "March 24, 2026",
      year: "2026",
      month: "March",
      day: "24",
      city: "Lake Mary",
      score: 80,
      rubric: { absurdity: 19, humor: 20, floridaFactor: 15, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Shows Deputy a Fake AI Video to Make a Bogus Crime Report",
      description:
        "Florida Man allegedly shows a deputy an AI-generated deepfake video to file a fabricated crime report.",
      fullStory:
        "Seminole County deputies say 22-year-old Alexis Martínez-Arizala approached an off-duty deputy at an Academy Sports in Lake Mary on March 24, 2026, and showed him a three-second AI-generated video claiming to show two men breaking into his patrol car. The deputy grew suspicious after noticing the fake video's patrol car was missing 'Seminole Sheriff' markings and its rear door opened and closed on its own, and store surveillance confirmed no one had actually approached the vehicle. Investigators say Martínez-Arizala fabricated the video and report in an attempt to go viral on social media; he was arrested weeks later in Puerto Rico and charged with fabricating physical evidence, filing a false police report, and giving false information to law enforcement.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2026/04/08/florida-man-arrested-after-pranking-deputy-with-ai-video-in-lake-mary/",
      photo: { src: "/photos/ai-deepfake-deputy-prank.jpg", credit: "ClickOrlando" },
    },
    {
      id: "lawnmower-target-culvers-tiktok",
      date: "April 25, 2026",
      year: "2026",
      month: "April",
      day: "25",
      city: "Ocala",
      score: 84,
      rubric: { absurdity: 22, humor: 22, floridaFactor: 15, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Teens Drive a Riding Lawnmower Through Target's Automatic Doors for a TikTok Video",
      description:
        "Two Florida teens allegedly ride a lawnmower through a Target's front doors to film a viral TikTok stunt.",
      fullStory:
        "Ocala police say 18-year-old Janek Szkaradek drove a riding lawnmower straight through the automatic front doors of a Target on Southwest College Road on April 25, 2026, smashing the entrance while his 18-year-old friend Luke Charske filmed for their TikTok account. The night before, Szkaradek had walked into a nearby Culver's and run a leaf blower through the dining room for another video. Both teens were arrested and released on bond from the Marion County Jail; Szkaradek was charged with criminal mischief and disorderly conduct, and Charske was charged as a principal to disorderly conduct.",
      source: "ClickOrlando",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2026/04/26/social-media-stunts-land-two-ocala-teens-in-handcuffs/",
      photo: { src: "/photos/lawnmower-target-culvers-tiktok.jpg", credit: "WCJB" },
    },
    {
      id: "dirty-bomb-soil-gauge",
      date: "December 5, 2025",
      year: "2025",
      month: "December",
      day: "5",
      city: "Davenport",
      score: 86,
      rubric: { absurdity: 22, humor: 21, floridaFactor: 17, unexpectedness: 13, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Crashes Into Publix, Claims He Has a 'Dirty Bomb' in His Truck",
      description:
        "Florida Man allegedly tells officers he has a 'dirty bomb' in his truck after crashing into a Publix, triggering a bomb squad response.",
      fullStory:
        "Benjamin Donald Johnson, 43, crashed his truck into a Publix on U.S. 27 in Davenport on the night of December 5, 2025, then refused commands to get out, forcing deputies to physically remove him as multiple firearms sat in plain view inside. While detained in the back of a patrol car, Johnson told officers he had a 'dirty bomb' in the truck, prompting a lockdown and a response from the FBI, ATF, and a bomb squad. The chained, radioactive-warning-labeled container turned out to be a soil-testing moisture density gauge with less radioactivity than a medical X-ray. Johnson was charged with hoax weapon of mass destruction, false report concerning a bomb, and unlawful possession of a controlled substance.",
      source: "WFTV",
      sourceUrl:
        "https://www.wftv.com/news/local/publix-crash-sparks-dirty-bomb-scare-polk-county/VU6PMMIU6RFLHCPJOOGUITQUYQ/",
      photo: { src: "/photos/dirty-bomb-soil-gauge.jpg", credit: "WFTV" },
    },
    {
      id: "superman-boat-burglary",
      date: "July 25, 2026",
      year: "2026",
      month: "July",
      day: "25",
      city: "Ruskin",
      score: 84,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 15, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man in Superman Costume Confesses to Boat Burglary Mid-Interview",
      description:
        "Florida Man dressed as Superman allegedly admits to breaking into a boat cabin and stealing power tools when deputies catch up with him.",
      fullStory:
        "A Ruskin boat owner discovered someone had broken into the cabin of their vessel, anchored just behind their home, and made off with several power tools on July 25, 2026. Investigators quickly identified 57-year-old James Tidwell, a convicted felon, and found him wearing a red-and-blue Superman-themed beach coverup, cape included, when they arrived. Body camera video shows Tidwell gesturing toward a nearby boat and admitting he 'only took three items' when deputies mentioned the burglary. He was charged with burglary of an unoccupied conveyance and first-degree petit theft, and was released after posting a $5,500 bond.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/video-superman-busted-ruskin-boat-burglary",
      photo: { src: "/photos/superman-boat-burglary.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "fake-attorney-traffic-stop",
      date: "April 25, 2026",
      year: "2026",
      month: "April",
      day: "25",
      city: "West Melbourne",
      score: 86,
      rubric: { absurdity: 22, humor: 23, floridaFactor: 14, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man in a Suit Shows Up to a Traffic Stop Claiming to Be a Lawyer",
      description:
        "Florida Man allegedly poses as an attorney at a stranger's traffic stop, using a real lawyer's name and website to try to talk officers out of an arrest.",
      fullStory:
        "Derek Zachery Schaufus, 30, of Palm Bay, showed up in a suit and tie to a traffic stop on Interstate 95 in West Melbourne on April 25, 2026, where officers were arresting a woman he didn't know after finding drugs in her car. Schaufus introduced himself as attorney 'Johnathan Mills' and tried to negotiate on her behalf; when officers asked for proof, he pulled up the real Mills's law firm website and claimed he was the firm's secretary using that name. The phone number he gave traced back to his own cellphone, and the actual attorney told investigators he had never heard of Schaufus. The Florida Bar confirmed Schaufus is not a licensed attorney, and he was charged with misrepresenting himself as qualified to practice law, obstruction by a disguised person, and resisting an officer without violence.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-accused-posing-attorney-during-traffic-stop",
      photo: { src: "/photos/fake-attorney-traffic-stop.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "doughnuts-7-eleven-wallet",
      date: "September 12, 2026",
      year: "2026",
      month: "September",
      day: "12",
      city: "Lehigh Acres",
      score: 76,
      rubric: { absurdity: 19, humor: 20, floridaFactor: 14, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Does Doughnuts in 7-Eleven Parking Lot, Ditches His Own Wallet Fleeing Troopers",
      description:
        "Florida Man allegedly does doughnuts in a convenience store parking lot, then throws his own wallet under a tree while fleeing troopers.",
      fullStory:
        "Florida Highway Patrol troopers tried to stop a driver performing doughnuts in a 7-Eleven parking lot near State Road 82 and Sunshine Boulevard in Lehigh Acres just before midnight on September 12, 2026. Instead of pulling over, the driver fled on foot within the lot and tossed his wallet under a nearby tree in an apparent attempt to hide his identity; troopers recovered it and identified him as 30-year-old Robins Wilky Alexandre. A search turned up cocaine concealed in his boot. Alexandre was charged with fleeing and eluding, resisting without violence, street racing and stunt driving, tampering with evidence, cocaine possession, habitual driving with a revoked license, and reckless driving.",
      source: "Tampa Free Press",
      sourceUrl:
        "https://www.tampafp.com/late-night-doughnuts-at-lee-county-7-eleven-lead-to-arrest-cocaine-found-in-drivers-boot/",
      photo: { src: "/photos/doughnuts-7-eleven-wallet.jpg", credit: "Tampa Free Press" },
    },
    {
      id: "bb-gun-sheriff-drone",
      date: "June 13, 2026",
      year: "2026",
      month: "June",
      day: "13",
      city: "Lehigh Acres",
      score: 76,
      rubric: { absurdity: 20, humor: 19, floridaFactor: 13, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Shoots BB Gun at Sheriff's Drone, Gets Caught on Its Own Camera",
      description:
        "Florida Man allegedly fires a BB rifle at a sheriff's office drone, which records the entire encounter.",
      fullStory:
        "The Lee County Sheriff's Office was flying a drone as a first responder over a call near Todd Avenue South in Lehigh Acres on June 13, 2026, when a man on the ground pointed a BB rifle loaded with steel projectiles at it and fired twice. The drone's camera captured the whole encounter, and deputies identified the shooter as Elvin Antonio Callejas-Serrato. He was arrested and charged with shooting or throwing a deadly missile into an aircraft.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/aflorida-man-arrested-after-allegedly-shooting-at-sheriffs-office-first-responder-drone-florida-man-lee-county-lehigh-acres-lee-county-sheriffs-office-drone-as-first-responder-drone-shooting-sheriff-drone-elvin-antonio-callejas-serrato-bb-rifle",
      photo: { src: "/photos/bb-gun-sheriff-drone.jpg", credit: "CBS12" },
    },
    {
      id: "hot-dog-costume-toilet-paper",
      date: "August 25, 2025",
      year: "2025",
      month: "August",
      day: "25",
      city: "St. Petersburg",
      score: 85,
      rubric: { absurdity: 21, humor: 24, floridaFactor: 14, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Woman in Hot Dog Costume Arrested for Toilet-Papering Neighbor's Car",
      description:
        "Florida Woman allegedly throws on a hot dog costume to toilet-paper a neighbor's car in a dispute over parking.",
      fullStory:
        "St. Petersburg police say 58-year-old Marcia Morgan was upset that a neighbor kept parking near her yard, so on the afternoon of August 25, 2025, she put on a full hot dog costume, leaned against the neighbor's vehicle, and wrapped it in toilet paper. Officers said Morgan was intoxicated and uncooperative when they arrived, and her reason for wearing the costume was never explained. She was arrested on charges of disorderly conduct and resisting an officer without violence, and pleaded no contest the next day, paying a $550 fine.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/st-pete-woman-wearing-hot-dog-costume-arrested-after-putting-toilet-paper-neighbors-vehicle",
      photo: { src: "/photos/hot-dog-costume-toilet-paper.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "banana-tree-pothole-protest",
      date: "September 9, 2021",
      year: "2021",
      month: "September",
      day: "9",
      city: "Fort Myers",
      score: 77,
      rubric: { absurdity: 18, humor: 20, floridaFactor: 16, unexpectedness: 10, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Plants Banana Tree in Pothole to Protest Road Conditions",
      description:
        "A Fort Myers business owner plants a banana tree in a stubborn pothole on a private street after growing tired of patching it with cement.",
      fullStory:
        "Bryan Raymond, owner of Progress and Pride Fitness Group in Fort Myers, said he was fed up with a deep pothole on Honda Drive that kept damaging cars and flooding the street. After repeatedly filling the hole with cement with no luck, Raymond planted a banana tree directly in it as an impossible-to-miss warning to drivers. Because Honda Drive is a private street, Lee County said maintenance was the business owners' responsibility, not the county's. Raymond explained, 'If we have to maintain it and make sure nobody gets hurt, we are going to put something obvious there to make sure nobody gets in the hole.'",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/florida-man-banana-tree-pothole/",
      photo: { src: "/photos/banana-tree-pothole-protest.jpg", credit: "Local 10" },
    },
    {
      id: "lakeland-swamp-dui-children",
      date: "September 9, 2026",
      year: "2026",
      month: "September",
      day: "9",
      city: "Lakeland",
      score: 73,
      rubric: { absurdity: 20, humor: 10, floridaFactor: 18, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Flees DUI Crash Into Gator-Infested Swamp Carrying His Two Kids",
      description:
        "A Lakeland man fleeing a DUI crash carries his toddler and infant into a swamp at night, dropping them in standing water before a police drone finds him.",
      fullStory:
        "Isaac Kinsey, 27, drove through a road-closure sign and sandbags into a construction zone on State Road 33 near North Combee Road in Lakeland early on September 9, then fled on foot into a nearby swamp carrying his 2-year-old and 10-month-old children. A police drone located Kinsey about 30 minutes later stumbling through the dark, marshy area; he fell repeatedly, submerging both children in standing water, and at one point set the toddler down to keep moving through the swamp with the infant. Officers rescued both children, who were treated and released at Lakeland Regional Health. Kinsey, who admitted to drinking and was driving on a suspended license, was arrested and faces eight misdemeanor and three felony charges, including two counts of negligent child abuse with great bodily harm.",
      contentNote:
        "This incident involved a real injury: two young children were submerged in swamp water and hospitalized for treatment before being released.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/man-accused-dui-crash-children-swamp",
      photo: { src: "/photos/lakeland-swamp-dui-children.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "kissimmee-debt-bondage-transport",
      date: "September 14, 2023",
      year: "2023",
      month: "September",
      day: "14",
      city: "Kissimmee",
      score: 42,
      rubric: { absurdity: 10, humor: 3, floridaFactor: 10, unexpectedness: 8, headlineQuality: 6, sourceQuality: 5 },
      title: "Florida Man Sentenced for Driving Trafficking Victim Cross-Country to Work Off a Debt",
      description:
        "A Kissimmee man is sentenced to federal prison for having a man he helped smuggle into the country driven from Wisconsin to Florida against his will to work off a debt.",
      fullStory:
        "Gerardo Hernandez Anselmo, 34, of Kissimmee, was sentenced by U.S. District Judge William M. Conley to 30 months in federal prison for illegally transporting an alien. Prosecutors said Hernandez Anselmo and his wife helped a man identified as R.E. enter the country illegally, then had him driven from Abbotsford, Wisconsin to Kissimmee against his will to work off the debt he owed them. The case surfaced after a relative reported R.E. missing from his Wisconsin job in June 2022; R.E. later identified Hernandez Anselmo and a co-defendant as the men who drove him to Florida. Hernandez Anselmo pleaded guilty in June 2023, and the co-defendant, who was in the country illegally, was sentenced separately to time served and deported.",
      contentNote:
        "This is a serious federal human-trafficking and debt-bondage case involving a real victim, not a lighthearted incident.",
      source: "U.S. Department of Justice",
      sourceUrl:
        "https://www.justice.gov/usao-wdwi/pr/florida-man-sentenced-30-months-illegally-transporting-alien",
    },
    {
      id: "hides-under-hotel-bed-doral",
      date: "September 14, 2026",
      year: "2026",
      month: "September",
      day: "14",
      city: "Doral",
      score: 71,
      rubric: { absurdity: 19, humor: 15, floridaFactor: 13, unexpectedness: 13, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Man Hides Under Hotel Guests' Bed for Hours Before Being Discovered",
      description:
        "A Florida man sneaks into a Doral hotel room through a sliding glass door and hides under a sleeping couple's bed for hours before they discover him.",
      fullStory:
        "Ritchel Calvaire, a former guest who had already been told not to return to the Provident Doral hotel, allegedly hopped a fence and slipped into a couple's room through a sliding glass door overnight. The woman felt movement near the bed around 4 a.m. but did not investigate until she checked underneath it around 6:15 a.m. and found Calvaire still there. The couple fled the room and called police, who arrested Calvaire on September 14, 2026 and charged him with burglary and resisting an officer without violence.",
      source: "TMZ",
      sourceUrl:
        "https://www.tmz.com/2026/09/14/florida-man-arrested-for-burglary-after-hiding-under-couples-bed/",
      photo: { src: "/photos/hides-under-hotel-bed-doral.jpg", credit: "TMZ" },
    },
    {
      id: "marshal-badge-grouper-potatoes",
      date: "March 8, 2020",
      year: "2020",
      month: "March",
      day: "8",
      city: "Palm Coast",
      score: 85,
      rubric: { absurdity: 22, humor: 21, floridaFactor: 16, unexpectedness: 13, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Man Flashes Fake U.S. Marshal Badge After Getting Caught Stealing Potatoes and Fish",
      description:
        "A Florida man tries to leave a Publix with stolen groceries and claims to be a federal marshal when a loss prevention officer stops him.",
      fullStory:
        "Leroy Stotelmyer, 60, allegedly tried to walk out of a Palm Coast Publix with two boxes of potatoes and a grouper filet without paying. When a loss prevention employee stopped him, Stotelmyer claimed to be a U.S. Marshal and displayed a fake badge in a black holder, then later told deputies at his home he was an 'Air Marshal Flight Examiner.' He was arrested on March 8, 2020 and charged with false impersonation of a federal law enforcement officer, petit shoplifting, and resisting a merchant.",
      source: "ClickOrlando (WKMG)",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2020/03/09/man-impersonating-us-marshal-flashes-fake-badge-in-shoplifting-attempt-deputies-say/",
      photo: { src: "/photos/marshal-badge-grouper-potatoes.jpg", credit: "WWSB" },
    },
    {
      id: "whizzinator-patrol-car",
      date: "July 14, 2026",
      year: "2026",
      month: "July",
      day: "14",
      city: "Palm Coast",
      score: 87,
      rubric: { absurdity: 23, humor: 22, floridaFactor: 15, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man's Homemade Whizzinator Falls Out During Drug Test Cheat Attempt",
      description:
        "A Florida man tries to beat a court-ordered drug test with a homemade fake urine device before it falls out in the back of a patrol car.",
      fullStory:
        "James Shepard, 52, allegedly rigged a fake bladder filled with synthetic urine to a heating pad and a prosthetic penis in an attempt to pass a court-ordered drug test. After deputies moved his handcuffs to the front over a claimed shoulder injury, the device came loose and Shepard tossed it onto the patrol car floor, then denied it was his, even though an in-car camera recorded the whole thing. He was arrested on July 14, 2026 and charged with defrauding a drug test, tampering with evidence, driving with a suspended license, and violating probation. Flagler County Sheriff Rick Staly said Shepard, already on community control for prior burglaries and thefts, had been given 'the deal of a lifetime.'",
      source: "ClickOrlando (WKMG)",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2026/07/15/florida-man-caught-with-whizzinator-in-back-seat-of-patrol-car-video-shows/",
      photo: { src: "/photos/whizzinator-patrol-car.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "homegoods-clothes-smoking",
      date: "September 7, 2026",
      year: "2026",
      month: "September",
      day: "7",
      city: "Cape Coral",
      score: 80,
      rubric: { absurdity: 21, humor: 20, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Strips Naked in HomeGoods, Says His Clothes and Bicycle Were Smoking",
      description:
        "A Florida man takes off his clothes in the middle of a HomeGoods store and tells police his clothing and bike had started smoking.",
      fullStory:
        "Billy Thomas, 43, allegedly walked down an aisle at a Cape Coral HomeGoods, told a nearby witness 'I'm sorry, I have to do this,' and dropped his pants, exposing himself to shoppers and an employee. Officers found him nearby with his shoes and boxer briefs left behind at the store entrance, and he told them his clothes had started smoking and that his bicycle was smoking too, though no bicycle was ever located. A witness and a store employee identified him, and he was arrested on September 7, 2026 and charged with indecent exposure.",
      source: "Tampa Free Press",
      sourceUrl:
        "https://www.tampafp.com/floirida-man-arrested-after-allegedly-stripping-naked-inside-homegoods/",
      photo: { src: "/photos/homegoods-clothes-smoking.jpg", credit: "Tampa Free Press" },
    },
    {
      id: "underwear-boat-joyride-ankle-monitor",
      date: "May 10, 2024",
      year: "2024",
      month: "May",
      day: "10",
      city: "St. Augustine",
      score: 77,
      rubric: { absurdity: 20, humor: 18, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man in His Underwear Steals $100,000 Boat, Wrecks It Off St. Augustine",
      description:
        "A Florida man on probation steals a $100,000 boat from a private dock and runs it aground while wearing only his underwear and an ankle monitor.",
      fullStory:
        "Anthony Terry allegedly stole a $100,000 boat from a private dock near Conch House Marina and took it for a joyride off Vilano Beach despite having little idea how to operate it, including how to tie a knot. The boat ended up heavily damaged and listing in the water, drawing a crowd before Terry was found nearby wearing only underwear, an ankle monitor, and a boat bumper tied to his arm. He was arrested on May 10, 2024 and charged with grand larceny.",
      source: "Action News Jax",
      sourceUrl:
        "https://www.actionnewsjax.com/news/local/man-arrested-joyriding-around-vilano-beach-crashing-stolen-100000-boat/QWVLQAHEM5AYDDO5RWWFVAU3VE/",
      photo: { src: "/photos/underwear-boat-joyride-ankle-monitor.jpg", credit: "Action News Jax" },
    },
    {
      id: "waffle-house-beef-stick-barrage",
      date: "September 6, 2026",
      year: "2026",
      month: "September",
      day: "6",
      city: "Seminole",
      score: 74,
      rubric: { absurdity: 19, humor: 19, floridaFactor: 14, unexpectedness: 11, headlineQuality: 8, sourceQuality: 3 },
      title: "Florida Men in Their Underwear Pelt Waffle House Window With Beef Sticks",
      description:
        "Three Florida men in their underwear pound on a Waffle House window and throw beef sticks at it before dawn.",
      fullStory:
        "Taylor Smith, 22, Massimo Geldres Diaz, 21, and Alem Custic, 19, allegedly pounded on the window of a Seminole Waffle House around 4:30 a.m. and threw beef sticks at the glass, with police noting that some of the men were wearing only their underwear. Officers found the trio sitting on a bench outside an adjacent laundromat and arrested them on September 6, 2026. All three were booked on disorderly conduct charges and released on $150 bond each.",
      source: "The Smoking Gun",
      sourceUrl:
        "https://thesmokinggun.com/buster/disorderly-conduct/beef-stick-barrage-285096",
      photo: { src: "/photos/waffle-house-beef-stick-barrage.jpg", credit: "The Smoking Gun" },
    },
    {
      id: "palm-coast-duplex-wall-hammer",
      date: "September 6, 2026",
      year: "2026",
      month: "September",
      day: "6",
      city: "Palm Coast",
      score: 80,
      rubric: { absurdity: 21, humor: 18, floridaFactor: 16, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Hammers Through Shared Duplex Wall, Threatens to 'Make Your Life Hell'",
      description:
        "A Palm Coast man hammers a hole through his shared duplex wall and threatens to keep crawling through it to torment his neighbor.",
      fullStory:
        "Charles Bowden, 58, allegedly used a hammer and an electric string trimmer to punch a softball-sized hole through the wall separating his Palm Coast duplex unit from his neighbor's early on September 6, 2026, shouting threats the whole time. Deputies say Bowden told the neighbor, 'I'm going to be crawling through the walls and figure out ways to make your life hell,' then refused to come out of his unit for more than 90 minutes while the neighbor recorded the threats. He was arrested and charged with burglary with assault or battery and aggravated assault with a deadly weapon without intent to kill, and is being held without bond.",
      source: "ClickOrlando (WKMG)",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2026/09/08/neighbor-from-hell-caught-breaking-through-wall-of-florida-duplex-sheriff-says/",
      photo: { src: "/photos/palm-coast-duplex-wall-hammer.jpg", credit: "Tampa Free Press" },
    },
    {
      id: "lady-lake-mercedes-cyclist-tormentor",
      date: "September 7, 2026",
      year: "2026",
      month: "September",
      day: "7",
      city: "Lady Lake",
      score: 82,
      rubric: { absurdity: 20, humor: 20, floridaFactor: 16, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Woman Aims Mercedes at Cyclists, Says She Soiled Herself During Arrest",
      description:
        "A Lady Lake woman swerves her Mercedes convertible at two cyclists and later tells arresting officers she soiled herself during the struggle.",
      fullStory:
        "Jill Allison Vernon, 58, allegedly swerved her white Mercedes convertible at cyclists Adam Dennis and Dorothea Bower on Conservation Trail near Lady Lake on March 22, 2026, nearly clipping Dennis's leg before accelerating backward toward both riders and forcing them into a driveway. When deputies came to arrest her, Vernon resisted and told officers she needed a bathroom, later saying she had soiled herself during the struggle. She pleaded no contest to aggravated assault with a deadly weapon and was sentenced to 90 days in jail and 150 hours of community service, with body camera footage of the arrest released publicly.",
      source: "ClickOrlando (WKMG)",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2026/09/07/body-camera-video-shows-arrest-of-lady-lake-woman-accused-of-threatening-bicyclists-with-car/",
      photo: { src: "/photos/lady-lake-mercedes-cyclist-tormentor.jpg", credit: "Villages-News" },
    },
    {
      id: "pokemon-cards-taco-seasoning-heist",
      date: "February 26, 2026",
      year: "2026",
      month: "February",
      day: "26",
      city: "Palm Beach",
      score: 84,
      rubric: { absurdity: 22, humor: 21, floridaFactor: 13, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Uses Taco Seasoning to Mask $40,000 Pokemon Card Theft Spree at Target",
      description:
        "A Palm Beach man buys taco seasoning packets to disguise stealing boxes of Pokemon trading cards at Target self-checkout, netting nearly $40,000 reselling them on eBay.",
      fullStory:
        "Keith Wallis, 39, of Palm Beach, allegedly loaded self-checkout carts at Target with boxes of Pokemon trading cards alongside an equal number of 99-cent taco seasoning packets, then scanned and paid only for the seasoning while leaving the cards unscanned. Investigators say he ran the scheme at roughly 75 Target stores across Central and South Florida from July 2025 to February 2026, reselling the cards on eBay for close to $40,000 against Target's reported loss of about $10,000. He was arrested and charged with felony organized retail theft, dealing in stolen property, and money laundering, with Attorney General James Uthmeier saying organized retail theft 'drives up prices for consumers, and that is not a result we are going to tolerate.'",
      source: "The Floridian",
      sourceUrl:
        "https://floridianpress.com/2026/02/james-uthmeier-arrests-palm-beach-man-in-10k-organized-retail-theft-scheme/",
      photo: { src: "/photos/pokemon-cards-taco-seasoning-heist.jpg", credit: "Oxygen" },
    },
    {
      id: "karaoke-machete-encore",
      date: "April 2, 2023",
      year: "2023",
      month: "April",
      day: "2",
      city: "Cape Canaveral",
      score: 83,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 15, unexpectedness: 12, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Man Pulls Machete at Bar After Being Denied Another Karaoke Song",
      description:
        "A Cape Canaveral man pulls out a concealed machete at a bar after an employee turns down his request to sing one more karaoke song.",
      fullStory:
        "Travis Jordan, 39, allegedly pulled an 18-inch machete he had concealed on him after a bar employee at Kennedy's Lamp Post Tavern in Cape Canaveral told him he could not sing another karaoke song, demanding an encore before another employee talked him into handing over the weapon. Deputies who responded found Jordan extremely intoxicated with bloodshot, glassy eyes and said he told them he keeps the machete on him because he always needs to stay alert. He was arrested on breach of peace and disorderly conduct charges and booked into the Brevard County Jail, with the sheriff's office joking that Jordan's antics earned him a stay at 'Ivey's Iron Bar Lodge' where every night is open mic night.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-pulls-machete-bar-request-another-karaoke-song-denied-deputies-say",
      photo: { src: "/photos/karaoke-machete-encore.jpg", credit: "Fox News" },
    },
    {
      id: "wawa-handicap-parking-911-meltdown",
      date: "February 9, 2024",
      year: "2024",
      month: "February",
      day: "9",
      city: "Lady Lake",
      score: 74,
      rubric: { absurdity: 18, humor: 19, floridaFactor: 14, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Calls 911 Over Handicap Parking Spot, Then Calls 911 Again on the Cops Who Show Up",
      description:
        "A Florida man reports a car parked illegally in a handicap spot at a Wawa, threatens to fight the driver, then calls 911 a second time to complain about the officers who respond.",
      fullStory:
        "Nicholas Taylor, 39, of The Villages, allegedly called 911 to report a car parked in a handicap space outside a Wawa on U.S. Highway 27 in Lady Lake on February 9, 2024, then went inside and disrupted the store, blocking the driver's car and asking, 'Do you want to fight.' When officers arrived smelling alcohol on him, Taylor argued with them, demanded a sergeant, ignored the responding sergeant when he identified himself, and called 911 a second time to complain about the officers on scene. He was arrested and charged with disorderly intoxication and misuse of 911, then released from Lake County Jail on a $1,500 bond.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/florida-man-arrested-causing-scene-handicap-parking-space-responding-officers",
      photo: { src: "/photos/wawa-handicap-parking-911-meltdown.jpg", credit: "Fox News" },
    },
    {
      id: "st-petersburg-jester-dagger-landscaper",
      date: "August 14, 2025",
      year: "2025",
      month: "August",
      day: "14",
      city: "St. Petersburg",
      score: 83,
      rubric: { absurdity: 22, humor: 20, floridaFactor: 15, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man in Full Jester Costume Pulls Dagger on Landscaper for Mowing Too Loud",
      description:
        "A St. Petersburg smoke shop owner dressed as a jester pulls a 12-inch dagger on a landscaper after complaining the mower is too loud on a weekday afternoon.",
      fullStory:
        "Anthony Marzola, 51, owner of the Psychedelic Jester smoke shop, allegedly retrieved a 12-inch dagger from his vehicle and advanced on landscaper Brian Hanson while yelling that he 'cannot be mowing,' despite it being a weekday afternoon, in St. Petersburg on August 14, 2025. Hanson kept his lawnmower between himself and Marzola as a barrier until Marzola backed off. The arresting officer noted in his report that Marzola was 'wearing a full jester costume during the incident and arrest,' and he was booked on a felony charge of aggravated assault with a deadly weapon, held on $15,000 bond, and ordered to have no contact with Hanson.",
      source: "The Smoking Gun",
      sourceUrl:
        "https://www.thesmokinggun.com/documents/crime/jester-arrest-815092",
      photo: { src: "/photos/st-petersburg-jester-dagger-landscaper.jpg", credit: "The Smoking Gun" },
    },
    {
      id: "cape-coral-sword-neighbor-showdown",
      date: "March 25, 2026",
      year: "2026",
      month: "March",
      day: "25",
      city: "Cape Coral",
      score: 69,
      rubric: { absurdity: 18, humor: 16, floridaFactor: 14, unexpectedness: 10, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Man Threatens Neighbor With Three-Foot Sword During Argument",
      description:
        "A Cape Coral man grabs a sword with a roughly three-foot blade from his truck and raises it at his neighbor during a dispute before fleeing the scene.",
      fullStory:
        "Cape Coral police say Raul Elosegui Fernandez, 41, retrieved a tan-handled sword with a blue metal blade roughly three feet long from his truck during an argument with his neighbor on Everest Parkway on March 25, 2026, raised it above his shoulder, and advanced on the neighbor while making threats. The neighbor retreated inside and called police, and officers later found the sword inside Fernandez's truck at his home. He was arrested at the scene and charged with assault with a deadly weapon.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/florida-man-sword-threat-cape-coral/",
      photo: { src: "/photos/cape-coral-sword-neighbor-showdown.jpg", credit: "CBS News Miami" },
    },
    {
      id: "stuart-seafood-clams-911-complaint",
      date: "December 18, 2017",
      year: "2017",
      month: "December",
      day: "18",
      city: "Stuart",
      score: 78,
      rubric: { absurdity: 19, humor: 21, floridaFactor: 14, unexpectedness: 11, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Calls 911 Twice to Complain His Clams Were Too Small",
      description:
        "A Stuart man calls 911 twice during his lunch break to complain that the clams he ordered at a seafood restaurant were too small.",
      fullStory:
        "Nelson Agosto, 51, allegedly called 911 during his lunch break at Crabby's Seafood Shack in Stuart on December 18, 2017, telling the dispatcher his $12 order of clams 'was extremely so small.' When the operator redirected him to a non-emergency line, Agosto called 911 again anyway, prompting an officer to cite him on the spot. He later said he didn't realize calling 911 over a food complaint broke any rules, and he was charged with misdemeanor misuse of the 911 system.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/size-matters-florida-man-arrested-for-dinner-complaints",
    },
    {
      id: "north-fort-myers-tricycle-gnome-heist",
      date: "June 2, 2026",
      year: "2026",
      month: "June",
      day: "2",
      city: "North Fort Myers",
      score: 81,
      rubric: { absurdity: 21, humor: 20, floridaFactor: 15, unexpectedness: 12, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Man on Children's Tricycle Steals a Dozen Garden Gnomes",
      description:
        "A North Fort Myers man rides a child's tricycle through a neighborhood stealing more than a dozen garden gnomes off residents' lawns.",
      fullStory:
        "Lee County deputies say John Ramey pedaled a children's tricycle through a North Fort Myers neighborhood on May 19, 2026, and made off with more than a dozen decorative garden gnomes, some of which a homeowner had been collecting for three decades. Ring camera footage of the distinctive tricycle helped detectives track Ramey to a nearby homeless encampment, where he cooperated and led them to the stolen gnomes. He was arrested on June 2, 2026 and charged with petit theft with two or more prior convictions, and all the gnomes were returned to their owner.",
      source: "WSVN",
      sourceUrl:
        "https://wsvn.com/news/local/florida/florida-man-steals-over-a-dozen-garden-gnomes-in-lee-county/",
      photo: { src: "/photos/north-fort-myers-tricycle-gnome-heist.jpg", credit: "WSVN" },
    },
    {
      id: "lady-lake-penny-bank-robbery",
      date: "June 29, 2024",
      year: "2024",
      month: "June",
      day: "29",
      city: "Lady Lake",
      score: 85,
      rubric: { absurdity: 23, humor: 22, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Tries to Withdraw One Cent From Bank, Gets Arrested for Robbery",
      description:
        "A Lady Lake man fills out a withdrawal slip for one cent at a Chase Bank, hints at violence when the teller refuses, and calmly waits for police to arrest him.",
      fullStory:
        "Michael Fleming, 41, allegedly walked into a Chase Bank in Lady Lake on June 29, 2024, and filled out a withdrawal slip for exactly one cent, and when the teller explained she couldn't process it, he asked, 'So you want me to say the other word?' The alarmed teller called police while Fleming simply sat down in the lobby to wait, and he had no account at the bank and walked away with nothing. He was arrested and charged with robbery, later telling deputies his goal had been to get arrested.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-arrested-after-allegedly-trying-withdraw-1-cent-from-bank",
      photo: { src: "/photos/lady-lake-penny-bank-robbery.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "waffle-house-finger-gun-napkin-robbery",
      date: "October 18, 2021",
      year: "2021",
      month: "October",
      day: "18",
      city: "Madison",
      score: 94,
      rubric: { absurdity: 24, humor: 25, floridaFactor: 17, unexpectedness: 14, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Tries to Rob Waffle House With Finger Guns, Steals Only Napkins",
      description:
        "A Madison man makes finger guns and shouts that he's robbing a Waffle House, then walks out with nothing but a handful of napkins.",
      fullStory:
        "Edward William Rodriguez, 28, walked into a Madison Waffle House with a small dog around 8 p.m. on October 18, 2021, made his hands into the shape of a gun, and shouted, 'get on the ground, y'all are getting robbed!' according to the Madison County Sheriff's Office. Witnesses said he had no actual weapon, just his fingers pointed like a pistol, and his entire haul from the stickup was a handful of napkins before he fled. Deputies found him at his home, where he admitted to the napkin robbery while under the influence of drugs and alcohol. He was arrested and charged with unarmed robbery and assault.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/florida/florida-man-tries-robbing-waffle-house-with-finger-guns-sheriff-says/",
      photo: { src: "/photos/waffle-house-finger-gun-napkin-robbery.jpg", credit: "WFLA" },
    },
    {
      id: "boat-thief-wig-dress-disguise",
      date: "April 26, 2024",
      year: "2024",
      month: "April",
      day: "26",
      city: "Lakeport",
      score: 86,
      rubric: { absurdity: 22, humor: 22, floridaFactor: 15, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Disguises Himself in Blonde Wig and Dress to Evade Deputies After Boat Theft",
      description:
        "A Glades County man puts on a blonde wig, sunglasses, and a dress in a failed attempt to slip past deputies investigating a stolen boat.",
      fullStory:
        "Glades County deputies were investigating a recovered stolen boat near the Old Calusa Lodge in Lakeport on April 26, 2024, when they spotted a person who appeared to be a blonde woman in oversized sunglasses leaving a nearby home. The person was actually Joshua Kolotka, 33, wearing a light blue feather-patterned dress and a wig over his own clothes. Deputies recognized him despite the disguise and also linked him to the theft of a John Deere Gator utility vehicle. He was arrested on the boat and Gator theft charges along with two outstanding warrants out of Okeechobee County and booked into the Glades County Jail without bond.",
      source: "CBS12",
      sourceUrl:
        "https://cbs12.com/news/local/stolen-boat-suspect-joshua-kolotka-dons-dress-and-wig-in-poor-attempt-to-disguise-himself-glades-county-okeechobee-county-sheriffs-office-florida-news-april-26-2024",
      photo: { src: "/photos/boat-thief-wig-dress-disguise.jpg", credit: "CBS12" },
    },
    {
      id: "wedding-crasher-first-dance-arrest",
      date: "May 20, 2019",
      year: "2019",
      month: "May",
      day: "20",
      city: "St. Pete Beach",
      score: 83,
      rubric: { absurdity: 20, humor: 23, floridaFactor: 13, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Crashes Strangers' Wedding, Cuts In on the First Dance, Gets Arrested",
      description:
        "A Land O' Lakes man sneaks into a stranger's wedding reception, dances with the bridesmaids, then interrupts the couple's first dance and gets arrested.",
      fullStory:
        "Mark Saunderson slipped into Sadie and Adam Dajka's wedding reception at the Grand Plaza Hotel in St. Pete Beach on May 20, 2019, helping himself to the open bar and hors d'oeuvres and dancing with bridesmaids and the groom's mother. During the couple's first dance, he approached the wedding photographer and tried to get her attention, prompting the bride's father and brothers to escort him out, only for him to sneak back in through the kitchen. Deputies arrested him for disorderly conduct after he'd been drinking. The bride told reporters she found the whole thing hilarious, while the groom did not.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://fox13news.com/news/local-news/pasco-co-man-arrested-after-crashing-st-pete-beach-wedding",
      photo: { src: "/photos/wedding-crasher-first-dance-arrest.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "onlyfans-park-exposure-st-pete",
      date: "August 30, 2026",
      year: "2026",
      month: "August",
      day: "30",
      city: "St. Petersburg",
      score: 74,
      rubric: { absurdity: 18, humor: 19, floridaFactor: 13, unexpectedness: 11, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Exposes Himself at Park, Says He Was Filming OnlyFans Content",
      description:
        "A St. Petersburg man exposes himself to a park visitor and later tells deputies he was filming content for his OnlyFans page.",
      fullStory:
        "Nathan Aleman, 40, exposed himself at a pavilion in Sawgrass Lake Park in St. Petersburg around 5 p.m. on August 30, 2026, while a park visitor was present. According to the arrest affidavit, Aleman admitted to deputies that he was creating adult content for OnlyFans when the visitor arrived and confronted him. He apologized and agreed to wait for law enforcement, and was booked into the Pinellas County Jail on a misdemeanor charge of exposure of sexual organs.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/st-pete-man-accused-onlyfans-sawgrass-lake-park",
      photo: { src: "/photos/onlyfans-park-exposure-st-pete.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "checkers-lettuce-meltdown-largo",
      date: "November 4, 2020",
      year: "2020",
      month: "November",
      day: "4",
      city: "Largo",
      score: 77,
      rubric: { absurdity: 19, humor: 21, floridaFactor: 12, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Loses It at Checkers Drive-Thru Because There's No Lettuce",
      description:
        "A Largo man pounds on a Checkers drive-thru window and screams at employees after learning the restaurant is out of lettuce for his sandwich.",
      fullStory:
        "Henry Arce-Cabellero, 49, pulled up to a Checkers drive-thru on Ulmerton Road in Largo around 11:30 p.m. on November 4, 2020, and became enraged after learning the restaurant had no lettuce for his order. He struck the drive-thru window and yelled at employees, who told police they feared for their safety and that of other customers inside. When Largo police arrived, Arce-Cabellero refused to hand over his driver's license and briefly resisted before he was handcuffed. He was charged with disorderly conduct and resisting an officer without violence.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/food-drink/florida-man-drive-thru-lettuce",
      photo: { src: "/photos/checkers-lettuce-meltdown-largo.jpg", credit: "Fox News" },
    },
    {
      id: "naked-pool-bite-deputy-marathon",
      date: "September 2, 2026",
      year: "2026",
      month: "September",
      day: "2",
      city: "Marathon",
      score: 78,
      rubric: { absurdity: 20, humor: 19, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title:
        "Naked Florida Man Found Trespassing in a Stranger's Pool Bites a Deputy on the Way to the Hospital",
      description:
        "A Marathon man is tased after being found naked and trespassing in a stranger's pool, then bites a deputy while being taken to the hospital.",
      fullStory:
        "Monroe County deputies responded to reports of a naked man in the Florida Keys city of Marathon on September 2, 2026, and found 24-year-old Rochan Rock Jean trespassing in a private swimming pool. Jean became combative and had to be tased before deputies could take him into custody, and while being transported to Fishermen's Hospital, he bit a deputy on the arm. It was Jean's second run-in with deputies that day, after he was reported acting strangely, while clothed, at a nearby business earlier. He was charged with battery on a law enforcement officer and criminal mischief.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/naked-florida-man-bites-deputy-september-2026/",
      photo: { src: "/photos/naked-pool-bite-deputy-marathon.jpg", credit: "Monroe County Sheriff's Office" },
    },
    {
      id: "lieutenant-dan-hurricane-boat-arrest",
      date: "October 18, 2024",
      year: "2024",
      month: "October",
      day: "18",
      city: "Tampa",
      score: 88,
      rubric: { absurdity: 20, humor: 21, floridaFactor: 20, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title:
        "Viral 'Lieutenant Dan,' Who Rode Out Two Hurricanes on His Boat, Gets Arrested for Trespassing",
      description:
        "Joseph Malinowsky, the Tampa boater known online as Lieutenant Dan for refusing to evacuate during hurricanes, is arrested for trespassing.",
      fullStory:
        "Joseph Malinowsky, 54, became a viral folk hero after posting TikTok videos of himself riding out Hurricanes Helene and Milton aboard his boat instead of evacuating, earning the nickname Lieutenant Dan after the Forrest Gump character who does the same. The Hillsborough County Sheriff's Office arrested Malinowsky in Tampa on October 18, 2024, on a trespassing charge, along with a warrant for failing to appear in court on earlier charges of driving an unregistered vehicle without a valid license. He remained in jail as of the following day, with no attorney listed in court records.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/man-who-vowed-ride-out-florida-hurricanes-his-boat-is-arrested-tampa",
      photo: { src: "/photos/lieutenant-dan-hurricane-boat-arrest.jpg", credit: "WWSB" },
    },
    {
      id: "walmart-trash-can-shoe-theft-ocala",
      date: "July 23, 2024",
      year: "2024",
      month: "July",
      day: "23",
      city: "Ocala",
      score: 81,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 14, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title:
        "Florida Man Hides Stolen Shoes Inside the Trash Can He's Buying, Switches the Tag for a 74-Cent Bobber",
      description:
        "An Ocala man allegedly conceals stolen Walmart merchandise inside a trash can he is purchasing and swaps a shoe's price tag for a 74-cent fishing bobber.",
      fullStory:
        "Marion County deputies say 38-year-old Eric Slaughter bought one trash can at a Walmart on Bahia Avenue in Ocala on July 23, 2024, but walked out with a second trash can that held a stolen $30 solar light and a pair of shoes with its price tag switched to a 74-cent fishing bobber. Surveillance video confirmed Slaughter's involvement, and when deputies asked him about the barcode swap, he admitted, 'That was stupid of me,' though he claimed he did not know the solar light was hidden inside the can. He was charged with felony larceny-retail theft; he has prior theft convictions dating back to 2006.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-did-not-know-why-he-stole-from-walmart-deputies-say-that-was-stupid-me.amp",
      photo: { src: "/photos/walmart-trash-can-shoe-theft-ocala.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "naked-tiktok-freezing-walk-lakeland",
      date: "November 11, 2025",
      year: "2025",
      month: "November",
      day: "11",
      city: "Lakeland",
      score: 84,
      rubric: { absurdity: 21, humor: 22, floridaFactor: 15, unexpectedness: 12, headlineQuality: 9, sourceQuality: 5 },
      title:
        "Florida Man Walks Down Road Naked in 36-Degree Weather, Blames a TikTok Challenge He Had No Phone For",
      description:
        "A Lakeland man walking naked along a road in freezing weather tells deputies it was a TikTok challenge, despite not carrying a phone.",
      fullStory:
        "A driver spotted 41-year-old Anthony Day walking completely naked along Broken Arrow Trail in Lakeland just before 6 a.m. on November 11, 2025, with the temperature at 36 degrees. Day initially refused to identify himself, claiming he was 'protecting his privacy,' then gave deputies a false name and address before admitting the walk was supposedly a 'TikTok prank gone wrong.' Polk County Sheriff Grady Judd was skeptical, noting Day had no cell phone on him: 'You're really naked when you don't have your cell phone.' Day was charged with resisting an officer without violence, disorderly conduct, and exposure of sexual organs, and released on a $2,250 bond.",
      source: "ClickOrlando (WKMG)",
      sourceUrl:
        "https://www.clickorlando.com/news/local/2025/11/21/tiktok-prank-gone-wrong-florida-man-takes-chilly-nighttime-stroll-buck-naked-sheriff-says/",
      photo: { src: "/photos/naked-tiktok-freezing-walk-lakeland.jpg", credit: "ClickOrlando" },
    },
    {
      id: "dunkin-donuts-fake-badge-discount",
      date: "November 6, 2013",
      year: "2013",
      month: "November",
      day: "6",
      city: "Trinity",
      score: 75,
      rubric: { absurdity: 19, humor: 20, floridaFactor: 13, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title:
        "Florida Man Flashes Fake Badge and Gun at Dunkin' Donuts to Get a Discount, Comes Back the Next Day",
      description:
        "A Trinity man allegedly displays a fake police badge and a firearm at a Dunkin' Donuts to score a discount, then returns to the same shop the next day.",
      fullStory:
        "Pasco County deputies say Charles Barry visited a Dunkin' Donuts in Trinity on November 6, 2013, and flashed a fake police badge along with a firearm to get a discount on his order. An employee grew suspicious and reported him, but Barry returned to the same shop the next day, where staff wrote down his license plate before calling deputies. Sheriff Chris Nocco said Barry claimed he got the badge from his father, a police officer in New Jersey; the badge was confiscated and Barry was arrested on charges of impersonating a law enforcement officer and improper exhibition of a firearm.",
      source: "Fox News",
      sourceUrl:
        "https://www.foxnews.com/us/man-accused-of-impersonating-cop-to-get-dunkin-donuts-discounts",
      photo: { src: "/photos/dunkin-donuts-fake-badge-discount.jpg", credit: "Pasco County Sheriff's Office" },
    },
    {
      id: "onions-potatoes-produce-heist",
      date: "March 10, 2026",
      year: "2026",
      month: "March",
      day: "10",
      city: "Spring Hill",
      score: 72,
      rubric: { absurdity: 17, humor: 20, floridaFactor: 10, unexpectedness: 11, headlineQuality: 9, sourceQuality: 5 },
      title:
        "Florida Man Charged With Stealing More Than $600,000 in Onions and Potatoes",
      description:
        "A Spring Hill man impersonates wholesale produce companies to redirect truckloads of onions and potatoes and vanishes without paying.",
      fullStory:
        "Jason Canals, 39, of Spring Hill, was indicted on eight counts of interstate transport of stolen property after federal prosecutors said he ran a produce-diversion scheme against wholesale companies. Prosecutors say Canals used a legitimate company's name and email signature to order shipments of onions and potatoes, then redirected the trucks to other locations while the produce was still in transit and never paid for it. In other cases, he allegedly sent victims fake documentation claiming the shipments had already been prepaid. The scheme is accused of costing wholesalers more than $600,000 in stolen produce and wasted transportation costs, and Canals faces up to 10 years in federal prison if convicted.",
      source: "U.S. Department of Justice",
      sourceUrl:
        "https://www.justice.gov/usao-mdfl/pr/florida-man-arrested-stealing-more-half-million-dollars-onions-and-potatoes",
    },
    {
      id: "alligator-wendys-drive-thru",
      date: "October 11, 2015",
      year: "2015",
      month: "October",
      day: "11",
      city: "Loxahatchee",
      score: 91,
      rubric: { absurdity: 23, humor: 22, floridaFactor: 19, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title:
        "Florida Man Throws Live Alligator Through a Wendy's Drive-Thru Window",
      description:
        "A Jupiter man picks up a live alligator off the road, orders a soft drink at a Wendy's drive-thru, and hurls the animal through the window.",
      fullStory:
        "Joshua Douglas James, 23, of Jupiter, picked up a live American alligator he found on the side of the road in Loxahatchee on October 11, 2015, placed it in his truck, then drove to a nearby Wendy's, ordered a large soft drink at the drive-thru, and threw the alligator through the window into the kitchen. Investigators identified James months later using a bank card he had used at a nearby gas station and surveillance footage timestamps, and he was arrested in February 2016. He was charged with aggravated assault with a deadly weapon without intent to kill and unlawful possession and transportation of an alligator. Florida Fish and Wildlife officers seized the gator, which was unharmed, and released it into a nearby canal, while a judge set James's bond at $6,000 and ordered him to stay out of every Wendy's in the state.",
      source: "ABC News",
      sourceUrl:
        "https://abcnews.com/US/florida-man-arrested-allegedly-tossing-alligator-wendys-drive/story?id=36815270",
      photo: { src: "/photos/alligator-wendys-drive-thru.jpg", credit: "NBC News" },
    },
    {
      id: "box-head-phone-store-robbery",
      date: "June 3, 2023",
      year: "2023",
      month: "June",
      day: "3",
      city: "Miami Gardens",
      score: 74,
      rubric: { absurdity: 19, humor: 19, floridaFactor: 12, unexpectedness: 11, headlineQuality: 8, sourceQuality: 5 },
      title:
        "Florida Man Robs Phone Repair Shop With a Cardboard Box on His Head, Gets Identified Anyway",
      description:
        "A man wearing a cardboard box over his head smashes display cases at a Miami Gardens phone repair shop and is identified from the surveillance video anyway.",
      fullStory:
        "Claude Vincent Griffin, 33, broke into Irepair Tech in Miami Gardens around 4 a.m. on June 3, 2023, wearing a cardboard box over his head as a disguise, shattered the store's glass display cases, and made off with 19 iPhones and about $8,000 in cash. Store owner Jeremias Berganza reviewed the surveillance footage, recognized Griffin's face through gaps in the box, and tracked him down at a nearby liquor store before calling police. Griffin was arrested and charged with grand theft, burglary, criminal mischief, cocaine possession, and resisting an officer without violence.",
      source: "NBC 6 South Florida",
      sourceUrl:
        "https://www.nbcmiami.com/news/local/man-arrested-after-video-shows-him-robbing-miami-gardens-phone-repair-store-with-box-on-his-head/3046964/",
      photo: { src: "/photos/box-head-phone-store-robbery.jpg", credit: "NBC 6 South Florida" },
    },
    {
      id: "dixie-county-lawnmower-meth",
      date: "August 19, 2026",
      year: "2026",
      month: "August",
      day: "19",
      city: "Old Town",
      score: 78,
      rubric: { absurdity: 19, humor: 18, floridaFactor: 18, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Pulled Over on Riding Lawnmower Found With Meth and a Hypodermic Needle",
      description:
        "A Dixie County man driving a red riding lawnmower down a county road is pulled over and found with methamphetamine, pills, and a hypodermic needle.",
      fullStory:
        "A Dixie County Sheriff's Office deputy spotted Roy Lee McDaniel driving a red riding lawnmower on NE 799th Street near Old Town on August 19, 2026, and pulled him over since the mower does not meet roadway safety standards. The deputy smelled marijuana, and McDaniel admitted he had smoked earlier before a search of a gray bag on the mower turned up crystal methamphetamine, Clonazepam pills without a prescription, and a hypodermic needle. He was arrested and charged with possession of methamphetamine, possession of a controlled substance without a prescription, and possession of drug paraphernalia.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-pulled-over-lawn-mower-busted-meth-weed",
    },
    {
      id: "lake-city-naked-meat-market-robbery",
      date: "December 23, 2025",
      year: "2025",
      month: "December",
      day: "23",
      city: "Lake City",
      score: 79,
      rubric: { absurdity: 21, humor: 19, floridaFactor: 15, unexpectedness: 12, headlineQuality: 8, sourceQuality: 4 },
      title: "Naked Florida Man Robs Meat Market, Leaves a Trail of His Own Clothes for Police to Follow",
      description:
        "A Lake City man robs a meat market wearing nothing but a face covering and is tracked down after leaving a trail of clothing along his escape route.",
      fullStory:
        "Lake City police say 25-year-old Kobe Watkins robbed BJ's Meat Market on Main Boulevard on the night of December 23, 2025, wearing no clothing except a covering over his face. Surveillance footage and a trail of clothing he shed along his escape route helped officers set up a perimeter and quickly locate him nearby. He was taken to a hospital for evaluation before being booked into the Columbia County jail on charges of robbery with a weapon, exposure of sexual organs, grand theft, and criminal mischief.",
      source: "FOX 13 Tampa Bay",
      sourceUrl:
        "https://www.fox13news.com/news/naked-florida-man-accused-robbing-meat-market-left-trail-clothing-leading-his-location",
      photo: { src: "/photos/lake-city-naked-meat-market-robbery.jpg", credit: "FOX 13 Tampa Bay" },
    },
    {
      id: "new-smyrna-golf-course-donut-joyride",
      date: "October 20, 2025",
      year: "2025",
      month: "October",
      day: "20",
      city: "New Smyrna Beach",
      score: 71,
      rubric: { absurdity: 17, humor: 18, floridaFactor: 14, unexpectedness: 10, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Golf Course Suffers Over $150,000 in Damage After Someone Does Donuts on the Green",
      description:
        "An unidentified driver tears up 7,000 square feet of turf doing donuts on a New Smyrna Beach golf course's putting green overnight, causing more than $150,000 in damage.",
      fullStory:
        "Someone drove a pickup truck onto the second hole putting green at The Club at Venetian Bay in New Smyrna Beach around 3:30 a.m. on October 20, 2025, and spun circular tire skids across the turf. An employee estimated the stunt tore up roughly 7,000 square feet of grass, and the club said repairs would cost more than $150,000 on top of lost revenue while the hole is out of play. A witness saw a truck leaving the area from a distance but could not provide a description, and New Smyrna Beach police are asking the public for tips.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-golf-course-hit-100k-damages-over-donut-joyride-police-say",
      photo: { src: "/photos/new-smyrna-golf-course-donut-joyride.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "fort-myers-tanning-bed-gym-arson",
      date: "July 22, 2025",
      year: "2025",
      month: "July",
      day: "22",
      city: "Fort Myers",
      score: 83,
      rubric: { absurdity: 22, humor: 20, floridaFactor: 15, unexpectedness: 13, headlineQuality: 9, sourceQuality: 4 },
      title: "Naked Florida Man Crawls Through Gym Ceiling and Hides in a Tanning Bed After Failed Arson Attempt",
      description:
        "A Fort Myers man strips naked at a Planet Fitness after being told to leave at closing, tries and fails to start a bathroom fire, then hides from deputies inside a tanning bed.",
      fullStory:
        "Staff at a Planet Fitness on South Tamiami Trail in Fort Myers asked 25-year-old Henrry Antunez-Avarado to leave at closing time on July 22, 2025, and he responded by stripping off his clothes and sprinting naked through the gym. Surveillance video showed him crawling into the ceiling and knocking down tiles, lying unclothed on a hydromassage bed, and attempting to start a fire in a bathroom before deputies found him hiding inside a tanning bed. The fire never caught, but he was arrested and charged with indecent exposure, arson, criminal mischief, and providing false information to law enforcement.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/naked-florida-man-hides-tanning-bed-after-trying-set-gym-fire-closing-time-lcso",
      photo: { src: "/photos/fort-myers-tanning-bed-gym-arson.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "palm-coast-ups-truck-shoplifter",
      date: "July 3, 2025",
      year: "2025",
      month: "July",
      day: "3",
      city: "Palm Coast",
      score: 79,
      rubric: { absurdity: 20, humor: 20, floridaFactor: 14, unexpectedness: 13, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Rides on the Back of a Moving UPS Truck to Escape Deputies After Lowe's Shoplifting Attempt",
      description:
        "A Palm Coast man ditches roughly $1,500 in stolen Lowe's merchandise and tries to escape deputies by hitching a ride on the back of a moving UPS truck.",
      fullStory:
        "Flagler County deputies say 31-year-old Michael Daversa attempted to steal about $1,500 worth of merchandise from a Lowe's in Palm Coast on July 3, 2025, and abandoned the items and fled when deputies were called. A citizen later spotted a man riding on the back of a moving UPS truck along Palm Coast Parkway, and the UPS driver pulled over and ordered him off; detectives matched him to the shoplifting suspect through surveillance footage. Daversa was arrested on a grand theft shoplifting charge and held on $15,000 bond, with Sheriff Rick Staly saying he 'earned himself free same-day delivery' to the county jail.",
      source: "FOX 35 Orlando",
      sourceUrl:
        "https://www.fox35orlando.com/news/florida-man-rides-back-ups-truck-avoid-deputies-after-trying-shoplift-from-lowes-officials",
      photo: { src: "/photos/palm-coast-ups-truck-shoplifter.jpg", credit: "FOX 35 Orlando" },
    },
    {
      id: "auburndale-deodorant-crash",
      date: "September 16, 2026",
      year: "2026",
      month: "September",
      day: "16",
      city: "Auburndale",
      score: 75,
      rubric: { absurdity: 18, humor: 20, floridaFactor: 12, unexpectedness: 12, headlineQuality: 9, sourceQuality: 4 },
      title: "Florida Driver Applying Stick Deodorant Crashes Into Highway Barrier Wall",
      description:
        "A 22-year-old driver in Auburndale crashes into a crash-attenuator device and lands atop a concrete barrier wall while applying deodorant behind the wheel.",
      fullStory:
        "A 22-year-old driver was heading west on State Road 570 near Auburndale around 7 a.m. on September 16, 2026, when he became distracted while applying stick deodorant, struck a highway crash-attenuator device, and ended up on top of the concrete barrier wall in the road's center. No one was injured in the crash, and the Florida Highway Patrol had to clarify to curious onlookers that the deodorant found at the scene was a stick, not a spray can. Troopers said it remained unclear whether the driver would be cited.",
      source: "CBS News Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/florida-man-applying-deodorant-crashes-truck-on-highway-fhp-says/",
      photo: { src: "/photos/auburndale-deodorant-crash.jpg", credit: "CBS News Miami" },
    },
    {
      id: "st-johns-911-brag-about-fleeing",
      date: "May 4, 2019",
      year: "2019",
      month: "May",
      day: "4",
      city: "St. Johns County",
      score: 79,
      rubric: { absurdity: 18, humor: 22, floridaFactor: 14, unexpectedness: 12, headlineQuality: 8, sourceQuality: 5 },
      title: "Florida Man Calls 911 to Brag About Fleeing a Traffic Stop, Gets Arrested the Next Day",
      description:
        "A St. Johns County teenager evades a deputy's traffic stop by doing a donut around his car, then calls 911 about an hour later to brag about the getaway.",
      fullStory:
        "Nicholas Jones, 19, sped off after a St. Johns County deputy tried to pull him over on May 4, 2019, then called 911 roughly an hour later and told dispatchers, 'I like ran from a cop like 30 minutes to an hour ago. Like what do we pay you guys for.' Jones described spinning a donut around the deputy's car as he fled and bragged that no cop could catch him in his Hyundai Elantra. Deputies traced the call and arrested him the next day at a Ross clothing store, charging him with fleeing, drug possession, and a probation violation from a prior car theft case.",
      source: "CBS Miami",
      sourceUrl:
        "https://www.cbsnews.com/miami/news/deputies-man-calls-911-brag-after-fleeing-traffic-stop/",
    },
    {
      id: "port-charlotte-skinny-dipping-trespass",
      date: "July 20, 2021",
      year: "2021",
      month: "July",
      day: "20",
      city: "Port Charlotte",
      score: 68,
      rubric: { absurdity: 15, humor: 17, floridaFactor: 15, unexpectedness: 10, headlineQuality: 7, sourceQuality: 4 },
      title: "Florida Woman Refuses to Leave Stranger's Pool After Skinny-Dipping Uninvited",
      description:
        "A Port Charlotte woman strips down and goes swimming in a homeowner's pool without permission, then refuses to get out when deputies arrive.",
      fullStory:
        "Heather Kennedy, 42, was found floating nude in a homeowner's backyard pool in Port Charlotte on July 20, 2021, after neighbors reported her wandering the property and trying to get into a screened pool enclosure. The homeowner, Jim Clark, said Kennedy was 'basically just lying down, head on the bricks on the side of the pool, just totally incoherent,' and she refused to identify herself or leave the water when deputies showed up. She was arrested on charges of trespassing in a structure or conveyance and resisting an officer without violence.",
      source: "FOX13 Memphis",
      sourceUrl:
        "https://www.fox13memphis.com/news/trending/deputies-florida-woman-arrested-after-skinny-dipping-in-man-s-pool/article_508a7329-1e37-59c0-90f8-8c04f39b205d.html",
    },
    {
      id: "naples-port-a-potty-fentanyl",
      date: "March 20, 2022",
      year: "2022",
      month: "March",
      day: "20",
      city: "Naples",
      score: 71,
      rubric: { absurdity: 17, humor: 18, floridaFactor: 13, unexpectedness: 11, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Trapped Inside a Port-a-Potty Found With Fentanyl When Deputies Free Him",
      description:
        "A Naples man gets his foot stuck closing a port-a-potty door and is heard screaming for help, and the deputies who free him find fentanyl and a syringe inside.",
      fullStory:
        "James Gousse, 34, was stuck inside a portable toilet on Seagrape Avenue in Naples on the evening of March 20, 2022, after his foot became lodged in the door, and nearby residents called deputies when they heard him shouting for help. Once Collier County deputies pried the door open and got Gousse out, they found a baggie of powder that tested positive for fentanyl, along with a syringe and several smaller bags inside the toilet. He was arrested on two drug possession charges.",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/florida/florida-man-found-with-drugs-after-getting-trapped-in-port-a-potty/",
    },
    {
      id: "port-charlotte-pumpkin-evidence-fraud",
      date: "October 31, 2023",
      year: "2023",
      month: "October",
      day: "31",
      city: "Port Charlotte",
      score: 68,
      rubric: { absurdity: 16, humor: 18, floridaFactor: 12, unexpectedness: 10, headlineQuality: 8, sourceQuality: 4 },
      title: "Florida Man Steals Coworker's Credit Card, Buys a Pumpkin and Beer, Gets Arrested on Halloween",
      description:
        "A Port Charlotte man uses a coworker's stolen credit card to buy beer and a pumpkin at Publix, and deputies seize the carved pumpkin as evidence.",
      fullStory:
        "Edward Atwood, 39, was identified from surveillance footage wearing a Chili's hat after a coworker's wallet went missing from the restaurant where they both worked, and deputies say he used her credit card to buy beer and a pumpkin at a nearby Publix. Charlotte County deputies arrested Atwood on Halloween, October 31, 2023, on a charge of unauthorized use of a credit card, and collected the carved pumpkin from his home as evidence. Sheriff Bill Prummell said, 'All jokes aside, it is sad that an individual would do this to anyone, but especially someone with whom they work.'",
      source: "WFLA",
      sourceUrl:
        "https://www.wfla.com/news/florida/florida-man-arrested-on-halloween-for-credit-card-fraud-pumpkin-seized-as-evidence-deputies-say/",
    },
    {
      id: "port-st-lucie-off-grid-fdle-letter",
      date: "November 13, 2024",
      year: "2024",
      month: "November",
      day: "13",
      city: "Port St. Lucie",
      score: 79,
      rubric: { absurdity: 20, humor: 20, floridaFactor: 12, unexpectedness: 13, headlineQuality: 9, sourceQuality: 5 },
      title: "Florida Man Forges Letter Claiming to Be an 'Off-Grid' Undercover Agent to Dodge an Apartment Background Check",
      description:
        "A Port St. Lucie man submits a typo-riddled forged letter claiming he is a secret FDLE agent who cannot be background-checked, all to lease an apartment.",
      fullStory:
        "William Dennis Milstead, 64, gave a real estate agency a falsified letter claiming he had worked undercover for the Florida Department of Law Enforcement since 2006 as part of a fictional 'Off Grid Command Unit' that exempted him from a routine rental background check, according to FDLE. Investigators said the letter was riddled with grammar and spelling errors, and Milstead already had 13 prior felony arrests, including two earlier convictions for impersonating a police officer in 2002 and 2016. He was arrested on November 13, 2024, on charges of falsely impersonating a police officer, making a false statement to obtain property, and using a two-way communication device to commit a felony, then released after posting an $11,000 bond.",
      source: "Florida Department of Law Enforcement",
      sourceUrl:
        "https://www.fdle.state.fl.us/news/2024/november/fdle-arrests-st-lucie-man-for-impersonating-a-law-enforcement-officer",
    },
  ];

// O(1) id -> array-index lookup, built once at module load instead of every
// story page/metadata/OG-image request doing its own O(n) linear scan over
// the whole archive to find one story by id.
export const storyIndexById: ReadonlyMap<string, number> = new Map(
  stories.map((story, index) => [story.id, index])
);

// Dev-time data integrity check — catches two easy mistakes when adding or
// editing stories by hand: a copy-pasted id, and a `score` that drifts from
// the literal sum of `rubric` (the type above documents that invariant, but
// nothing enforced it until now). Runs once per module load, dev only, so
// it never touches production performance.
if (process.env.NODE_ENV !== "production") {
  const seenIds = new Set<string>();

  for (const story of stories) {
    if (seenIds.has(story.id)) {
      console.warn(`[stories] duplicate story id: "${story.id}"`);
    }
    seenIds.add(story.id);

    const rubricSum =
      story.rubric.absurdity +
      story.rubric.humor +
      story.rubric.floridaFactor +
      story.rubric.unexpectedness +
      story.rubric.headlineQuality +
      story.rubric.sourceQuality;

    if (rubricSum !== story.score) {
      console.warn(
        `[stories] "${story.id}" score (${story.score}) does not match rubric sum (${rubricSum})`
      );
    }
  }
}

