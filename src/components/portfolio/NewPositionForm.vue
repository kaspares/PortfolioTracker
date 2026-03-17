<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const dialogRef = ref<HTMLDialogElement>()

  watch(() => props.open, (val) => {
    if (val) dialogRef.value?.showModal()
    else dialogRef.value?.close()
  })

  function onClose() {
    emit('update:open', false)
  }
</script>

<template>
    <dialog ref="dialogRef" class="modal" @close="onClose">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add new position!</h3>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Ticker:</legend>
            <input type="text" class="input" placeholder="TMDX" />
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Quantity:</legend>
            <input type="text" class="input" placeholder="10" />
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Purchase price:</legend>
            <input type="text" class="input" placeholder="130"/>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Comment:</legend>
            <textarea class="textarea h-24" placeholder="Solid results Q4"></textarea>
            <div class="label">Optional</div>
        </fieldset>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog" class="flex gap-2">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-success">Save</button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
</template>