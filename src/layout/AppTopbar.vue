<script setup>
    import { ref, computed, onMounted, onBeforeUnmount, defineEmits } from 'vue';
    import { useLayout } from '@/layout/composables/layout';
    import { useRouter } from 'vue-router';

    const { layoutConfig, onMenuToggle, contextPath } = useLayout();
    const emit = defineEmits(['section'])

    const outsideClickListener = ref(null);
    const topbarMenuActive = ref(false);
    const router = useRouter();

    onMounted(() => {
        bindOutsideClickListener();
    });

    onBeforeUnmount(() => {
        unbindOutsideClickListener();
    });

    const logoUrl = computed(() => {
        return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
    });

    const onTopBarMenuButton = () => {
        topbarMenuActive.value = !topbarMenuActive.value;
    };
    const onSettingsClick = () => {
        topbarMenuActive.value = false;
        router.push('/settings');
    };
    const onSectionClick = (section) => {
        //command: this.emitSection('live'),
        topbarMenuActive.value = false;
        emit('section', section);
    };

    const topbarMenuClasses = computed(() => {
        return {
            'layout-topbar-menu-mobile-active': topbarMenuActive.value
        };
    });

    const bindOutsideClickListener = () => {
        if (!outsideClickListener.value) {
            outsideClickListener.value = (event) => {
                if (isOutsideClicked(event)) {
                    topbarMenuActive.value = false;
                }
            };
            document.addEventListener('click', outsideClickListener.value);
        }
    };
    const unbindOutsideClickListener = () => {
        if (outsideClickListener.value) {
            document.removeEventListener('click', outsideClickListener);
            outsideClickListener.value = null;
        }
    };
    const isOutsideClicked = (event) => {
        if (!topbarMenuActive.value) return;

        const sidebarEl = document.querySelector('.layout-topbar-menu');
        const topbarEl = document.querySelector('.layout-topbar-menu-button');

        return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
    };
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/welcome"
                     class="layout-topbar-logo">
            <img :src="logoUrl"
                 alt="logo" />
            <span>TVTaur</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button"
                @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-button"
                aria-label="Live TV"
                v-tooltip.top="'Live TV'"
                @click="onSectionClick('live')">
            <i class="pi pi-globe"></i>
            <span>Live TV</span>
        </button>

        <button class="p-link layout-topbar-button"
                aria-label="Video on Demand"
                v-tooltip.top="'Video on Demand'"
                @click="onSectionClick('vod')">
            <i class="pi pi-eye"></i>
            <span>Video on Demand</span>
        </button>

        <!-- <button class="p-link layout-topbar-button"
                    aria-label="Series"
                    v-tooltip.top="'Series'"
                    @click="onSectionClick('series')">
                <i class="pi pi-video"></i>
                <span>Series</span>
            </button> -->

        <!-- <button class="p-link layout-topbar-button"
                    aria-label="Favorites"
                    v-tooltip.top="'Favorites'"
                    @click="onSectionClick('favorites')">
                <i class="pi pi-heart"></i>
                <span>Favorites</span>
            </button> -->

        <button class="p-link layout-topbar-menu-button layout-topbar-button"
                @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu"
             :class="topbarMenuClasses">
            <button @click="onSettingsClick()"
                    class="p-link layout-topbar-button"
                    aria-label="Settings"
                    v-tooltip.top="'Settings'">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
