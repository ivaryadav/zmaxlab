// The prerendered HTML already shows every element in its final state. During the very first
// client render we must not reset those elements to opacity 0 and fade them back in: that hides
// real content until JavaScript runs (bad LCP) and makes the page flash. Entrance animations are
// therefore skipped for elements mounted in the first render, and kept for everything after
// (client-side navigation, content that appears later).

let booting = true

export const isBooting = () => booting
export function endBoot() { booting = false }
