export interface SystemState {
  model: string;
}

export class SystemService {
  state: SystemState;

  constructor(initState: SystemState) {
    this.state = initState;
  }

  getState() {
    return this.state;
  }

  setStateValue(name: string, value: any) {
    (this.state as any)[name] = value;
  }

  getStateValue(name: string) {
    return (this.state as any)[name];
  }
}
