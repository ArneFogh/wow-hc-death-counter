import React, { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

const UsernameGenerator = () => {
  const [generatedName, setGeneratedName] = useState("");
  const [copied, setCopied] = useState(false);

  // Arrays af navnedele
  const prefixes = ["Mayo"];

  const suffixes = [
    "Catnip",
    "Lover",
    "Enjoyer",
    "Heal",
    "Gobler",
    "TheKO",
    "Mage",
    "Fanatic",
    "Connoisseur",
    "Addict",
    "Whisperer",
    "Overlord",
    "Devourer",
    "Beast",
    "Destroyer",
    "Binger",
    "Doctor",
    "Wizard",
    "Baron",
    "Cultist",
    "Slayer",
    "Hero",
    "King",
    "Knight",
    "Goblin",
    "Thief",
    "Pirate",
    "Warrior",
    "Tank",
    "Shredder",
    "Smasher",
    "Hunter",
    "Seeker",
    "Reaper",
    "Viking",
    "Druid",
    "Alchemist",
    "Tamer",
    "Bandit",
    "Crusader",
    "Overload",
    "Sorcerer",
    "Jester",
    "Chef",
    "Flame",
    "Trigger",
    "Spree",
    "Vortex",
    "Bouncer",
    "Drifter",
    "Behemoth",
    "Muncher",
    "Prophet",
    "Visionary",
    "Dreamer",
    "Paladin",
    "Nomad",
    "Oracle",
    "Monk",
    "Frenzy",
    "Illusionist",
    "Void",
    "Glitch",
    "Rogue",
    "Titan",
    "Anomaly",
    "Frost",
    "Shadow",
    "Light",
    "Inferno",
    "Fury",
    "Specter",
    "Phantom",
    "Nightmare",
    "Chaos",
    "Blaster",
    "Drinker",
    "Crafter",
    "Eater",
    "Worshipper",
    "Craze",
    "Hoarder",
    "Keeper",
    "Maniac",
    "Obsessed",
    "Freak",
    "Simp",
    "Muncher",
    "Consumer",
    "Worshipper",
    "Drinker",
    "Maniac",
    "Obsessed",
    "Freak",
    "Simp",
    "Slurper",
    "Overeater",
    "Snacker",
    "Chomper",
    "Guzzler",
    "Hoarder",
    "Huffer",
    "GuacamoleEnjoyer",
    "DipLover",
    "SpreadFanatic",
    "Glutton",
    "Craver",
    "Oblivious",
    "SauceDrinker",
    "Believer",
    "Overindulger",
    "SaladDestroyer",
    "EggConsumer",
    "BurgerBiter",
    "BreadDunker",
    "ToppingAddict",
    "CheeseGoblin",
    "GreaseLicker",
    "JarKeeper",
    "Spooner",
    "Guzzler",
    "SpreadSniffer",
    "EggLover69",
    "OverlordOfSauce",
    "SaladSlayer",
    "ToastDrencher",
    "KnifeLicker",
    "DipOverdose",
    "GoblinOfCondiments",
    "SauceBoss",
    "KnifeWizard",
    "SpreadOverlord",
    "ToastSlapper",
    "DipDominator",
    "EggDestroyer",
    "CondimentKing",
    "GlazeGoblin",
    "SandwichWrecker",
  ];

  const generateName = () => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    setGeneratedName(`${prefix}${suffix}`);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (generatedName) {
      navigator.clipboard.writeText(generatedName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mb-8 p-6 bg-inputBg rounded-lg">
      <h2 className="text-2xl mb-4 text-center text-primaryText">
        Username Generator
      </h2>

      <div className="flex flex-col items-center space-y-4">
        {generatedName && (
          <div className="flex items-center space-x-2">
            <span className="text-xl text-accent">{generatedName}</span>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:text-accent transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckCheck className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        )}

        <button
          onClick={generateName}
          className="px-6 py-2 bg-accent hover:bg-orange-600 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          Generer nyt navn
        </button>
      </div>
    </div>
  );
};

export default UsernameGenerator;
