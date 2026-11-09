export interface VersionedEnvelope<T> {
  schema: string;
  version: number;
  data: T;
}

export type Migration = (data: unknown) => unknown;

export class VersionedCodec<T> {
  private migrations = new Map<number, Migration>();

  constructor(
    readonly schema: string,
    readonly currentVersion: number,
    private readonly validate: (value: unknown) => value is T
  ) {}

  addMigration(fromVersion: number, migration: Migration): void {
    this.migrations.set(fromVersion, migration);
  }

  encode(data: T): string {
    return JSON.stringify({
      schema: this.schema,
      version: this.currentVersion,
      data
    } satisfies VersionedEnvelope<T>);
  }

  decode(serialized: string): T {
    const envelope = JSON.parse(serialized) as VersionedEnvelope<unknown>;
    if (envelope.schema !== this.schema) throw new Error("Wrong schema");

    let version = envelope.version;
    let data = envelope.data;

    while (version < this.currentVersion) {
      const migration = this.migrations.get(version);
      if (!migration) throw new Error(`Missing migration from version ${version}`);
      data = migration(data);
      version++;
    }

    if (version !== this.currentVersion || !this.validate(data)) {
      throw new Error("Invalid document");
    }
    return data;
  }
}
