export class GetTaskDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly userId: string;

  constructor(id: string, title: string, description: string, userId: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}
