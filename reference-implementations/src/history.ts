export interface Command {
  readonly label: string;
  execute(): void;
  undo(): void;
}

class CompositeCommand implements Command {
  constructor(
    readonly label: string,
    private readonly commands: readonly Command[]
  ) {}

  execute(): void {
    for (const command of this.commands) command.execute();
  }

  undo(): void {
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i]!.undo();
    }
  }
}

export class CommandHistory {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  get canUndo(): boolean { return this.undoStack.length > 0; }
  get canRedo(): boolean { return this.redoStack.length > 0; }

  execute(command: Command): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
  }

  executeTransaction(label: string, commands: readonly Command[]): void {
    if (commands.length === 0) return;
    this.execute(new CompositeCommand(label, commands));
  }

  undo(): void {
    const command = this.undoStack.pop();
    if (!command) return;
    command.undo();
    this.redoStack.push(command);
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (!command) return;
    command.execute();
    this.undoStack.push(command);
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}

export function propertyCommand<T>(
  label: string,
  read: () => T,
  write: (value: T) => void,
  next: T
): Command {
  let previous: T;
  return {
    label,
    execute() {
      previous = read();
      write(next);
    },
    undo() {
      write(previous);
    }
  };
}
