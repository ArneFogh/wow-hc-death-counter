"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

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
  // Brug useEffect til at håndtere initial form state
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

      setForm({ name: "", level: "", reason: "" });
      mutate();
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  // Undgå rendering indtil component er mounted
  if (!mounted) {
    return (
      <div className="min-h-screen p-4 bg-background text-primaryText">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Team Mayo Death Counter
          </h1>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 bg-background text-primaryText">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Team Mayo Death Counter
        </h1>

        {submitError && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {submitError}
          </div>
        )}

        <form
          className="mb-8 space-y-4"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="relative">
            <label className="block mb-1">Karakter Navn</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded bg-inputBg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              required
              maxLength={50}
              autoComplete="off"
              data-form-type="other"
            />
          </div>

          <div className="relative">
            <label className="block mb-1">Level</label>
            <input
              type="number"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full p-2 rounded bg-inputBg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              required
              min="1"
              max="100"
              autoComplete="off"
              data-form-type="other"
            />
          </div>

          <div className="relative">
            <label className="block mb-1">Class</label>
            <input
              type="text"
              value={form.characterClass}
              onChange={(e) =>
                setForm({ ...form, characterClass: e.target.value })
              }
              className="w-full p-2 rounded bg-inputBg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              required
              maxLength={50}
              autoComplete="off"
              data-form-type="other"
            />
          </div>

          <div className="relative">
            <label className="block mb-1">Hvem der døde</label>
            <input
              type="text"
              value={form.player}
              onChange={(e) => setForm({ ...form, player: e.target.value })}
              className="w-full p-2 rounded bg-inputBg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              required
              maxLength={50}
              autoComplete="off"
              data-form-type="other"
            />
          </div>

          <div className="relative">
            <label className="block mb-1">Dødsårsag</label>
            <input
              type="text"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full p-2 rounded bg-inputBg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              required
              maxLength={200}
              autoComplete="off"
              data-form-type="other"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded bg-accent hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            Tilføj Dødsfald
          </button>
        </form>

        <section>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              Fejl ved indlæsning: {error.message}
            </div>
          )}

          {isLoading ? (
            <div className="text-center p-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent"></div>
              <p className="mt-2">Indlæser dødsfald...</p>
            </div>
          ) : characters.length === 0 ? (
            <p className="text-center text-gray-400">
              Ingen dødsfald registreret endnu.
            </p>
          ) : (
            <ul className="space-y-3">
              {characters.map(
                ([name, level, reason, characterClass, player], index) => (
                  <li
                    key={`${name}-${level}-${index}`}
                    className="p-4 bg-inputBg rounded transition-transform hover:scale-[1.01]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <strong className="text-accent">{name}</strong>
                        <span className="text-gray-400"> (Level {level})</span>
                        <span className="text-gray-400 ml-2">
                          - {characterClass}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">
                        Spiller: {player}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{reason}</p>
                  </li>
                )
              )}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
