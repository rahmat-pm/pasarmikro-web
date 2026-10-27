# Team

People on `/team/`, grouped by division. One file per person, both languages in the same file, frontmatter only.

**Files:** `content/team/<first-last>.md`, photos in `content/team/images/`. Only add people who agreed to be listed, with a photo they approved.

| Field | Required | Rules |
|---|---|---|
| `name` | yes | Full name as the person writes it. |
| `role.en` / `role.id` | yes | Job title in each language: `Chief Executive Officer` / `Direktur Utama`. |
| `division` | yes | Group heading, written the same way for everyone in it: `Founders`, `Operations`, `Technology`. Divisions appear in the order of their lowest `order`. |
| `order` | yes | Whole number; lower shows first. |
| `linkedin` | no | Full `https://www.linkedin.com/in/...` link. |
| `photo` | no | `./images/<file>.jpg`, square, at least 600 px. Without a photo the site shows the person's initials. |
| `active` | no | `false` hides someone who left. |

## Example

```md
---
name: Hugo Verwayen
role:
  en: Chief Executive Officer
  id: Direktur Utama
division: Founders
order: 1
linkedin: https://www.linkedin.com/in/hugo-verwayen
photo: ./images/hugo-verwayen.jpg
---
```
