
export enum TaskType {
  SIMPLE_INPUT = 'SIMPLE_INPUT',
  MULTI_INPUT = 'MULTI_INPUT',
  DRAG_DROP = 'DRAG_DROP',
  GRID_PAINT = 'GRID_PAINT',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  type: TaskType;
  instructions?: string;
}
