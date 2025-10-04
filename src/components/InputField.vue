<template>
    <div>
        <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">
            {{ label }}
        </label>

        <input
            :id="id"
            :name="id"
            v-bind="$attrs"
            :type="type || 'text'"
            :value="modelValue"
            :placeholder="placeholder"
            :class="inputClasses"
            @input="
                emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value
                );
                emit('input');
            "
            @blur="emit('blur')"
        />

        <p v-if="error" class="mt-1 text-sm text-red-600">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    id: string;
    label: string;
    modelValue: string;
    type?: string;
    placeholder?: string;
    error?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur'): void;
    (e: 'input'): void;
}>();

const inputClasses = computed(() =>
    [
        'w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm',
        props.error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
    ].join(' ')
);
</script>
