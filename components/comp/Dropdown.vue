<script setup lang="ts">
import { CompDropdown } from '~/utils/settingComps'

const { data } = defineProps<{ data: CompDropdown }>()
const isExpanded = useState(undefined, () => false)
const isActive = useState(undefined, () => false)

const wrapEl = ref()

const closeList = () => {
  isExpanded.value = false
  isActive.value = false
}

onClickOutside(wrapEl, closeList)
</script>

<template>
  <div class="vert" ref="wrapEl">
    <p>
      <!-- 보안 초대 방식 -->
      {{ $t('invite.category1.type.title') }}
    </p>
    <div
      class="select select-l"
      :class="{ active: isActive }"
      @click="
        isExpanded = true
        isActive = true
      "
      v-click-outside="onClickOutside"
    >
      {{ data.list[data.index] }}
    </div>

    <ul class="list-l" v-if="isExpanded">
      <li
        v-for="(name, index) in data.list"
        v-bind:key="index"
        @click="
          data.index = index
          isActive = false
        "
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
