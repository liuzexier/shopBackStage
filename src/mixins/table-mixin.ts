export const table_mixin = {
    data() {
        return {
            page: 1,
            pageSize: 10,
            count: 0
        }
    },
    created() {
        // this.hello();
    },
    methods: {
        // hello() {
        //     console.log('mixinTest1');
        // }
        jumpToTargetPage(val: any) {
            (this as any).page = val
        }
    }
};