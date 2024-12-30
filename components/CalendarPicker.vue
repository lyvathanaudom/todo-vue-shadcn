<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-[280px] justify-start text-left font-normal"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" initial-focus />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { CalendarIcon } from "lucide-vue-next";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";

const props = defineProps<{
  modelValue: DateValue | undefined;
}>();

const emit = defineEmits(["update:modelValue"]);

const date = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});
</script>
