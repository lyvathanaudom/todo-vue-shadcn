<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="justify-start text-left font-normal">
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Select @update:model-value="updateDate">
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="item in dateOptions"
            :key="item.date"
            :value="item.date.toString()"
          >
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

const df = new DateFormatter("en-US", { dateStyle: "long" });

const dateOptions = [
  { date: 0, label: 'Today' },
  { date: 1, label: 'Tomorrow' },
  { date: 7, label: 'In a week' },
];

function updateDate(value: string | null) {
  if (value) {
    date.value = today(getLocalTimeZone()).add({ days: Number(value) });
  }
}

// Watch the date and log the formatted date whenever it changes
watch(date, (newDate) => {
  console.log(newDate ? df.format(newDate.toDate(getLocalTimeZone())) : "No date selected");
});
</script>