<template>
  <div>
    <div
      @dragenter.prevent="setActive"
      @dragover.prevent="setActive"
      @dragleave.prevent="setInactive"
      @drop.prevent="onDrop"
      class="dragDropBox"
      :class="{ dragHover: active }"
    >
      <span v-if="active">
        <span>Drop Them Here</span>
        <span class="smaller">to add them</span>
      </span>
      <span v-else>
        <span>Drag Your Files Here</span>
        <span class="smaller">
          or
          <strong
            ><em style="cursor: pointer" @click="$refs.fileInput.click()"
              >click here</em
            ></strong
          >
          to select files
        </span>
      </span>
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="onInputChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

let active = ref(false);
let inActiveTimeout = null;

function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout);
}
function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop(e) {
  setInactive();
  console.log(e.dataTransfer.files);
}
</script>

<style scoped>
.dragDropBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #e6ef6b;
  font-size: 20px;
}
.dragHover {
  background-color: #17b927;
}
</style>
