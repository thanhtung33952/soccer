import { useState } from "react";

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Team colors for visual distinction
const teamColors = [
  { bg: "bg-red-50", border: "border-red-400", header: "bg-red-500", badge: "bg-red-100 text-red-700", icon: "⚽" },
  { bg: "bg-blue-50", border: "border-blue-400", header: "bg-blue-500", badge: "bg-blue-100 text-blue-700", icon: "⚽" },
  { bg: "bg-green-50", border: "border-green-400", header: "bg-green-500", badge: "bg-green-100 text-green-700", icon: "⚽" },
  { bg: "bg-yellow-50", border: "border-yellow-400", header: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-700", icon: "⚽" },
  { bg: "bg-purple-50", border: "border-purple-400", header: "bg-purple-500", badge: "bg-purple-100 text-purple-700", icon: "⚽" },
  { bg: "bg-pink-50", border: "border-pink-400", header: "bg-pink-500", badge: "bg-pink-100 text-pink-700", icon: "⚽" },
  { bg: "bg-indigo-50", border: "border-indigo-400", header: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700", icon: "⚽" },
  { bg: "bg-teal-50", border: "border-teal-400", header: "bg-teal-500", badge: "bg-teal-100 text-teal-700", icon: "⚽" },
  { bg: "bg-orange-50", border: "border-orange-400", header: "bg-orange-500", badge: "bg-orange-100 text-orange-700", icon: "⚽" },
  { bg: "bg-cyan-50", border: "border-cyan-400", header: "bg-cyan-500", badge: "bg-cyan-100 text-cyan-700", icon: "⚽" },
];

export function App() {
  const [numTeams, setNumTeams] = useState("");
  const [playerNames, setPlayerNames] = useState("");
  const [teams, setTeams] = useState<string[][]>([]);
  const [error, setError] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const teamCount = parseInt(numTeams);
    if (isNaN(teamCount) || teamCount < 2) {
      setError("Please enter at least 2 teams.");
      return;
    }
    if (teamCount > 10) {
      setError("Maximum 10 teams allowed.");
      return;
    }

    const players = playerNames
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (players.length < teamCount) {
      setError(`You need at least ${teamCount} players for ${teamCount} teams.`);
      return;
    }

    const shuffled = shuffleArray(players);
    const dividedTeams: string[][] = Array.from({ length: teamCount }, () => []);

    shuffled.forEach((player, index) => {
      dividedTeams[index % teamCount].push(player);
    });

    setTeams(dividedTeams);
    setHasGenerated(true);
  };

  const handleReshuffle = () => {
    const players = playerNames
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const teamCount = parseInt(numTeams);
    const shuffled = shuffleArray(players);
    const dividedTeams: string[][] = Array.from({ length: teamCount }, () => []);

    shuffled.forEach((player, index) => {
      dividedTeams[index % teamCount].push(player);
    });

    setTeams(dividedTeams);
  };

  const handleReset = () => {
    setNumTeams("");
    setPlayerNames("");
    setTeams([]);
    setError("");
    setHasGenerated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-white"></div>
        <div className="absolute top-20 right-20 w-60 h-60 rounded-full border-4 border-white"></div>
        <div className="absolute bottom-10 left-1/3 w-32 h-32 rounded-full border-4 border-white"></div>
        {/* Field lines */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-white"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">⚽</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              Soccer Team Divider
            </h1>
            <span className="text-5xl">⚽</span>
          </div>
          <p className="text-green-200 text-lg max-w-xl mx-auto">
            Enter your players, choose the number of teams, and let us randomly divide them for a fair match!
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Setup Your Match
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Number of Teams */}
              <div>
                <label htmlFor="numTeams" className="block text-sm font-semibold text-gray-700 mb-2">
                  🏆 Number of Teams
                </label>
                <input
                  id="numTeams"
                  type="number"
                  min="2"
                  max="10"
                  value={numTeams}
                  onChange={(e) => setNumTeams(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg font-medium"
                />
              </div>

              {/* Player Names */}
              <div>
                <label htmlFor="playerNames" className="block text-sm font-semibold text-gray-700 mb-2">
                  👥 Player Names
                  <span className="text-gray-400 font-normal ml-1">(separated by commas)</span>
                </label>
                <textarea
                  id="playerNames"
                  value={playerNames}
                  onChange={(e) => setPlayerNames(e.target.value)}
                  placeholder="e.g. Messi, Ronaldo, Neymar, Mbappé, Salah, De Bruyne, Haaland, Lewandowski"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all resize-none text-lg"
                />
                {playerNames && (
                  <p className="text-sm text-gray-500 mt-1">
                    📋 {playerNames.split(",").map(n => n.trim()).filter(n => n.length > 0).length} player(s) entered
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-red-500 text-xl">⚠️</span>
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-green-200 hover:shadow-xl transition-all duration-200 text-lg cursor-pointer"
                >
                  🎲 Divide Teams!
                </button>
                {hasGenerated && (
                  <>
                    <button
                      type="button"
                      onClick={handleReshuffle}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-amber-200 hover:shadow-xl transition-all duration-200 cursor-pointer"
                      title="Reshuffle"
                    >
                      🔀
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer"
                      title="Reset"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Teams Display */}
        {teams.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
              <span className="h-px flex-1 max-w-20 bg-green-400/40"></span>
              🏟️ Team Lineup
              <span className="h-px flex-1 max-w-20 bg-green-400/40"></span>
            </h2>

            <div className={`grid gap-5 ${
              teams.length === 2 ? "grid-cols-1 md:grid-cols-2" :
              teams.length === 3 ? "grid-cols-1 md:grid-cols-3" :
              teams.length === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}>
              {teams.map((team, teamIndex) => {
                const color = teamColors[teamIndex % teamColors.length];
                return (
                  <div
                    key={teamIndex}
                    className={`${color.bg} ${color.border} border-2 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300`}
                  >
                    {/* Team Header */}
                    <div className={`${color.header} px-5 py-3.5 flex items-center justify-between`}>
                      <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        {color.icon} Team {teamIndex + 1}
                      </h3>
                      <span className="bg-white/25 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {team.length} player{team.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Player List */}
                    <ul className="p-4 space-y-2">
                      {team.map((player, playerIndex) => (
                        <li
                          key={playerIndex}
                          className="flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span className={`${color.badge} w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0`}>
                            {playerIndex + 1}
                          </span>
                          <span className="font-medium text-gray-800 truncate">{player}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-green-200">
                <span>👥 {teams.reduce((sum, t) => sum + t.length, 0)} players</span>
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                <span>🏆 {teams.length} teams</span>
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                <span>📊 ~{Math.ceil(teams.reduce((sum, t) => sum + t.length, 0) / teams.length)} per team</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
