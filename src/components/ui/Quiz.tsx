"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@/components/ui/icons";
import type { QuizItem } from "@/lessons/types";
import { bn } from "@/lib/vec";

export function Quiz({ items, onDone }: { items: QuizItem[]; onDone?: (score: number, total: number) => void }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => items.map(() => null));
  const reduce = useReducedMotion();
  const score = picked.reduce<number>((s, p, i) => s + (p === items[i].answer ? 1 : 0), 0);
  const done = items.length > 0 && picked.every((p) => p !== null);

  useEffect(() => {
    if (done) onDone?.(score, items.length);
  }, [done, score, items.length, onDone]);

  return (
    <div className="quiz">
      {items.map((it, i) => {
        const chosen = picked[i];
        const shown = chosen !== null;
        return (
          <div key={it.q} className="card quiz-item">
            <p className="quiz-q">
              {bn(i + 1)}. {it.q}
            </p>
            <div className="options">
              {it.options.map((o, j) => {
                const cls = shown && j === it.answer ? " ok" : shown && chosen === j ? " bad" : "";
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={shown}
                    className={`option${cls}`}
                    onClick={() => setPicked((p) => p.map((v, k) => (k === i ? j : v)))}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {shown ? (
              <motion.p
                className="explain"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {chosen === it.answer ? (
                  <CheckCircleIcon size={22} weight="fill" className="good-ico" />
                ) : (
                  <XCircleIcon size={22} weight="fill" className="bad-ico" />
                )}
                <span>
                  <b>{chosen === it.answer ? "সঠিক। " : "ভুল হয়েছে। "}</b>
                  {it.why}
                </span>
              </motion.p>
            ) : null}
          </div>
        );
      })}
      {done ? (
        <motion.div className="score" initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
          <p style={{ fontWeight: 700 }}>
            তোমার স্কোর: {bn(score)} / {bn(items.length)}
          </p>
          <button type="button" className="btn btn-primary" onClick={() => setPicked(items.map(() => null))}>
            আবার চেষ্টা করো
          </button>
        </motion.div>
      ) : null}
    </div>
  );
}
