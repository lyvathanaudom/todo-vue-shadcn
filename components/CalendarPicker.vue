<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="justify-start text-left font-normal"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Select
        @update:model-value="(v) => {
          if (!v) return;
          date = today(getLocalTimeZone()).add({ days: Number(v) });
        }"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="item in items" :key="item.date" :value="item.date.toString()">
            {{ item.label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Calendar v-model="date" initial-focus />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { CalendarIcon } from "lucide-vue-next";
import {
  DateFormatter,
  type DateValue,
  today,
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
const items = [
  { date: 0, label: 'Today' },
  { date: 1, label: 'Tomorrow' },
  { date: 7, label: 'In a week' },
]
const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

// Watch the date and log the formatted date whenever it changes
watch(date, (newDate) => {
  if (newDate) {
    console.log(df.format(newDate.toDate(getLocalTimeZone())));
  } else {
    console.log("No date selected");
  }
});
</script>