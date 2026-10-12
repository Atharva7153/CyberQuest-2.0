import React, { useState, useEffect, useMemo } from 'react';
import {
  Check,
  X,
  RotateCcw,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  normalizeGkTrueFalseConfig,
  validateGkTrueFalseClient,
  serializeGkTrueFalseSubmission,
} from './gkTrueFalseLogic';

export const GkTrueFalseGame = ({
  challenge,
  session,
  gameConfig = {},
  evaluationResult = null,
  actionPending = false,
  disabled = false,
  onDraftChange,
  onSubmitAnswer,
}) => {
  const config = useMemo(() => normalizeGkTrueFalseConfig(gameConfig), [gameConfig]);
  const { questions, roundTitle, instructions } = config;
  const isLocked = Boolean(actionPending || disabled);

  const [answers, setAnswers] = useState(() => Array(questions.length).fill(''));
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(''));
    setCurrentIdx(0);
  }, [challenge?.challengeId, session?.attemptId, questions.length]);

  const validation = useMemo(
    () => validateGkTrueFalseClient(answers, config),
    [answers, config]
  );

  useEffect(() => {
    if (typeof onDraftChange === 'function') {
      const serialized = serializeGkTrueFalseSubmission(answers);
      onDraftChange({
        gameType: 'gkTrueFalse',
        answer: validation.isComplete ? serialized : '',
        answers,
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
    }
  }, [answers, validation.isComplete, validation.isValid, onDraftChange]);

  const handleSelectChoice = (idx, choice) => {
    if (isLocked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = choice;
      // Auto-advance to the next unanswered question (or next question) after a brief moment
      const nextUnanswered = next.findIndex((a, i) => i > idx && !a);
      if (nextUnanswered >= 0) {
        setTimeout(() => setCurrentIdx(nextUnanswered), 140);
      } else if (idx < questions.length - 1 && !prev[idx]) {
        setTimeout(() => setCurrentIdx(idx + 1), 140);
      }
      return next;
    });
  };

  const handleReset = () => {
    if (isLocked) return;
    setAnswers(Array(questions.length).fill(''));
    setCurrentIdx(0);
  };

  const handleSubmit = () => {
    if (isLocked || !validation.isComplete) return;
    onSubmitAnswer({
      gameType: 'gkTrueFalse',
      answer: serializeGkTrueFalseSubmission(answers),
      answers,
    });
  };

  const activeQuestion = questions[currentIdx] || questions[0];
  const selectedForCurrent = answers[currentIdx] || '';

  return (
    <div className="space-y-4 sm:space-y-5 select-none">
      {/* Header & Instructions */}
      <div className="p-3.5 sm:p-4 border-2 border-nexus-ink bg-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-nexus-crimson block">
            {roundTitle}
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

      {/* Post-submission failure breakdown OR neutral pre-submission readiness banner */}
      {evaluationResult && !evaluationResult.passed && evaluationResult.reason ? (
        <div className="p-3.5 border-2 border-nexus-crimson bg-red-950 text-red-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{evaluationResult.reason}</span>
          </span>
        </div>
      ) : (
        validation.isComplete && (
          <div className="p-3 border-2 border-nexus-ink bg-nexus-ink text-nexus-paper flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
            <span className="text-emerald-400 font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              ALL {questions.length} STATEMENTS SELECTED — REVIEW YOUR CHOICES & CLICK SUBMIT BELOW
            </span>
          </div>
        )
      )}

      {/* Question Stepper Strip (1 .. 6) — Neutral colors only so it never leaks which one is right/wrong */}
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {questions.map((q, idx) => {
          const ans = answers[idx];
          const isCurrent = idx === currentIdx;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentIdx(idx)}
              className={`py-2 px-1 border-2 font-mono text-xs font-bold uppercase transition-colors flex flex-col items-center justify-center gap-0.5 cursor-pointer touch-manipulation ${
                isCurrent
                  ? 'border-nexus-crimson bg-nexus-ink text-white shadow-brutal-sm'
                  : ans
                    ? 'border-nexus-ink bg-nexus-paper text-nexus-ink'
                    : 'border-nexus-ink/40 bg-nexus-paper-elevated text-nexus-muted'
              }`}
            >
              <span className="text-[10px] opacity-75">Q{idx + 1}</span>
              <span className="text-sm font-extrabold">
                {ans === 'T' ? 'TRUE' : ans === 'F' ? 'FALSE' : '—'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Single Active Question Card (1 Question at a Time) */}
      {activeQuestion && (
        <div className="p-5 sm:p-6 border-4 border-nexus-ink bg-nexus-paper shadow-brutal space-y-5">
          <div className="flex items-center justify-between gap-2 border-b-2 border-nexus-ink/15 pb-3 font-mono text-xs uppercase tracking-widest">
            <span className="px-2.5 py-1 bg-nexus-ink text-nexus-paper font-bold">
              STATEMENT 0{currentIdx + 1} OF 0{questions.length}
            </span>
            <span className="text-nexus-crimson font-bold">
              {activeQuestion.topic}
            </span>
          </div>

          <p className="font-editorial text-lg sm:text-xl font-bold text-nexus-ink leading-relaxed min-h-[3.5rem]">
            {activeQuestion.statement}
          </p>

          {/* Large Mobile-Friendly TRUE / FALSE Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              disabled={isLocked}
              onClick={() => handleSelectChoice(currentIdx, 'T')}
              className={`min-h-[56px] px-4 py-3 border-2 font-condensed text-xl font-extrabold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors cursor-pointer touch-manipulation ${
                selectedForCurrent === 'T'
                  ? 'bg-nexus-ink text-white border-nexus-crimson ring-2 ring-nexus-crimson shadow-brutal-sm'
                  : 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper'
              }`}
            >
              <Check className="w-5 h-5 stroke-[3] text-emerald-500" />
              <span>TRUE</span>
            </button>

            <button
              type="button"
              disabled={isLocked}
              onClick={() => handleSelectChoice(currentIdx, 'F')}
              className={`min-h-[56px] px-4 py-3 border-2 font-condensed text-xl font-extrabold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors cursor-pointer touch-manipulation ${
                selectedForCurrent === 'F'
                  ? 'bg-nexus-ink text-white border-nexus-crimson ring-2 ring-nexus-crimson shadow-brutal-sm'
                  : 'bg-nexus-paper-elevated text-nexus-ink border-nexus-ink hover:bg-nexus-ink hover:text-nexus-paper'
              }`}
            >
              <X className="w-5 h-5 stroke-[3] text-nexus-crimson" />
              <span>FALSE</span>
            </button>
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
              {selectedForCurrent
                ? `MARKED: ${selectedForCurrent === 'T' ? 'TRUE' : 'FALSE'}`
                : 'SELECT TRUE OR FALSE'}
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

      {/* Action Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <button
          type="button"
          disabled={isLocked || validation.answeredCount === 0}
          onClick={handleReset}
          className="min-h-[46px] px-4 py-2.5 border-2 border-nexus-ink bg-nexus-paper hover:bg-nexus-ink hover:text-nexus-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 touch-manipulation"
        >
          <RotateCcw className="w-4 h-4 text-nexus-crimson" />
          <span>RESET ROUND</span>
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

export default GkTrueFalseGame;
