import { useState } from 'react'

type Topic = 'nature' | 'love' | 'work' | 'food'

const haikus: Record<Topic, [string, string, string][]> = {
  nature: [
    ['An old silent pond', 'A frog jumps into the pond', 'Splash! Silence again'],
    ['Over the wintry', 'forest, winds howl in rage', 'with no leaves to blow'],
    ['In the cicada cry', 'no sign can foretell how soon', 'it must fall silent'],
  ],
  love: [
    ['You fill my mornings', 'with warmth I cannot explain', 'stay a little more'],
    ['Your laugh in the rain', 'the whole world disappears then', 'only your bright eyes'],
    ['I wrote you a word', 'crumpled it, threw it away', 'you already knew'],
  ],
  work: [
    ['Staring at the screen', 'the cursor blinks and blinks on', 'coffee goes cold now'],
    ['Meeting at noon ends', 'nothing decided again', 'back to the inbox'],
    ['One more pull request', 'the tests are finally green', 'deploy on Friday'],
  ],
  food: [
    ['Ramen at midnight', 'steam rises, the city sleeps', 'first slurp, pure delight'],
    ['Ripe tomato, warm', 'straight from the vine into mouth', 'summer in one bite'],
    ['Bread from the oven', 'the whole house holds its breath now', 'golden, impossible'],
  ],
}

const topics: Topic[] = ['nature', 'love', 'work', 'food']

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function App() {
  const [topic, setTopic] = useState<Topic>('nature')
  const [haiku, setHaiku] = useState<[string, string, string] | null>(null)
  const [animKey, setAnimKey] = useState(0)

  function generate() {
    setHaiku(pickRandom(haikus[topic]))
    setAnimKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-3xl mb-2">🌸</div>
          <h1 className="text-2xl font-semibold text-stone-800 tracking-tight">
            Haiku Generator
          </h1>
          <p className="text-stone-400 text-sm mt-1">Five, seven, five</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wider" htmlFor="topic">
            Topic
          </label>
          <select
            id="topic"
            value={topic}
            onChange={e => setTopic(e.target.value as Topic)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-800 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent appearance-none cursor-pointer"
          >
            {topics.map(t => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={generate}
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-medium py-3 text-base shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
          >
            Generate
          </button>
        </div>

        {/* Haiku display */}
        {haiku && (
          <div
            key={animKey}
            className="mt-8 rounded-2xl bg-white border border-stone-100 shadow-sm px-6 py-8 text-center animate-fade-in"
          >
            <div className="flex flex-col gap-3">
              {haiku.map((line, i) => (
                <p
                  key={i}
                  className="text-stone-700 text-lg leading-relaxed italic"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <span className="text-xs text-stone-300 tracking-widest uppercase">
                — {topic}
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.35s ease both;
        }
      `}</style>
    </div>
  )
}
