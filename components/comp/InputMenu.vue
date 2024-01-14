<script setup lang="ts">
import { CompInputMenu } from '~/utils/settingComps'

const { data } = defineProps<{ data: CompInputMenu }>()
const isExpanded = useState(undefined, () => false)

const wrapEl = ref()

const closeList = () => {
  isExpanded.value = false
}

onClickOutside(wrapEl, closeList)
</script>

<template>
  <div class="vert" ref="wrapEl">
    <p>
      {{ $t('verify.category1.role') }}
      <!-- 인증 시 지급될 역할 -->
    </p>
    <input
      class="input-l"
      id="role_input"
      :value="data.inputValue"
      @click="isExpanded = true"
      readonly
      type="text"
      :placeholder="$t('verify.category1.rolePlaceholder')"
    />
    <ul class="list-l" v-if="isExpanded">
      <li v-for="(value, index) in data.list" @click="data.inputValue = value" v-bind:key="index">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
