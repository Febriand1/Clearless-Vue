<template>
    <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-3">
            <InputField
                v-for="field in props.fields"
                :key="field.id"
                :id="field.id"
                :label="field.label"
                :placeholder="field.placeholder"
                :type="field.type"
                v-model="props.form[field.id]"
                :error="props.formState.errors[field.id]"
                @blur="handleBlur"
                @input="handleInput"
            />
        </div>

        <div
            v-if="props.formState.errors.general"
            class="bg-red-50 border border-red-200 rounded-md p-4"
        >
            <GeneralError :error="props.formState.errors.general" />
        </div>

        <SubmitButton
            :text="props.submitText"
            :submittingText="props.submittingText"
            :isSubmitting="props.formState.isSubmitting"
            :isValid="props.formState.isValid"
        />
    </form>
</template>

<script setup lang="ts">
import type { FormState } from '@/types';
import InputField from '@/components/InputField.vue';
import GeneralError from '@/components/GeneralError.vue';
import SubmitButton from '@/components/SubmitButton.vue';

interface Props {
    form: Record<string, any>;
    fields: Record<string, any>[];
    submitText: string;
    submittingText: string;
    formState: FormState;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'submit', form: Record<string, any>): void;
    (e: 'validate', form: Record<string, any>): void;
}>();

const handleSubmit = () => emit('submit', props.form);
const handleBlur = () => emit('validate', props.form);
const handleInput = () => emit('validate', props.form);
</script>
