"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import UsernameGenerator from "@/components/UsernameGenerator";
import { AlertCircle, Skull } from "lucide-react";

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
    <main className="min-h-screen bg-background text-primaryText bg-[url('/wow-bg.png')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen backdrop-blur-sm backdrop-brightness-50">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-accent/10 to-transparent pt-12 pb-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Skull className="w-8 h-8 text-accent" />
              <h1 className="text-5xl font-bold text-center text-accent">
                Mayo Death Counter
              </h1>
              <Skull className="w-8 h-8 text-accent" />
            </div>
            <p className="text-center text-gray-300 mb-8">
              Chronicle your epic falls in battle
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Section */}
            <div className="space-y-6">
              <div className="bg-inputBg/90 rounded-lg p-6 shadow-wow border border-border">
                <h2 className="text-2xl font-bold mb-6 text-accent">
                  Record Your Defeat
                </h2>

                {submitError && (
                  <div className="bg-error/20 border border-error text-error-light p-4 rounded-lg mb-6 flex items-center gap-2">
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
                    <label className="block text-sm font-medium text-accent">
                      Character Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full p-3 rounded-lg bg-background/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                      maxLength={50}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-accent">
                        Level
                      </label>
                      <input
                        type="number"
                        value={form.level}
                        onChange={(e) =>
                          setForm({ ...form, level: e.target.value })
                        }
                        className="w-full p-3 rounded-lg bg-background/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                        min="1"
                        max="60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-accent">
                        Class
                      </label>
                      <input
                        type="text"
                        value={form.characterClass}
                        onChange={(e) =>
                          setForm({ ...form, characterClass: e.target.value })
                        }
                        className="w-full p-3 rounded-lg bg-background/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                        maxLength={50}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-accent">
                      Player Name
                    </label>
                    <input
                      type="text"
                      value={form.player}
                      onChange={(e) =>
                        setForm({ ...form, player: e.target.value })
                      }
                      className="w-full p-3 rounded-lg bg-background/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                      maxLength={50}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-accent">
                      Cause of Death
                    </label>
                    <input
                      type="text"
                      value={form.reason}
                      onChange={(e) =>
                        setForm({ ...form, reason: e.target.value })
                      }
                      className="w-full p-3 rounded-lg bg-background/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                      maxLength={200}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3 rounded-lg bg-accent text-background hover:bg-accent-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background font-medium shadow-wow hover:shadow-wow-hover"
                  >
                    Record Death
                  </button>
                </form>
              </div>

              <div className="bg-inputBg/90 rounded-lg shadow-wow border border-border overflow-hidden">
                <UsernameGenerator />
              </div>
            </div>

            {/* Right Column - Deaths List */}
            <div className="space-y-6">
              <div className="bg-inputBg/90 rounded-lg p-6 shadow-wow border border-border">
                <h2 className="text-2xl font-bold mb-6 text-accent">
                  Chronicles of Death
                </h2>

                {error && (
                  <div className="bg-error/20 border border-error text-error-light p-4 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <p>Failed to load deaths: {error.message}</p>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent"></div>
                  </div>
                ) : characters.length === 0 ? (
                  <div className="text-center py-12">
                    <Skull className="w-12 h-12 text-accent/50 mx-auto mb-4" />
                    <p className="text-lg text-accent">
                      The graveyard awaits its first visitor...
                    </p>
                    <p className="text-sm text-gray-400">
                      Be the first to fall in battle!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {characters.map(
                      (
                        [name, level, reason, characterClass, player],
                        index
                      ) => (
                        <div
                          key={`${name}-${level}-${index}`}
                          className="bg-background/50 rounded-lg p-4 hover:bg-background/70 transition-colors border border-border hover:border-border-highlight group"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-medium text-accent group-hover:text-accent-hover">
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
      </div>
    </main>
  );
}
