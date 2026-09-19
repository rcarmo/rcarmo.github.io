# Diagram Colour Picker

Pick alternative fill/stroke colours for each semantic diagram tag, then send
the result back into the chat so the agent can apply the changes.

## When to use

When the user wants to adjust the diagram colour palette interactively.

## How to use

1. Read the current tag→colour mapping from `diagram-render.ts` (the `THEME_CSS`
   light-mode block).
2. Post the widget from `colour-picker-widget.html` using `send_dashboard_widget`,
   injecting the current colours into the `tags` array at the top of the `<script>`.
3. Wait for the user to submit — the widget sends back a message with the changed
   colours in `tag: fill=# stroke=#` format.
4. Apply the changes to `diagram-render.ts` (both light and dark mode blocks),
   regenerate all SVGs, update `_content/*.md`, rebuild, and push.

## Widget file

The HTML is at `colour-picker-widget.html` (sibling of this SKILL.md).
Post it with `send_dashboard_widget`:

```
send_dashboard_widget({
  title: "Diagram Colour Picker",
  content: "Interactive colour picker for diagram tag styles",
  html: <contents of colour-picker-widget.html>
})
```

## Applying the result

The widget submits text like:

```
Updated colours:
backend: fill=#74a7ff stroke=#012f7b
processing: fill=#adadad stroke=#000000
```

Parse each line, update the matching `.box-*` rules in `diagram-render.ts`,
derive dark-mode variants, then run the regeneration pipeline:

```bash
# Regenerate all SVGs
for f in _diagrams/*.json; do bun diagram-render.ts "$f" "_diagrams/$(basename $f .json).svg"; done

# Update markdown
python3 -c "..." # replace ## Diagram SVGs in _content/*.md

# Build + audit
bun run build.ts && bun audit-links.ts
```
