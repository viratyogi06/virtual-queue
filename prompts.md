# Claude Code Prompt Templates

Pre-written prompts for common development tasks in this project. Copy-paste into Claude Code.

---

## Starting a New Story

```
I'm starting work on [TUS-XX: Story Name]. 

Before writing any code:
1. Read the plan.md and check off what's already done
2. Read the relevant section in CLAUDE.md for context
3. Create a plan for implementing this story
4. List the files you'll create or modify
5. Ask me any clarifying questions before proceeding

Do NOT write code until I confirm the plan.
```

---

## Implementing a Component

```
Implement [ComponentName] in src/components/[path].

Requirements from the BRD:
- [paste specific acceptance criteria]

Follow these rules:
- Tailwind CSS only, mobile-first (375px base)
- Accept className prop for extension
- 44px minimum tap targets on interactive elements
- Focus-visible states on all interactive elements
- No business logic in the component — use hooks/services

Think hard about the implementation before coding.
```

---

## Implementing a Service Function

```
Implement [functionName] in src/services/[file].ts

This must be a pure function:
- No React imports
- No DOM APIs  
- No side effects
- Same input always produces same output
- Must be unit-testable

Formula/Logic:
[paste the specific formula or logic from BRD]

Think about edge cases before implementing.
```

---

## Debugging

```
I'm seeing [describe the issue] on the [page/component name].

Before fixing:
1. Enter Plan Mode
2. Analyze the data flow from context → hook → component
3. Identify where the state might be incorrect
4. Propose a fix with explanation
5. Wait for my approval before changing code

Think hard about this.
```

---

## Code Review Request

```
Review the implementation of [TUS-XX] against the acceptance criteria:

Check for:
- TypeScript strict compliance (no any, no ts-ignore)
- Business logic in services, not components
- Mobile-first responsive design
- Proper error handling
- No memory leaks (interval cleanup, subscription cleanup)
- Consistent color coding (blue=user, green=ready, yellow=next, gray=neutral, red=danger)

List any issues found.
```

---

## Sprint Completion Check

```
Sprint [N] should now be complete. 

Please:
1. Review plan.md and verify all stories in this sprint are checked off
2. Run the app and verify each acceptance criteria
3. Check for any console errors or warnings
4. Verify mobile responsiveness at 375px
5. Update todo.md with the next sprint's active tasks

Report any issues found.
```
