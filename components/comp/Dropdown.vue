<script setup lang="ts">
import { type dropdownCompData } from '~/utils/settingComps'

const emit = defineEmits(['menuSelect'])
const props = defineProps<{ data: dropdownCompData; name: string }>()
const isExpanded = useState('dropdownIsExpanded', () => false)
const wrapEl = ref()

const openMenu = () => {
  isExpanded.value = true
}

const closeMenu = () => {
  isExpanded.value = false
}

const onClickMenu = (index: number) => {
  closeMenu()
  emit('menuSelect', index)
}

onClickOutside(wrapEl, closeMenu)
</script>

<template>
  <div class="vert">
    <p>
      {{ props.name }}
    </p>
    <div class="vert w-full" ref="wrapEl">
      <div class="select select-l" :class="{ active: isExpanded }" @click="openMenu">
        <span>
          {{ props.data.list[props.data.index] }}
        </span>
      </div>

      <ul class="list-l" v-if="isExpanded">
        <li v-for="(name, index) in props.data.list" v-bind:key="index" @click="onClickMenu(index)">
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss"></style>
