# 📸 Visual Guide - Meal Preparation Dashboard

## Navigation

The meal preparation page is accessible from the sidebar:

```
Dashboard
  ├── Tableau de bord (Dashboard Home)
  ├── Repas (Meals)
  ├── Weekly Plans
  ├── Utilisateurs (Users)
  ├── Commandes (Orders)
  ├── 👨‍🍳 Préparation Repas ← NEW!
  ├── Plans
  └── Catégories (Categories)
```

## Table View Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Préparation des Repas                                          │
├─────────────────────────────────────────────────────────────────┤
│  [Vue Liste] [Vue Calendrier]                                   │
├─────────────────────────────────────────────────────────────────┤
│  🔍 [Rechercher un repas...]  [Tous les statuts ▼]  [Colonnes]│
├───┬──────────────┬────────┬──────────┬──────────────┬──────────┤
│ # │ Repas        │ Qté    │ Client   │ Date Prép    │ Statut   │
├───┼──────────────┼────────┼──────────┼──────────────┼──────────┤
│ 1 │ 🖼️ Tajine    │   3    │ Mohammed │ 20 Oct 2025  │[Pending ▼]│
│   │ aux Olives   │        │ Alami    │              │          │
├───┼──────────────┼────────┼──────────┼──────────────┼──────────┤
│ 2 │ 🖼️ Couscous  │   2    │ Fatima   │ 20 Oct 2025  │[Progress▼]│
│   │ Royal        │        │ Zahra    │              │          │
├───┼──────────────┼────────┼──────────┼──────────────┼──────────┤
│ 3 │ 🖼️ Pastilla  │   5    │ Ahmed    │ 20 Oct 2025  │[Progress▼]│
│   │ au Poulet    │        │ Benjel.  │              │          │
└───┴──────────────┴────────┴──────────┴──────────────┴──────────┘
```

## Calendar View Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Préparation des Repas                                          │
├─────────────────────────────────────────────────────────────────┤
│  [Vue Liste] [Vue Calendrier]                                   │
├─────────────────────────────┬───────────────────────────────────┤
│  Calendrier de préparation  │  Lundi 20 Octobre 2025  [15 repas]│
│                             │                                   │
│  Octobre 2025               │  Summary:                         │
│  ┌──┬──┬──┬──┬──┬──┬──┐    │  [1] En attente    [3 repas]     │
│  │Lu│Ma│Me│Je│Ve│Sa│Di│    │  [2] En cours      [5 repas]     │
│  ├──┼──┼──┼──┼──┼──┼──┤    │  [3] Prêt          [4 repas]     │
│  │14│15│16│17│18│19│20│    │  [4] Livré         [3 repas]     │
│  │  │  │  │  │  │  │●●│    │                                   │
│  ├──┼──┼──┼──┼──┼──┼──┤    │  ┌──────────────────────────────┐│
│  │21│22│23│24│25│26│27│    │  │ 🖼️ Tajine aux Olives    x3 ││
│  │●●│  │  │  │  │  │  │    │  │ Client: Mohammed Alami      ││
│  └──┴──┴──┴──┴──┴──┴──┘    │  │ 📝 Allergique aux noix      ││
│                             │  │ Statut: [En attente ▼]      ││
│  ●● = Repas programmés      │  └──────────────────────────────┘│
│                             │                                   │
│                             │  ┌──────────────────────────────┐│
│                             │  │ 🖼️ Couscous Royal       x2 ││
│                             │  │ Client: Fatima Zahra        ││
│                             │  │ Statut: [En cours ▼]        ││
│                             │  └──────────────────────────────┘│
└─────────────────────────────┴───────────────────────────────────┘
```

## Status Dropdown

When clicking on a status, the dropdown shows:

```
┌─────────────────────────┐
│ ● En attente  (Yellow)  │
│ ● En cours    (Blue)    │
│ ● Prêt        (Green)   │
│ ● Livré       (Gray)    │
└─────────────────────────┘
```

## Mobile/Tablet View

On tablets (768px - 1024px):

```
┌─────────────────────────────────┐
│  Préparation des Repas          │
│  [Liste] [Calendrier]           │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🖼️                      │   │
│  │ Tajine aux Olives       │   │
│  │                         │   │
│  │ Qté: x3                 │   │
│  │ Client: Mohammed Alami  │   │
│  │                         │   │
│  │ 📝 Allergique aux noix  │   │
│  │                         │   │
│  │ Statut: [Pending ▼]    │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🖼️                      │   │
│  │ Couscous Royal          │   │
│  │                         │   │
│  │ Qté: x2                 │   │
│  │ Client: Fatima Zahra    │   │
│  │                         │   │
│  │ Statut: [Progress ▼]   │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

## Workflow Example

### Morning Routine for Kitchen Staff

1. **Open Dashboard** → Click "Préparation Repas"
2. **Switch to Calendar View** → Click today's date
3. **Review Summary**: "15 meals to prepare today"
4. **Start Preparing First Meal**:
   - Find "Tajine aux Olives x3"
   - Read note: "Allergique aux noix"
   - Change status to "En cours" (In Progress)
5. **During Preparation**:
   - Check other pending meals
   - Note special instructions
6. **When Ready**:
   - Change status to "Prêt" (Ready)
   - Kitchen notifies delivery
7. **After Delivery**:
   - Change status to "Livré" (Delivered)

## Filter Usage Examples

### Find all pending meals:
```
Status filter: "En attente"
Result: Shows only yellow badge items
```

### Search for a specific meal:
```
Search: "Couscous"
Result: Shows all couscous meals regardless of status
```

### View only in-progress meals:
```
Status filter: "En cours"
Result: Shows only blue badge items currently being prepared
```

## Color Legend

| Color  | Status    | Meaning                        | Action Required |
|--------|-----------|--------------------------------|----------------|
| 🟡     | Pending   | Not started yet                | Start preparing |
| 🔵     | Progress  | Currently in kitchen           | Continue work   |
| 🟢     | Ready     | Completed, waiting pickup      | Notify delivery |
| ⚫     | Delivered | Already with customer          | Archive         |

## Tips for Kitchen Staff

✅ **Start your day**: Check calendar view for today
✅ **Prioritize**: Look at delivery times
✅ **Update often**: Change status as you work
✅ **Read notes**: Special instructions are highlighted
✅ **Check quantities**: Large numbers = prepare more
✅ **Use filters**: Focus on "En attente" first

## Keyboard Shortcuts (Future Enhancement)

- `T` - Switch to Table view
- `C` - Switch to Calendar view
- `F` - Focus search box
- `←` / `→` - Navigate calendar dates
- `1-4` - Quick status change

---

**Optimized for**: iPad, Android tablets, and kitchen displays
**Best viewed on**: 768px - 1024px screens
