"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import UsernameGenerator from "@/components/UsernameGenerator";
import { AlertCircle } from "lucide-react";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    level: "",
    reason: "",
    characterClass: "",
    player: "",
  });
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: characters = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/get-deaths", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      const res = await fetch("/api/add-death", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add character.");
      }

      setForm({
        name: "",
        level: "",
        reason: "",
        characterClass: "",
        player: "",
      });

      mutate();
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-primaryText flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-primaryText">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-accent/10 to-background pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-2 text-accent">
            Mayo Death Counter
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Track your team's memorable defeats
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Section */}
          <div className="space-y-6">
            <div className="bg-inputBg rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-accent">
                Register New Death
              </h2>

              {submitError && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <p>{submitError}</p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                autoComplete="off"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Character Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-lg bg-background border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                    maxLength={50}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Level
                    </label>
                    <input
                      type="number"
                      value={form.level}
                      onChange={(e) =>
                        setForm({ ...form, level: e.target.value })
                      }
                      className="w-full p-3 rounded-lg bg-background border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                      min="1"
                      max="60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Class
                    </label>
                    <input
                      type="text"
                      value={form.characterClass}
                      onChange={(e) =>
                        setForm({ ...form, characterClass: e.target.value })
                      }
                      className="w-full p-3 rounded-lg bg-background border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                      maxLength={50}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Player Name
                  </label>
                  <input
                    type="text"
                    value={form.player}
                    onChange={(e) =>
                      setForm({ ...form, player: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-background border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                    maxLength={50}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Cause of Death
                  </label>
                  <input
                    type="text"
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-background border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                    maxLength={200}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3 rounded-lg bg-accent hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background font-medium"
                >
                  Register Death
                </button>
              </form>
            </div>

            <div className="bg-inputBg rounded-lg shadow-lg overflow-hidden">
              <UsernameGenerator />
            </div>
          </div>

          {/* Right Column - Deaths List */}
          <div className="space-y-6">
            <div className="bg-inputBg rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-accent">Death Log</h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <p>Failed to load deaths: {error.message}</p>
                </div>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent"></div>
                </div>
              ) : characters.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">No deaths recorded yet.</p>
                  <p className="text-sm">Be the first to die!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {characters.map(
                    ([name, level, reason, characterClass, player], index) => (
                      <div
                        key={`${name}-${level}-${index}`}
                        className="bg-background rounded-lg p-4 hover:bg-gray-900 transition-colors border border-gray-800"
                      >
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-accent">
                              {name}
                            </span>
                            <span className="text-sm text-gray-400">
                              Lvl {level} {characterClass}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">
                            Player: {player}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{reason}</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
