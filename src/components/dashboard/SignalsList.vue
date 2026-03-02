<script setup lang="ts">
import SignalItem from './SignalItem.vue';
import type { Signals } from '@/types/index';
const props = defineProps<{
    signals: Signals[]
}>()
</script>

<template>
        <div class="card card-md bg-base-100 ">
            <div class="card-title pt-4 pl-8">Recent Signals</div>
            <div class="card-body">
                <ul v-for="signal in signals" :key="signal.id">
                    <li>
                        <SignalItem 
                        :symbol="signal.stock.ticker"
                        :action="signal.result"
                        :message="signal.describe"
                        severity="moderate"
                        timestamp="Feb 27"
                        />
                    </li>
                </ul>
            </div>
        </div>
</template>