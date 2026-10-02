import { X } from "lucide-react";
import { StudentStory } from "@/data/studentStories";

interface StoryDetailModalProps {
  story: StudentStory | null;
  onClose: () => void;
}

export function StoryDetailModal({ story, onClose }: StoryDetailModalProps) {
  if (!story) return null;

  return (
    <div className="popup-backdrop-enter fixed inset-0 z-[70] flex items-end justify-center bg-black/45 p-3 sm:items-center" role="presentation" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        className="popup-panel-enter max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="stories-eyebrow">Story profile</div>
            <h2 id="story-modal-title" className="mt-2 text-3xl font-light text-black">{story.name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close student story" className="rounded-full p-2 text-black/50 transition hover:bg-black/5 hover:text-black"><X size={20} /></button>
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-[220px_1fr]">
          <img src={story.image} alt="Student story placeholder" className="aspect-[4/5] w-full rounded-2xl object-cover" />
          <div>
            <div className="text-sm uppercase tracking-[0.14em] text-black/45">{story.classLabel} · {story.category}</div>
            <p className="mt-5 text-base leading-8 text-black/65">{story.journey}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#F5F5F2] p-4"><div className="stories-eyebrow">Project</div><p className="mt-2 text-sm leading-6 text-black/60">{story.project}</p></div>
              <div className="rounded-2xl bg-[#F5F5F2] p-4"><div className="stories-eyebrow">Milestone</div><p className="mt-2 text-sm leading-6 text-black/60">{story.milestone}</p></div>
            </div>
          </div>
        </div>
        <div className="mt-7 border-t border-black/10 pt-6 text-sm leading-7 text-black/60">This story profile is awaiting verified student information. No achievement, quote or outcome is being inferred.</div>
      </div>
    </div>
  );
}
