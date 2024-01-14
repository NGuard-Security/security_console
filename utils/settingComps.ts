export class CompSwitch {
  public value: boolean = false

  constructor(value: boolean) {
    this.value = value
  }

  switch() {
    this.value = !this.value
  }
}

export class CompDropdown {
  public index: number = 0
  public list: string[] = []

  constructor(index: number, list: string[]) {
    this.index = index
    this.list = list
  }
}

export class CompInput {
  public value: string = ''

  constructor(value: string) {
    this.value = value
  }
}

export class CompInputMenu {
  public inputValue: string = ''
  public list: string[] = []

  constructor(inputValue: string, list: string[]) {
    this.inputValue = inputValue
    this.list = list
  }
}
