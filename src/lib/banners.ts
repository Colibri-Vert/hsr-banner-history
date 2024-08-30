export type Banner =
{
    featured: string[],
    rare: string[],
    version: string,
    phase: number
}

let banners: { characters: Banner[], lightCones: Banner[] } =
{
    characters:
    [
        {
            featured: ["seele"],
            rare: ["natasha", "hook", "pela"],
            version: "1.0",
            phase: 0
        },
        {
            featured: ["jing-yuan"],
            rare: ["sushang", "march-7th", "tingyun"],
            version: "1.0",
            phase: 1
        },
        {
            featured: ["silver-wolf"],
            rare: ["dan-heng", "asta", "serval"],
            version: "1.1",
            phase: 0
        },
        {
            featured: ["luocha"],
            rare: ["pela", "qingque", "yukong"],
            version: "1.1",
            phase: 1
        },
        {
            featured: ["blade"],
            rare: ["arlan", "sushang", "natasha"],
            version: "1.2",
            phase: 0
        },
        {
            featured: ["kafka"],
            rare: ["luka", "sampo", "serval"],
            version: "1.2",
            phase: 1
        },
        {
            featured: ["dan-heng-imbibitor-lunae"],
            rare: ["yukong", "asta", "march-7th"],
            version: "1.3",
            phase: 0
        },
        {
            featured: ["fu-xuan"],
            rare: ["lynx", "hook", "pela"],
            version: "1.3",
            phase: 1
        },
        {
            featured: ["jingliu"],
            rare: ["tingyun", "qingque", "sampo"],
            version: "1.4",
            phase: 0
        },
        {
            featured: ["topaz-and-numby"],
            rare: ["guinaifen", "luka", "sushang"],
            version: "1.4",
            phase: 1
        },
        {
            featured: ["seele"],
            rare: ["guinaifen", "luka", "sushang"],
            version: "1.4",
            phase: 1
        },
        {
            featured: ["huohuo"],
            rare: ["dan-heng", "arlan", "serval"],
            version: "1.5",
            phase: 0
        },
        {
            featured: ["argenti"],
            rare: ["hanya", "lynx", "asta"],
            version: "1.5",
            phase: 1
        },
        {
            featured: ["silver-wolf"],
            rare: ["hanya", "lynx", "asta"],
            version: "1.5",
            phase: 1
        },
        {
            featured: ["ruan-mei"],
            rare: ["xueyi", "march-7th", "tingyun"],
            version: "1.6",
            phase: 0
        },
        {
            featured: ["blade"],
            rare: ["xueyi", "march-7th", "tingyun"],
            version: "1.6",
            phase: 0
        },
        {
            featured: ["dr-ratio"],
            rare: ["sushang", "natasha", "hook"],
            version: "1.6",
            phase: 1
        },
        {
            featured: ["kafka"],
            rare: ["sushang", "natasha", "hook"],
            version: "1.6",
            phase: 1
        },
        {
            featured: ["black-swan"],
            rare: ["misha", "tingyun", "guinaifen"],
            version: "2.0",
            phase: 0
        },
        {
            featured: ["dan-heng-imbibitor-lunae"],
            rare: ["misha", "tingyun", "guinaifen"],
            version: "2.0",
            phase: 0
        },
        {
            featured: ["sparkle"],
            rare: ["sampo", "qingque", "hanya"],
            version: "2.0",
            phase: 1
        },
        {
            featured: ["jing-yuan"],
            rare: ["sampo", "qingque", "hanya"],
            version: "2.0",
            phase: 1
        },
        {
            featured: ["acheron"],
            rare: ["dan-heng", "pela", "gallagher"],
            version: "2.1",
            phase: 0
        },
        {
            featured: ["luocha"],
            rare: ["dan-heng", "pela", "gallagher"],
            version: "2.1",
            phase: 0
        },
        {
            featured: ["aventurine"],
            rare: ["serval", "luka", "lynx"],
            version: "2.1",
            phase: 1
        },
        {
            featured: ["jingliu"],
            rare: ["serval", "luka", "lynx"],
            version: "2.1",
            phase: 1
        },
        {
            featured: ["robin"],
            rare: ["march-7th", "hanya", "xueyi"],
            version: "2.2",
            phase: 0
        },
        {
            featured: ["topaz-and-numby"],
            rare: ["march-7th", "hanya", "xueyi"],
            version: "2.2",
            phase: 0
        },
        {
            featured: ["boothill"],
            rare: ["pela", "luka", "hook"],
            version: "2.2",
            phase: 1
        },
        {
            featured: ["fu-xuan"],
            rare: ["pela", "luka", "hook"],
            version: "2.2",
            phase: 1
        },
        {
            featured: ["firefly"],
            rare: ["xueyi", "gallagher", "misha"],
            version: "2.3",
            phase: 0
        },
        {
            featured: ["ruan-mei"],
            rare: ["xueyi", "gallagher", "misha"],
            version: "2.3",
            phase: 0
        },
        {
            featured: ["jade"],
            rare: ["asta", "serval", "natasha"],
            version: "2.3",
            phase: 1
        },
        {
            featured: ["argenti"],
            rare: ["asta", "serval", "natasha"],
            version: "2.3",
            phase: 1
        },
        {
            featured: ["yunli"],
            rare: ["lynx", "yukong", "hanya"],
            version: "2.4",
            phase: 0
        },
        {
            featured: ["huohuo"],
            rare: ["lynx", "yukong", "hanya"],
            version: "2.4",
            phase: 0
        },
        {
            featured: ["jiaoqiu"],
            rare: ["hook", "guinaifen", "arlan"],
            version: "2.4",
            phase: 1
        },
        {
            featured: ["sparkle"],
            rare: ["hook", "guinaifen", "arlan"],
            version: "2.4",
            phase: 1
        },
        {
            featured: ["feixiao"],
            rare: ["moze", "asta", "luka"],
            version: "2.5",
            phase: 0
        },
        {
            featured: ["robin", "black-swan", "kafka"],
            rare: ["moze", "asta", "luka"],
            version: "2.5",
            phase: 0
        },
        {
            featured: ["lingsha"],
            rare: ["misha", "natasha", "guinaifen"],
            version: "2.5",
            phase: 1
        },
        {
            featured: ["topaz-and-numby"],
            rare: ["misha", "natasha", "guinaifen"],
            version: "2.5",
            phase: 1
        }
    ],
    lightCones:
    [
        {
            featured: ["in-the-night"],
            rare: ["the-moles-welcome-you", "good-night-and-sleep-well", "post-op-conversation"],
            version: "1.0",
            phase: 0
        },
        {
            featured: ["before-dawn"],
            rare: ["planetary-rendezvous", "only-silence-remains", "day-one-of-my-new-life"],
            version: "1.0",
            phase: 1
        },
        {
            featured: ["incessant-rain"],
            rare: ["subscribe-for-more", "memories-of-the-past", "make-the-world-clamor"],
            version: "1.1",
            phase: 0
        },
        {
            featured: ["echoes-of-the-coffin"],
            rare: ["good-night-and-sleep-well", "geniuses-repose", "dance-dance-dance"],
            version: "1.1",
            phase: 1
        },
        {
            featured: ["the-unreachable-side"],
            rare: ["a-secret-vow", "shared-feeling", "swordplay"],
            version: "1.2",
            phase: 0
        },
        {
            featured: ["patience-is-all-you-need"],
            rare: ["resolution-shines-as-pearls-of-sweat", "eyes-of-the-prey", "the-birth-of-the-self"],
            version: "1.2",
            phase: 1
        },
        {
            featured: ["brighter-than-the-sun"],
            rare: ["dance-dance-dance", "planetary-rendezvous", "landaus-choice"],
            version: "1.3",
            phase: 0
        },
        {
            featured: ["she-already-shut-her-eyes"],
            rare: ["perfect-timing", "under-the-blue-sky", "trend-of-the-universal-market"],
            version: "1.3",
            phase: 1
        },
        {
            featured: ["i-shall-be-my-own-sword"],
            rare: ["memories-of-the-past", "make-the-world-clamor", "eyes-of-the-prey"],
            version: "1.4",
            phase: 0
        },
        {
            featured: ["worrisome-blissful"],
            rare: ["the-moles-welcome-you", "resolution-shines-as-pearls-of-sweat", "only-silence-remains"],
            version: "1.4",
            phase: 1
        },
        {
            featured: ["in-the-night"],
            rare: ["the-moles-welcome-you", "resolution-shines-as-pearls-of-sweat", "only-silence-remains"],
            version: "1.4",
            phase: 1
        },
        {
            featured: ["night-of-fright"],
            rare: ["shared-feeling", "subscribe-for-more", "trend-of-the-universal-market"],
            version: "1.5",
            phase: 0
        },
        {
            featured: ["an-instant-before-a-gaze"],
            rare: ["under-the-blue-sky", "post-op-conversation", "the-birth-of-the-self"],
            version: "1.5",
            phase: 1
        },
        {
            featured: ["incessant-rain"],
            rare: ["under-the-blue-sky", "post-op-conversation", "the-birth-of-the-self"],
            version: "1.5",
            phase: 1
        },
        {
            featured: ["past-self-in-mirror"],
            rare: ["planetary-rendezvous", "day-one-of-my-new-life", "a-secret-vow"],
            version: "1.6",
            phase: 0
        },
        {
            featured: ["the-unreachable-side"],
            rare: ["planetary-rendezvous", "day-one-of-my-new-life", "a-secret-vow"],
            version: "1.6",
            phase: 0
        },
        {
            featured: ["baptism-of-pure-thought"],
            rare: ["perfect-timing", "only-silence-remains", "landaus-choice"],
            version: "1.6",
            phase: 1
        },
        {
            featured: ["patience-is-all-you-need"],
            rare: ["perfect-timing", "only-silence-remains", "landaus-choice"],
            version: "1.6",
            phase: 1
        },
        {
            featured: ["reforged-remembrance"],
            rare: ["indelible-promise", "resolution-shines-as-pearls-of-sweat", "dance-dance-dance"],
            version: "2.0",
            phase: 0
        },
        {
            featured: ["brighter-than-the-sun"],
            rare: ["indelible-promise", "resolution-shines-as-pearls-of-sweat", "dance-dance-dance"],
            version: "2.0",
            phase: 0
        },
        {
            featured: ["earthly-escapade"],
            rare: ["planetary-rendezvous", "under-the-blue-sky", "geniuses-repose"],
            version: "2.0",
            phase: 1
        },
        {
            featured: ["before-dawn"],
            rare: ["planetary-rendezvous", "under-the-blue-sky", "geniuses-repose"],
            version: "2.0",
            phase: 1
        },
        {
            featured: ["along-the-passing-shore"],
            rare: ["good-night-and-sleep-well", "post-op-conversation", "subscribe-for-more"],
            version: "2.1",
            phase: 0
        },
        {
            featured: ["echoes-of-the-coffin"],
            rare: ["good-night-and-sleep-well", "post-op-conversation", "subscribe-for-more"],
            version: "2.1",
            phase: 0
        },
        {
            featured: ["inherently-unjust-destiny"],
            rare: ["concert-for-two", "shared-feeling", "make-the-world-clamor"],
            version: "2.1",
            phase: 1
        },
        {
            featured: ["i-shall-be-my-own-sword"],
            rare: ["concert-for-two", "shared-feeling", "make-the-world-clamor"],
            version: "2.1",
            phase: 1
        },
        {
            featured: ["flowing-nightglow"],
            rare: ["boundless-choreo", "swordplay", "perfect-timing"],
            version: "2.2",
            phase: 0
        },
        {
            featured: ["worrisome-blissful"],
            rare: ["boundless-choreo", "swordplay", "perfect-timing"],
            version: "2.2",
            phase: 0
        },
        {
            featured: ["sailing-towards-a-second-life"],
            rare: ["geniuses-repose", "a-secret-vow", "landaus-choice"],
            version: "2.2",
            phase: 1
        },
        {
            featured: ["she-already-shut-her-eyes"],
            rare: ["geniuses-repose", "a-secret-vow", "landaus-choice"],
            version: "2.2",
            phase: 1
        },
        {
            featured: ["whereabouts-should-dreams-rest"],
            rare: ["memories-of-the-past", "day-one-of-my-new-life", "eyes-of-the-prey"],
            version: "2.3",
            phase: 0
        },
        {
            featured: ["past-self-in-mirror"],
            rare: ["memories-of-the-past", "day-one-of-my-new-life", "eyes-of-the-prey"],
            version: "2.3",
            phase: 0
        },
        {
            featured: ["yet-hope-is-priceless"],
            rare: ["after-the-charmony-fall", "shared-feeling", "trend-of-the-universal-market"],
            version: "2.3",
            phase: 1
        },
        {
            featured: ["an-instant-before-a-gaze"],
            rare: ["after-the-charmony-fall", "shared-feeling", "trend-of-the-universal-market"],
            version: "2.3",
            phase: 1
        },
        {
            featured: ["dance-at-sunset"],
            rare: ["perfect-timing", "the-moles-welcome-you", "the-birth-of-the-self"],
            version: "2.4",
            phase: 0
        },
        {
            featured: ["night-of-fright"],
            rare: ["perfect-timing", "the-moles-welcome-you", "the-birth-of-the-self"],
            version: "2.4",
            phase: 0
        },
        {
            featured: ["those-many-springs"],
            rare: ["a-secret-vow", "eyes-of-the-prey", "poised-to-bloom"],
            version: "2.4",
            phase: 1
        },
        {
            featured: ["earthly-escapade"],
            rare: ["a-secret-vow", "eyes-of-the-prey", "poised-to-bloom"],
            version: "2.4",
            phase: 1
        },
        {
            featured: ["i-venture-forth-to-hunt"],
            rare: ["swordplay", "resolution-shines-as-pearls-of-sweat", "the-birth-of-the-self"],
            version: "2.5",
            phase: 0
        },
        {
            featured: ["flowing-nightglow", "reforged-remembrance", "patience-is-all-you-need"],
            rare: ["swordplay", "resolution-shines-as-pearls-of-sweat", "the-birth-of-the-self"],
            version: "2.5",
            phase: 0
        },
        {
            featured: ["scent-alone-stays-true"],
            rare: ["shadowed-by-night", "shared-feeling", "planetary-rendezvous"],
            version: "2.5",
            phase: 1
        },
        {
            featured: ["worrisome-blissful"],
            rare: ["shadowed-by-night", "shared-feeling", "planetary-rendezvous"],
            version: "2.5",
            phase: 1
        }
    ]
}
export default banners
