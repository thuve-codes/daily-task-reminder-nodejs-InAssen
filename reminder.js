const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const cron = require("node-cron");

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseCommandLineArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      args[key] = value || true;
    }
  });
  return args;
}

function sendRemindersForDate(date) {
  const filePath = path.join(__dirname, "tasks.txt");

  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`Error: Could not find file at ${filePath}`));
    return;
  }

  const allTasks = fs.readFileSync(filePath, "utf-8").split("\n");

  const tasksForToday = allTasks.filter((line) => {
    const [taskText, taskDate] = line.split("|");
    return taskDate?.trim() === date;
  });

  console.log(
    chalk.cyan(
      `\n[${new Date().toLocaleTimeString()}] Checking tasks for ${date}...`
    )
  );

  if (tasksForToday.length === 0) {
    console.log(chalk.blue("No tasks for today."));
  } else {
    console.log(
      chalk.green(`✅ You have ${tasksForToday.length} task(s) for today:`)
    );
    tasksForToday.forEach((taskLine, index) => {
      const [taskText] = taskLine.split("|");
      console.log(chalk.yellow(`  ${index + 1}. ${taskText.trim()}`));
    });

    console.log(
      chalk.gray("\n---\n(Simulated) Sending reminders via email/message...")
    );
  }
}

function main() {
  const args = parseCommandLineArgs();
  const dateToCheck = args.date || getTodayDate();

  if (args.watch) {
    console.log(
      chalk.magenta(
        "Watch mode enabled: checking tasks every minute. Press Ctrl+C to stop."
      )
    );
    sendRemindersForDate(dateToCheck);

    // Run every minute using cron
    cron.schedule("* * * * *", () => {
      sendRemindersForDate(dateToCheck);
    });
  } else {
    // Just check once and exit
    sendRemindersForDate(dateToCheck);
  }
}

main();
