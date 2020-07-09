import Vue from "vue";


export default {
    methods: {
        notification(methodName, msg) {
            this[methodName](msg)
        },
        successNotify(msg) {
            this.$swal({
                title: "Успешно",
                text: msg,
                type: "success",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: 'OK',
                closeOnConfirm: true
            })
        },
        successNotifyMini(msg) {
            this.$snotify.success(msg, 'Успешно', {
                timeout: 3000,
                bodyMaxLength: 80,
                titleMaxLength: 15,
                backdrop: -1
            });
        },
        errorNotify(msg) {

            this.$swal({
                title: "Ошибка",
                text: msg,
                type: "error",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: 'OK',
                closeOnConfirm: true
            })

        },
        errorNotifyMini(msg) {
            this.$snotify.error(msg, 'Ошибка', {
                timeout: 3000,
                bodyMaxLength: 80,
                titleMaxLength: 15,
                backdrop: -1
            });
        }
    }
}
