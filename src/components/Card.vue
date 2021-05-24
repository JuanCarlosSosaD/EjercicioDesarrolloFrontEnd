<template>
    <div class="card light">
        <div class="card-header">
            <slot name="c-header"></slot>
            <a v-if="create_url" class="btn  float-end btn-sm btn-primary " v-bind:href="create_url">+ Add New </a>
        </div>
        <div class="card-body">
            <slot name="c-body"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['create_url']
    }
</script>