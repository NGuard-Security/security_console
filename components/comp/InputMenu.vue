<script setup lang="ts">
import { type inputMenuCompData } from '~/utils/settingComps'

const emit = defineEmits(['menuSelect', 'input'])
const props = defineProps<{ data: inputMenuCompData; name: string; readonly: boolean; placeholder: string }>()
const isExpanded = useState('inputMenuIsExpanded', () => false)
const wrapEl = ref()

const onClickMenu = (index: string) => {
  closeList()
  emit('menuSelect', index)
}

const onInput = (value: string) => {
  emit('input', value)
}

const ExpandList = () => {
  if (props.readonly) return
  isExpanded.value = true
}

const closeList = () => {
  isExpanded.value = false
}

onClickOutside(wrapEl, closeList)
</script>

<template>
  <div class="vert" ref="wrapEl">
    <p>
      {{ props.name }}
    </p>
    <input
      class="input-l"
      id="role_input"
      :value="props.data.inputValue"
      @click="ExpandList()"
      @input="(e) => onInput((e.target as HTMLInputElement).value)"
      :readonly="props.readonly"
      type="text"
      :placeholder="props.placeholder"
    />
    <ul class="list-l" v-if="isExpanded">
      <li v-for="(value, index) in props.data.menuIndex" @click="onClickMenu(value.index)" v-bind:key="index">
        {{ value.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
