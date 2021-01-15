Vue.component('problem', {
    data() {
        return {
            errorMsg: 'Проблема подключения к серверу'
        }
    },
    template: `<span>HOUSTON, WE HAVE A *CONNECTION* PROBLEM</span>`,
})