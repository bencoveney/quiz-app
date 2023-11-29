# quiz-app

## State identified

- API response
- Active quiz
- Results(?)

## Questions

- Are the names unique and suitable as a key?
- How long can API responses be cached?
- Not clear what the homepage link is supposed to do. Most recent set of results?
- Can rounds and questions be intermingled? Or arbitrarily nested?
- Can question arrays ever be empty?
- order exists in the JSON document, but arrays are already ordered. How reliable is it? (unique? sorted? contiguous?)
- user_answers exists in the JSON document, but never has any content.
- feedback exists in the JSON document, but never has any content.
- Drop shadows in the styles - should I be able to see CSS properties in Adobe XD?

## Consider doing

- Use question number
- Responsive styles
- Interstitial "round N" screen with timeout
- CSS rules to variables
- Idiomatic react - prop interfaces, semantic html, memo cbs
- A11y
- CI, CD, Test
