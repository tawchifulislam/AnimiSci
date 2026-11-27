"use client";

import { GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "কাজ, শক্তি ও ক্ষমতা অধ্যায়ের সূত্র, সৃজনশীল প্রশ্ন ও MCQ একসাথে ঝালিয়ে নাও।",
  hook: "আগে সূত্রগুলো একবার মনে করো, তারপর সৃজনশীল প্রশ্ন আর MCQ সমাধান করো।",
  formulas: [
    { tex: "W=Fd\\cos\\theta", meaning: "কাজ" },
    { tex: "K+U=\\text{ধ্রুব}", meaning: "যান্ত্রিক শক্তির সংরক্ষণ" },
    { tex: "P=\\dfrac Wt=Fv", meaning: "ক্ষমতা" },
  ],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [
    { q: "বল সরণের সাথে 90° কোণে হলে কাজ?", options: ["শূন্য", "সর্বোচ্চ", "ঋণাত্মক", "অসীম"], answer: 0, why: "cos90° = 0।" },
    { q: "F-x গ্রাফের ক্ষেত্রফল কী?", options: ["কাজ", "ক্ষমতা", "বেগ", "ভরবেগ"], answer: 0, why: "বল × সরণের যোগফল।" },
    { q: "2 kg বস্তু 3 m/s এ চললে গতিশক্তি?", options: ["9 J", "18 J", "6 J", "4.5 J"], answer: 0, why: "½ × 2 × 9।" },
    { q: "বেগ দ্বিগুণ হলে গতিশক্তি?", options: ["4 গুণ", "2 গুণ", "অর্ধেক", "একই"], answer: 0, why: "K ∝ v²।" },
    { q: "রক্ষণশীল বলের উদাহরণ?", options: ["অভিকর্ষ", "ঘর্ষণ", "বায়ুর বাধা", "সান্দ্র বল"], answer: 0, why: "কাজ পথ নিরপেক্ষ।" },
    { q: "k = 200 N/m, x = 0.2 m স্প্রিংয়ে কাজ?", options: ["4 J", "8 J", "40 J", "0.4 J"], answer: 0, why: "½kx²।" },
    { q: "10 m উচ্চতা থেকে পড়া বস্তুর বেগ (g = 9.8)?", options: ["14 m/s", "10 m/s", "98 m/s", "7 m/s"], answer: 0, why: "√(2gh)।" },
    { q: "1 hp কত ওয়াট?", options: ["746", "1000", "100", "3600"], answer: 0, why: "প্রচলিত মান।" },
    { q: "80% দক্ষ মোটরের আউটপুট 4 kW হলে ইনপুট?", options: ["5 kW", "3.2 kW", "4.8 kW", "8 kW"], answer: 0, why: "4 ÷ 0.8।" },
    { q: "1 g ভর থেকে E = mc² অনুযায়ী শক্তি?", options: ["9 × 10^13 J", "9 × 10^16 J", "3 × 10^8 J", "9 × 10^10 J"], answer: 0, why: "10^-3 × 9 × 10^16।" },
  ],
  problems: [
    {
      level: "সৃজনশীল 1",
      q: "2 kg ভরের একটি বাক্সকে ভূমির সাথে 60° কোণে 50 N বলে 10 m টানা হলো। ঘর্ষণ বল 20 N। বাক্স স্থির থেকে শুরু করেছিল। (ক) কাজ কী? (খ) টানার বল কত কাজ করে? (গ) ঘর্ষণ কত কাজ করে এবং নিট কাজ কত? (ঘ) 10 m পর বাক্সের বেগ কত?",
      hint: "W = Fd cosθ, তারপর কাজ-শক্তি উপপাদ্য।",
      steps: [
        { text: "(ক) বল আর বলের দিকে সরণের গুণফলকে কাজ বলে।" },
        { text: "(খ) টানার কাজ 250 J।", tex: "W=50\\times10\\times\\cos60^\\circ=250" },
        { text: "(গ) ঘর্ষণের কাজ −200 J, তাই নিট কাজ 50 J।", tex: "W_f=-20\\times10=-200,\\quad W_{\\text{নিট}}=250-200=50" },
        { text: "(ঘ) বেগ প্রায় 7.1 m/s।", tex: "\\dfrac12\\times2\\times v^2=50\\Rightarrow v=\\sqrt{50}" },
      ],
    },
    {
      level: "সৃজনশীল 2",
      q: "একটি ক্রেন 500 kg ভর 10 m ওপরে 20 s এ তোলে। ক্রেনের দক্ষতা 70%। (ক) ক্ষমতা কী? (খ) ক্রেনের কার্যকর কাজ কত? (গ) কার্যকর আউটপুট ক্ষমতা কত? (ঘ) ক্রেনকে কত ইনপুট ক্ষমতা দিতে হবে?",
      hint: "g = 9.8, η = আউটপুট ÷ ইনপুট।",
      steps: [
        { text: "(ক) কাজের হারকে ক্ষমতা বলে।" },
        { text: "(খ) কার্যকর কাজ 49000 J।", tex: "W=mgh=500\\times9.8\\times10=49000" },
        { text: "(গ) আউটপুট ক্ষমতা 2450 W।", tex: "P=\\dfrac{49000}{20}=2450" },
        { text: "(ঘ) ইনপুট ক্ষমতা 3500 W।", tex: "P_{\\text{in}}=\\dfrac{2450}{0.7}=3500" },
      ],
    },
  ],
};

const cards = [
  { q: "কাজের সূত্র আর ঋণাত্মক কাজ কখন?", tex: "W=Fd\\cos\\theta,\\quad \\theta>90^\\circ\\Rightarrow W<0" },
  { q: "স্প্রিংয়ের কাজ ও স্থিতিশক্তি কী?", tex: "W=\\dfrac12kx^2,\\quad U=\\dfrac12kx^2" },
  { q: "গতিশক্তি ও কাজ-শক্তি উপপাদ্য কী?", tex: "K=\\dfrac12mv^2,\\quad W_{\\text{নিট}}=\\Delta K" },
  { q: "অভিকর্ষীয় স্থিতিশক্তি কী?", tex: "U=mgh" },
  { q: "যান্ত্রিক শক্তির সংরক্ষণ কী?", tex: "K_1+U_1=K_2+U_2,\\quad v=\\sqrt{2gh}" },
  { q: "ক্ষমতার সূত্র কী?", tex: "P=\\dfrac Wt=Fv,\\quad 1\\ \\text{hp}=746\\ \\text{W}" },
  { q: "দক্ষতা কী?", tex: "\\eta=\\dfrac{\\text{আউটপুট}}{\\text{ইনপুট}},\\quad \\eta=\\eta_1\\eta_2\\cdots" },
  { q: "ভর-শক্তি সমতুল্যতা কী?", tex: "E=mc^2,\\quad c=3\\times10^8\\ \\text{m/s}" },
];

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      limit={10}
      build={(g): Built => ({
        concept: cards.map((c, n) => ({
          tag: "সূত্র",
          title: `কার্ড ${n + 1}/${cards.length}`,
          text: c.q,
          prompt:
            g.picks[n] === 1 ? (
              <div className="guide-tex">
                <Tex display>{c.tex}</Tex>
              </div>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => g.pick(n)(1)}>
                আগে মনে করো, তারপর উত্তর দেখো
              </button>
            ),
        })),
        summary: [],
      })}
    />
  );
}
