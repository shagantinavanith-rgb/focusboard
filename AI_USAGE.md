# AI Usage Disclosure

> Fill in the parts marked TODO yourself, in your own words. This file is graded on honesty and on whether you understand the code.

## Tools used

- Claude (Anthropic): generated the initial project scaffold and components.
- TODO: list any other tools (Copilot, ChatGPT, etc.), or write "none".

## Representative prompts

1. "Use the React.js" (after sharing the assessment brief): asked Claude to build the FocusBoard app.
2. TODO: add the prompts you used for the Figma styling, fixes, and deployment.

## Areas where AI assisted

- Project scaffold (Vite + React), reducer and context, `localStorage` sync
- Components: sidebar, top bar, bottom nav, stats, toolbar, task card with menu, task form, confirm dialog, carousel, mobile hero card
- Restyling from Figma screenshots (colours, spacing, layout) and responsive CSS
- The dialog focus-trap hook and the README draft

## Areas I did myself

- TODO: e.g. matching the Figma, replacing the carousel content, testing at 1440/768/390, deploying.

## A suggestion I reviewed and corrected

The first version of the form components ran their "focus the first field" effect together with the Esc-key listener, so the focus call would re-run whenever the parent re-rendered and could pull focus away from the user mid-typing. I split them into two effects so focus is set only once, when the dialog opens.

TODO: add one more example from your own review.

## Code understanding

TODO: write 3 to 5 sentences explaining, in your own words, how data flows from the reducer to the UI and how persistence avoids overwriting saved data with sample data.
