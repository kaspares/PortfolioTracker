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
    <div class="modal-box bg-base-200 border border-base-content/5 max-w-md">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-base-content">Add Position</h3>
        <form method="dialog">
          <button class="btn btn-ghost btn-sm btn-square text-base-content/40 hover:text-base-content">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </form>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-base-content/60 mb-1.5">Ticker</label>
          <input type="text" class="input input-bordered w-full bg-base-300/50 border-base-content/10 focus:border-primary focus:outline-none" placeholder="e.g. AAPL" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-base-content/60 mb-1.5">Quantity</label>
            <input type="number" class="input input-bordered w-full bg-base-300/50 border-base-content/10 focus:border-primary focus:outline-none" placeholder="10" />
          </div>
          <div>
            <label class="block text-sm font-medium text-base-content/60 mb-1.5">Purchase Price</label>
            <input type="number" step="0.01" class="input input-bordered w-full bg-base-300/50 border-base-content/10 focus:border-primary focus:outline-none" placeholder="150.00" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-base-content/60 mb-1.5">Comment <span class="text-base-content/30">(optional)</span></label>
          <textarea class="textarea textarea-bordered w-full bg-base-300/50 border-base-content/10 focus:border-primary focus:outline-none h-20 resize-none" placeholder="e.g. Strong Q4 earnings..."></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-6 pt-4 border-t border-base-content/5">
        <form method="dialog">
          <button class="btn btn-ghost text-base-content/60">Cancel</button>
        </form>
        <button class="btn btn-primary">Save Position</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
