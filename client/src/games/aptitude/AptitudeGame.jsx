import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCcw,
  Send,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  normalizeAptitudeConfig,
  validateAptitudeClient,
  serializeAptitudeSubmission,
} from './aptitudeLogic';

export const AptitudeGame = ({
  challenge,
  session,
  gameConfig = {},
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizeAptitudeConfig(gameConfig), [gameConfig]);
  const { questions, roundTitle, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const [selectedKeys, setSelectedKeys] = useState(() =>
    Array(questions.length).fill('')
  );
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setSelectedKeys(Array(questions.length).fill(''));
    setCurrentIdx(0);
  }, [challenge?.challengeId, session?.attemptId, questions.length]);

  const validation = useMemo(
    () => validateAptitudeClient(selectedKeys, config),
    [selectedKeys, config]
  );

  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const serialized = serializeAptitudeSubmission(selectedKeys);
      onDraftChange({
        gameType: 'aptitude',
        answer: validation.isComplete ? serialized : '',
        answers: selectedKeys,
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
    }
  }, [selectedKeys, validation.isComplete, validation.isValid, onDraftChange]);

  const handleSelectOption = (qIdx, optionKey) => {
    if (isLocked) return;
    setSelectedKeys((prev) => {
      const next = [...prev];
      next[qIdx] = optionKey;
      // Auto-advance to the next unanswered question (or next question) after a brief moment
      const nextUnanswered = next.findIndex((a, i) => i > qIdx && !a);
      if (nextUnanswered >= 0) {
        setTimeout(() => setCurrentIdx(nextUnanswered), 150);
      } else if (qIdx < questions.length - 1 && !prev[qIdx]) {
        setTimeout(() => setCurrentIdx(qIdx + 1), 150);
      }
      return next;
    });
  };

  const handleReset = () => {
    if (isLocked) return;
    setSelectedKeys(Array(questions.length).fill(''));
    setCurrentIdx(0);
  };

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'aptitude',
      answer: serializeAptitudeSubmission(selectedKeys),
      answers: selectedKeys,
    });
  };

  const activeQuestion = questions[currentIdx] || questions[0];
  const currentChoice = selectedKeys[currentIdx] || '';

  return (
    <div className="space-y-4 sm:space-y-5 select-none">
      {/* Header & Progress */}
      <div className="p-3.5 sm:p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-nexus-crimson flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>{roundTitle}</span>
          </span>
          <p className="font-editorial text-xs sm:text-sm text-nexus-charcoal leading-snug">
            {instructions}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs font-bold uppercase">
          <span className="px-2.5 py-1 border border-nexus-ink bg-nexus-paper-elevated text-nexus-ink">
            {validation.answeredCount} / {validation.totalQuestions} ANSWERED
          </span>
        </div>
      </div>

      {/* RIGHT / WRONG SUMMARY BANNER (Only shown when all questions are answered — NEVER reveals which question is right or wrong!) */}
      {validation.isComplete && validation.rightCount !== null && (
        <div
          className={`p-3.5 border-2 border-nexus-ink flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs ${
            validation.wrongCount === 0
              ? 'bg-nexus-ink text-nexus-paper'
              : 'bg-nexus-paper-elevated text-nexus-ink'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold uppercase tracking-wider">
              ✓ {validation.rightCount} RIGHT
            </span>
            <span className="px-2.5 py-1 bg-nexus-crimson text-white font-bold uppercase tracking-wider">
              ✕ {validation.wrongCount} WRONG
            </span>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider">
            {validation.wrongCount === 0 ? (
              <span className="text-emerald-400 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                ALL {questions.length} CORRECT — CLICK SUBMIT BELOW!
              </span>
            ) : (
              <span className="text-nexus-crimson inline-flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {validation.wrongCount} ANSWER{validation.wrongCount > 1 ? 'S ARE' : ' IS'} WRONG — REVIEW Q1–Q{questions.length} TO FIND & FIX!
              </span>
            )}
          </span>
        </div>
      )}

      {/* Question Stepper Strip (1 .. N) — Neutral colors only so it never leaks which one is right/wrong */}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${questions.length}, minmax(0, 1fr))`,
        }}
      >
        {questions.map((q, idx) => {
          const ans = selectedKeys[idx];
          const isCurrent = idx === currentIdx;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentIdx(idx)}
              className={`py-2 px-2 border-2 font-mono text-xs font-bold uppercase transition-colors flex flex-col items-center justify-center gap-0.5 cursor-pointer touch-manipulation ${
                isCurrent
                  ? 'border-nexus-crimson bg-nexus-ink text-white shadow-brutal-sm'
                  : ans
                    ? 'border-nexus-ink bg-nexus-paper text-nexus-ink'
                    : 'border-nexus-ink/40 bg-nexus-paper-elevated text-nexus-muted'
              }`}
            >
              <span className="text-[10px] opacity-75">QUESTION {idx + 1}</span>
              <span className="text-sm font-extrabold">
                {ans ? `OPT ${ans}` : '—'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Single Active MCQ Card (1 Question at a Time) */}
      {activeQuestion && (
        <div className="p-5 sm:p-6 border-4 border-nexus-ink bg-nexus-paper shadow-brutal space-y-5">
          <div className="flex items-center justify-between gap-2 border-b-2 border-nexus-ink/15 pb-3 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper font-bold">
              PROBLEM 0{currentIdx + 1} OF 0{questions.length}
            </span>
            <span className="text-nexus-crimson font-bold">
              {activeQuestion.topic}
            </span>
          </div>

          <p className="font-editorial text-base sm:text-xl font-bold text-nexus-ink leading-relaxed min-h-[3.5rem]">
            {activeQuestion.question}
          </p>

          {/* 4 Option Buttons (Responsive 1-col on mobile, 2-col on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {activeQuestion.options.map((opt) => {
              const isSelected = currentChoice === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={isLocked}
                  onClick={() => handleSelectOption(currentIdx, opt.key)}
                  className={`min-h-[52px] px-3.5 py-3 border-2 text-left flex items-center gap-3 transition-colors cursor-pointer touch-manipulation ${
                    isSelected
                      ? 'bg-nexus-ink text-white border-nexus-crimson ring-2 ring-nexus-crimson shadow-brutal-sm'
                      : 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper'
                  }`}
                >
                  <span
                    className={`w-7 h-7 shrink-0 border flex items-center justify-center font-mono text-xs font-bold ${
                      isSelected
                        ? 'bg-nexus-crimson text-white border-white'
                        : 'bg-nexus-paper text-nexus-ink border-nexus-ink'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold leading-snug">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Question Prev / Next Navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-dashed border-nexus-ink/25">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              className="px-3.5 py-2 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer disabled:opacity-35 touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV</span>
            </button>

            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-nexus-muted">
              {currentChoice ? `SELECTED: OPTION ${currentChoice}` : 'CHOOSE AN OPTION'}
            </span>

            <button
              type="button"
              disabled={currentIdx === questions.length - 1}
              onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
              className="px-3.5 py-2 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper hover:bg-nexus-crimson font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer disabled:opacity-35 touch-manipulation"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <button
          type="button"
          disabled={isLocked || validation.answeredCount === 0}
          onClick={handleReset}
          className="min-h-[46px] px-4 py-2.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <RotateCcw className="w-4 h-4 text-nexus-crimson" />
          <span>CLEAR ANSWERS</span>
        </button>

        <button
          type="button"
          disabled={isLocked || !validation.isComplete}
          onClick={handleSubmit}
          className="sm:col-span-2 min-h-[46px] px-5 py-2.5 border-2 border-nexus-ink bg-nexus-crimson text-white hover:bg-nexus-ink font-condensed text-lg font-extrabold uppercase tracking-[0.18em] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <Send className="w-4 h-4" />
          <span>SUBMIT ALL {questions.length} ANSWERS</span>
        </button>
      </div>
    </div>
  );
};

export default AptitudeGame;
