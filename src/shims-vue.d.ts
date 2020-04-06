declare module '*.vue' {
  import Vue from 'vue'
  export default Vue

// tslint:disable no-empty-interface}
declare module 'vue/types/vue' {
    // 3. 声明为 Vue 补充的东西
    // tslint:disable no-empty-interface
    interface Vue {
        $downloadUrl: string,
        $uploadUrl: string
    }
}
