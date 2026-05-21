"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, X, Check } from "lucide-react";
import CustomImage from "@/app/ui/CustomImage/CustomImage";
import ProductItem from "@/app/ui/Product/ProductItem";
import { API_BASE_URL } from "@/app/config/api";

const SKIN_ANALYZER_SUBMIT_URL = "/api/skin-analyzer/submit";

type Question = {
  id: number;
  question_key: string;
  question_text: string;
  type: string;
  options: { value: string; label: string; category_ids?: number[] }[];
};

type ConditionGroup = {
  id: number;
  name: string;
  options: { id: number; label: string; image: string | null; category_ids: number[] }[];
};

type SkinAnalyzerData = {
  settings?: Record<string, string>;
  questions?: Question[];
  condition_groups?: ConditionGroup[];
};

const INTRO_BG =
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80";

export default function SkinAnalyzerWizard({ initialData }: { initialData: SkinAnalyzerData | null }) {
  const [data, setData] = useState<SkinAnalyzerData | null>(initialData);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [conditionSelections, setConditionSelections] = useState<Record<number, number>>({});
  const [productsByRoutine, setProductsByRoutine] = useState<{ morning: any[]; evening: any[] }>({ morning: [], evening: [] });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resultsMode, setResultsMode] = useState<"morning" | "evening">("morning");

  const settings = data?.settings ?? {};
  const questions = data?.questions ?? [];
  const conditionGroups = data?.condition_groups ?? [];
  const totalSteps = 1 + questions.length + (conditionGroups.length > 0 ? 1 : 0);

  const fetchData = useCallback(async () => {
    if (data) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/skin-analyzer`);
      const json = await res.json();
      if (json?.data) setData(json.data);
    } finally {
      setLoading(false);
    }
  }, [data]);

  React.useEffect(() => {
    if (!initialData) fetchData();
  }, [initialData, fetchData]);

  const currentStepIndex = step;
  const isIntro = step === 0;
  const isQuestionStep = step >= 1 && step <= questions.length;
  const isConditionStep = conditionGroups.length > 0 && step === questions.length + 1;
  const products = productsByRoutine[resultsMode] ?? [];
  const isResults = productsByRoutine.morning.length > 0 || productsByRoutine.evening.length > 0;

  const currentQuestion = isQuestionStep ? questions[step - 1] : null;

  const handleNext = async () => {
    if (isIntro) {
      setStep(1);
      return;
    }
    if (isQuestionStep && currentQuestion && step < questions.length) {
      setStep(step + 1);
      return;
    }
    if (isQuestionStep && step === questions.length && conditionGroups.length > 0) {
      setStep(step + 1);
      return;
    }
    if (isQuestionStep && step === questions.length && conditionGroups.length === 0) {
      await submit();
      return;
    }
    if (isConditionStep) {
      await submit();
    }
  };

  const submit = async () => {
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch(SKIN_ANALYZER_SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          condition_selections: Object.values(conditionSelections).filter(Boolean),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json?.message || json?.errors ? (typeof json.errors === "object" ? Object.values(json.errors).flat().join(" ") : json.errors) : "Something went wrong. Please try again.";
        setSubmitError(msg);
        setLoading(false);
        return;
      }
      const data = json?.data ?? {};
      const morning = Array.isArray(data.morning) ? data.morning : [];
      const evening = Array.isArray(data.evening) ? data.evening : [];
      setProductsByRoutine({ morning, evening });
      setResultsMode("morning");
    } catch (_) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setAnswer = (key: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMulti = (key: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev[key] as string[]) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const canProceed =
    isIntro ||
    (currentQuestion?.type === "single" && answers[currentQuestion.question_key || "q" + currentQuestion.id]) ||
    (currentQuestion?.type === "multi" && Array.isArray(answers[currentQuestion?.question_key || "q" + currentQuestion.id]) && (answers[currentQuestion?.question_key || "q" + currentQuestion.id] as string[]).length > 0) ||
    isConditionStep;

  if (isResults) {
    return (
      <div className="min-h-screen bg-[#faf8fa] pb-24 md:py-6 md:flex md:justify-center md:items-start">
        <div className="w-full md:max-w-4xl md:mx-auto md:bg-white md:rounded-2xl md:shadow-xl md:overflow-hidden">
          <header className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-4 py-3 md:rounded-t-2xl">
            <Link href="/skin-analyzer" className="flex items-center gap-1 text-gray-800">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold uppercase text-sm">Skin Analyser</span>
            </Link>
            <div className="flex items-center gap-2">
              <button type="button" className="text-xs text-gray-600 px-2 py-1 rounded border">
                Preferences
              </button>
              <Link href="/" className="p-2">
                <X className="w-5 h-5" />
              </Link>
            </div>
          </header>
          <div className="flex gap-2 justify-center py-2 border-b bg-white">
            <button
              type="button"
              onClick={() => setResultsMode("morning")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${resultsMode === "morning" ? "bg-pink-100 text-pink-700 border-b-2 border-pink-500" : "text-gray-600"}`}
            >
              Morning Routine
            </button>
            <button
              type="button"
              onClick={() => setResultsMode("evening")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${resultsMode === "evening" ? "bg-pink-100 text-pink-700 border-b-2 border-pink-500" : "text-gray-600"}`}
            >
              Evening Routine
            </button>
          </div>
          <div className="px-2 py-4 md:px-4">
            <h2 className="text-lg font-bold uppercase text-gray-800 mb-4">
              {resultsMode === "morning" ? "Morning" : "Evening"} Routine Recommendations
            </h2>
            {(productsByRoutine.morning.length > 0 || productsByRoutine.evening.length > 0) ? (
              products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {products.map((p) => (
                    <ProductItem key={p.id} {...p} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No products in this routine. Check the other tab.</p>
              )
            ) : (
              <p className="text-center text-gray-500 py-8">No recommendations yet. Complete the analysis or try different answers.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative md:py-6 md:px-4 md:bg-[#e8e4e8]">
      {/* Desktop: centered compact card */}
      <div className="flex-1 flex flex-col md:max-w-md md:mx-auto md:w-full md:my-0 md:shadow-2xl md:rounded-2xl md:overflow-hidden md:min-h-[560px] md:max-h-[90vh] md:flex md:flex-col relative">
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur flex items-center justify-between px-4 py-3 border-b md:rounded-t-2xl md:bg-white">
          <Link href="/" className="flex items-center gap-1 text-gray-800">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-bold uppercase text-sm">Skin Analyser</span>
          </Link>
          <Link href="/" className="p-2">
            <X className="w-5 h-5" />
          </Link>
        </header>

        <div
          className="absolute inset-0 top-[52px] bg-cover bg-center md:rounded-b-2xl"
          style={{ backgroundImage: `url(${settings.intro_image || INTRO_BG})` }}
        />
        <div className="absolute inset-0 top-[52px] bg-gradient-to-b from-transparent via-transparent to-black/30 md:rounded-b-2xl" />

        <div className="relative flex-1 flex flex-col justify-end px-4 pb-8 pt-48 md:pt-36 md:justify-end md:pb-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 md:rounded-xl md:mx-0">
          {isIntro && (
            <>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {settings.intro_title || "Skin Analyzer"}
              </h1>
              <p className="text-sm text-gray-700 mb-6">
                {settings.intro_description ||
                  "Get personalized product recommendations from your favourite brands in just 2 minutes."}
              </p>
            </>
          )}

          {currentQuestion && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{currentQuestion.question_text}</h2>
              {currentQuestion.type === "multi" && (
                <p className="text-xs text-gray-600 mb-3">Select all that apply.</p>
              )}
              {currentQuestion.type === "single" && (
                <div className="flex gap-2 flex-wrap mb-2">
                  {(currentQuestion.options || []).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setAnswer(currentQuestion.question_key || "q" + currentQuestion.id, opt.value)
                      }
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition ${
                        answers[currentQuestion.question_key || "q" + currentQuestion.id] === opt.value
                          ? "bg-[#139804] text-white border-[#139804]"
                          : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
              {currentQuestion.type === "multi" && (
                <div className="flex gap-2 flex-wrap mb-2">
                  {(currentQuestion.options || []).map((opt) => {
                    const selected = (
                      (answers[currentQuestion.question_key || "q" + currentQuestion.id] as string[]) ?? []
                    ).includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          toggleMulti(
                            currentQuestion.question_key || "q" + currentQuestion.id,
                            opt.value
                          )
                        }
                        className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition ${
                          selected
                            ? "bg-[#139804] text-white border-[#139804]"
                            : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {isConditionStep && conditionGroups.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Pick matching conditions</h2>
              <p className="text-xs text-gray-600 mb-4">
                Help us find the best possible products by choosing which example matches your skin closest.
              </p>
              {conditionGroups.map((grp) => (
                <div key={grp.id} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">{grp.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {grp.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setConditionSelections((prev) => ({
                            ...prev,
                            [grp.id]: prev[grp.id] === opt.id ? 0 : opt.id,
                          }))
                        }
                        className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 ${
                          conditionSelections[grp.id] === opt.id
                            ? "border-pink-500 ring-2 ring-pink-200"
                            : "border-gray-200"
                        }`}
                      >
                        {opt.image ? (
                          <CustomImage src={opt.image} alt={opt.label} width={80} height={80} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs p-1 flex items-center justify-center h-full">{opt.label}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {submitError && (
            <p className="text-red-600 text-sm mt-2 bg-red-50 px-3 py-2 rounded-lg">{submitError}</p>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold uppercase text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed mt-4 bg-[#139804] hover:bg-[#0d6b03] border-2 border-[#139804] disabled:border-gray-300"
          >
            {loading ? (
              <span>Loading…</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                {isIntro ? "Get Started" : "Next"}
              </>
            )}
          </button>
        </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === currentStepIndex ? "bg-pink-500" : "bg-white/60 md:bg-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-center text-xs text-white/90 mt-2 drop-shadow md:text-gray-500 md:drop-shadow-none">Powered by Fair & Beauty</p>
        </div>
      </div>
    </div>
  );
}
