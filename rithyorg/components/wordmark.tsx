// lettered in the noos wordmark style: one round stroke, a raised dot
export default function Wordmark() {
  return (
    <svg className="wordmark-full" viewBox="0 -50 789 200" role="img" aria-label="rithythul">
      <path
        d="M15 85V50A35 35 0 0 1 50 15H60 M104 85V45 M148 -30V55A30 30 0 0 0 178 85H188 M140 15H188 M232 -35V85 M232 85V45A30 30 0 0 1 292 45V85 M336 15V50A30 30 0 0 0 396 50 M396 15V110A25 25 0 0 1 371 135H351 M440 -30V55A30 30 0 0 0 470 85H480 M432 15H480 M524 -35V85 M524 85V45A30 30 0 0 1 584 45V85 M628 15V55A30 30 0 0 0 688 55 M688 15V85 M732 -35V85"
        fill="none"
        stroke="currentColor"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="104" cy="-14" r="16" fill="currentColor" />
      <circle cx="774" cy="15" r="15" fill="currentColor" />
    </svg>
  );
}

// the "r" and its dot alone, for narrow headers; same strokes as the favicon
export function Mark() {
  return (
    <svg className="wordmark-mark" viewBox="0 -2 118 104" role="img" aria-label="rithythul">
      <path d="M15 85V50A35 35 0 0 1 50 15H60" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round" />
      <circle cx="101" cy="15" r="15" fill="currentColor" />
    </svg>
  );
}
