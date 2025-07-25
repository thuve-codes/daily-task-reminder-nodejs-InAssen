## Daily Task Reminder – JavaScript CLI Script

A Node.js command-line script that reads tasks from a text file (tasks.txt) and displays only the tasks scheduled for today’s date in a clean format. Optionally simulates sending reminders via console output.

### File Structure

```bash
daily-task-reminder/
├── tasks.txt            # Your input task list
├── reminder.js          # Main script
├── README.md            # Instructions
```

### Features

- Reads tasks from `tasks.txt`
- Each line: `Title | YYYY-MM-DD`
- Filters tasks scheduled for today's date
- Clean console output

### Sample `tasks.txt`

```yaml
Buy groceries | 2025-07-25
Pay internet bill | 2025-08-01
.
.
.
```

### Usage

```bash
npm install
node reminder.js  or npm start                    # Uses today's date
node reminder.js --date 2025-07-27                # Override date
```

### Example Output (for 2025-07-25)

```yaml
✅ Tasks for 2025-07-25

1. Buy groceries
---
sending reminder email/message with today's tasks...
```

### Notes

- The date format must be `YYYY-MM-DD`
- Timezone: Local machine timezone (Asia/Colombo for you)
