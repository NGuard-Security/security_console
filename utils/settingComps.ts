export class createSwitchComp {
  public value: boolean = false

  constructor(value: boolean) {
    this.value = value
  }

  switch() {
    this.value = !this.value
  }

  toObject() {
    return { value: this.value }
  }
}

export interface dropdownCompData {
  index: number
  list: string[]
}

export class createDropdownComp implements dropdownCompData {
  public index: number = 0
  public list: string[] = []

  constructor(index: number, list: string[]) {
    this.index = index
    this.list = list
  }

  toObject(): dropdownCompData {
    return { index: this.index, list: this.list }
  }
}

export class createInputComp {
  public value: string = ''

  constructor(value: string) {
    this.value = value
  }

  toObject() {
    return { value: this.value }
  }
}

export interface inputMenuCompData {
  inputValue: string
  index: string | null
  selectedData: any | null

  dataMap: Record<string, { name: string; data: any }>
  menuIndex: { name: string; index: string }[]
}

export class createInputMenuComp<dataType = any> implements inputMenuCompData {
  public inputValue: string = ''
  public index: string | null = null
  public selectedData: dataType | null = null

  public dataMap: Record<string, { name: string; data: dataType }> = {}
  public menuIndex: { name: string; index: string }[] = []

  constructor(data: { index: string; name: string; data: dataType }[]) {
    if (data.length === 0) {
      return
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      this.dataMap[item.index] = { name: item.name, data: item.data }
      this.menuIndex.push({ name: item.name, index: item.index })
    }

    this.setIndex(data[0].index)
  }

  setIndex(index: string) {
    this.index = index
    this.inputValue = this.dataMap[index].name
    this.selectedData = this.dataMap[index].data

    return this
  }

  toObject(): inputMenuCompData {
    return {
      index: this.index,
      selectedData: this.selectedData,
      dataMap: this.dataMap,
      menuIndex: this.menuIndex,
      inputValue: this.inputValue,
    }
  }
}
